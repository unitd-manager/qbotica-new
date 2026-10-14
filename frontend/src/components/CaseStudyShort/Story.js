'use client';

import './Story.css';

export default function Story({ acf }) {
  if (!acf) return null;

  const {
    section_label,
    section_title,
    section_intro,
    glance_title,
    glance_description,
    glance_fact: glance_facts,
    content_block: content_blocks,
  } = acf;

  return (
    <section className="css-story wrap">
      <div className="section-intro reveal">
        {section_label && <div className="section-label">{section_label}</div>}
        {section_title && <h2 className="section-h2">{section_title}</h2>}
        {section_intro && <p className="section-p">{section_intro}</p>}
      </div>

      <div className="css-story-grid">
        {(glance_title || glance_facts?.length > 0) && (
          <aside className="css-glance-panel reveal">
            <div className="section-label">At a Glance</div>
            {glance_title && <h3 className="css-glance-h3">{glance_title}</h3>}
            {glance_description && (
              <p className="section-p">{glance_description}</p>
            )}
            {glance_facts?.length > 0 && (
              <div className="css-facts">
                {glance_facts.map((fact, i) => (
                  <div className="css-fact" key={i}>
                    <span className="css-fact-k">{fact.fact_key}</span>
                    <span className="css-fact-v">{fact.fact_value}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        )}

        <div className="css-content-stack">
          {content_blocks?.map((block, i) => (
            <article className="css-content-block reveal" key={i}>
              {block.block_number && <div className="css-content-num">{block.block_number}</div>}
              {block.block_title && <h3 className="css-content-h3">{block.block_title}</h3>}
              {block.block_text && <p className="section-p">{block.block_text}</p>}
              {block.block_checklist?.length > 0 && (
                <ul className="css-check-list">
                  {block.block_checklist.map((c, ci) => (
                    <li key={ci}>{c.check_text}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
