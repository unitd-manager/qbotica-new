'use client';

import './MoreCaseStudies.css';

export default function MoreCaseStudies({ acf }) {

    const {
        more_case_studies,
        view_all_link,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="more-case-studies">

            <div className="more-case-container">

                <div className="more-case-header">

                    <h2>More Case Studies</h2>

                    {view_all_link && (
                        <a
                            href={view_all_link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View all stories →
                        </a>
                    )}

                </div>

                <div className="more-case-grid">

                    {more_case_studies?.map((item, index) => (
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

                                    <a
                                        href={item.card_link || view_all_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read →
                                    </a>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}