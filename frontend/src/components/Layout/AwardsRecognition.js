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
  // ensure up to 12 items for the two-row layout (6 + 6)
  const items = list.slice(0, 12);
  const bottomItems = items.slice(6, 12);
  // Always provide two top-right slots (indices 4 and 5) so placeholders show if missing
  const topRightSlots = [items[4] ?? null, items[5] ?? null];
  const bottomCount = bottomItems.length;
  const bottomStartCol = bottomCount < 6 ? Math.floor((6 - bottomCount) / 2) + 1 : 1;
  return (
    <section className={styles.awardsSection}>
      <div className={styles.simpleHeader}>
        <div className={styles.sectionKickerPill}>Awards & Recognition</div>
        <h2 >Recognized for enterprise automation leadership.</h2>
        <p>{(data && data.description) ? data.description : 'Our work has been acknowledged across analyst reports and industry awards for measurable impact and innovation.'}</p>
      </div>

      <div
        className={styles.awardsGrid}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(6, minmax(90px, 1fr))', gap: '0', justifyContent: 'center', alignItems: 'stretch' }}
      >
        {/* Top row: left 2x2 block occupying columns 1-4 */}
          <div
          className={styles.topLeftBlock}
          style={{ gridColumn: '1 / span 4', gridRow: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: '0' }}
        >
          {items.slice(0, 4).map((a, i) => (
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

      {/* Top-right two items */}
{topRightSlots.map((a, i) => (
  <div
    key={a?.id ?? `topright-${i}`}
    className={`${styles.awardCard} ${styles.topRightItem}`}
    style={{
      gridColumn: `${5 + i}`,
      gridRow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
    }}
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
        {/* Bottom row: place items inside a full-width cell and center with flex */}
        <div
          style={{
            gridColumn: '1 / -1',
            gridRow: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: '0',
            flexWrap: 'nowrap'
          }}
        >
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
                    alt={a.title || `Award ${6 + i + 1}`}
                  />
                </div>
              ) : (
                <div className={styles.awardPlaceholder} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
