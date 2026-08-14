'use client';

import styles from './Pagination.module.css';

/*
 * Numbered pagination for the hub grids (matches the /blog page's look).
 * Purely client-side - just moves `currentPage`, no navigation/URL change -
 * since the grid's data is already loaded and filtered in the browser.
 */
function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const withGaps = [];
  sorted.forEach((page, i) => {
    if (i > 0 && page - sorted[i - 1] > 1) withGaps.push('…');
    withGaps.push(page);
  });
  return withGaps;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {currentPage > 1 && (
        <button className={styles.navBtn} onClick={() => onPageChange(currentPage - 1)}>
          ← Prev
        </button>
      )}
      {pageList(currentPage, totalPages).map((page, i) =>
        page === '…' ? (
          <span key={`gap-${i}`} className={styles.ellipsis}>…</span>
        ) : (
          <button
            key={page}
            className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}
      {currentPage < totalPages && (
        <button className={styles.navBtn} onClick={() => onPageChange(currentPage + 1)}>
          Next →
        </button>
      )}
    </nav>
  );
}
