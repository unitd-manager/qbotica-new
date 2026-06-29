'use client';

import {
  SectionTag,
  DivTag,
  H1Tag,
  PTag,
  ATag,
  SpanTag,
} from '../Common/HTMLTags';

import './case-study-style.css';

export default function CustomerSuccessHero({ data }) {
  // Altered dynamic fallback structure from <span> to <em> to leverage the layout engine gradient configuration
  const title =
    data?.title ||
    'AI That Delivers,<br/><em>Not Just Talks.</em>';

  const description =
    data?.description ||
    'See how qBotica helps organizations across industries reduce manual work, increase accuracy, accelerate workflows, and modernize complex business operations — with real, measurable outcomes.';

  const kicker = data?.kicker || 'Customer Success Stories';

  const primaryButtonText =
    data?.primary_button_text || 'Explore All Stories';

  const primaryButtonLink =
    data?.primary_button_link || '#case-studies';

  const secondaryButtonText =
    data?.secondary_button_text || 'Talk to an Expert';

  const secondaryButtonLink =
    data?.secondary_button_link || '/contact';

  const class_name = data?.class_name || '';
  const id = data?.id || '';

  return (
    <SectionTag className={`hero ${class_name}`} id={id}>
      <DivTag className="hero-inner">

        <DivTag className="hero-kicker">
          <SpanTag className="hero-kicker-dot"></SpanTag>
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
          <ATag
            href={primaryButtonLink}
            className="btn-primary"
          >
            {primaryButtonText}
          </ATag>

          <ATag
            href={secondaryButtonLink}
            className="btn-secondary"
          >
            {secondaryButtonText}
          </ATag>
        </DivTag>

      </DivTag>
    </SectionTag>
  );
}