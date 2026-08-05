import theme from './theme.module.css';
import Topbar from './_components/Topbar';
import Hero from './_components/Hero';
import CategoryStats from './_components/CategoryStats';
import Hub from './_components/Hub';
import Newsletter from './_components/Newsletter';
import UpcomingEventPopup from '@/components/Layout/UpcomingEventPopup';

export const metadata = {
  title: 'Insights & News | qBotica',
  description:
    'qBotica press releases, industry recognition, expert blog content and media — all in one connected destination.',
};

/*
 * Insights & News — combined Newsroom + Blog + Media hub.
 * Each section is its own component under _components/ so the team can work
 * on them independently. Content lives in _data/. The interactive filtering
 * (FilterBar + Featured + ResourceGrid) is grouped inside <Hub/>.
 */
export default function InsightsNewsPage() {
  return (
    <div className={theme.insightsNews}>
      <Topbar />
      <Hero />
      <CategoryStats />
      <Hub />
      <Newsletter />
      {/* Same floating event card as the new-home-static page. */}
      <UpcomingEventPopup />
    </div>
  );
}
