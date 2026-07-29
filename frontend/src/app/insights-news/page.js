import theme from './theme.module.css';
import Topbar from './_components/Topbar';
import Hero from './_components/Hero';
import CategoryStats from './_components/CategoryStats';
import Hub from './_components/Hub';
import Newsletter from './_components/Newsletter';
import { fetchInsightsPageData } from '@/lib/insight';

export const metadata = {
  title: 'Insights & News | qBotica',
  description:
    'qBotica press releases, industry recognition, expert blog content and media, all in one connected destination.',
};

export const revalidate = 180;

/*
 * Insights & News — combined Newsroom + Blog + Media hub.
 * Content is fetched server-side from WordPress (see src/lib/insight.js)
 * and passed down into Hero/CategoryStats/Hub, which own their own client-side state.
 */
export default async function InsightsNewsPage() {
  const { hero, stats, newsletter, resources } = await fetchInsightsPageData();

  return (
    <div className={theme.insightsNews}>
      <Topbar />
      <Hero hero={hero} />
      <CategoryStats stats={stats} />
      <Hub resources={resources} />
      <Newsletter newsletter={newsletter} />
    </div>
  );
}