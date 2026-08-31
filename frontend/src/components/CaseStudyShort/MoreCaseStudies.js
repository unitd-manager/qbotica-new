'use client';

import './MoreCaseStudies.css';

export default function MoreCaseStudies({ acf }) {
  if (!acf) return null;

  const {
    section_label,
    section_title,
    section_text,
    view_all_label,
    view_all_link,
    case_cards,
  } = acf;

  return (
    <section className="css-more">
      <div className="wrap">
        <div className="css-more-head reveal">
          <div>
            {section_label && <div className="section-label">{section_label}</div>}
            {section_title && (
              <h2 className="section-h2" style={{ fontSize: 'clamp(1.7rem,2.8vw,2.8rem)', marginTop: '.5rem' }}>
                {section_title}
              </h2>
            )}
            {section_text && (
              <p className="section-p" style={{ maxWidth: 480, marginTop: '.75rem' }}>{section_text}</p>
            )}
          </div>
          {view_all_link && (
            <a className="css-view-all" href={view_all_link}>{view_all_label || 'View All Case Studies'} &rarr;</a>
          )}
        </div>

        {case_cards?.length > 0 && (
          <div className="css-case-grid">
            {case_cards.map((card, i) => (
              <a className="css-case-card reveal" href={card.card_link || '#'} key={i}>
                <div className="css-case-img">
                  {card.card_image?.url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={card.card_image.url} alt={card.card_image?.alt || card.card_title || ''} />
                  )}
                  {card.card_tag && <span className="css-case-tag">{card.card_tag}</span>}
                </div>
                <div className="css-case-body">
                  {card.card_title && <h3 className="css-case-h3">{card.card_title}</h3>}
                  {card.card_text && <p className="css-case-p">{card.card_text}</p>}
                  <span className="css-case-link">Read Case Study &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
