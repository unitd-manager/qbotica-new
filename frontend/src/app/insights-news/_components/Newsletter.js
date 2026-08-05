'use client';

import styles from './Newsletter.module.css';

const DEFAULT = {
  heading: 'Stay ahead of what’s next.',
  description: 'Receive qBotica’s latest press releases, recognition, blog articles and media updates in one useful email.',
};

// `newsletter` comes from the WP page "insights-news" -> ACF layout "insights_newsletter"
// (see src/lib/insight.js). Falls back to the copy above until that's filled in.
export default function Newsletter({ newsletter }) {
  const heading = newsletter?.heading || DEFAULT.heading;
  const description = newsletter?.description || DEFAULT.description;

  return (
    <section className={styles.newsletter} id="newsletter">
      <div className={styles.newsletterInner}>
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: heading }} />
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <form
          className={styles.emailForm}
          onSubmit={(e) => { e.preventDefault(); alert('Prototype only — subscription form submitted.'); }}
        >
          <input type="email" required placeholder="Business email address" />
          <button className={`${styles.btn} ${styles.btnOrange}`}>Subscribe</button>
        </form>
      </div>
    </section>
  );
}
