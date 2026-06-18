'use client';

import './ClientQuote.css';

export default function ClientQuote() {
    return (
        <section className="client-quote">

            <div className="client-quote-container">

                <div className="client-logo-column">

                    <div className="client-logo">
                        POLARIS
                    </div>

                    <div className="client-company">
                        Polaris Transportation
                        <br />
                        Group
                    </div>

                </div>

                <div className="client-divider"></div>

                <div className="client-content">

                    <div className="quote-icon">
                        "
                    </div>

                    <p className="quote-description">

                        This wasn't just automation—it was a complete rethinking
                        of how our operations team handles vendor communication
                        at scale. What used to take hours now happens before
                        anyone arrives at their desk. DoqumentAI understands our
                        emails the way our best team members do.

                    </p>

                    <div className="quote-author">
                    Director of Operations •<span>Polaris Transportation Group</span>
                </div>

                </div>

            </div>

        </section>
    );
}
