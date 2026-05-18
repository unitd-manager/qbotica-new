import Image from 'next/image';
import Link from 'next/link';
import styles from './image-keypoints-modern.module.css';

export default function ImageKeyPointsModern({ data = {} }) {
  const {
    main_title = '',
    sub_title = '',
    description = '',
    key_point_title = '',
    key_points = [],
    cta_button = null,
    image = {},
    background_color = ''
  } = data;

  return (
    <section className={styles.section} style={{ background: background_color || 'transparent' }}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.header}>
              {/* <h3 className={styles.kicker}>Why it matters</h3> */}
              <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: main_title }} />
              {sub_title && <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: sub_title }} />}
            </div>

            <div className={styles.bulletsWrap}>
              {key_points && key_points.length > 0 ? (
                <ul className={styles.bullets}>
                  {key_points.map((kp, i) => (
                    <li key={i} className={styles.bullet}>
                      <span className={styles.check} aria-hidden>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                      </span>
                      <div className={styles.btext}>
                        <strong dangerouslySetInnerHTML={{ __html: kp.title || '' }} />
                        {kp.description && <div className={styles.kdesc} dangerouslySetInnerHTML={{ __html: kp.description }} />}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.desc} dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </div>

            {cta_button?.url && (
              <Link href={cta_button.url} target={cta_button.target || '_self'} className={styles.cta}>
                {cta_button.title || 'Learn More'}
              </Link>
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.card}>
              {image?.url && (
                <Image src={image.url} alt={image.alt || 'Illustration'} width={image.width || 700} height={image.height || 520} className={styles.image} />
              )}
              <div className={styles.accent} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
