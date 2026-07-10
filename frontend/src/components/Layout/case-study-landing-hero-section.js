'use client';

import {
  SectionTag,
  DivTag,
  H1Tag,
  PTag,
  ATag,
  SpanTag,
} from '../Common/HTMLTags';

import './case-study-landing-style.css';

export default function CaseStudyLandingHero({ data }) {
  console.log("CaseStudyLandingHero Props:", data);

  // data இல்லையென்றால் render செய்ய வேண்டாம்
  if (!data) {
    return null;
  }

  const title = data.title || '';
  const description = data.description || '';
  const kicker = data.kicker || '';
  const primaryButtonText = data.primary_button_text || '';
  const primaryButtonLink = data.primary_button_link || '';
  const secondaryButtonText = data.secondary_button_text || '';
  const secondaryButtonLink = data.secondary_button_link || '';
  const class_name = data.class_name || '';
  const id = data.id || '';

  return (
    <SectionTag
  className={`hero ${class_name}`}
  id={id || "top"}>
      <DivTag className="hero-inner">

        <DivTag className="hero-kicker">
          <SpanTag className="hero-kicker-dot" />
          {kicker}
        </DivTag>

        <H1Tag
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <PTag className="hero-sub">
          {description}
        </PTag>

        <DivTag className="hero-actions">
          {primaryButtonText && primaryButtonLink && (
  <ATag
    href={primaryButtonLink}
    className="btn-primary"
  >
    {primaryButtonText}
  </ATag>
)}
          {secondaryButtonText && secondaryButtonLink && (
            <ATag
              href={secondaryButtonLink}
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {secondaryButtonText}
            </ATag>
          )}
        </DivTag>

      </DivTag>
    </SectionTag>
  );
}