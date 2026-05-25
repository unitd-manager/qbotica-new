"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './healthcare-automation-modern.module.css';

export default function HealthcareAutomationModern({ data = {} }) {
  const { main_title = '', description = '', cta_button = null } = data;

  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = cardRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="healthcare-automation-title">
      <div className={styles.container}>
        <div ref={cardRef} className={`${styles.card} ${visible ? styles.visible : ''}`}>
          <div className={styles.leftAccent} aria-hidden />
          <div className={styles.content}>
            <h2 id="healthcare-automation-title" className={styles.title} dangerouslySetInnerHTML={{ __html: main_title }} />
            <div className={styles.desc} dangerouslySetInnerHTML={{ __html: description }} />
            {cta_button?.url && (
              <a href={cta_button.url} className={styles.cta} target={cta_button.target || '_self'} rel="noreferrer">
                {cta_button.title || 'Learn More'}
              </a>
            )}
          </div>
          {/* <div className={styles.decorative} aria-hidden>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={styles.wave}><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0b74ff" stopOpacity="0.14"/><stop offset="100%" stopColor="#0a62d9" stopOpacity="0.06"/></linearGradient></defs><path fill="url(#g1)" d="M44.6,-27.2C57.3,-12.8,66.7,4.6,62.1,20.2C57.5,35.9,39.9,49.7,20.6,55.8C1.3,61.9,-19.5,60.3,-33.9,50.4C-48.3,40.5,-56.4,22.4,-56.5,4.2C-56.6,-14,-48.8,-32.4,-34.8,-45.1C-20.8,-57.9,-10.4,-64.9,3.7,-68.7C17.7,-72.4,35.4,-73.9,44.6,-27.2Z" transform="translate(100 100) scale(0.9)"/></svg>
          </div> */}
        </div>
      </div>
    </section>
  );
}
