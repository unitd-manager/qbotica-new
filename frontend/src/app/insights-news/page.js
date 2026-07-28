import theme from './theme.module.css';
import Topbar from './_components/Topbar';
import Hero from './_components/Hero';
import CategoryStats from './_components/CategoryStats';
import Hub from './_components/Hub';
import Newsletter from './_components/Newsletter';
import { fetchInsightsResources } from '@/lib/insights';

export const metadata = {
  title: 'Insights & News | qBotica',
  description:
    'qBotica press releases, industry recognition, expert blog content and media — all in one connected destination.',
};

export const revalidate = 180;

/*
 * Insights & News — combined Newsroom + Blog + Media hub.
 * Content is fetched server-side from WordPress (see src/lib/insights.js)
 * and passed down into <Hub/>, which owns the client-side filter/search state.
 */
export default async function InsightsNewsPage() {
  const resources = await fetchInsightsResources();

  return (
    <div className={theme.insightsNews}>
      <Topbar />
      <Hero />
      <CategoryStats />
      <Hub resources={resources} />
      <Newsletter />
    </div>
  );
}