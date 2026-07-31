import { fetchPosts, fetchCategoryBySlug } from './wordpress';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || process.env.WP_API_URL;

/*
 * Own fetch for this page rather than the shared fetchPageBySlug(), so the
 * cache window can stay short (30s) while editors are filling in the ACF
 * layouts - the shared helper caches for 180s, which made admin edits look
 * like they weren't saving.
 */
async function fetchInsightsPage() {
  try {
    const res = await fetch(
      `${WP_API_URL}/wp/v2/pages?slug=insights-news&status=publish`,
      {
        next: { revalidate: 30, tags: ['page-insights-news'] },
        headers: { Accept: 'application/json', 'Accept-Encoding': 'gzip' },
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching insights-news page:', error.message);
    return null;
  }
}

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
  // ACF's standard flexible-content REST output identifies each row with
  // `acf_fc_layout`, and its fields sit flat on that same row object -
  // there's no nested sub-object keyed by the layout name (that nesting is
  // specific to this theme's shared "Page Layout" field, not our own).
  return layouts.find((l) => l.acf_fc_layout === layoutType);
}

// ---------------------------------------------------------------------------
// Press Release + Recognition
// Source: WP page "insights-news" -> ACF layouts "insights_press_release" / "insights_recognition"
// Category comes from which layout the item lives in - no guessing needed.
// ---------------------------------------------------------------------------

function normalizeInsightsItem(item, index, category) {
  const title = stripHtml(item.title);
  const type = category === 'recognition' ? 'Recognition' : 'Press Release';
  return {
    category,
    type,
    // Editors can set a per-item badge in WP (Partnership, Innovation,
    // Leadership, Community...); otherwise it just repeats the type.
    badge: stripHtml(item.badge || '') || type,
    badgeClass: category === 'recognition' ? 'gold' : '',
    thumb: THUMBS[index % THUMBS.length],
    image: item.image?.url || null,
    title,
    desc: stripHtml(item.description || ''),
    meta: '',
    action: item.link?.title || 'Read →',
    url: item.link?.url || '#',
    search: `${title} ${item.badge || ''}`.toLowerCase(),
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
  // The WP field is named "title" (not "name") - map it to what CategoryStats.js expects.
  return stats.map((s) => ({ name: s.title, desc: s.description }));
}

// ---------------------------------------------------------------------------
// Featured panel copy, per filter tab
// Source: WP page "insights-news" -> ACF layout "insights_featured"
// Keyed by the tab id (all | press | recognition | blog | media) so each tab
// can carry its own heading/intro/button label.
// ---------------------------------------------------------------------------

function getFeatured(layouts) {
  const items = findLayout(layouts, 'insights_featured')?.items || [];
  const byCategory = {};
  items.forEach((item) => {
    const key = item.category || 'all';
    byCategory[key] = {
      heading: item.heading || '',
      intro: item.description || '',
      badge: item.badge || '',
      title: item.title || '',
      text: item.text || '',
      linkLabel: item.link_label || '',
      url: item.link?.url || '',
    };
  });
  return byCategory;
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
    fetchInsightsPage(),
    getBlogResources(),
  ]);
  // Dedicated field group scoped to this page only (like qbotica_partners_sections
  // is scoped to the qbotica-partners page) - not the shared sitewide "layouts" field.
  const layouts = page?.acf?.insights_news_sections || [];

  return {
    hero: getHero(layouts),
    stats: getCategoryStats(layouts),
    featured: getFeatured(layouts),
    newsletter: getNewsletter(layouts),
    resources: [
      ...getNewsroomResources(layouts),
      ...getMediaResources(layouts),
      ...blog,
    ],
  };
}
