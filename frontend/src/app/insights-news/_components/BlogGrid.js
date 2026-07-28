'use client';

import styles from './BlogGrid.module.css';
import BlogTabs from './BlogTabs';

// Per-industry tag / arrow colour (the thumbnail itself uses the client's t1–t6 gradients).
const IND_COLOR = {
  banking: '#e8850c',
  healthcare: '#9333ea',
  insurance: '#1d6fe0',
  manufacturing: '#16a34a',
  newsroom: '#ea7317',
  realestate: '#0e7c86',
  supplychain: '#15a34a',
  blog: '#1e293b',
};

export default function BlogGrid({ blogSub, onSelectSub, query, resources = [] }) {
  const q = (query || '').trim().toLowerCase();

  const posts = resources.filter((r) => {
    if (r.category !== 'blog') return false;
    if (blogSub !== 'all' && !(r.subcats || []).includes(blogSub)) return false;
    const haystack = `${r.search} ${r.title} ${r.desc}`.toLowerCase();
    return !q || haystack.includes(q);
  });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>Blog cards by category</div>

        <BlogTabs active={blogSub} onSelect={onSelectSub} />

        {posts.length > 0 ? (
          <div className={styles.grid}>
            {posts.map((p, i) => {
              const primary = (p.subcats || []).find((s) => s !== 'blog') || (p.subcats || [])[0] || 'blog';
              const color = IND_COLOR[primary] || IND_COLOR.blog;
              const Wrapper = p.url ? 'a' : 'article';
              const linkProps = p.url
                ? { href: p.url, ...(p.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                : {};
              return (
                <Wrapper className={styles.card} key={i} {...linkProps}>
                  <div className={`${styles.thumb} ${p.image ? '' : styles[p.thumb]}`}>
                    {p.image ? (
                      <img className={styles.photo} src={p.image} alt={p.title} />
                    ) : (
                      <>
                        <span className={`${styles.shape} ${styles.one}`} />
                        <span className={`${styles.shape} ${styles.two}`} />
                      </>
                    )}
                    <span className={styles.tag} style={{ background: color }}>{p.badge}</span>
                  </div>
                  <div className={styles.body}>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                  <div className={styles.footer}>
                    <span className={styles.meta}><span className={styles.doc}>📄</span> {p.meta}</span>
                    <span className={styles.arrow} style={{ color }}>→</span>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty}>No posts in this category yet.</div>
        )}
      </div>
    </section>
  );
}