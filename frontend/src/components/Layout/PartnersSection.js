"use client";

import React from 'react';
import styles from '../../components/Common/home-new.module.css';
import Link from 'next/link';

export default function PartnersSection({ partners = [], title = 'Built with the enterprise ecosystem' }) {
  const logos = partners && partners.length ? partners : Array.from({ length: 12 }).map(() => null);
  const trackLogos = [...logos, ...logos];

  return (
    <section className={styles.partnersStrip} id="home-partners">
      <div className={styles.partnersInner}>
        <div className={styles.partnersCopy}>
          <div className={styles.sectionKickerPill}>{title}</div>
          <p>qBotica works across leading platforms and technologies to deliver what fits your environment.</p>
          <div style={{ marginTop: '20px' }}>
            <Link className={styles.buttonPrimary} href="/partners">Explore Partnerships →</Link>
          </div>
        </div>

        <div className={styles.logosCarousel} style={{ maxWidth: '100%', margin: 0 }}>
          <div className={styles.logosTrack}>
            {trackLogos.map((partner, i) => {
              const img = partner && partner.image ? partner.image : null;
              const src = img && img.url ? img.url : null;
              const alt = img && img.alt ? img.alt : `Partner ${i + 1}`;
              return (
                <div key={i} className={styles.clientLogo} role="listitem" aria-label={partner?.description || alt}>
                  {src ? <img src={src} alt={alt} /> : <div className={styles.clientLogoPlaceholder}>Partner</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
            
