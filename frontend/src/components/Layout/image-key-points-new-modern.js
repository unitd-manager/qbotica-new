import Image from 'next/image';
import Link from 'next/link';

import styles from './image-key-points-new-modern.module.css';

export default function ImageKeyPointsNewModern({ data = {} }) {
  const {
    main_title = '',
    sub_title = '',
    description = '',
    key_points = [],
    cta_button = null,
    image = {},
    background_color = '',
  } = data;

  return (
    <section
      className={styles.section}
      style={{
        background: background_color || '#ffffff',
      }}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* LEFT CONTENT */}
          <div className={styles.left}>
            <div className={styles.header}>
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
            </div>

            <div
  className={styles.richDescription}
  dangerouslySetInnerHTML={{
    __html: description,
  }}
/>

            {cta_button?.url && (
              <Link
                href={cta_button.url}
                target={cta_button.target || '_self'}
                className={styles.cta}
              >
                {cta_button.title || 'Learn More'}
              </Link>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className={styles.right}>
            <div className={styles.visualCard}>
              <div className={styles.visualGlow} />

              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt || 'Visual'}
                  width={image.width || 1200}
                  height={image.height || 900}
                  className={styles.image}
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}