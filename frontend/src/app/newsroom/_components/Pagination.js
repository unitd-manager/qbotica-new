'use client';

import styles from './Pagination.module.css';

const WINDOW_SIZE = 10;

/*
 * Numbered pagination for the hub grids - plain text links, Google-style.
 * Purely client-side - just moves `currentPage`, no navigation/URL change -
 * since the grid's data is already loaded and filtered in the browser.
 */
function pageWindow(current, total) {
  let start = Math.max(1, current - Math.floor(WINDOW_SIZE / 2));
  let end = Math.min(total, start + WINDOW_SIZE - 1);
  start = Math.max(1, end - WINDOW_SIZE + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export default function Pagination({ currentPage, totalPages, onPageChange, dark = false }) {
  if (totalPages <= 1) return null;

  return (
    <nav className={`${styles.pagination} ${dark ? styles.dark : ''}`} aria-label="Pagination">
      {pageWindow(currentPage, totalPages).map((page) => (
        <button
          key={page}
          className={`${styles.pageLink} ${page === currentPage ? styles.active : ''}`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button className={styles.next} onClick={() => onPageChange(currentPage + 1)}>
          Next →
        </button>
      )}
    </nav>
  );
}
