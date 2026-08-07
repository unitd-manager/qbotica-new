'use client';

import { useEffect } from 'react';
import {
  DivTag,
  H2Tag,
  PTag,
} from '../Common/HTMLTags';

import './case-study-landing-style.css';

export default function CaseStudyLandingReadyToBuild({ data }) {
  useEffect(() => {
    console.log('========== ReadyToBuildPanel ==========');
    console.log('Complete Data:', data);
  }, [data]);

  if (!data) return null;

  const {
    heading = '',
    highlight_text = '',
    description = '',
    primary_button_text = '',
    primary_button_link = '',
    secondary_button_text = '',
    secondary_button_link = '',
  } = data;

  // Remove highlight text from heading if it already exists
  const headingText = highlight_text
    ? heading.replace(highlight_text, '').trim()
    : heading;

  return (
    <section className="cta">
      <DivTag className="cta-inner">

        {/* Heading */}
        {(heading || highlight_text) && (
          <H2Tag>
            {headingText}

            {highlight_text && (
              <>
                <br />
                <em>{highlight_text}</em>
              </>
            )}
          </H2Tag>
        )}

        {/* Description */}
        {description && (
          <PTag>
            {description}
          </PTag>
        )}

        {/* Buttons */}
        <DivTag className="cta-actions">

          {primary_button_text && primary_button_link && (
            <a
              href={primary_button_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-cta"
            >
              {primary_button_text}
            </a>
          )}

          

        </DivTag>

      </DivTag>
    </section>
  );
}