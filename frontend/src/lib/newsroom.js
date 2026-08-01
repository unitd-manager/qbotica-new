import { fetchPosts, fetchCategoryBySlug } from './wordpress';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || process.env.WP_API_URL;

/*
 * Data layer for /newsroom2.
 *
 * Press Release / Recognition / Media each live as their own WordPress post in
 * the "insights" custom post type, tagged with the "insight-type" taxonomy -
 * so the admin gets list view, search and pagination instead of one giant ACF
 * repeater. Blog keeps coming from regular posts, as it already did.
 *
 * Page-level copy (hero, category stats, featured headings, newsletter) still
 * lives on the "insights-news" page's ACF layouts, since those are single
 * blocks of content rather than growing lists.
 */

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const decodeHtmlEntities = (value = '') =>
  String(value)
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp|#8211|#8212);/gi, (_, entity) => ({
      amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    }[entity.toLowerCase()] || _));

const stripHtml = (html = '') => decodeHtmlEntities(String(html).replace(/<[^>]*>/g, '')).trim();

const THUMBS = ['t1', 't2', 't3', 't4', 't5', 't6'];

function findLayout(layouts, layoutType) {
  return layouts.find((l) => l.acf_fc_layout === layoutType);
}

// ---------------------------------------------------------------------------
// Insights custom post type
// Endpoint: /wp/v2/insights   Taxonomy: insight-type
// ---------------------------------------------------------------------------

// Taxonomy term slug -> the filter tab id used by FilterBar.
const TYPE_SLUG_TO_CATEGORY = {
  'press-release': 'press',
  press: 'press',
  recognition: 'recognition',
  media: 'media',
};

const CATEGORY_LABEL = {
  press: 'Press Release',
  recognition: 'Recognition',
  media: 'Media',
};

function insightCategory(post) {
  const terms = (post._embedded?.['wp:term'] || []).flat();
  for (const term of terms) {
    const match = TYPE_SLUG_TO_CATEGORY[term.slug];
    if (match) return match;
  }
  return 'press';
}

function normalizeInsightPost(post, index) {
  const acf = post.acf || {};
  const category = insightCategory(post);
  const title = stripHtml(post.title?.rendered);

  // Featured image first, ACF image field as a fallback.
  const image =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    acf.image?.url ||
    acf.thumbnail?.url ||
    null;

  const desc = stripHtml(acf.description || post.excerpt?.rendered || '');
  const badge = stripHtml(acf.badge || '') || CATEGORY_LABEL[category];
  // One link field covers every type - an article URL for press/recognition,
  // a YouTube or Vimeo URL for media. ACF returns an object for a Link field
  // and a plain string for a Text field, so accept either.
  const url =
    (typeof acf.link === 'string' ? acf.link : acf.link?.url) || post.link || '#';

  return {
    category,
    type: CATEGORY_LABEL[category],
    badge,
    badgeClass: category === 'recognition' ? 'gold' : category === 'media' ? 'media' : '',
    play: category === 'media',
    thumb: THUMBS[index % THUMBS.length],
    image,
    title,
    desc,
    meta: category === 'media' ? 'Watch' : '',
    action: category === 'media' ? 'Watch →' : 'Read →',
    url,
    search: `${title} ${badge} ${desc}`.toLowerCase(),
  };
}

async function getInsightPosts() {
  try {
    const res = await fetch(
      `${WP_API_URL}/wp/v2/insight?per_page=100&status=publish&_embed`,
      {
        next: { revalidate: 30, tags: ['insights'] },
        headers: { Accept: 'application/json', 'Accept-Encoding': 'gzip' },
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const posts = await res.json();
    return Array.isArray(posts) ? posts.map(normalizeInsightPost) : [];
  } catch (error) {
    console.error('Error fetching insights posts:', error.message);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Blog - unchanged, still regular WordPress posts
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
// Page-level copy, from the "newsroom2" page's ACF layouts
// ---------------------------------------------------------------------------

const PAGE_SLUG = 'newsroom2';

async function fetchInsightsPage() {
  try {
    const res = await fetch(
      `${WP_API_URL}/wp/v2/pages?slug=${PAGE_SLUG}&status=publish`,
      {
        next: { revalidate: 30, tags: [`page-${PAGE_SLUG}`] },
        headers: { Accept: 'application/json', 'Accept-Encoding': 'gzip' },
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching ${PAGE_SLUG} page:`, error.message);
    return null;
  }
}

function getHero(layouts) {
  const hero = findLayout(layouts, 'insights_hero');
  if (!hero) return null;
  return {
    eyebrow: hero.eyebrow || '',
    title: hero.title || '',
    description: hero.description || '',
  };
}

function getCategoryStats(layouts) {
  const stats = findLayout(layouts, 'insights_category_stats')?.stats || [];
  return stats.map((s) => ({ name: s.title, desc: s.description }));
}

function getFeatured(layouts) {
  const items = findLayout(layouts, 'insights_featured')?.items || [];
  const byCategory = {};
  items.forEach((item) => {
    byCategory[item.category || 'all'] = {
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

function getNewsletter(layouts) {
  const section = findLayout(layouts, 'insights_newsletter');
  if (!section) return null;
  return {
    heading: section.heading || '',
    description: section.description || '',
  };
}

// ---------------------------------------------------------------------------
// Combined fetch
// ---------------------------------------------------------------------------

export async function fetchNewsroomPageData() {
  const [page, insights, blog] = await Promise.all([
    fetchInsightsPage(),
    getInsightPosts(),
    getBlogResources(),
  ]);
  const layouts = page?.acf?.insights_news_sections || [];

  return {
    hero: getHero(layouts),
    stats: getCategoryStats(layouts),
    featured: getFeatured(layouts),
    newsletter: getNewsletter(layouts),
    resources: [...insights, ...blog],
  };
}
