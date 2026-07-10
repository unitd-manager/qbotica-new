import React from 'react';
import styles from '../Common/home-new.module.css';

const awards = [
  { id: 1, title: 'AI Excellence Award', desc: 'Recognized for outstanding innovation in AI-driven automation.' },
  { id: 2, title: 'Operational Efficiency Award', desc: 'Honored for measurable impact in operational transformation.' },
  { id: 3, title: 'Customer Impact Award', desc: 'Celebrating demonstrable client outcomes and ROI.' },
  { id: 4, title: 'Innovation Leader', desc: 'Industry recognition for product innovation.' },
  { id: 5, title: 'Best Use of Data', desc: 'Awarded for data-driven solutions.' },
  { id: 6, title: 'AI Integration Award', desc: 'Recognized for seamless AI integration.' },
  { id: 7, title: 'Partner Excellence', desc: 'Acknowledged by partners for collaboration.' },
  { id: 8, title: 'Customer Choice', desc: 'Voted by customers for value delivered.' },
  { id: 9, title: 'Sustainability Award', desc: 'Recognized for sustainable engineering practices.' },
  { id: 10, title: 'Security Excellence', desc: 'Awarded for robust security posture.' },
  { id: 11, title: 'Performance Award', desc: 'Recognized for system performance and uptime.' },
  { id: 12, title: 'Design Award', desc: 'Honored for product and UI design.' },
];

export default function AwardsRecognition({ data }) {
  const list = (data && data.award_and_certificate_list && data.award_and_certificate_list.length) ? data.award_and_certificate_list : awards;
  const items = list.slice(0, 12);
  const topLeftItems = items.slice(0, 4);
  const topRightItems = items.slice(4, 8);
  const bottomItems = items.slice(8, 12);

  return (
    <section className={styles.awardsSection}>
      <div className={styles.simpleHeader}>
        <div className={styles.sectionKickerPill}>Awards & Recognition</div>
        <h2>Recognized for enterprise automation leadership</h2>
        <p>{(data && data.description) ? data.description : 'Our work has been acknowledged across analyst reports and industry awards for measurable impact and innovation.'}</p>
      </div>

      <div className={styles.awardsGrid}>
        <div className={styles.topLeftBlock}>
          {topLeftItems.map((a, i) => (
            <div key={a?.id ?? `top-${i}`} className={`${styles.awardCard} ${styles.topBlockItem}`}>
              {a && a.image && a.image.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <div className={styles.awardBox}>
                  <img src={a.image.url} alt={a.title || `Award ${i + 1}`} />
                </div>
              ) : (
                <div className={styles.awardPlaceholder} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className={styles.topRightBlock}>
          {topRightItems.map((a, i) => (
            <div
              key={a?.id ?? `topright-${i}`}
              className={`${styles.awardCard} ${styles.topRightItem}`}
            >
              {a?.image?.url ? (
                <div className={styles.awardBox}>
                  <img
                    src={a.image.url}
                    alt={a.title || `Award ${4 + i + 1}`}
                  />
                </div>
              ) : (
                <div className={styles.awardPlaceholder} />
              )}
            </div>
          ))}
        </div>

        {bottomItems.length > 0 && (
          <div className={styles.awardsBottomWrapper}>
            {bottomItems.map((a, i) => (
              <div
                key={a?.id ?? `bottom-${i}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0'
                }}
              >
                {a?.image?.url ? (
                  <div className={`${styles.awardBox} ${styles.awardBoxBottom}`}>
                    <img
                      src={a.image.url}
                      alt={a.title || `Award ${8 + i + 1}`}
                    />
                  </div>
                ) : (
                  <div className={styles.awardPlaceholder} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
