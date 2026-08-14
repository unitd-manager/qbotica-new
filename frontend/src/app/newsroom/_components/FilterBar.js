'use client';

import styles from './FilterBar.module.css';
import { FILTERS } from '../_data/categories';

export default function FilterBar({ current, onFilter, query, onSearch }) {
  return (
    <div className={styles.filtersWrap}>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            className={`${styles.filterBtn} ${current === f.id ? styles.active : ''}`}
            onClick={() => onFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
        <input
          className={styles.search}
          placeholder="Search resources..."
          value={query}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
