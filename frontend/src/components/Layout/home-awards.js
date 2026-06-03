'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './awards-section.module.css';

export default function AwardsSection({ data }) {
  const trackRef = useRef(null);

  const items     = data?.award_and_certificate_list || [];
  const mainTitle = data?.main_title || 'Trust & Proof';

  // Duplicate list so the seamless loop always has enough items
  const loopItems = items.length > 0 ? [...items, ...items, ...items] : [];

  // Pause on hover/focus
  const pause  = () => trackRef.current?.style.setProperty('animation-play-state', 'paused');
  const resume = () => trackRef.current?.style.setProperty('animation-play-state', 'running');

  return (
    <section className={styles.section}>
      {/* Ambient orbs */}
      <span className={styles.orbLeft}  aria-hidden="true" />
      <span className={styles.orbRight} aria-hidden="true" />

      {/* Heading */}
      <div className={styles.titleWrap}>
        
        <h2
          className={styles.heading}
          dangerouslySetInnerHTML={{ __html: mainTitle }}
        />
        <div className={styles.headingUnderline} aria-hidden="true" />
      </div>

      {/* Scrolling strip */}
      <div
        className={styles.marqueeWrap}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
        aria-label="Client logos"
      >
        {/* Left / right edge fade masks */}
        <span className={styles.fadeLeft}  aria-hidden="true" />
        <span className={styles.fadeRight} aria-hidden="true" />

        <ul
          ref={trackRef}
          className={styles.track}
          role="list"
          aria-label="Scrolling list of client logos"
        >
          {loopItems.map((item, i) => (
            <li key={i} className={styles.logoCard} aria-hidden={i >= items.length}>
              <div className={styles.logoInner}>
                <Image
                  src={item.image?.url || ''}
                  alt={i < items.length ? (item.title || 'Client logo') : ''}
                  fill
                  sizes="160px"
                  style={{ objectFit: 'contain' }}
                  draggable={false}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      
    </section>
  );
}