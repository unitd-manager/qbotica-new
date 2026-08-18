'use client';

import './MoreCaseStudies.css';

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

                    {view_all_link && (
                        <a
                            href={view_all_link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {view_all_label}
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

                                    {item.card_link && (
                                        <a
                                            href={item.card_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.read_label || read_more_label}
                                        </a>
                                    )}

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}