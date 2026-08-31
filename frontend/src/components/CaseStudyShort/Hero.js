'use client';

import './Hero.css';

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
        backgroundImage: `linear-gradient(to bottom, rgba(3,7,18,.35) 0%, rgba(3,7,18,.72) 60%, rgba(3,7,18,.88) 100%), url(${hero_background_image.url})`,
      }
    : undefined;

  return (
    <section className="css-hero" style={heroStyle}>
      <div className="css-hero-glow"></div>
      <div className="css-hero-grid"></div>
      <div className="wrap css-hero-inner">

        <nav className="css-breadcrumb">
          <a href="/">Home</a>
          <span className="css-breadcrumb-sep">/</span>
          <a href="/customer-success-stories">Case Studies</a>
          <span className="css-breadcrumb-sep">/</span>
          <span className="css-breadcrumb-current">{breadcrumb_current}</span>
        </nav>

        {(case_study_tag_text || hero_tags?.length > 0) && (
          <div className="css-hero-tags">
            {case_study_tag_text && (
              <div className="css-hero-tag primary"><i></i>{case_study_tag_text}</div>
            )}
            {hero_tags?.map((item, i) => (
              <div className="css-hero-tag" key={i}>{item.tag_text}</div>
            ))}
          </div>
        )}

        <div className="css-hero-main">
          <h1 className="css-hero-h1">
            {hero_headline}
            {hero_headline_highlight && <> <em>{hero_headline_highlight}</em></>}
            {hero_headline_suffix && ` ${hero_headline_suffix}`}
          </h1>

          {(client_name || client_logo_text) && (
            <div className="css-client-card-wrap">
              <div className="css-client-card">
                <div className="css-client-logo-box">
                  <span>{client_logo_text}</span>
                </div>
                <div className="css-client-card-label">{client_label || 'Client'}</div>
                <div className="css-client-card-name">{client_name}</div>
                {client_industry && (
                  <div className="css-client-pill">{client_industry}</div>
                )}
              </div>
            </div>
          )}
        </div>

        {hero_stats?.length > 0 && (
          <div className="css-hero-stats">
            {hero_stats.map((item, i) => (
              <div className="css-hero-stat" key={i}>
                <span className="css-hs-num">{item.stat_value}</span>
                <span className="css-hs-label">{item.stat_label}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
