'use client';

import { useEffect, useState } from 'react';
import styles from './ResourceGrid.module.css';
import BlogTabs from './BlogTabs';

const PAGE_SIZE = 12;

function badgeClassName(mod) {
  return `${styles.badge} ${mod ? styles[mod] : ''}`;
}

export default function ResourceGrid({
  current,
  query,
  blogSub = 'all',
  onSelectSub,
  blogTabs = [],
  resources = [],
}) {
  const q = query.trim().toLowerCase();

  // Only render a page of cards at a time - the hub can hold 100+ items once
  // every category is filled in, and rendering them all at once (each with its
  // own image) makes the first paint noticeably slower.
  const [shown, setShown] = useState(PAGE_SIZE);
  useEffect(() => setShown(PAGE_SIZE), [current, query, blogSub]);

  const visible = resources.filter((r) => {
    const categoryMatch = current === 'all' || r.category === current;
    // when Blog is active, also honor the selected industry sub-tab
    const subMatch =
      current !== 'blog' || blogSub === 'all' || (r.subcats || []).includes(blogSub);
    const haystack = `${r.search} ${r.title} ${r.desc}`.toLowerCase();
    const searchMatch = !q || haystack.includes(q);
    return categoryMatch && subMatch && searchMatch;
  });

  // In "All", an article that belongs to two categories would otherwise
  // appear twice — de-duplicate by title.
  const items =
    current === 'all'
      ? visible.filter((r, i, arr) => arr.findIndex((x) => x.title === r.title) === i)
      : visible;

  const page = items.slice(0, shown);
  const remaining = items.length - page.length;

  return (
    <section className={styles.latest} id="latest">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Browse the hub</div>
            <h2>Latest resources</h2>
          </div>
        </div>

        {/* Blog is the one category with a second level of filtering. */}
        {current === 'blog' && (
          <BlogTabs active={blogSub} onSelect={onSelectSub} tabs={blogTabs} />
        )}

        {items.length > 0 ? (
          <>
            <div className={styles.grid}>
              {page.map((r, i) => {
                const Wrapper = r.url ? 'a' : 'article';
                const linkProps = r.url
                  ? { href: r.url, ...(r.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                  : {};
                return (
                  <Wrapper className={styles.card} key={`${r.category}-${r.title}-${i}`} {...linkProps}>
                    <div className={`${styles.thumb} ${r.image ? '' : styles[r.thumb]}`}>
                      {r.image ? (
                        <img className={styles.photo} src={r.image} alt={r.title} loading="lazy" decoding="async" />
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

            {remaining > 0 && (
              <div className={styles.loadMoreWrap}>
                <button className={styles.loadMore} onClick={() => setShown((n) => n + PAGE_SIZE)}>
                  Load more ({remaining})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.empty}>No resources match your current search.</div>
        )}
      </div>
    </section>
  );
}
