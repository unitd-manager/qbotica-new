'use client';

import './WhyItWorked.css';
import { useState, useEffect } from 'react';

export default function WhyItWorked({ acf }) {

    const [showWhyItems, setShowWhyItems] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        why_label,
        why_title,
        why_desc_1,
        why_desc_2,
        why_items,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="why-section">
            <div className="why-container">

                {/* LABEL */}
                {why_label && (
                    <span className="why-label">
                        {why_label}
                    </span>
                )}

                {/* TITLE */}
                {why_title && (
                    <h2
                        className="why-title"
                        dangerouslySetInnerHTML={{ __html: why_title }}
                    />
                )}

                {/* DESCRIPTION */}
                {(why_desc_1 || why_desc_2) && (
                    <div className="why-description">
                        {why_desc_1 && <p>{why_desc_1}</p>}
                        {why_desc_2 && <p>{why_desc_2}</p>}
                    </div>
                )}

                {/* READ MORE BUTTON */}
                {why_items?.length > 0 && (
                    <div className="why-read-more">
                        <button
                            className="why-btn"
                            onClick={() => setShowWhyItems((prev) => !prev)}
                        >
                            {mounted ? (
                                <>
                                    <span className="why-btn-text">
                                        {showWhyItems ? 'Show Less' : 'Read More'}
                                    </span>
                                    <span className="why-btn-arrow">
                                        {showWhyItems ? ' ↑' : ' ↓'}
                                    </span>
                                </>
                            ) : (
                                'Read More'
                            )}
                        </button>
                    </div>
                )}

                {/* WHY ITEMS GRID */}
                {showWhyItems && why_items?.length > 0 && (
                    <div className="why-grid">
                        {why_items.map((item, index) => (
                            <div className="why-card" key={index}>
                                <div className="why-content">
                                    {item.item_title && <h3>{item.item_title}</h3>}
                                    {item.item_description && <p>{item.item_description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}