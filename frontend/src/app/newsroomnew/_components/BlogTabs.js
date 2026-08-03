'use client';

import styles from './BlogTabs.module.css';
import { BLOG_TABS } from '../_data/blogTabs';

/*
 * `tabs` is built from the WordPress categories (see lib/newsroom.js), so a new
 * category in the admin becomes a tab here on its own. The static list is only
 * a fallback for the first render if that fetch came back empty.
 */
export default function BlogTabs({ active, onSelect, tabs = [] }) {
  const items = tabs.length ? tabs : BLOG_TABS;

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {items.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${active === t.id ? styles.active : ''}`}
            onClick={() => onSelect(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
