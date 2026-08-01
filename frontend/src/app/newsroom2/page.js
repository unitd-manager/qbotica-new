import theme from './theme.module.css';
import Topbar from './_components/Topbar';
import Hero from './_components/Hero';
import CategoryStats from './_components/CategoryStats';
import Hub from './_components/Hub';
import Newsletter from './_components/Newsletter';
import { fetchNewsroomPageData } from '@/lib/newsroom';

export const metadata = {
  title: 'Insights & News | qBotica',
  description:
    'qBotica press releases, industry recognition, expert blog content and media, all in one connected destination.',
};

export const revalidate = 30;

/*
 * Insights & News - custom post type version.
 *
 * Cards come from the "insights" CPT plus regular blog posts; the page's own
 * ACF layouts still supply the hero, stats, featured headings and newsletter
 * copy. See src/lib/newsroom.js.
 */
export default async function Newsroom2Page() {
  const { hero, stats, featured, newsletter, resources } = await fetchNewsroomPageData();

  return (
    <div className={theme.insightsNews}>
      <Topbar />
      <Hero hero={hero} />
      <CategoryStats stats={stats} />
      <Hub resources={resources} featured={featured} />
      <Newsletter newsletter={newsletter} />
    </div>
  );
}
