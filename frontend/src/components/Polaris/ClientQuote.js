'use client';

import './ClientQuote.css';

export default function ClientQuote({ acf }) {

    const {
        client_photo,
        quote_text,
        quote_name,
        quote_title,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="client-quote">

            <div className="client-quote-container">

                {/* PHOTO COLUMN */}
                {client_photo?.url && (
                    <div className="client-photo-column">
                        <img
                            src={client_photo.url}
                            alt={client_photo.alt || quote_name || 'Client Photo'}
                            className="client-photo"
                        />
                    </div>
                )}

                {/* DIVIDER */}
                <div className="client-divider"></div>

                {/* QUOTE CONTENT */}
                <div className="client-content">

                    <div className="quote-icon">&ldquo;</div>

                    {quote_text && (
                        <p className="quote-description">
                            {quote_text}
                        </p>
                    )}

                    {(quote_name || quote_title) && (
                        <div className="quote-author">
                            {quote_name && <strong>– {quote_name}</strong>}
                            {quote_title && <span>{quote_title}</span>}
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}