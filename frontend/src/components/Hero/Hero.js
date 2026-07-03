'use client';

import './Hero.css';
import { useEffect, useState } from 'react';
import { fetchPageBySlug } from '@/lib/wordpress';
import TechnologyStrip from './TechnologyStrip';
import ClientQuote from './ClientQuote';
import Challenge from './Challenge';
import Solution from './Solution';
import Impact from './Impact';
import WhyItWorked from './WhyItWorked';
import MoreCaseStudies from './MoreCaseStudies';
import CTA from './CTA';
import Sidebar from './Sidebar';

export default function Hero({ slug }) {

  const [acf, setAcf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/pages?slug=${slug}&status=publish`)
        .then(res => res.json())
        .then(data => {

          console.log('acf data:', data[0]?.acf);
          setAcf(data[0]?.acf);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error:', err);
            setLoading(false);
        });
}, [slug]);

  if (loading) return (
    <section className="cs-hero">
      <div className="cs-hero-container">
        <p style={{ color: 'white' }}>Loading...</p>
      </div>
    </section>
  );

  if (!acf) return (
    <section className="cs-hero">
      <div className="cs-hero-container">
        <p style={{ color: 'red' }}>Data load failed!</p>
      </div>
    </section>
  );

  // ─────────────────────────────────────────────────────────
  // "polaris_transportation" is a Flexible Content field.
  // Its value is an ARRAY of layout objects, each tagged with
  // "acf_fc_layout" telling us which layout it is (solution,
  // impact, why_choose_us, more_case_studies, cta_button, sidebar).
  // We pull each layout out by name so the child components get
  // the correct fields instead of the raw top-level acf object.
  // ─────────────────────────────────────────────────────────
  const flexibleContent = acf.polaris_transportation || [];

  const getLayout = (layoutName) =>
    flexibleContent.find((item) => item.acf_fc_layout === layoutName) || {};

  const solutionData = getLayout('solution');
  const impactData = getLayout('impact');
  const whyChooseUsData = getLayout('why_choose_us');
  const moreCaseStudiesData = getLayout('more_case_studies');
  const ctaData = getLayout('cta_button');

  // Sidebar data is split across two sources:
  // - CTA fields (heading, description, demo/expert links) live at top-level acf
  // - Client card, case study details, performance metrics, topics live inside
  //   the polaris_transportation flexible content "sidebar" layout
  // Merge both into one object so Sidebar.js gets everything it needs.
  const sidebarFromFlexible = getLayout('sidebar');
  const sidebarData = { ...sidebarFromFlexible, ...acf };

  return (
    <>
      {/* HERO */}
      <section className="cs-hero">

        <div className="cs-hero-grid"></div>
        <div className="cs-hero-glow1"></div>
        <div className="cs-hero-glow2"></div>

        <div className="cs-hero-container">

          {/* BREADCRUMB */}
          <div className="cs-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Resources</span>
            <span>/</span>
            <span>Case Studies</span>
            <span>/</span>
            <span className="active">
              {acf.client_name}
            </span>
          </div>

          <div className="cs-meta">

            <div className="cs-case-tag">
              <span className="dot"></span>
              CASE STUDY1
            </div>

            {/* TAGS */}
            {acf.tags?.map((item, i) => (
              <div className="cs-chip" key={i}>
                {item.tag_name}
              </div>
            ))}

            {/* CLIENT CARD */}
            <div className="cs-client-card">
              <div className="cs-client-logo">
                <img
                  src={acf.client_logo?.url}
                  alt={acf.client_name}
                  width={150}
                  height={60}
                  className="polaris-logo"
                />
              </div>
              <div className="cs-client-info">
                <div className="client-label">CLIENT</div>
                <div className="client-name">
                  {acf.client_name}
                </div>
              </div>
            </div>

          </div>

          {/* TITLE */}
          <h1 className="cs-title">
            {acf.hero_title_line1}
            <span>{acf.hero_highlight}</span>
            {acf.hero_title_line2}
          </h1>

          {/* STATS */}
          <div className="cs-stats">
            {acf.stats?.map((item, index) => (
              <div className="cs-stat-card" key={index}>
                <h2>{item.value_}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TECHNOLOGY STRIP */}
      <TechnologyStrip acf={acf} />

      {/* CLIENT QUOTE - full width, above the main content + sidebar grid */}
      <ClientQuote acf={acf} />

      {/* MAIN CONTENT + SIDEBAR */}
      <div className="cs-page-layout">

        <div className="cs-main-content">
          <Challenge acf={acf} />
          <Solution acf={solutionData} />
          <Impact acf={impactData} />
          <WhyItWorked acf={whyChooseUsData} />
        </div>

        <Sidebar acf={sidebarData} />

      </div>

      {/* FULL WIDTH SECTIONS */}
      <MoreCaseStudies acf={moreCaseStudiesData} />
      <CTA acf={ctaData} />
    </>
  );
}
