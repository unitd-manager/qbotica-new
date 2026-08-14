import theme from './theme.module.css';
import Topbar from './_components/Topbar';
import Hero from './_components/Hero';
import CategoryStats from './_components/CategoryStats';
import Hub from './_components/Hub';
import Newsletter from './_components/Newsletter';
import { fetchNewsroomPageData } from '@/lib/newsroom';
import { generatePageMetadatas } from '@/lib/rankmath-utils';

// Title/description are driven by the "Newsroom" WP page itself (via Rank
// Math), same as every other WP-backed route - the strings below are only
// the fallback if that page or Rank Math is unreachable.
export async function generateMetadata() {
  return generatePageMetadatas('newsroom', 'page', '', {
    title: 'Insights & News | qBotica',
    description:
      'qBotica press releases, industry recognition, expert blog content and media, all in one connected destination.',
  });
}

export const revalidate = 30;

/*
 * Insights & News - custom post type version.
 *
 * Cards come from the "insights" CPT plus regular blog posts; the page's own
 * ACF layouts still supply the hero, stats, featured headings and newsletter
 * copy. See src/lib/newsroom.js.
 */
export default async function NewsroomPage() {
  const { hero, stats, featured, newsletter, blogTabs, resources } = await fetchNewsroomPageData();

  return (
    <div className={theme.insightsNews}>
      <Topbar />
      <Hero hero={hero} />
      <CategoryStats stats={stats} />
      <Hub resources={resources} featured={featured} blogTabs={blogTabs} />
      <Newsletter newsletter={newsletter} />
    </div>
  );
}
