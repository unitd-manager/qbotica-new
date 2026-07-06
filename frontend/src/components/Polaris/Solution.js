'use client';

import './Solution.css';
import { useState } from 'react';

export default function Solution({ acf }) {

    const [showSolutions, setShowSolutions] = useState(false);

    const {
        solution_label,
        solution_title,
        solution_desc_1,
        solution_desc_2,
        solution_cards,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="solution-section">

            <div className="solution-container">

                {/* LABEL */}
                {solution_label && (
                    <span className="solution-label">
                        {solution_label}
                    </span>
                )}

                {/* TITLE */}
                {solution_title && (
                    <h2
                        className="solution-title"
                        dangerouslySetInnerHTML={{ __html: solution_title }}
                    />
                )}

                {/* DESCRIPTION */}
                {(solution_desc_1 || solution_desc_2) && (
                    <div className="solution-description">
                        {solution_desc_1 && <p>{solution_desc_1}</p>}
                        {solution_desc_2 && <p>{solution_desc_2}</p>}
                    </div>
                )}

                {/* READ MORE BUTTON */}
                {solution_cards?.length > 0 && (
                    <div className="solution-read-more">
                        <button
                            className="solution-btn"
                            onClick={() => setShowSolutions(!showSolutions)}
                        >
                            <span className="solution-btn-text">
                                qBotica Solution Approach
                            </span>
                            <span className="solution-btn-arrow">
                                →
                            </span>
                        </button>
                    </div>
                )}

                {/* SOLUTION CARDS */}
                {showSolutions && solution_cards?.length > 0 && (
                    <div className="solution-list">
                        {solution_cards.map((item, index) => (
                            <div className="solution-card" key={index}>

                                <div className="solution-icon">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>

                                <div className="solution-content">
                                    {item.card_title && <h3>{item.card_title}</h3>}
                                    {item.card_description && <p>{item.card_description}</p>}
                                    {item.card_tag && <span>{item.card_tag}</span>}
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>

        </section>
    );
}