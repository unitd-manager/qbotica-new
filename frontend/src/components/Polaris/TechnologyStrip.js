'use client';

import './TechnologyStrip.css';

export default function TechnologyStrip({ acf }) {

    const technologies = acf?.technologies || [];

    return (
        <section className="tech-strip">

            <div className="tech-strip-container">

                <div className="tech-strip-label">
                    TECHNOLOGY POWERING THIS SOLUTION
                </div>

                <div className="tech-strip-list">
                    {technologies.map((item, index) => (
                        <div key={index} className="tech-strip-item">
                            {item.tech_name}
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}