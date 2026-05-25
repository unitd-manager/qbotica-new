import Link from 'next/link';
import { ArrowRight } from '@/components/Common/Icons';
import styles from './home-banner-with-rotating-cube.module.css';
import ThreeSphereLogo from './ThreeSphereLogo';

function getTitleLines(value) {
  if (!value) return [];

  const html = String(value);

  const normalized = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+>/g, '');

  return normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function HomeBannerWithRotatingCube({ data }) {
  if (!data) return null;

  const {
    sub_title,
    main_title,
    description,
    button,
    secondary_button,
  } = data;

  const cubeImage ='/assets/images/qbotica3d.png';

  const titleLines = getTitleLines(main_title);

  return (
    <section className={styles['nh-hero-banner']}>

      <div className={styles['nh-hero-bg']} />

      <div className={`${styles['nh-hero-glow']} ${styles['glow-one']}`} />

      <div className={`${styles['nh-hero-glow']} ${styles['glow-two']}`} />

      <div className={styles['nh-hero-container']}>
        <div className={styles['nh-hero-grid']}>

          {/* LEFT CONTENT */}
          <div className={styles['nh-hero-content']}>

            {sub_title ? (
              <div className={styles['nh-hero-eyebrow']}>
                {sub_title}
              </div>
            ) : null}

            {titleLines.length ? (
              <h1 className={styles['nh-hero-title']}>
                {titleLines.map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className={`${styles['nh-hero-title-line']} ${
                      index === 1 ? styles['nh-hero-highlight'] : ''
                    }`}
                  >
                    {line}
                  </span>
                ))}
              </h1>
            ) : null}

            {description ? (
              <div
                className={styles['nh-hero-desc']}
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            ) : null}

            {(button?.url || secondary_button?.url) ? (
              <div className={styles['nh-hero-actions']}>

                {button?.url ? (
                  <Link
                    href={button.url}
                    className={styles['primary-btn']}
                    target={button.target || '_self'}
                    rel={
                      button.target === '_blank'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {button.title}
                    <ArrowRight />
                  </Link>
                ) : null}

                {secondary_button?.url ? (
                  <Link
                    href={secondary_button.url}
                    className={styles['secondary-btn']}
                    target={secondary_button.target || '_self'}
                    rel={
                      secondary_button.target === '_blank'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {secondary_button.title}
                    <ArrowRight />
                  </Link>
                ) : null}

              </div>
            ) : null}

          </div>

          {/* RIGHT: single rotating logo (flat 3D look) */}
          <div className={styles['nh-hero-cube-wrapper']} aria-hidden="true">
            <ThreeSphereLogo src={cubeImage} size={320} />
          </div>

        </div>
      </div>
    </section>
  );
}