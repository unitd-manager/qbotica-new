'use client';

import styles from './ResourceGrid.module.css';
import { RESOURCES } from '../_data/resources';

function badgeClassName(mod) {
  return `${styles.badge} ${mod ? styles[mod] : ''}`;
}

export default function ResourceGrid({ current, query, blogSub = 'all' }) {
  const q = query.trim().toLowerCase();

  const visible = RESOURCES.filter((r) => {
    const categoryMatch = current === 'all' || r.category === current;
    // when Blog is active, also honor the selected industry sub-tab
    const subMatch = current !== 'blog' || blogSub === 'all' || r.subcategory === blogSub;
    const haystack = `${r.search} ${r.title} ${r.desc}`.toLowerCase();
    const searchMatch = !q || haystack.includes(q);
    return categoryMatch && subMatch && searchMatch;
  });

  // In "All", an article that belongs to two categories (e.g. the Deloitte
  // Fast 500 piece is both Press Release/Leadership and Blog/Newsroom) would
  // otherwise appear twice — de-duplicate by URL (fallback title).
  const items =
    current === 'all'
      ? visible.filter((r, i, arr) => arr.findIndex((x) => x.title === r.title) === i)
      : visible;

  return (
    <section className={styles.latest} id="latest">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Browse the hub</div>
            <h2>Latest resources</h2>
          </div>
          <p>Four clear categories keep the experience simple, while primary labels give each card enough context to scan quickly.</p>
        </div>

        {items.length > 0 ? (
          <div className={styles.grid}>
            {items.map((r, i) => {
              const Wrapper = r.url ? 'a' : 'article';
              const linkProps = r.url
                ? { href: r.url, ...(r.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                : {};
              return (
                <Wrapper className={styles.card} key={i} {...linkProps}>
                  <div className={`${styles.thumb} ${r.image ? '' : styles[r.thumb]}`}>
                    {r.image ? (
                      <img className={styles.photo} src={r.image} alt={r.title} />
                    ) : (
                      <>
                        <span className={`${styles.shape} ${styles.one}`} />
                        <span className={`${styles.shape} ${styles.two}`} />
                      </>
                    )}
                    {r.play && <span className={styles.play}>▶</span>}
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.contentType}>{r.type}</div>
                    <span className={badgeClassName(r.badgeClass)}>{r.badge}</span>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                    <div className={styles.cardFooter}>
                      <span>{r.meta}</span>
                      <span className={styles.read}>{r.action}</span>
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>No resources match your current search.</div>
        )}
      </div>
    </section>
  );
}
