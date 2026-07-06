'use client';

import {
  DivTag,
  H2Tag,
  H3Tag,
  PTag,
  ATag,
  SpanTag,
} from '../Common/HTMLTags';

import './case-study-landing-style.css';

export default function CaseStudyLandingFeatured({ data }) {
  console.log('CaseStudyLandingFeatured Props:', data);

  if (!data) {
    return null;
  }

  const featuredBadge = data.featured_badge || '';
  const featuredGhostNumber = data.featured_ghost_number || '';
  const featuredStatNumber = data.featured_stat_number || '';
  const featuredStatLabel = data.featured_stat_label || '';

  const featuredTitle = data.featured_title || '';
  const featuredEyebrow = data.featured_eyebrow || '';
  const featuredHeading = data.featured_heading || '';
  const featuredDescription = data.featured_description || '';

  const featuredImage = data.featured_image || null;

  const outcomes = data.outcomes || [];

  const buttonText = data.button_text || '';
  const buttonLink = data.button_link || '';

  const class_name = data.class_name || '';
  const id = data.id || '';

  return (
    <DivTag
      className={`featured-wrap ${class_name}`}
      id={id}
    >
      <DivTag className="featured-card">

        {/* LEFT PANEL */}
        <DivTag className="feat-visual">

          {featuredImage?.url && (
            <DivTag className="feat-image-wrap">
              <img
                src={featuredImage.url}
                alt={featuredImage.alt || featuredTitle}
                className="feat-image"
              />
            </DivTag>
          )}

          <DivTag className="feat-overlay">

            {featuredBadge && (
              <DivTag className="feat-badge">
                {featuredBadge}
              </DivTag>
            )}

            {featuredGhostNumber && (
              <SpanTag className="feat-ghost-num">
                {featuredGhostNumber}
              </SpanTag>
            )}

            <DivTag>

              {(featuredStatNumber || featuredStatLabel) && (
                <DivTag className="feat-stat">

                  <DivTag className="feat-stat-num">
                    {featuredStatNumber}
                  </DivTag>

                  <DivTag className="feat-stat-label">
                    {featuredStatLabel}
                  </DivTag>

                </DivTag>
              )}

              {featuredTitle && (
                <H2Tag>
                  {featuredTitle}
                </H2Tag>
              )}

            </DivTag>

          </DivTag>

        </DivTag>

        {/* RIGHT PANEL */}
        <DivTag className="feat-content">

          {featuredEyebrow && (
            <DivTag className="feat-eyebrow">
              {featuredEyebrow}
            </DivTag>
          )}

          {featuredHeading && (
            <H3Tag>
              {featuredHeading}
            </H3Tag>
          )}

          {featuredDescription && (
            <PTag>
              {featuredDescription}
            </PTag>
          )}

          {outcomes.length > 0 && (
            <DivTag className="feat-outcomes">

              {outcomes.map((outcome, index) => (
                <DivTag
                  key={index}
                  className="feat-outcome"
                >
                  <strong className="feat-outcome-strong">
                    {outcome.value}
                  </strong>

                  <SpanTag>
                    {outcome.label}
                  </SpanTag>
                </DivTag>
              ))}

            </DivTag>
          )}

          {buttonText && buttonLink && (
            <ATag
              href={buttonLink}
              className="btn-primary"
            >
              {buttonText}<br></br>
            </ATag>
          )}

        </DivTag>

      </DivTag>
    </DivTag>
  );
}