'use client';

import './Impact.css';

export default function Impact({ acf }) {
  if (!acf) return null;

  const {
    section_label,
    section_title,
    section_text,
    impact_cards,
    quote_label,
    quote_text,
    quote_author_name,
    quote_author_role,
    cta_label,
    cta_title,
    cta_text,
    cta_button: cta_button_text,
    cta_button_link,
  } = acf;

  return (
    <section className="css-impact">
      <div className="wrap css-impact-outer">

        <div className="css-impact-panel reveal">
          <div className="css-impact-head">
            {section_label && <div className="section-label">{section_label}</div>}
            {section_title && <h2 className="section-h2">{section_title}</h2>}
            {section_text && <p className="section-p">{section_text}</p>}
          </div>

          {impact_cards?.length > 0 && (
            <div className="css-impact-grid">
              {impact_cards.map((card, i) => (
                <div className="css-impact-card" key={i}>
                  <span className="css-impact-num">{card.impact_number}</span>
                  <span className="css-impact-title">{card.impact_title}</span>
                  <span className="css-impact-desc">{card.impact_desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="css-side-card reveal">
          {quote_text && (
            <div className="css-testimonial">
              <div>
                {quote_label && <div className="css-side-label">{quote_label}</div>}
                <span className="css-quote-mark">&ldquo;</span>
                <p className="css-quote-text">{quote_text}</p>
              </div>
              <div>
                {quote_author_name && <div className="css-quote-attr-name">{quote_author_name}</div>}
                {quote_author_role && <div className="css-quote-attr-role">{quote_author_role}</div>}
              </div>
            </div>
          )}

          {(cta_title || cta_button_text) && (
            <>
              <div className="css-side-divider"></div>
              <div>
                {cta_label && <div className="css-side-label">{cta_label}</div>}
                {cta_title && <h3 className="css-side-cta-h3">{cta_title}</h3>}
                {cta_text && <p className="css-side-cta-p">{cta_text}</p>}
                {cta_button_text && cta_button_link && (
                  <a className="css-cta-btn" href={cta_button_link}>{cta_button_text} &rarr;</a>
                )}
              </div>
            </>
          )}
        </aside>

      </div>
    </section>
  );
}
