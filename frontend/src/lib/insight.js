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

// ---------------------------------------------------------------------------
// Press Release + Recognition
// Source: WP page "newsroom" -> ACF layout "use_cases_grid" -> repeater "use_case_items"
// ---------------------------------------------------------------------------

// Until items are tagged with a `newsroom_category` ACF field in WP admin,
// classify by keyword so the page still renders sensibly.
const RECOGNITION_KEYWORDS = /recognized|named|ranked|nominated|wins|winner|award|debut|diamond partner|fast track|fast 500|titan 100|gartner|everest|peak matrix/i;

function classifyNewsroomItem(item) {
  const explicit = (item.newsroom_category || '').toLowerCase();
  if (explicit === 'recognition') return 'recognition';
  if (explicit === 'press' || explicit === 'press release') return 'press';
  return RECOGNITION_KEYWORDS.test(item.title || '') ? 'recognition' : 'press';
}

function normalizeNewsroomItem(item, index) {
  const category = classifyNewsroomItem(item);
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
    action: item.button?.title || 'Read →',
    url: item.button?.url || '#',
    search: title.toLowerCase(),
  };
}

export async function getNewsroomResources() {
  const page = await fetchPageBySlug('newsroom');
  const layouts = page?.acf?.layouts || [];
  const grid = layouts.find((l) => l.layout_type === 'use_cases_grid')?.use_cases_grid;
  const items = grid?.use_case_items || [];
  return items.map(normalizeNewsroomItem);
}

// ---------------------------------------------------------------------------
// Media
// Source: WP page "media-and-videos" -> ACF layout "featured_webinars_media" -> repeater "media_cards"
// ---------------------------------------------------------------------------

function normalizeMediaItem(item, index) {
  const title = stripHtml(item.title);
  return {
    category: 'media',
    type: 'Media',
    badgeClass: 'media',
    play: true,
    badge: item.category__tag || 'Media',
    thumb: THUMBS[index % THUMBS.length],
    image: item.video_thumbnail?.url || null,
    title,
    desc: stripHtml(item.description || ''),
    meta: 'Watch',
    action: item.cta_button?.title || 'Watch →',
    url: item.cta_button?.url || item.video_link?.url || '#',
    search: `${title} ${item.category__tag || ''}`.toLowerCase(),
  };
}

export async function getMediaResources() {
  const page = await fetchPageBySlug('media-and-videos');
  const layouts = page?.acf?.layouts || [];
  const section = layouts.find((l) => l.layout_type === 'featured_webinars_media')?.featured_webinars_media;
  const items = section?.media_cards || [];
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

export async function getBlogResources() {
  const category = await fetchCategoryBySlug('blog');
  if (!category) return [];
  const posts = await fetchPosts({ categories: [category.id], per_page: 60 });
  return posts.map(normalizeBlogPost);
}

// ---------------------------------------------------------------------------
// Combined fetch for the insights-news page
// ---------------------------------------------------------------------------

export async function fetchInsightsResources() {
  const [newsroom, media, blog] = await Promise.all([
    getNewsroomResources(),
    getMediaResources(),
    getBlogResources(),
  ]);
  return [...newsroom, ...media, ...blog];
}