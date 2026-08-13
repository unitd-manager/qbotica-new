'use client';

import styles from './Featured.module.css';
import { FEATURED } from '../_data/featured';

/*
 * Featured spotlight panel.
 *
 * Section copy (heading / intro / button label) comes from the WP page
 * "insights-news" -> ACF layout "insights_featured", keyed by the active tab.
 *
 * The highlighted item's badge/title/text/url are whatever the editor set on
 * that ACF item, so they can curate exactly what shows here. Only when a
 * field is left blank does it fall back to the FIRST card of the active
 * category (the latest entry), then to the static copy in _data/featured.js -
 * so the panel never renders blank, but never overrides a deliberate choice.
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

  const badge = wp.badge || latest?.badge || template.badge;
  const title = wp.title || latest?.title || template.title;
  const text = wp.text || latest?.desc || template.text;
  const url = wp.url || latest?.url || template.url;
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
            // All and Media are just the photo - not a click target, so
            // no link wrapper regardless of whether a url is configured.
            null
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
