'use client';

import './Solution.css';

export default function Solution({ acf }) {
  if (!acf) return null;

  const {
    section_label,
    section_title,
    section_text,
    process_steps,
    tech_chips,
  } = acf;

  return (
    <section className="css-solution">
      <div className="wrap css-solution-grid">
        <div className="reveal">
          {section_label && <div className="section-label">{section_label}</div>}
          {section_title && (
            <h2 className="section-h2" style={{ color: '#fff' }}>{section_title}</h2>
          )}
          {section_text && <p className="section-p">{section_text}</p>}
        </div>

        <div className="reveal">
          {process_steps?.length > 0 && (
            <div className="css-process">
              {process_steps.map((step, i) => (
                <div className="css-process-card" key={i}>
                  <div className="css-process-icon">{step.step_number}</div>
                  <div>
                    {step.step_title && <h3 className="css-process-h3">{step.step_title}</h3>}
                    {step.step_text && <p className="css-process-p">{step.step_text}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tech_chips?.length > 0 && (
            <div className="css-tech-strip">
              {tech_chips.map((chip, i) => (
                <div className="css-tech-chip" key={i}>
                  <strong>{chip.chip_title}</strong>
                  <span>{chip.chip_subtitle}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
