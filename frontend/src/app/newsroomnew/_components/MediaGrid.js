'use client';

import { useEffect, useState } from 'react';
import styles from './MediaGrid.module.css';

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

  const [shown, setShown] = useState(PAGE_SIZE);
  useEffect(() => setShown(PAGE_SIZE), [query]);

  const items = resources.filter((r) => {
    if (r.category !== 'media') return false;
    const haystack = `${r.search} ${r.title} ${r.desc}`.toLowerCase();
    return !q || haystack.includes(q);
  });

  const page = items.slice(0, shown);
  const remaining = items.length - page.length;

  return (
    <section className={styles.section} id="latest">
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
              {page.map((m, i) => {
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

            {remaining > 0 && (
              <div className={styles.loadMoreWrap}>
                <button className={styles.loadMore} onClick={() => setShown((n) => n + PAGE_SIZE)}>
                  Load more ({remaining})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.empty}>No media matches your current search.</div>
        )}
      </div>
    </section>
  );
}
