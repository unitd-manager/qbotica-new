'use client';

import styles from './Newsletter.module.css';

export default function Newsletter() {
  return (
    <section className={styles.newsletter} id="newsletter">
      <div className={styles.newsletterInner}>
        <div>
          <h2>Stay ahead of what’s next.</h2>
          <p>Receive qBotica’s latest press releases, recognition, blog articles and media updates in one useful email.</p>
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
