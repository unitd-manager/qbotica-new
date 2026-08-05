import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.eyebrow}>qBotica Resource Hub</div>
        <h1>News, ideas and stories shaping enterprise AI.</h1>
        <p>
          Explore qBotica press releases, industry recognition, expert blog content, videos,
          webinars and interviews—all in one connected destination.
        </p>
      </div>
    </section>
  );
}
