'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './back-to-top.css';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // fallback for older browsers
      let pos = window.pageYOffset;
      const step = () => {
        pos = pos - Math.max(10, Math.round(pos / 8));
        window.scrollTo(0, pos);
        if (pos > 0) requestAnimationFrame(step);
      };
      step();
    }
  };

  if (!mounted) return null;

  const btn = (
    <button
      type="button"
      className="back-to-top-btn"
      aria-label="Back to top"
      title="Back to top"
      onClick={scrollToTop}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
    >
      ↑
    </button>
  );

  return typeof document !== 'undefined' ? createPortal(btn, document.body) : null;
}

