import Link from 'next/link';
import styles from './style.module.css';

const FEATURED_STORIES = [
  {
    category: 'Press Release',
    date: 'Jul 08, 2025',
    title: 'qBotica Recognized in Gartner® Market Guide for AI Innovation',
    description: 'Learn how qBotica continues to shape enterprise AI innovation and leadership.',
    href: '/newsroom/qbotica-recognized-gartner-market-guide',
    variant: 'dark',
  },
  {
    category: 'Event',
    date: 'Jul 05, 2025',
    title: 'qBotica at AI Expo 2025 London',
    description: 'See how our team is presenting next-gen automation solutions to global enterprises.',
    href: '/newsroom/ai-expo-2025-london',
    variant: 'black',
  },
  {
    category: 'Blog',
    date: 'Jul 03, 2025',
    title: 'The Future of Intelligent Automation: Trends to Watch',
    description: 'A deep dive into the technology shifts that will guide enterprise transformation.',
    href: '/newsroom/future-of-intelligent-automation',
    variant: 'orange',
  },
  {
    category: 'Award',
    date: 'Jul 01, 2025',
    title: 'qBotica Wins AI Excellence Award 2025',
    description: 'Celebrating our commitment to practical AI solutions and measurable business impact.',
    href: '/newsroom/ai-excellence-award-2025',
    variant: 'midnight',
  },
  {
    category: 'Partnership',
    date: 'Jun 28, 2025',
    title: 'qBotica Partners with Microsoft for AI Innovation',
    description: 'Discover how this strategic collaboration accelerates AI transformation for customers.',
    href: '/newsroom/partnership-with-microsoft',
    variant: 'ruby',
  },
  {
    category: 'Press Release',
    date: 'Jun 25, 2025',
    title: 'qBotica Raises $10M to Accelerate Global Expansion',
    description: 'Funding fuels our next phase of growth across enterprise automation markets.',
    href: '/newsroom/qbotica-raises-10m',
    variant: 'dark',
  },
];

const LATEST_NEWS = [
  { title: 'qBotica Unveils AI-Powered Document Intelligence', date: 'Jun 22, 2025' },
  { title: '5 Ways AI Is Transforming Business Operations', date: 'Jun 12, 2025' },
  { title: 'Customer Spotlight: Success with qBotica', date: 'Jun 02, 2025' },
  { title: 'How qBotica Helps Enterprises Scale with AI', date: 'Jun 20, 2025' },
  { title: 'qBotica Expands Presence in North America', date: 'Jun 10, 2025' },
  { title: 'qBotica at FutureTech Summit 2025', date: 'May 30, 2025' },
  { title: 'qBotica Appoints New CTO to Drive Innovation', date: 'Jun 18, 2025' },
  { title: 'qBotica AI Platform Now Available on Azure', date: 'Jun 08, 2025' },
  { title: 'Building Responsible AI for a Better Tomorrow', date: 'May 28, 2025' },
  { title: 'qBotica Named in Top 50 AI Companies 2025', date: 'May 25, 2025' },
];

export default function NewsroomPage() {
  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>NEWSROOM</span>
          <h1 className={styles.heroTitle}>Latest from qBotica Media & Insights</h1>
          <p className={styles.heroDescription}>
            Stay updated with our latest announcements, press releases, insights, and stories.
          </p>
          <div className={styles.heroActions}>
            <Link href="/newsroom/media-kit" className={styles.primaryButton}>
              Media Kit
            </Link>
            <Link href="/newsroom" className={styles.secondaryButton}>
              Explore All News
            </Link>
          </div>
        </div>

        <div className={styles.heroCardWrapper}>
          <div className={styles.heroCard}>
            <div className={styles.heroCardMeta}>
              <span className={styles.cardTag}>Press Release</span>
              <span className={styles.cardDate}>Jul 12, 2025</span>
            </div>
            <h2 className={styles.heroCardTitle}>qBotica Launches Next-Gen AI Platform for Enterprise Automation</h2>
            <p className={styles.heroCardText}>
              Read how our newest platform helps enterprises automate, integrate, and scale with AI-powered workflows.
            </p>
            <Link href="/newsroom/next-gen-ai-platform" className={styles.cardLink}>
              Read More
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.featuredHeading}>Featured Stories</h2>
          <div className={styles.filterPills}>
            <button type="button" className={`${styles.pill} ${styles.activePill}`}>All</button>
            <button type="button" className={styles.pill}>Press Releases</button>
            <button type="button" className={styles.pill}>Events</button>
            <button type="button" className={styles.pill}>Blogs</button>
            <button type="button" className={styles.pill}>Awards</button>
            <button type="button" className={styles.pill}>Partnerships</button>
          </div>
        </div>

        <div className={styles.featuredGrid}>
          {FEATURED_STORIES.map((story, index) => (
            <article key={story.title} className={`${styles.storyCard} ${styles[`${story.variant}Card`]}`}>
              <div className={styles.storyHeader}>
                <span className={styles.storyCategory}>{story.category}</span>
                <span className={styles.storyDate}>{story.date}</span>
              </div>
              <h3 className={styles.storyTitle}>{story.title}</h3>
              <p className={styles.storyText}>{story.description}</p>
              <Link href={story.href} className={styles.storyLink}>
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.latestSection}>
        <div className={styles.latestHeader}>
          <h2>Latest News</h2>
          <Link href="/newsroom" className={styles.viewAllLink}>
            View All News
          </Link>
        </div>

        <div className={styles.latestGrid}>
          {LATEST_NEWS.map((item) => (
            <article key={item.title} className={styles.latestCard}>
              <div className={styles.latestThumb} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.date}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.newsletterSection}>
        <div className={styles.newsletterInner}>
          <div>
            <p className={styles.newsletterLabel}>Stay Ahead with qBotica</p>
            <h2 className={styles.newsletterTitle}>Subscribe to Our Newsletter</h2>
            <p className={styles.newsletterText}>
              Get the latest news, insights, and updates straight to your inbox.
            </p>
          </div>
          <form className={styles.newsletterForm} action="#" method="post">
            <label className={styles.visuallyHidden} htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
