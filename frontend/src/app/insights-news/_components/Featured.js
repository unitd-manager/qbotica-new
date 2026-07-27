'use client';

import styles from './Featured.module.css';
import { FEATURED } from '../_data/featured';

export default function Featured({ current }) {
  const f = FEATURED[current] || FEATURED.all;
  const mainClass = `${styles.featureMain} ${f.className ? styles[f.className] : ''}`;
  const badgeClass = `${styles.badge} ${f.badgeClass ? styles[f.badgeClass] : ''}`;

  return (
    <section className={styles.section} id="featured">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Featured</div>
            <h2>{f.heading}</h2>
          </div>
          <p>{f.intro}</p>
        </div>

        <article className={mainClass}>
          <div className={styles.featureContent}>
            <span className={badgeClass}>{f.badge}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <a
              className={`${styles.btn} ${styles.btnWhite}`}
              href={f.url || '#latest'}
              {...(f.url && f.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {f.link}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
