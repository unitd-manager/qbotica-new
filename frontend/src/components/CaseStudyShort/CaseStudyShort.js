'use client';

import { useEffect, useState } from 'react';
import './shared.css';
import Hero from './Hero';
import Story from './Story';
import Solution from './Solution';
import Impact from './Impact';
import MoreCaseStudies from './MoreCaseStudies';
import CTA from '../Polaris/CTA';
import './CTA.css';

// Local preview only (npm run dev): shows the CTA before the post has a
// "cta_button" block. Never used in production builds — live content comes
// from WP admin only.
const DEV_CTA_PREVIEW =
  process.env.NODE_ENV === 'development'
    ? {
        cta_title: 'Ready to run your operations<br/><span>with Agentic AI?</span>',
        cta_description:
          'Free process discovery call. ROI estimate in 48 hours. First automation live in 2 weeks.',
        cta_primary_text: 'Request a Demo →',
        cta_primary_link: 'https://meetings.hubspot.com/automation-demo/scheduler',
        cta_secondary_text: 'Explore All Case Studies',
        cta_secondary_link: 'https://www.qbotica.com/customer-success-stories',
      }
    : null;

export default function CaseStudyShort({ slug }) {
  const [acf, setAcf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/customer-stories?slug=${slug}&status=publish`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setAcf(data?.[0]?.acf || null);
        setNotFound(!data?.[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching case study:', err);
        if (cancelled) return;
        setNotFound(true);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  // Fade-in-on-scroll for anything tagged `.reveal`, once the sections exist in the DOM
  useEffect(() => {
    if (!acf) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 55);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.cs-short .reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [acf]);

  if (loading) {
    return (
      <div className="cs-short">
        <div className="wrap" style={{ padding: '120px 0', textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (notFound || !acf) {
    return (
      <div className="cs-short">
        <div className="wrap" style={{ padding: '120px 0', textAlign: 'center' }}>
          <h1>Case Study</h1>
          <p>Content is being updated. Please check back soon.</p>
        </div>
      </div>
    );
  }

  const sections = acf.customer_story_detail || [];
  const getLayout = (layoutName) =>
    sections.find((item) => item.acf_fc_layout === layoutName) || null;

  return (
    <div className="cs-short">
      <Hero acf={getLayout('hero_section_short')} />
      <Story acf={getLayout('story_section_short')} />
      <Solution acf={getLayout('solution_section_short')} />
      <Impact acf={getLayout('impact_section_short')} />
      <MoreCaseStudies acf={getLayout('more_case_studies')} />
      <CTA acf={getLayout('cta_button') || DEV_CTA_PREVIEW} />
    </div>
  );
}
