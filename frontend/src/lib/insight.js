import { fetchPageBySlug, fetchPosts, fetchCategoryBySlug } from './wordpress';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const decodeHtmlEntities = (value = '') =>
  String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/gi, (_, entity) => ({
      amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    }[entity.toLowerCase()] || _));

const stripHtml = (html = '') => decodeHtmlEntities(String(html).replace(/<[^>]*>/g, '')).trim();

const THUMBS = ['t1', 't2', 't3', 't4', 't5', 't6'];

function findLayout(layouts, layoutType) {
  return layouts.find((l) => l.layout_type === layoutType)?.[layoutType];
}

// ---------------------------------------------------------------------------
// Press Release + Recognition
// Source: WP page "insights-news" -> ACF layouts "insights_press_release" / "insights_recognition"
// Category comes from which layout the item lives in - no guessing needed.
// ---------------------------------------------------------------------------

function normalizeInsightsItem(item, index, category) {
  const title = stripHtml(item.title);
  return {
    category,
    type: category === 'recognition' ? 'Recognition' : 'Press Release',
    badge: category === 'recognition' ? 'Recognition' : 'Company News',
    badgeClass: category === 'recognition' ? 'gold' : '',
    thumb: THUMBS[index % THUMBS.length],
    image: item.image?.url || null,
    title,
    desc: stripHtml(item.description || ''),
    meta: '',
    action: item.link?.title || 'Read →',
    url: item.link?.url || '#',
    search: title.toLowerCase(),
  };
}

function getNewsroomResources(layouts) {
  const press = findLayout(layouts, 'insights_press_release')?.items || [];
  const recognition = findLayout(layouts, 'insights_recognition')?.items || [];
  return [
    ...press.map((item, i) => normalizeInsightsItem(item, i, 'press')),
    ...recognition.map((item, i) => normalizeInsightsItem(item, i, 'recognition')),
  ];
}

// ---------------------------------------------------------------------------
// Media
// Source: WP page "insights-news" -> ACF layout "insights_media"
// ---------------------------------------------------------------------------

function normalizeMediaItem(item, index) {
  const title = stripHtml(item.title);
  return {
    category: 'media',
    type: 'Media',
    badgeClass: 'media',
    play: true,
    badge: item.category_tag || 'Media',
    thumb: THUMBS[index % THUMBS.length],
    image: item.thumbnail?.url || null,
    title,
    desc: stripHtml(item.description || ''),
    meta: 'Watch',
    action: item.video_link?.title || 'Watch →',
    url: item.video_link?.url || '#',
    search: `${title} ${item.category_tag || ''}`.toLowerCase(),
  };
}

function getMediaResources(layouts) {
  const items = findLayout(layouts, 'insights_media')?.items || [];
  return items.map(normalizeMediaItem);
}

// ---------------------------------------------------------------------------
// Blog
// Source: real WP posts, category "blog" (+ industry categories for sub-tabs)
// ---------------------------------------------------------------------------

const INDUSTRY_SLUG_TO_TAB = {
  banking: 'banking',
  healthcare: 'healthcare',
  insurance: 'insurance',
  manufacturing: 'manufacturing',
  'news-room': 'newsroom',
  'real-estate': 'realestate',
  'supply-chain': 'supplychain',
  blog: 'blog',
};

const TAB_LABEL = {
  banking: 'Banking',
  healthcare: 'Healthcare',
  insurance: 'Insurance',
  manufacturing: 'Manufacturing',
  newsroom: 'Newsroom',
  realestate: 'Real Estate',
  supplychain: 'Supply Chain',
  blog: 'Blog',
};

function normalizeBlogPost(post, index) {
  const terms = post._embedded?.['wp:term']?.[0] || [];
  const subcats = terms.map((t) => INDUSTRY_SLUG_TO_TAB[t.slug]).filter(Boolean);
  const primary = subcats.find((s) => s !== 'blog') || subcats[0] || 'blog';
  const title = stripHtml(post.title?.rendered);
  const desc = stripHtml(post.excerpt?.rendered).slice(0, 180);
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  return {
    category: 'blog',
    type: 'Blog',
    badgeClass: 'blog',
    badge: TAB_LABEL[primary] || 'Blog',
    thumb: THUMBS[index % THUMBS.length],
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    title,
    desc,
    meta: `Blog · ${formattedDate}`,
    action: 'Read →',
    url: `/blog/${post.slug}`,
    search: `${title} ${desc}`.toLowerCase(),
    subcats,
  };
}

async function getBlogResources() {
  const category = await fetchCategoryBySlug('blog');
  if (!category) return [];
  const posts = await fetchPosts({ categories: [category.id], per_page: 60 });
  return posts.map(normalizeBlogPost);
}

// ---------------------------------------------------------------------------
// Hero banner
// Source: WP page "insights-news" -> ACF layout "insights_hero" (dedicated layout)
// ---------------------------------------------------------------------------

function getHero(layouts) {
  const hero = findLayout(layouts, 'insights_hero');
  if (!hero) return null;
  return {
    eyebrow: hero.eyebrow || '',
    title: hero.title || '',
    description: hero.description || '',
  };
}

// ---------------------------------------------------------------------------
// Category stats row
// Source: WP page "insights-news" -> ACF layout "insights_category_stats"
// ---------------------------------------------------------------------------

function getCategoryStats(layouts) {
  const stats = findLayout(layouts, 'insights_category_stats')?.stats || [];
  return stats.map((s) => ({ name: s.name, desc: s.description }));
}

// ---------------------------------------------------------------------------
// Newsletter section
// Source: WP page "insights-news" -> ACF layout "insights_newsletter"
// ---------------------------------------------------------------------------

function getNewsletter(layouts) {
  const section = findLayout(layouts, 'insights_newsletter');
  if (!section) return null;
  return {
    heading: section.heading || '',
    description: section.description || '',
  };
}

// ---------------------------------------------------------------------------
// Combined fetch for the insights-news page
// ---------------------------------------------------------------------------

export async function fetchInsightsPageData() {
  const [page, blog] = await Promise.all([
    fetchPageBySlug('insights-news'),
    getBlogResources(),
  ]);
  // Dedicated field group scoped to this page only (like qbotica_partners_sections
  // is scoped to the qbotica-partners page) - not the shared sitewide "layouts" field.
  const layouts = page?.acf?.insights_news_sections || [];

  return {
    hero: getHero(layouts),
    stats: getCategoryStats(layouts),
    newsletter: getNewsletter(layouts),
    resources: [
      ...getNewsroomResources(layouts),
      ...getMediaResources(layouts),
      ...blog,
    ],
  };
}
