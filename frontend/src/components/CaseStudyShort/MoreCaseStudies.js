'use client';

import './MoreCaseStudies.css';

// ACF "Link" fields return { title, url, target } (or a plain string for
// older data) — normalize both so the JSX below doesn't care which it got.
function resolveLink(field) {
    if (!field) return null;
    if (typeof field === 'string') return { url: field, target: '_blank' };
    if (!field.url) return null;
    return { url: field.url, target: field.target || '_blank' };
}

export default function MoreCaseStudies({ acf }) {

    const {
        section_title,
        more_case_studies,
        view_all_link,
        view_all_label,
        read_more_label,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="more-case-studies">

            <div className="more-case-container">

                <div className="more-case-header">

                    {section_title && <h2>{section_title}</h2>}

                    {(() => {
                        const link = resolveLink(view_all_link);
                        return link && (
                            <a
                                href={link.url}
                                target={link.target || undefined}
                                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                            >
                                {view_all_label}
                            </a>
                        );
                    })()}

                </div>

                <div className="more-case-grid">

                    {more_case_studies?.map((item, index) => {
                        const link = resolveLink(item.card_link);
                        return (
                            <div className="more-case-card" key={index}>

                                <div className="card-top-bar"></div>

                                <div className="more-case-body">

                                    {item.stat && <h3>{item.stat}</h3>}

                                    {item.stat_label && (
                                        <span className="case-stat-label">
                                            {item.stat_label}
                                        </span>
                                    )}

                                    {item.card_title && <h4>{item.card_title}</h4>}

                                    <div className="case-footer">

                                        {item.industry && (
                                            <span>• {item.industry}</span>
                                        )}

                                        {link && (
                                            <a
                                                href={link.url}
                                                target={link.target || undefined}
                                                rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                                            >
                                                {item.read_label || read_more_label}
                                            </a>
                                        )}

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}
