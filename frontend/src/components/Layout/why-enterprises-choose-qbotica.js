import Image from 'next/image';
import Link from 'next/link';
import styles from './why-enterprises-choose-qbotica.module.css';

export default function WhyEnterprisesChoose({ data = {} }) {
  const {
    title = 'Why Enterprises Choose qBotica',
    bullets = [],
    image = {},
    cta = null,
    background = ''
  } = data;

  return (
    <section className={styles.section} style={{ background }}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />

            <ul className={styles.bullets}>
              {bullets.map((b, i) => (
                <li key={i} className={styles.bullet}>
                  <span className={styles.icon} aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className={styles.bulletText}>
                    <strong className={styles.bulletTitle} dangerouslySetInnerHTML={{ __html: b.title || '' }} />
                    {b.description && <p className={styles.bulletDesc} dangerouslySetInnerHTML={{ __html: b.description }} />}
                  </div>
                </li>
              ))}
            </ul>

            {cta?.url && (
              <Link href={cta.url} target={cta.target || '_self'} className={styles.cta}>
                {cta.title || 'Learn More'}
              </Link>
            )}
          </div>

          <div className={styles.media}>
            {image?.url && (
              <div className={styles.imageWrap}>
                <Image src={image.url} alt={image.alt || 'qBotica'} width={image.width || 720} height={image.height || 540} className={styles.image} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
