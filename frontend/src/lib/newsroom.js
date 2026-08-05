import { fetchPosts, fetchCategories } from './wordpress';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || process.env.WP_API_URL;
const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || process.env.WP_URL || '').replace(/\/$/, '');

/*
 * ACF's "link to existing content" picker fills in the WordPress admin domain
 * (qbadevadmin...), which serves the raw WP theme rather than this frontend.
 * Rewriting those to a relative path keeps the visitor on the Next.js site;
 * genuinely external links (YouTube, Vimeo, partner sites) pass through.
 */
function toSiteRelative(url) {
  if (!url) return url;
  if (WP_URL && url.startsWith(WP_URL)) {
    const path = url.slice(WP_URL.length).replace(/\/$/, '');
    return path || '/';
  }
  return url;
}

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

/*
 * ACF's date picker can hand back either "20260609" or "2026-06-09" depending
 * on the field's return format, and neither parses reliably through the Date
 * constructor - so normalise to ISO before anything else touches it.
 */
function parseAcfDate(value) {
  if (!value) return null;
  const raw = String(value).trim();
  const compact = raw.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (compact) return `${compact[1]}-${compact[2]}-${compact[3]}`;
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return raw;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

// Card dates: year alone for press / recognition / media, MM/YYYY for blog.
const yearOf = (date) => (date ? String(new Date(date).getFullYear()) : '');
const monthYearOf = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};

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

// ---------------------------------------------------------------------------
// Video thumbnails
//
// Media items point at YouTube or Vimeo, and both already host a still of the
// video - so editors shouldn't have to upload one by hand. YouTube's is a
// predictable URL; Vimeo needs a quick oEmbed lookup.
// ---------------------------------------------------------------------------

function youTubeId(url) {
  const match =
    url.match(/[?&]v=([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : null;
}

async function vimeoThumbnail(url) {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}&width=1280`,
      { next: { revalidate: 86400 } } // stills never change; cache for a day
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.thumbnail_url || null;
  } catch {
    return null;
  }
}

async function videoThumbnail(url) {
  if (!url) return null;

  const yt = youTubeId(url);
  if (yt) return `https://img.youtube.com/vi/${yt}/maxresdefault.jpg`;

  if (/vimeo\.com/.test(url)) return vimeoThumbnail(url);

  return null;
}

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

  // Featured image first, ACF image field as a fallback. Media items with
  // neither fall back to the video's own still - see resolveVideoThumbnails.
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
  const url = toSiteRelative(
    (typeof acf.link === 'string' ? acf.link : acf.link?.url) || post.link || '#'
  );

  // The date the announcement actually went out, which is rarely the day it was
  // typed into WordPress. Falls back to the WP publish date when unset.
  const date = parseAcfDate(acf.published_date) || post.date || null;

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
    meta: yearOf(date),
    action: category === 'media' ? 'Watch →' : 'Read →',
    url,
    date,
    search: `${title} ${badge} ${desc}`.toLowerCase(),
  };
}

// Media cards without an uploaded image borrow the still from YouTube/Vimeo.
async function resolveVideoThumbnails(items) {
  return Promise.all(
    items.map(async (item) => {
      if (item.category !== 'media' || item.image) return item;
      const image = await videoThumbnail(item.url);
      return image ? { ...item, image } : item;
    })
  );
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
    if (!Array.isArray(posts)) return [];
    return resolveVideoThumbnails(posts.map(normalizeInsightPost));
  } catch (error) {
    console.error('Error fetching insights posts:', error.message);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Blog - unchanged, still regular WordPress posts
// ---------------------------------------------------------------------------

// Categories that shouldn't become a sub-tab of their own. "Uncategorized"
// posts still appear under "All Posts", they just don't get a tab.
const HIDDEN_CATEGORY_SLUGS = new Set(['uncategorized']);

/*
 * Sub-tabs are built from WordPress itself, so adding a category in the admin
 * adds a tab here - nothing to change in code. A post's `subcats` are its raw
 * category slugs, which is what the tab ids match on.
 *
 * Which categories get a tab is decided by the posts actually fetched, not by
 * the category's `count`: WordPress term counts go stale (news-room reports 4
 * with zero posts behind it), which would leave a tab that opens onto nothing.
 */
function getBlogTabs(categories, posts) {
  const inUse = new Set(posts.flatMap((p) => p.subcats || []));
  return [
    { id: 'all', label: 'All Posts' },
    ...categories
      .filter((c) => !HIDDEN_CATEGORY_SLUGS.has(c.slug) && inUse.has(c.slug))
      .map((c) => ({ id: c.slug, label: stripHtml(c.name) })),
  ];
}

function normalizeBlogPost(post, index) {
  const terms = post._embedded?.['wp:term']?.[0] || [];
  const subcats = terms.map((t) => t.slug);
  const visible = terms.filter((t) => !HIDDEN_CATEGORY_SLUGS.has(t.slug));
  // Prefer an industry category over the generic "blog" one for the badge.
  const primary = visible.find((t) => t.slug !== 'blog') || visible[0];
  const title = stripHtml(post.title?.rendered);
  const desc = stripHtml(post.excerpt?.rendered).slice(0, 180);

  return {
    category: 'blog',
    type: 'Blog',
    badgeClass: 'blog',
    badge: primary ? stripHtml(primary.name) : 'Blog',
    thumb: THUMBS[index % THUMBS.length],
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    title,
    desc,
    meta: monthYearOf(post.date),
    action: 'Read →',
    url: `/blog/${post.slug}`,
    date: post.date || null,
    search: `${title} ${desc}`.toLowerCase(),
    subcats,
  };
}

/*
 * Every post, not just the categorised ones - "All Posts" should match what
 * /blog shows. WordPress caps per_page at 100, so walk two pages.
 */
async function getBlogResources() {
  const pages = await Promise.all(
    [1, 2].map((page) => fetchPosts({ per_page: 100, page }))
  );
  return pages.flat().map(normalizeBlogPost);
}

// ---------------------------------------------------------------------------
// Page-level copy, from the "newsroom2" page's ACF layouts
// ---------------------------------------------------------------------------

// The WP page that carries this route's hero / stats / featured / newsletter
// copy. It does not have to match the Next.js route name.
const PAGE_SLUG = 'newsroomnew';

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
    // The field was set up as "title" in ACF; accept "heading" too.
    heading: section.title || section.heading || '',
    description: section.description || '',
  };
}

// ---------------------------------------------------------------------------
// Combined fetch
// ---------------------------------------------------------------------------

export async function fetchNewsroomPageData() {
  const [page, insights, blog, categories] = await Promise.all([
    fetchInsightsPage(),
    getInsightPosts(),
    getBlogResources(),
    fetchCategories(),
  ]);
  const layouts = page?.acf?.insights_news_sections || [];

  // Newest first across every source, so both the grid and the Featured panel
  // (which takes the top item of the active tab) really do show the latest -
  // otherwise "All" would just lead with whichever list happened to be first.
  const resources = [...insights, ...blog].sort(
    (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
  );

  return {
    hero: getHero(layouts),
    stats: getCategoryStats(layouts),
    featured: getFeatured(layouts),
    newsletter: getNewsletter(layouts),
    blogTabs: getBlogTabs(categories, blog),
    resources,
  };
}
