'use client';

import './CTA.css';

export default function CTA({ acf }) {

    const {
        cta_title,
        cta_description,
        cta_primary_text,
        cta_primary_link,
        cta_secondary_text,
        cta_secondary_link,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="cta-section">

            <div className="cta-grid"></div>
            <div className="cta-glow"></div>

            <div className="cta-container">

                {/* TITLE */}
                {cta_title && (
                    <h2
                        className="cta-title"
                        dangerouslySetInnerHTML={{ __html: cta_title }}
                    />
                )}

                {/* DESCRIPTION */}
                {cta_description && (
                    <p className="cta-description">
                        {cta_description}
                    </p>
                )}

                {/* BUTTONS */}
                <div className="cta-buttons">

                    {cta_primary_link && (
                        <a
                            href={cta_primary_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-btn cta-primary"
                        >
                            {cta_primary_text || 'Request a Demo →'}
                        </a>
                    )}

                    {cta_secondary_link && (
                        <a
                            href={cta_secondary_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-btn cta-secondary"
                        >
                            {cta_secondary_text || 'Explore All Case Studies'}
                        </a>
                    )}

                </div>

            </div>

        </section>
    );
}