'use client';

import styles from './BlogTabs.module.css';
import { BLOG_TABS } from '../_data/blogTabs';

export default function BlogTabs({ active, onSelect }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {BLOG_TABS.map((t) => (
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
