'use client';

import Link from 'next/link';
import '../Polaris/Hero.css';
import '../Polaris/PolaroidCard.css';
import './Hero.css';

// Same markup + stylesheets as components/Polaris/Hero.js (hero only), fed by
// the "hero_section_short" ACF layout.
export default function Hero({ acf }) {
  if (!acf) return null;

  const {
    breadcrumb_current,
    case_study_tag_text,
    hero_tags,
    hero_headline,
    hero_headline_highlight,
    hero_headline_suffix,
    client_logo_text,
    client_label,
    client_name,
    client_industry,
    hero_stats,
    hero_background_image,
  } = acf;

  const heroStyle = hero_background_image?.url
    ? {
        backgroundImage: `linear-gradient(rgba(5,10,18,.45), rgba(5,10,18,.60)), url(${hero_background_image.url})`,
      }
    : undefined;

  return (
    <section className="cs-hero" style={heroStyle}>
      <div className="cs-hero-grid"></div>
      <div className="cs-hero-glow1"></div>
      <div className="cs-hero-glow2"></div>

      <div className="cs-hero-container">

        {/* BREADCRUMB */}
        <div className="cs-breadcrumb">
          <span>
            <Link href="/">Home</Link>
            <span> / </span>
          </span>
          <span>
            <Link href="/customer-success-stories">Case Studies</Link>
            <span> / </span>
          </span>
          <span className="cs-breadcrumb-highlight">{breadcrumb_current}</span>
        </div>

        <div className="cs-meta">
          {case_study_tag_text && (
            <div className="cs-case-tag">
              <span className="dot"></span>
              {case_study_tag_text}
            </div>
          )}

          {hero_tags?.map((item, i) => (
            <div className="cs-chip" key={i}>
              {item.tag_text}
            </div>
          ))}

          {/* POLAROID CLIENT CARD — same structure as Polaris/PolaroidCard */}
          {(client_name || client_logo_text) && (
            <div className="polaroid-wrap">
              <div className="polaroid-tape"></div>
              <div className="polaroid-card">
                <div className="polaroid-frame">
                  <div className="polaroid-image css-polaroid-text">
                    <span>{client_logo_text}</span>
                  </div>
                </div>
                <div className="polaroid-label">{client_label || 'Client'}</div>
                <div className="polaroid-industry">{client_name}</div>
                {client_industry && (
                  <div className="polaroid-since">{client_industry}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* TITLE */}
        <h1 className="cs-title">
          {hero_headline}
          <span>{hero_headline_highlight}</span>
          {hero_headline_suffix}
        </h1>

        {/* STATS */}
        <div className="cs-stats">
          {hero_stats?.map((item, index) => (
            <div className="cs-stat-card" key={index}>
              <h2>{item.stat_value}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{item.stat_label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
