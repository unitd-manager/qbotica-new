'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './MediaGrid.module.css';
import Pagination from './Pagination';

const PAGE_SIZE = 9;

function PlayIcon() {
  return (
    <span className={styles.play} aria-hidden="true">
      <svg viewBox="0 0 60 60" width="58" height="58" fill="none">
        <circle cx="30" cy="30" r="28" stroke="#fff" strokeWidth="3" />
        <path d="M24 18.5 44 30 24 41.5V18.5Z" fill="#fff" />
      </svg>
    </span>
  );
}

/*
 * Media gets its own card treatment - dark tile, thumbnail with a play overlay
 * and a "Watch here" call to action - matching the existing media & videos
 * page, rather than the light cards the other tabs use.
 */
export default function MediaGrid({ query, resources = [] }) {
  const q = (query || '').trim().toLowerCase();
  const sectionRef = useRef(null);

  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [query]);

  const items = resources.filter((r) => {
    if (r.category !== 'media') return false;
    const haystack = `${r.search} ${r.title} ${r.desc}`.toLowerCase();
    return !q || haystack.includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function goToPage(next) {
    setPage(next);
    sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  return (
    <section className={styles.section} id="latest" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Browse the hub</div>
            <h2>Videos, webinars &amp; interviews</h2>
          </div>
          <p>Customer stories, product demos and on-demand conversations with qBotica leaders.</p>
        </div>

        {items.length > 0 ? (
          <>
            <div className={styles.grid}>
              {pageItems.map((m, i) => {
                const external = m.url && m.url.startsWith('http');
                const linkProps = {
                  href: m.url || '#',
                  ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                };
                return (
                  <article className={styles.card} key={`${m.title}-${i}`}>
                    <a className={styles.thumbLink} {...linkProps} aria-label={m.title}>
                      <div className={`${styles.thumb} ${m.image ? '' : styles[m.thumb]}`}>
                        {m.image && (
                          <img
                            className={styles.photo}
                            src={m.image}
                            alt={m.title}
                            loading="lazy"
                            decoding="async"
                            // Not every YouTube video has a maxres still; drop to
                            // the size that always exists rather than show a gap.
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.src.includes('maxresdefault')) {
                                img.src = img.src.replace('maxresdefault', 'hqdefault');
                              }
                            }}
                          />
                        )}
                        <PlayIcon />
                      </div>
                    </a>

                    <div className={styles.body}>
                      {m.badge && <span className={styles.tag}>{m.badge}</span>}
                      <h3>{m.title}</h3>
                      {m.desc && <p>{m.desc}</p>}
                    </div>

                    <div className={styles.footer}>
                      <a className={styles.watch} {...linkProps}>
                        Watch here <span className={styles.arrow}>›</span>
                      </a>
                      {m.meta && <span className={styles.date}>{m.meta}</span>}
                    </div>
                  </article>
                );
              })}
            </div>

            <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={goToPage} />
          </>
        ) : (
          <div className={styles.empty}>No media matches your current search.</div>
        )}
      </div>
    </section>
  );
}
