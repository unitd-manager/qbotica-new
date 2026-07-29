import styles from './Hero.module.css';

const DEFAULT = {
  eyebrow: 'qBotica Resource Hub',
  title: 'News, ideas and stories shaping enterprise AI.',
  description:
    'Explore qBotica press releases, industry recognition, expert blog content, videos, webinars and interviews—all in one connected destination.',
};

// `hero` comes from the WP page "insights-news" -> ACF layout "banner_layout"
// (see src/lib/insight.js). Falls back to the copy above until that's filled in.
export default function Hero({ hero }) {
  const eyebrow = hero?.eyebrow || DEFAULT.eyebrow;
  const title = hero?.title || DEFAULT.title;
  const description = hero?.description || DEFAULT.description;

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.eyebrow} dangerouslySetInnerHTML={{ __html: eyebrow }} />
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </section>
  );
}
