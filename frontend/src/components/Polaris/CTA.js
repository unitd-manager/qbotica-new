'use client';

import './CTA.css';

// ACF "Link" fields return { title, url, target } (or a plain string for
// older data) — normalize both so the JSX below doesn't care which it got.
function resolveLink(field) {
    if (!field) return null;
    if (typeof field === 'string') return { url: field, target: '_blank' };
    if (!field.url) return null;
    return { url: field.url, target: field.target || '_blank' };
}

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

    const primaryLink = resolveLink(cta_primary_link);
    const secondaryLink = resolveLink(cta_secondary_link);

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

                    {primaryLink && (
                        <a
                            href={primaryLink.url}
                            target={primaryLink.target || undefined}
                            rel={primaryLink.target === '_blank' ? 'noopener noreferrer' : undefined}
                            className="cta-btn cta-primary"
                        >
                            {cta_primary_text || 'Request a Demo →'}
                        </a>
                    )}

                    {secondaryLink && (
                        <a
                            href={secondaryLink.url}
                            target={secondaryLink.target || undefined}
                            rel={secondaryLink.target === '_blank' ? 'noopener noreferrer' : undefined}
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