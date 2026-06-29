'use client';

import {
  DivTag,
  H2Tag,
  H3Tag,
  PTag,
  ATag,
  SpanTag,
} from '../Common/HTMLTags';

import './case-study-style.css';

export default function FeaturedCaseStudy({ data }) {
  // Exact data fallbacks matched with the design panel configuration
  const featuredBadge = data?.featured_badge || '⭐ Featured Case Study';
  const featuredGhostNum = data?.featured_ghost_num || '75';
  const featuredStatNum = data?.featured_stat_num || '75%';
  const featuredStatLabel = data?.featured_stat_label || 'Processing time reduction';
  
  const featuredTitle = data?.featured_title || 'Global bank cuts processing time by 75% and errors by 90% with intelligent automation';
  const featuredEyebrow = data?.featured_eyebrow || 'Financial Services';
  const featuredHeading = data?.featured_heading || 'A global top 10 bank streamlines high-volume operations with qBotica';
  const featuredDesc = data?.featured_desc || 'qBotica helped one of the world&apos;s largest financial institutions modernize complex operational workflows, eliminate manual handling across thousands of daily transactions, and dramatically improve accuracy across business-critical processes.';

  const outcomes = data?.outcomes || [
    { value: '75%', label: 'Processing reduction' },
    { value: '90%', label: 'Error reduction' },
    { value: '24/7', label: 'Automation support' },
  ];

  const buttonText = data?.button_text || 'Read Featured Story →';
  const buttonLink = data?.button_link || '#';

  const class_name = data?.class_name || '';
  const id = data?.id || '';

  return (
    <DivTag className={`featured-wrap ${class_name}`} id={id}>
      <DivTag className="featured-card">
        
        {/* Left Image & Stats Overlay Panel */}
        <DivTag className="feat-visual">
          <DivTag className="feat-badge">{featuredBadge}</DivTag>
          <SpanTag className="feat-ghost-num">{featuredGhostNum}</SpanTag>
          <DivTag>
            <DivTag className="feat-stat">
              <DivTag className="feat-stat-num">{featuredStatNum}</DivTag>
              <DivTag className="feat-stat-label">{featuredStatLabel}</DivTag>
            </DivTag>
            <H2Tag>{featuredTitle}</H2Tag>
          </DivTag>
        </DivTag>

        {/* Right Details Text Content Panel */}
        <DivTag className="feat-content">
          <DivTag className="feat-eyebrow">{featuredEyebrow}</DivTag>
          <H3Tag>{featuredHeading}</H3Tag>
          <PTag>{featuredDesc}</PTag>
          
          <DivTag className="feat-outcomes">
            {outcomes.map((outcome, index) => (
              <DivTag key={index} className="feat-outcome">
                <strong className="feat-outcome-strong">{outcome.value}</strong>
                <SpanTag>{outcome.label}</SpanTag>
              </DivTag>
            ))}
          </DivTag>
          
          <ATag href={buttonLink} className="btn-primary" style={{ width: 'fit-content', marginTop: '0.5rem' }}>
            {buttonText}
          </ATag>
        </DivTag>

      </DivTag>
    </DivTag>
  );
}