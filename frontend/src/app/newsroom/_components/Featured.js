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
  // All and Media are pure image banners - no card content overlaid, so they
  // don't need (and shouldn't wait on) the grid's first card.
  const imageOnly = current === 'all' || current === 'media';

  const heading = wp.heading || template.heading;
  const intro = wp.intro || template.intro;
  const linkLabel = wp.linkLabel || template.link;

  const pool = current === 'all' ? resources : resources.filter((r) => r.category === current);
  const latest = imageOnly ? null : pool[0];

  const badge = latest?.badge || wp.badge || template.badge;
  const title = latest?.title || wp.title || template.title;
  const text = latest?.desc || wp.text || template.text;
  const url = latest?.url || wp.url || template.url;
  // Panel photo is picked by the editor per tab in WP admin (insights_featured
  // -> image), not tied to any one post - falls back to the CSS gradient when
  // it's unset.
  const image = wp.image || null;

  const mainClass = `${styles.featureMain} ${template.className ? styles[template.className] : ''} ${imageOnly ? styles.imageOnly : ''}`;
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
          {image && (
            <div className={styles.featureBg} key={image}>
              <img
                src={image}
                alt={imageOnly ? title : ''}
                decoding="async"
                onError={(e) => {
                  const layer = e.currentTarget.parentElement;
                  if (layer) layer.style.display = 'none';
                }}
              />
            </div>
          )}

          {imageOnly ? (
            // Whole banner is the click target - no copy drawn over the photo.
            url && url !== '#' && (
              <a
                className={styles.featureCover}
                href={url}
                aria-label={title}
                {...(url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              />
            )
          ) : (
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
          )}
        </article>
      </div>
    </section>
  );
}
