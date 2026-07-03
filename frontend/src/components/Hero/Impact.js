'use client';

import './Impact.css';

export default function Impact({ acf }) {
if (!acf) return null;

    const {
        impact_label,
        impact_title,
        impact_description,
        impact_benefits,
    } = acf || {};

    
    return (
        <section className="impact-section">
            <div className="impact-container">

                {/* LABEL */}
                {impact_label && (
                    <span className="impact-label">
                        {impact_label}
                    </span>
                )}

                {/* TITLE */}
                {impact_title && (
                    <h2
                        className="impact-title"
                        dangerouslySetInnerHTML={{ __html: impact_title }}
                    />
                )}

                {/* DESCRIPTION */}
                {impact_description && (
                    <p className="impact-description">
                        {impact_description}
                    </p>
                )}

                {/* BENEFITS LIST */}
                {impact_benefits?.length > 0 && (
                    <ul className="impact-benefits">
                        {impact_benefits.map((item, index) => (
                            <li className="impact-benefit" key={index}>
                                <span className="impact-bullet"></span>
                                <p>{item.benefit_text}</p>
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </section>
    );
}