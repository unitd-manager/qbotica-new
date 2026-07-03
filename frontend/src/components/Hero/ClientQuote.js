'use client';

import './ClientQuote.css';

export default function ClientQuote({ acf }) {

    const {
        client_logo,
        client_company_name,
        quote_text,
        quote_author_title,
        quote_author_company,
    } = acf || {};

    if (!acf) return null;

    return (
        <section className="client-quote">

            <div className="client-quote-container">

                {/* LOGO COLUMN */}
                <div className="client-logo-column">

                    {client_logo?.url && (
                        <div className="client-logo">
                            <img
                                src={client_logo.url}
                                alt={client_logo.alt || client_company_name || 'Client Logo'}
                                className="client-logo-image"
                            />
                        </div>
                    )}

                    {client_company_name && (
                        <div className="client-company">
                            {client_company_name}
                        </div>
                    )}

                </div>

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

                    {(quote_author_title || quote_author_company) && (
                        <div className="quote-author">
                            {quote_author_title}
                            {quote_author_title && quote_author_company && ' • '}
                            {quote_author_company && (
                                <span>{quote_author_company}</span>
                            )}
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}