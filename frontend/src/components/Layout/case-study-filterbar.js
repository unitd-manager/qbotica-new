'use client';

import { useState } from 'react';
import {
  DivTag,
  H2Tag,
  PTag,
  SpanTag,
} from '../Common/HTMLTags';
import './case-study-style.css';
import bfsiImg1 from '@/assets/bfsi_1.avif';
import bfsiImg2 from '@/assets/bfsi_2.avif';
import manufacturingImg1 from '@/assets/manufacturing_1.avif';
import healthcareImg1 from '@/assets/healthcare_1.avif';
import transportationImg1 from '@/assets/transportation_1.avif';
import transportationImg2 from '@/assets/transportation_2.avif';
import realestate1 from '@/assets/real_estate_1.avif';
import energy1 from '@/assets/energy_1.avif';

export default function CaseStudiesGrid({ data }) {
  console.log("bfsiImg1:", bfsiImg1);
  const [activeFilter, setActiveFilter] = useState('all');

  // Exact categories from the HTML/Image
  const filters = data?.filters || [
    { id: 'all', label: 'All Stories' },
    { id: 'transportation', label: 'Transportation' },
    { id: 'bfsi', label: 'BFSI' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'real_estate_mortgage', label: 'Real Estate & Mortgage' },
    { id: 'energy_utilities', label: 'Energy & Utilities' },
  ];

  // Added distinct 'link' values for each case item
  const cases = data?.cases || [
    {
      id: 1,
      category: 'transportation',
      industry: 'Transportation',
      statNum: '500+',
      statLabel: 'Documents Daily',
      tags: ['Documents', 'Logistics', 'Email AI'],
      title: 'Polaris Transportation: processing 500+ quotation documents per day with DoqumentAI',
      desc: 'Automation accelerated document-heavy logistics operations and eliminated bottlenecks in high-volume vendor email workflows, scaling to 500+ daily docs without adding headcount.',
      product: 'DoqumentAI · RPA',
      image: transportationImg1.src,
      link: 'https://www.qbdev.unitdtechnologies.com/case-studies/polaris-transportation-v2'
    },
    {
      id: 2,
      category: 'transportation',
      industry: 'Transportation',
      statNum: '50%',
      statLabel: 'INCREASE SHIPMENT QUOTE',
      tags: ['OCR', 'Logistics', 'RPA'],
      title: 'How qBotica Transforms Spot Board Monitoring for a Logistics Leader',
      desc: 'A leading logistics and transportation company faced operational bottlenecks due to manual spot board monitoring and document-heavy workflows. High transaction volumes and reliance on human intervention slowed down quote generation and impacted efficiency.',
      product: 'DoqumentAI · RPA',
      image: transportationImg2.src,
      link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-qbotica-automated-spot-board-monitoring-and-document-processing-for-a-leading-logistics-transportation-company'
    },
    {
      id: 3,
      category: 'bfsi',
      industry: 'BFSI',
      statNum: '48%',
      statLabel: 'PROCESS EFFICIENCY GAIN',
      tags: ['Annuity', 'Intelligent Extraction', 'STP'],
      title: 'How a Leading Insurance Firm Modernized Operations for an AI-First Future',
      desc: 'A leading global insurance and financial services firm with over a century of industry experience and trillions in assets under management, serving individual and institutional clients across the U.S., Asia, Europe, and Latin America.',
      product: 'Intelligent Extraction',
      image: bfsiImg1.src,
      link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-a-leading-insurance-firm-modernized-operations-for-an-ai-first-future'
    },
    {
      id: 4,
      category: 'bfsi',
      industry: 'BFSI',
      statNum: '90%',
      statLabel: 'COST AND TIME SAVINGS',
      tags: ['Data Translation', 'eStatements', 'eReceipts'],
      title: 'How qBotica Enabled A Top Financial Services Company To Increase Their Cost And Time Savings By Over 90%',
      desc: 'One of the leading financial services firms wished to change its organization by digitally transforming its business processes through automation: Putting automated data translation into international practice.',
      product: 'DoqumentAI · RPA as a Service',
      image: bfsiImg2.src,
      link: 'https://www.qbdev.unitdtechnologies.com/case-studies/qbotica-enabled-a-top-financial-services-company-to-increase-their-cost-and-time-savings-by-over-90'
    },
    {
      id: 5,
      category: 'healthcare',
      industry: 'Healthcare',
      statNum: '7x',
      statLabel: 'CLAIMS PROCESSING CAPACITY',
      tags: ['Claims', 'IDP', 'EMR Integration'],
      title: 'How qBotica Helped a Top Healthcare Company Scale Claims Processing by 7X',
      desc: 'A leading North American healthcare organization faced growing pressure to process claims faster while maintaining accuracy and operational efficiency. The existing claims pricing workflow relied heavily on manual data entry from unstructured documents, limiting scalability and slowing turnaround times.',
      product: 'UiPath RPA',
      image: healthcareImg1.src,
      link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-qbotica-helped-a-top-healthcare-company-scale-claims-processing-by-7x'
    },
    {
      id: 6,
      category: 'manufacturing',
      industry: 'Manufacturing',
      statNum: '99%',
      statLabel: 'DOCUMENTATION ERROR REDUCTION',
      tags: ['Reconciliation', 'ERP Integration'],
      title: 'How qBotica Reduced Documentation Errors by 99% for a Leading Manufacturer',
      desc: 'A leading North American manufacturing company specializing in protective and packaging solutions experienced rapid growth through multiple acquisitions. ',
      product: 'UiPath RPA • OCR Technology',
      image: manufacturingImg1.src,
      link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-qbotica-reduced-documentation-errors-by-99-for-a-leading-manufacturer'
    },  
    {
      id: 7,
      category: 'real_estate_mortgage',
      industry: 'Real Estate & Mortgage',
      statNum: '99.99%',
      statLabel: 'ERROR ACCURACY',
      tags: ['DoqumentAI', 'Real Estate'],
      title: 'How qBotica enabled P&L Automation for a Real Estate leader',
      desc: 'qBotica’s DoqumentAI product helped the client by processing the Input files hence reducing manual effort and error in data extraction.',
      product: 'DoqumentAI',
      image: realestate1.src,
    },
    {
      id: 8,
      category: 'energy_utilities',
      industry: 'Energy_Utilities',
      statNum: '95%',
      statLabel: 'TIME SAVINGS',
      tags: ['RPA', 'Global Operations'],
      title: 'Driving 95% time savings across four global markets for an energy company',
      desc: 'RPA helped a global energy company scale process efficiency, standardize recurring operational tasks, and reduce manual workloads across multiple regions.',
      product: 'RPA • Automation',
      image: energy1.src,
    },
  ];

  // Filter logic
  const filteredCases = activeFilter === 'all' 
    ? cases 
    : cases.filter(c => c.category === activeFilter);

  return (
    <>
      {/* ══════ FILTER BAR ══════ */}
      <DivTag className="filter-outer" id="case-studies">
        <DivTag className="filter-inner">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </DivTag>
      </DivTag>

      {/* ══════ SECTION HEADER ══════ */}
      <DivTag className="section-head reveal visible">
        <DivTag>
          <H2Tag>Browse stories by industry</H2Tag>
          <PTag>Real outcomes from real enterprises — select an industry to filter.</PTag>
        </DivTag>
        <SpanTag className="count-badge">{filteredCases.length} stories</SpanTag>
      </DivTag>

      {/* ══════ CASE GRID ══════ */}
      <DivTag className="grid-wrap">
        <DivTag className="case-grid">
          {filteredCases.map((caseItem) => (
            <article key={caseItem.id} className="case-card reveal visible">
              
              {/* Image & Overlays */}
              <DivTag 
                className="cc-image" 
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(11, 17, 32, 0.12) 0%, rgba(11, 17, 32, 0.75) 100%), url('${caseItem.image}')` }}
              >
                <SpanTag className="cc-industry">{caseItem.industry}</SpanTag>
                <DivTag className="cc-stat">
                  <DivTag className="cc-stat-num">{caseItem.statNum}</DivTag>
                  <DivTag className="cc-stat-label">{caseItem.statLabel}</DivTag>
                </DivTag>
              </DivTag>

              {/* Card Body */}
              <DivTag className="cc-body">
                <DivTag className="cc-tags">
                  {caseItem.tags.map((tag, i) => (
                    <SpanTag key={i} className="cc-tag">{tag}</SpanTag>
                  ))}
                </DivTag>
                <DivTag className="cc-title">{caseItem.title}</DivTag>
                <DivTag className="cc-desc">{caseItem.desc}</DivTag>
                
                <DivTag className="cc-footer">
                  <SpanTag className="cc-product">{caseItem.product}</SpanTag>
                  {/* Changed to a standard standard <a> tag pointing to caseItem.link */}
                  <a 
                    href={caseItem.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cc-link"
                    style={{ textDecoration: 'none' }}
                  >
                    Read story →
                  </a>
                </DivTag>
              </DivTag>

            </article>
          ))}
          
          {/* Empty State */}
          {filteredCases.length === 0 && (
            <DivTag className="empty-state visible">
              <h3>No stories found for this filter</h3>
              <p>Try selecting a different industry, or view all stories.</p>
            </DivTag>
          )}
        </DivTag>
      </DivTag>
    </>
  );
}