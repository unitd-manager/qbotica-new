'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ResourceGrid.module.css';
import BlogTabs from './BlogTabs';
import Pagination from './Pagination';

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
  const sectionRef = useRef(null);

  // Numbered pages instead of "Load more" - matches the /blog page. Resets
  // to page 1 whenever the filter/search changes so you're not left on a
  // now out-of-range page.
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [current, query, blogSub]);

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

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function goToPage(next) {
    setPage(next);
    sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  return (
    <section className={styles.latest} id="latest" ref={sectionRef}>
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
              {pageItems.map((r, i) => {
                const Wrapper = r.url ? 'a' : 'article';
                const linkProps = r.url
                  ? { href: r.url, ...(r.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                  : {};
                return (
                  <Wrapper className={styles.card} key={`${r.category}-${r.title}-${i}`} {...linkProps}>
                    <div className={`${styles.thumb} ${current=== 'blog' ? styles.thumbSquare : ''} ${r.image ? '' : styles[r.thumb]}`}>
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

            <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={goToPage} />
          </>
        ) : (
          <div className={styles.empty}>No resources match your current search.</div>
        )}
      </div>
    </section>
  );
}
