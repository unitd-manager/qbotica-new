'use client';

import './Hero.css';
import { useEffect, useState, useRef } from 'react';
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
  const [sidebarFrozenTop, setSidebarFrozenTop] = useState(null);
  const [extraBottomSpace, setExtraBottomSpace] = useState(0);
  const [sidebarMinHeight, setSidebarMinHeight] = useState(0);
  const pageLayoutRef = useRef(null);
  const boundaryRef = useRef(null);
  const mainContentRef = useRef(null);
  const sidebarWrapRef = useRef(null);
  const extraBottomSpaceRef = useRef(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/pages?slug=${slug}&status=publish`)
        .then(res => res.json())
        .then(data => {
          console.log('FULL acf data:', data[0]?.acf);
          setAcf(data[0]?.acf);
          setLoading(false);
        })
        .catch(err => {
            console.error('Error:', err);
            setLoading(false);
        });
}, [slug]);

  // ── SIDEBAR: sticky through Challenge+Solution, then scrolls
  // normally (frozen at its exit point) through Impact+WhyItWorked ──
  useEffect(() => {
    const STICKY_OFFSET = 24; // must match sidebar's sticky top value

    const handleScroll = () => {
      if (!boundaryRef.current) return;
      const boundaryTop = boundaryRef.current.getBoundingClientRect().top;

      if (boundaryTop <= STICKY_OFFSET) {
        // Past the boundary — freeze sidebar at this scroll point
        // (only set once, so it doesn't keep recalculating)
        setSidebarFrozenTop((prev) =>
          prev === null
            ? boundaryRef.current.offsetTop - STICKY_OFFSET
            : prev
        );
      } else {
        // Scrolled back above the boundary — release freeze
        setSidebarFrozenTop((prev) => (prev !== null ? null : prev));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Prevent frozen sidebar from overlapping MoreCaseStudies below ──
  // Uses ResizeObserver so it keeps recalculating even if the sidebar
  // grows/shrinks later (e.g. images loading, dynamic content), not
  // just once on mount.
  useEffect(() => {
    const updateSpacing = () => {
      if (
        sidebarFrozenTop === null ||
        !mainContentRef.current ||
        !sidebarWrapRef.current
      ) {
        extraBottomSpaceRef.current = 0;
        setExtraBottomSpace(0);
        setSidebarMinHeight(0);
        return;
      }

      const mainHeight =
        mainContentRef.current.offsetHeight - extraBottomSpaceRef.current;
      const sidebarHeight = sidebarWrapRef.current.offsetHeight;
      const neededHeight = sidebarFrozenTop + sidebarHeight;

      if (neededHeight > mainHeight) {
        // Sidebar is taller — stretch main content to match
        const next = neededHeight - mainHeight;
        extraBottomSpaceRef.current = next;
        setExtraBottomSpace(next);
        setSidebarMinHeight(0);
      } else {
        // Main content is taller — stretch sidebar box to match its bottom
        extraBottomSpaceRef.current = 0;
        setExtraBottomSpace(0);
        setSidebarMinHeight(mainHeight - sidebarFrozenTop);
      }
    };

    updateSpacing();

    const observer = new ResizeObserver(updateSpacing);
    if (mainContentRef.current) observer.observe(mainContentRef.current);
    if (sidebarWrapRef.current) observer.observe(sidebarWrapRef.current);

    window.addEventListener('resize', updateSpacing);
    window.addEventListener('load', updateSpacing);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSpacing);
      window.removeEventListener('load', updateSpacing);
    };
  }, [sidebarFrozenTop, acf]);

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
  // "acf_fc_layout" telling us which layout it is.
  // ─────────────────────────────────────────────────────────
  const flexibleContent = acf.polaris_transportation || [];

  const getLayout = (layoutName) =>
    flexibleContent.find((item) => item.acf_fc_layout === layoutName) || {};

  // ── HERO DATA — now confirmed to live inside flexible content ──
  const heroData = getLayout('hero_section');

  const heroTags = heroData.hero_tags;
  const heroHeadline = heroData.hero_headline;
  const heroHeadlineHighlight = heroData.hero_headline_highlight;
  const heroHeadline2 = heroData.hero_headline_2;
  const heroBackgroundImage = heroData.hero_background_image;
  const heroClientLogo = heroData.hero_client_logo;
  const heroClientName = heroData.hero_client_name;
  const heroStats = heroData.hero_stats;

  const solutionData = getLayout('solution');
  const impactData = getLayout('impact');
  const whyChooseUsData = getLayout('why_choose_us');
  const moreCaseStudiesData = getLayout('more_case_studies');
  const ctaData = getLayout('cta_button');

  const sidebarFromFlexible = getLayout('sidebar');
  const sidebarData = { ...sidebarFromFlexible, ...acf };

  return (
    <>
      {/* HERO */}
      <section
        className="cs-hero"
        style={
          heroBackgroundImage?.url
            ? {
                backgroundImage: `linear-gradient(rgba(5,10,18,.45), rgba(5,10,18,.60)), url(${heroBackgroundImage.url})`,
              }
            : undefined
        }
      >

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
              {heroClientName}
            </span>
          </div>

          <div className="cs-meta">

            <div className="cs-case-tag">
              <span className="dot"></span>
              CASE STUDY1
            </div>

            {/* TAGS */}
            {heroTags?.map((item, i) => (
              <div className="cs-chip" key={i}>
                {item.tag_text}
              </div>
            ))}

            {/* CLIENT CARD */}
            <div className="cs-client-card">
              <div className="cs-client-logo">
                <img
                  src={heroClientLogo?.url}
                  alt={heroClientName}
                  width={150}
                  height={60}
                  className="polaris-logo"
                />
              </div>
              <div className="cs-client-info">
                <div className="client-label">CLIENT</div>
                <div className="client-name">
                  {heroClientName}
                </div>
              </div>
            </div>

          </div>

          {/* TITLE */}
          <h1 className="cs-title">
            {heroHeadline}
            <span>{heroHeadlineHighlight}</span>
            {heroHeadline2}
          </h1>

          {/* STATS */}
          <div className="cs-stats">
            {heroStats?.map((item, index) => (
              <div className="cs-stat-card" key={index}>
                <h2>{item.stat_value}</h2>
                <p style={{ whiteSpace: 'pre-line' }}>
                  {item.stat_label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TECHNOLOGY STRIP */}
      <TechnologyStrip acf={getLayout('technology_strip')} />

      {/* CLIENT QUOTE - full width, above the main content + sidebar grid */}
      <ClientQuote acf={getLayout('client_quote')} />

      {/* CHALLENGE + SOLUTION + IMPACT + WHY IT WORKED — one continuous
          sidebar: sticky through Challenge+Solution, then scrolls
          normally (frozen in place, moves with the page) through
          Impact + WhyItWorked */}
      <div className="cs-page-layout" ref={pageLayoutRef}>

        <div
          className="cs-main-content"
          ref={mainContentRef}
          style={{ paddingBottom: `${extraBottomSpace}px` }}
        >
          <Challenge acf={getLayout('challenge')} />
          <Solution acf={solutionData} />

          {/* Invisible marker — sidebar unsticks right after this point */}
          <div ref={boundaryRef} style={{ height: 0 }} />

          <Impact acf={impactData} />
          <WhyItWorked acf={whyChooseUsData} />
        </div>

        <div
          ref={sidebarWrapRef}
          className="cs-sidebar-wrap"
          style={
            sidebarFrozenTop !== null
              ? {
                  position: 'absolute',
                  top: `${sidebarFrozenTop}px`,
                  right: '24px',
                  width: '400px',
                  minHeight: `${sidebarMinHeight}px`,
                }
              : { position: 'sticky', top: '24px' }
          }
        >
          <Sidebar acf={sidebarData} />
        </div>

      </div>

      {/* FULL WIDTH SECTIONS — MoreCaseStudies renders full width,
          outside the sidebar grid, unaffected by sidebar overlap */}
      <MoreCaseStudies acf={moreCaseStudiesData} />
      <CTA acf={ctaData} />
    </>
  );
}