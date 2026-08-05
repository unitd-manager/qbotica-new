'use client';

import styles from './Featured.module.css';
import { FEATURED } from '../_data/featured';
import { RESOURCES } from '../_data/resources';

export default function Featured({ current }) {
  const f = FEATURED[current] || FEATURED.all;

  /*
   * Badge, title and link track the newest card of the active category -
   * RESOURCES is already sorted newest-first, so the top of the list is it.
   * Tabs flagged `fixed` (All and Media, both pinned to the upcoming webinar)
   * keep the copy set in _data/featured.js instead.
   */
  const pool = current === 'all' ? RESOURCES : RESOURCES.filter((r) => r.category === current);
  const latest = f.fixed ? null : pool[0];

  const badge = latest?.badge || f.badge;
  const title = latest?.title || f.title;
  const url = latest?.url || f.url;
  const linkLabel = f.link;
  // Fixed artwork per tab. These files must be plain photos - any headline
  // baked into them collides with the copy rendered on top.
  const image = f.image;

  const mainClass = `${styles.featureMain} ${f.className ? styles[f.className] : ''}`;
  const badgeClass = `${styles.badge} ${f.badgeClass ? styles[f.badgeClass] : ''}`;

  return (
    <section className={styles.section} id="featured">
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.eyebrow}>Featured</div>
            <h2>{f.heading}</h2>
          </div>
          {/* Client asked for the old placeholder line to go; kept conditional
              so copy can come back here without touching the markup. */}
          {f.intro && <p>{f.intro}</p>}
        </div>

        <article className={`${mainClass} ${f.imageOnly ? styles.imageOnly : ''}`}>
          {/* Photo fills the panel; a scrim over it keeps the copy readable.
              Needs artwork with no text baked in - the copy is rendered here.
              `imageOnly` tabs use a finished banner that already carries its
              own headline, so the scrim and the copy below are both skipped. */}
          {image && (
            <div className={styles.featureBg} key={image}>
              <img
                src={image}
                alt={f.imageOnly ? title : ''}
                decoding="async"
                // Sits above the fold, so no lazy-loading. If the artwork isn't
                // in /public/assets/images yet it 404s - drop the layer and let
                // the gradient show through on its own.
                onError={(e) => {
                  const layer = e.currentTarget.parentElement;
                  if (layer) layer.style.display = 'none';
                }}
              />
            </div>
          )}

          {f.imageOnly ? (
            // Whole banner is the click target - the call to action is drawn
            // into the artwork itself.
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
              <span className={badgeClass}>{badge}</span>
              <h3>{title}</h3>
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
