import Image from 'next/image';
import Link from 'next/link';

import styles from './image-keypoints-new-modern.module.css';

function extractListItems(html = '') {
  try {
    return Array.from(
      html.matchAll(/<li>([\s\S]*?)<\/li>/gms)
    ).map((m) =>
      m[1].replace(/<[^>]+>/g, '').trim()
    );
  } catch (e) {
    return [];
  }
}

export default function ImageKeyPointsNewModern2({
  data = {},
}) {
  const {
    main_title = '',
    sub_title = '',
    description = '',
    key_points = [],
    cta_button = null,
    image = {},
    background_color = '',
  } = data;

  const examples = extractListItems(description);

  const kpList = Array.isArray(key_points)
    ? key_points.map((k) =>
        typeof k === 'string'
          ? k
          : k.title || ''
      )
    : [];

  const chipsList = Array.from(
    new Set([
      ...kpList.filter(Boolean),
      ...examples.filter(Boolean),
    ])
  );

  return (
    <section
      className={styles.section}
      style={{
        background:
          background_color || '#f5f5f7',
      }}
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT IMAGE */}
          <div className={styles.media}>
            <div className={styles.imageCard}>
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt || ''}
                  width={image.width || 900}
                  height={image.height || 700}
                  className={styles.image}
                />
              )}
            </div>

            <div
              className={styles.decor}
              aria-hidden
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className={styles.content}>
            {/* <div className={styles.badge}>
              Impact Areas
            </div> */}

            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: main_title,
              }}
            />

            {sub_title && (
              <p
                className={styles.subtitle}
                dangerouslySetInnerHTML={{
                  __html: sub_title,
                }}
              />
            )}

            <div
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />

            {chipsList.length > 0 && (
              <div className={styles.chips}>
                {chipsList.map((ex, i) => (
                  <div
                    key={i}
                    className={styles.chip}
                  >
                    <span
                      className={styles.dot}
                    />

                    <span
                      className={styles.chipText}
                      dangerouslySetInnerHTML={{
                        __html: ex,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {cta_button?.url && (
              <Link
                href={cta_button.url}
                target={
                  cta_button.target || '_self'
                }
                className={styles.cta}
              >
                {cta_button.title ||
                  'Learn More'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}