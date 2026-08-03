'use client';

import styles from './Featured.module.css';
import { FEATURED } from '../_data/featured';

/*
 * Featured spotlight panel.
 *
 * Section copy (heading / intro / button label) comes from the WP page
 * "insights-news" -> ACF layout "insights_featured", keyed by the active tab.
 *
 * The highlighted item itself is the FIRST card of the active category, so the
 * panel always mirrors the latest entry without anyone re-typing it. If a tab
 * has no cards yet, it falls back to the WP fields, then to the static copy in
 * _data/featured.js - so the panel never renders blank.
 *
 * Panel background (`className`) and badge colour (`badgeClass`) stay driven by
 * the category - they're part of the design, not the content.
 */
export default function Featured({ current, resources = [], featured = {} }) {
  const template = FEATURED[current] || FEATURED.all;
  const wp = featured[current] || {};

  const heading = wp.heading || template.heading;
  const intro = wp.intro || template.intro;
  const linkLabel = wp.linkLabel || template.link;

  const pool = current === 'all' ? resources : resources.filter((r) => r.category === current);
  const latest = pool[0];

  const badge = latest?.badge || wp.badge || template.badge;
  const title = latest?.title || wp.title || template.title;
  const text = latest?.desc || wp.text || template.text;
  const url = latest?.url || wp.url || template.url;

  const mainClass = `${styles.featureMain} ${template.className ? styles[template.className] : ''}`;
  const badgeClassName = `${styles.badge} ${template.badgeClass ? styles[template.badgeClass] : ''}`;

  return (
    <section className={styles.section} id="featured">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Featured</div>
            <h2 dangerouslySetInnerHTML={{ __html: heading }} />
          </div>
          {/* Only rendered when WordPress supplies copy - the client asked for
              the old placeholder line to go, so there is no static fallback. */}
          {intro && <p dangerouslySetInnerHTML={{ __html: intro }} />}
        </div>

        <article className={mainClass}>
          <div className={styles.featureContent}>
            <span className={badgeClassName}>{badge}</span>
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
            <p dangerouslySetInnerHTML={{ __html: text }} />
            <a
              className={`${styles.btn} ${styles.btnWhite}`}
              href={url || '#latest'}
              {...(url && url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {linkLabel}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
