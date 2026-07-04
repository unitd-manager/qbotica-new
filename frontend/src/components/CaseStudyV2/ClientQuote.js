'use client';

import './ClientQuote.css';
import Image from 'next/image';

export default function ClientQuote() {
    return (

        <section className="client-quote">

            <div className="client-quote-container">

                {/* LEFT */}

                <div className="client-photo-column">

                    <Image
                        src="/images/dave-brajkovich.jpg"
                        alt="Dave Brajkovich"
                        width={260}
                        height={320}
                        className="client-photo"
                        priority
                    />

                </div>

                <div className="client-divider"></div>

                {/* RIGHT */}

                <div className="client-content">

                    <div className="quote-icon">
                        &ldquo;
                    </div>

                    <p className="quote-description">

                        Their customer-centric approach, which combines best-in-class
                        humans in the loop with a cloud-based delivery of a sophisticated
                        machine learning platform, helped us scale delivery of pricing
                        quotations at an astronomical speed with a potential to increase
                        revenues for Polaris Transport while significantly reducing costs
                        of operations. We are now able to deploy the staff onto other
                        critical initiatives that were shelved for years, a true
                        win-win for all.

                    </p>

                    <div className="quote-author">

                        <strong>– Dave Brajkovich</strong>

                        <span>
                            CTO, Polaris Transport
                        </span>

                    </div>

                </div>

            </div>

        </section>

    );
}