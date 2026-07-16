'use client';

import './Challenge.css';
import { useState } from 'react';

export default function Challenge({ acf }) {

    const [showMore, setShowMore] = useState(false);

    const {
        challenge_label,
        challenge_title,
        challenge_title1,
        challenge_desc_1,
        challenge_desc_2,
        challenge_cards,
        challenge_quote_text,
        challenge_quote_author,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="challenge-section">
            <div className="challenge-container">

                {/* LABEL */}
                {challenge_label && (
                    <span className="challenge-label">
                        {challenge_label}
                    </span>
                )}

                {/* TITLE — contains <br/> and <span> from WordPress, rendered as HTML */}
                {challenge_title && (
                    <h2
                        className="challenge-title"
                        dangerouslySetInnerHTML={{ __html: challenge_title }}
                    />
                )}

                {/* TITLE LINE 2 — separate field with its own color */}
                {challenge_title1 && (
                    <h2
                        className="challenge-title challenge-title-highlight"
                        dangerouslySetInnerHTML={{ __html: challenge_title1 }}
                    />
                )}

                {/* DESCRIPTION */}
                {(challenge_desc_1 || challenge_desc_2) && (
                    <div className="challenge-description">
                        {challenge_desc_1 && <p>{challenge_desc_1}</p>}
                        {challenge_desc_2 && <p>{challenge_desc_2}</p>}
                    </div>
                )}

                {/* READ MORE BUTTON */}
                {challenge_cards?.length > 0 && (
                    <div className="challenge-read-more">
                        <button
                            className="challenge-btn"
                            onClick={() => setShowMore(!showMore)}
                        >
                            <span className="challenge-btn-text">
                                Learn more about Customer's Challenges
                            </span>
                            <span className="challenge-btn-arrow">
                                →
                            </span>
                        </button>
                    </div>
                )}

                {/* CHALLENGE CARDS */}
                {showMore && challenge_cards?.length > 0 && (
                    <div className="challenge-cards">
                        {challenge_cards.map((item, index) => (
                            <div className="challenge-card" key={index}>
                                <div className="challenge-number">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>
                                <div className="challenge-content">
                                    <p>{item.card_text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* QUOTE */}
                {(challenge_quote_text || challenge_quote_author) && (
                    <div className="challenge-quote">
                        {challenge_quote_text && (
                            <p>&quot;{challenge_quote_text}&quot;</p>
                        )}
                        {challenge_quote_author && (
                            <span>{challenge_quote_author}</span>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}