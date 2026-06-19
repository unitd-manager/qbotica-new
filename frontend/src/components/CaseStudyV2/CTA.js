'use client';

import './CTA.css';

export default function CTA() {
  return (

    <section className="cta-section">

      <div className="cta-grid"></div>
      <div className="cta-glow"></div>

      <div className="cta-container">

        <h2 className="cta-title">

          Ready to run your
          <br />

          operations
          <br />

          <span>with Agentic AI?</span>

        </h2>

        <p className="cta-description">

          Free process discovery call. ROI estimate in 48 hours.
          First automation live in 2 weeks.

        </p>

        <div className="cta-buttons">

  <a
    href="https://meetings.hubspot.com/automation-demo/scheduler"
    target="_blank"
    rel="noopener noreferrer"
    className="cta-btn cta-primary"
  >
    Request a Demo →
  </a>

  <a
    href="https://www.qbdev.unitdtechnologies.com/case-studies"
    target="_blank"
    rel="noopener noreferrer"
    className="cta-btn cta-secondary"
  >
    Explore All Case Studies
  </a>

</div>

      </div>

    </section>

  );
}