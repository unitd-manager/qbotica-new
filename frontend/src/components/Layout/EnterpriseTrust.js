"use client";
import React from 'react';
import styles from '../Common/home-new.module.css';

export default function EnterpriseTrust({ data }) {
  const logos = (data && data.logo_list && data.logo_list.length) ? data.logo_list : Array.from({ length: 16 }).map(() => null);
  // duplicate logos so the scrolling track appears continuous
  const trackLogos = [...logos, ...logos];
  // debug info: expose counts and first logo url when available
  const firstUrl = (logos && logos[0] && logos[0].image && logos[0].image.url) ? logos[0].image.url : null;
  return (
    <section className={styles.logoSection}>
      <div className={styles.simpleHeader}>
        <div className={styles.sectionKickerPill}>Enterprise Trust</div>
        <h2>Trusted across enterprise environments</h2>
        <p>qBotica supports organizations across complex, regulated, and operationally intensive business functions.</p>
        
      </div>
      <div className={styles.logosCarousel}>
        <div className={styles.logosTrack}>
          {trackLogos.map((item, i) => {
            const img = item && item.image ? item.image : null;
            const src = img && img.url ? img.url : null;
            const alt = img && img.alt ? img.alt : `Client ${i + 1}`;
            return (
              <div key={i} className={styles.clientLogo}>
                {src ? <img src={src} alt={alt} /> : <div className={styles.clientLogoPlaceholder}>Client Logo</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
