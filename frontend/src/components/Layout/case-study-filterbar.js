'use client';

import { useState } from 'react';
import bfsiImg1 from '@/assets/bfsi_1.avif';
import bfsiImg2 from '@/assets/bfsi_2.avif';
import manufacturingImg1 from '@/assets/manufacturing_1.avif';
import healthcareImg1 from '@/assets/healthcare_1.avif';
import transportationImg1 from '@/assets/transportation_1.avif';
import transportationImg2 from '@/assets/transportation_2.avif';
import realestate1 from '@/assets/real_estate_1.avif';
import realestateImg2 from '@/assets/Real Estate.png';
import energy1 from '@/assets/energy_1.avif';
import bankImg1 from '@/assets/banking case study1.png';
import bankImg2 from '@/assets/bank 2.png';
import bankImg3 from '@/assets/bank 3.png';
import healthcareImgA from '@/assets/healthcare 1.png';
import healthcareImg2 from '@/assets/healthcare 2.png';
import healthcareImg3 from '@/assets/healthcare 3.png';
import manufacturingImgA from '@/assets/manufacturing 1.png';
import manufacturingImg2 from '@/assets/manufacturing 2.png';
import manufacturingImg3 from '@/assets/manufacturing 3.png';
import energyImg2 from '@/assets/energy and utilities 1.png';
import energyImg3 from '@/assets/energy and utilities 2.png';
import governmentImg1 from '@/assets/government 1.png';
import governmentImg2 from '@/assets/government 2.png';
import governmentImg3 from '@/assets/government 3.png';
import technologyImg1 from '@/assets/Technology.png';
import professionalServicesImg1 from '@/assets/Professional services.png';

// ══════════════════════════════════════
// INLINE STYLE OBJECTS — edit values here, changes reflect immediately
// ══════════════════════════════════════
const styles = {
  filterOuter: {
    padding: '24px 0',
    borderBottom: '1px solid #e5e7eb',
  },
  filterInner: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    gap: '10px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 4px',
    scrollbarWidth: 'thin',
    WebkitOverflowScrolling: 'touch',
  },
  filterTab: {
    padding: '8px 18px',
    borderRadius: '999px',
    border: '1px solid #d1d5db',
    background: '#fff',
    color: '#374151',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    flex: '0 0 auto',
  },
  filterTabActive: {
    background: '#f97316',
    color: '#fff',
    border: '1px solid #f97316',
  },
  sectionHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    maxWidth: '1200px',
    margin: '40px auto 20px',
    padding: '0 20px',
  },
  h2: {
    fontSize: '28px',
    fontWeight: 700,
    margin: 0,
    color: '#111827',
  },
  p: {
    fontSize: '15px',
    color: '#6b7280',
    marginTop: '6px',
  },
  countBadge: {
    fontSize: '14px',
    color: '#6b7280',
    whiteSpace: 'nowrap',
  },
  gridWrap: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 60px',
  },
  caseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },
  caseCard: {
    borderRadius: '16px',
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
  },
  ccImage: {
    height: '220px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  ccIndustry: {
    alignSelf: 'flex-start',
    background: 'rgba(255,255,255,0.15)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '999px',
    backdropFilter: 'blur(4px)',
  },
  ccStat: {
    color: '#fff',
  },
  ccStatNum: {
    fontSize: '28px',
    fontWeight: 700,
    lineHeight: 1.1,
  },
  ccStatLabel: {
    fontSize: '11px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  ccBody: {
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
  },
  ccTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  ccTag: {
    fontSize: '11px',
    background: '#f3f4f6',
    color: '#4b5563',
    padding: '3px 9px',
    borderRadius: '999px',
  },
  ccTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1.4,
  },
  ccDesc: {
    fontSize: '13.5px',
    color: '#6b7280',
    lineHeight: 1.5,
  },
  ccFooter: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    borderTop: '1px solid #f3f4f6',
  },
  ccProduct: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  ccLink: {
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#2563eb',
    textDecoration: 'none',
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280',
  },
};

export default function CaseStudiesGrid({ data }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Stories' },
    { id: 'transportation', label: 'Transportation' },
    { id: 'bfsi', label: 'BFSI' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'real_estate_mortgage', label: 'Real Estate & Mortgage' },
    { id: 'energy_utilities', label: 'Energy & Utilities' },
    { id: 'government_public_sector', label: 'Government, Public Sector & Nonprofit' },
    { id: 'technology_software', label: 'Technology & Software' },
    { id: 'professional_services', label: 'Professional Services' },
  ];

  const cases = [
    { id: 1, category: 'transportation', industry: 'Transportation', statNum: '500+', statLabel: 'Documents Daily', tags: ['Documents', 'Logistics', 'Email AI'], title: 'Polaris Transportation: processing 500+ quotation documents per day with DoqumentAI', desc: 'Automation accelerated document-heavy logistics operations and eliminated bottlenecks in high-volume vendor email workflows, scaling to 500+ daily docs without adding headcount.', product: 'DoqumentAI · RPA', image: transportationImg1.src, link: 'https://www.qbdev.unitdtechnologies.com/case-studies/polaris-transportation-v2' },
    { id: 2, category: 'transportation', industry: 'Transportation', statNum: '50%', statLabel: 'INCREASE SHIPMENT QUOTE', tags: ['OCR', 'Logistics', 'RPA'], title: 'How qBotica Transforms Spot Board Monitoring for a Logistics Leader', desc: 'A leading logistics and transportation company faced operational bottlenecks due to manual spot board monitoring and document-heavy workflows.', product: 'DoqumentAI · RPA', image: transportationImg2.src, link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-qbotica-automated-spot-board-monitoring-and-document-processing-for-a-leading-logistics-transportation-company' },
    { id: 3, category: 'bfsi', industry: 'BFSI', statNum: '48%', statLabel: 'PROCESS EFFICIENCY GAIN', tags: ['Annuity', 'Intelligent Extraction', 'STP'], title: 'How a Leading Insurance Firm Modernized Operations for an AI-First Future', desc: 'A leading global insurance and financial services firm with over a century of industry experience and trillions in assets under management.', product: 'Intelligent Extraction', image: bfsiImg1.src, link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-a-leading-insurance-firm-modernized-operations-for-an-ai-first-future' },
    { id: 4, category: 'bfsi', industry: 'BFSI', statNum: '90%', statLabel: 'COST AND TIME SAVINGS', tags: ['Data Translation', 'eStatements', 'eReceipts'], title: 'How qBotica Enabled A Top Financial Services Company To Increase Their Cost And Time Savings By Over 90%', desc: 'One of the leading financial services firms wished to digitally transform its business processes through automation.', product: 'DoqumentAI · RPA as a Service', image: bfsiImg2.src, link: 'https://www.qbdev.unitdtechnologies.com/case-studies/qbotica-enabled-a-top-financial-services-company-to-increase-their-cost-and-time-savings-by-over-90' },
    { id: 5, category: 'healthcare', industry: 'Healthcare', statNum: '7x', statLabel: 'CLAIMS PROCESSING CAPACITY', tags: ['Claims', 'IDP', 'EMR Integration'], title: 'How qBotica Helped a Top Healthcare Company Scale Claims Processing by 7X', desc: 'A leading North American healthcare organization faced growing pressure to process claims faster while maintaining accuracy.', product: 'UiPath RPA', image: healthcareImg1.src, link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-qbotica-helped-a-top-healthcare-company-scale-claims-processing-by-7x' },
    { id: 6, category: 'manufacturing', industry: 'Manufacturing', statNum: '99%', statLabel: 'DOCUMENTATION ERROR REDUCTION', tags: ['Reconciliation', 'ERP Integration'], title: 'How qBotica Reduced Documentation Errors by 99% for a Leading Manufacturer', desc: 'A leading North American manufacturing company specializing in protective and packaging solutions experienced rapid growth through multiple acquisitions.', product: 'UiPath RPA • OCR Technology', image: manufacturingImg1.src, link: 'https://www.qbdev.unitdtechnologies.com/case-studies/how-qbotica-reduced-documentation-errors-by-99-for-a-leading-manufacturer' },
    { id: 7, category: 'real_estate_mortgage', industry: 'Real Estate & Mortgage', statNum: '99.99%', statLabel: 'ERROR ACCURACY', tags: ['DoqumentAI', 'Real Estate'], title: 'How qBotica enabled P&L Automation for a Real Estate leader', desc: 'qBotica\u2019s DoqumentAI product helped the client by processing the Input files hence reducing manual effort and error in data extraction.', product: 'DoqumentAI', image: realestate1.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-enabled-pl-automation-for-a-real-estate-leader' },
    { id: 8, category: 'energy_utilities', industry: 'Energy & Utilities', statNum: '95%', statLabel: 'TIME SAVINGS', tags: ['RPA', 'Global Operations'], title: 'Driving 95% time savings across four global markets for an energy company', desc: 'RPA helped a global energy company scale process efficiency, standardize recurring operational tasks, and reduce manual workloads.', product: 'RPA • Automation', image: energy1.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-implemented-rpa-solutions-in-4-markets-to-enable-a-global-energy-company-to-gain-95-time-savings' },
    { id: 9, category: 'bfsi', industry: 'BFSI', statNum: '100s', statLabel: 'OF DOCUMENTS AUTOMATED', tags: ['GenAI', 'Document Intelligence', 'Contract Pricing'], title: 'How qBotica Took the Pain Out of Pricing using GenAI and Automation for a Large Financial Services Company', desc: 'GenAI and document intelligence automated contract pricing analysis, accelerating quote creation while eliminating manual review.', product: 'GenAI · Document Intelligence', image: bankImg1.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-took-the-pain-out-of-pricing-using-genai-and-automation-for-a-large-financial-services-company' },
    { id: 10, category: 'bfsi', industry: 'BFSI', statNum: '75%', statLabel: 'PROCESSING TIME REDUCTION', tags: ['Unattended Automation', 'Banking', 'Error Reduction'], title: 'How qBotica Helped a Global Top 10 Bank Reduce Processing Time by 75% and Errors by 90%', desc: 'Unattended automation transformed banking operations by reducing processing time 75% while virtually eliminating manual errors.', product: 'Unattended RPA', image: bankImg2.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-helped-a-global-top-10-bank-reduce-processing-time-by-75-and-errors-by-90' },
    { id: 11, category: 'healthcare', industry: 'Healthcare', statNum: 'Faster', statLabel: 'PROVIDER ONBOARDING', tags: ['Medicare', 'Provider Enrollment', 'AI'], title: 'AI-Powered Transformation of Medicare Provider Enrollment for a Fortune 100 Health Leader', desc: 'AI-powered enrollment automation accelerated provider onboarding while improving data quality and reducing administrative processing times.', product: 'AI · Intelligent Automation', image: healthcareImg2.src, link: 'https://www.qbotica.com/case-studies/ai-powered-transformation-of-medicare-provider-enrollment-for-a-fortune-100-health-leader' },
    { id: 12, category: 'healthcare', industry: 'Healthcare', statNum: 'Faster', statLabel: 'FINANCIAL REPORTING', tags: ['Reconciliation', 'Financial Accuracy', 'Reporting'], title: 'Enhancing Data Reconciliation for a Leader in Health Services with Automation', desc: 'Automated data reconciliation eliminated repetitive manual comparisons, improving financial accuracy and accelerating healthcare reporting workflows.', product: 'RPA · Automation', image: healthcareImg3.src, link: 'https://www.qbotica.com/case-studies/enhancing-data-reconciliation-for-leader-in-health-services-with-automation' },
    { id: 13, category: 'manufacturing', industry: 'Manufacturing', statNum: 'Improved', statLabel: 'WAREHOUSE ACCURACY', tags: ['Inventory', 'Traceability', 'Warehouse'], title: 'Inventory Tag Automation for a Nanomaterials Product Manufacturing Company', desc: 'Automated inventory tagging improved material traceability, reduced manual labeling, and increased warehouse accuracy across manufacturing operations.', product: 'RPA · Automation', image: manufacturingImg2.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-enabled-inventory-tag-automation-for-a-nanomaterials-product-manufacturing-company' },
    { id: 14, category: 'energy_utilities', industry: 'Energy & Utilities', statNum: 'Reduced', statLabel: 'COMPLIANCE RISK', tags: ['Shipment Documents', 'Trading', 'Refinery'], title: 'Shipment Document Processing for a Physical Trading & Refinery Company', desc: 'Intelligent document processing automated shipment documentation, accelerating logistics workflows while reducing manual processing and compliance risks.', product: 'DoqumentAI · RPA', image: energyImg2.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-helped-a-physical-trading-refinery-company-processing-their-shipment-documents-2' },
    { id: 15, category: 'government_public_sector', industry: 'Government, Public Sector & Nonprofit', statNum: '4x', statLabel: 'FASTER DOCUMENT PROCESSING', tags: ['Document Processing', 'Government', 'IDP'], title: 'How a Government Organization Started Processing Documents 4x Faster', desc: 'Intelligent document processing digitized high-volume government workflows, reducing turnaround times and increasing document throughput by 4x.', product: 'DoqumentAI · IDP', image: governmentImg1.src, link: 'https://www.qbotica.com/case-studies/how-a-government-organization-started-processing-documents-4x-faster-with-qbotica-2' },
    { id: 16, category: 'government_public_sector', industry: 'Government, Public Sector & Nonprofit', statNum: '99%', statLabel: 'ACCURACY IMPROVEMENT', tags: ['Public Sector', 'Accuracy', 'Efficiency'], title: 'How qBotica Helped a Government Organization Improve Accuracy by 99% While Increasing Processing Efficiency by 85%', desc: 'Public sector automation modernized document-intensive workflows, boosting accuracy by 99% while improving operational efficiency by 85%.', product: 'RPA · Automation', image: governmentImg2.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-helped-a-government-organization-improve-accuracy-by-99-at-the-same-time-increasing-processing-efficiency-by-85' },
    { id: 17, category: 'government_public_sector', industry: 'Government, Public Sector & Nonprofit', statNum: 'Safer', statLabel: 'LEARNING ENVIRONMENTS', tags: ['Nonprofit', 'Compliance', 'Child Safety'], title: 'How qBotica Helped a Global Non-profit Organization Create a Safe Learning Environment for Kids', desc: 'Intelligent automation streamlined child safety and compliance processes, improving operational visibility while reducing administrative workload.', product: 'RPA · Automation', image: governmentImg3.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-helped-a-global-non-profit-organization-create-a-safe-learning-environment-for-kid' },
    { id: 18, category: 'technology_software', industry: 'Technology & Software', statNum: '1M+', statLabel: 'INVOICES PROCESSED ANNUALLY', tags: ['Technology', 'High-Volume Invoicing', 'AP Automation'], title: 'How qBotica Helped a Fortune 500 Technology Products Company Process 1 Million+ Invoices Each Year', desc: 'AI-powered invoice automation streamlined AP operations, enabling the processing of over one million invoices annually with greater speed and accuracy.', product: 'AI · Invoice Automation', image: technologyImg1.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-helped-a-fortune-500-technology-products-company-to-process-1million-invoices-each-year' },
    { id: 19, category: 'professional_services', industry: 'Professional Services', statNum: 'Faster', statLabel: 'AP APPROVAL CYCLES', tags: ['Professional Services', 'AP Automation', 'Finance Ops'], title: 'AI Invoice Processing', desc: 'AI-powered invoice processing automated data extraction, validation, and approvals to accelerate accounts payable and reduce manual effort across finance operations.', product: 'AI · Invoice Automation', image: professionalServicesImg1.src, link: 'https://www.qbotica.com/case-studies/ai-invoice-processing' },
    { id: 20, category: 'bfsi', industry: 'BFSI', statNum: '90%', statLabel: 'COST AND TIME SAVINGS', tags: ['Process Automation', 'Cost Savings', 'Finance'], title: 'How qBotica Enabled a Top Financial Services Company to Increase Cost and Time Savings by Over 90%', desc: 'End-to-end financial process automation reduced manual effort, delivering over 90% savings in both operational costs and processing time.', product: 'RPA · Automation', image: bankImg3.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-enabled-a-top-financial-services-company-to-reduce-their-cost-and-increase-time-savings-by-over-90-percent' },
    { id: 21, category: 'healthcare', industry: 'Healthcare', statNum: '7x', statLabel: 'CLAIMS PROCESSING CAPACITY', tags: ['Claims', 'Automation', 'Scalability'], title: 'How qBotica Increased Claims Processing By Over 7x for a Top Healthcare Client', desc: 'Intelligent claims automation increased processing capacity more than 7x while improving accuracy and enabling rapid scaling without additional staffing.', product: 'RPA · Automation', image: healthcareImgA.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-increased-claims-processing-by-over-7x-for-a-top-healthcare-client' },
    { id: 22, category: 'manufacturing', industry: 'Manufacturing', statNum: '99%', statLabel: 'FEWER RECONCILIATION ERRORS', tags: ['Month-End Close', 'Finance Automation', 'Manufacturing'], title: 'How qBotica Helped a Leading Manufacturer Get Faster Month-End Closures with 99% Reduction in Errors', desc: 'Finance automation accelerated month-end close processes, reducing reconciliation errors by 99% and improving financial reporting speed.', product: 'RPA · Automation', image: manufacturingImgA.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-helped-a-leading-manufacturer-get-faster-month-end-closures-with-99-reduction-in-errors' },
    { id: 23, category: 'transportation', industry: 'Transportation', statNum: '500+', statLabel: 'DOCUMENTS PROCESSED DAILY', tags: ['Documents', 'Supply Chain Software', 'Email AI'], title: 'How qBotica Helped a Transportation & Supply Chain Software Company Process 500+ Documents in a Day', desc: 'Automation accelerated document-heavy logistics operations and eliminated bottlenecks in high-volume vendor email workflows.', product: 'DoqumentAI · RPA', image: manufacturingImg3.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-helped-a-transportation-supply-chain-software-company-process-500-documents-in-a-day' },
    { id: 24, category: 'energy_utilities', industry: 'Energy & Utilities', statNum: '95%', statLabel: 'TIME SAVINGS ACROSS 4 MARKETS', tags: ['RPA', 'Global Operations', 'Standardization'], title: 'How qBotica Implemented RPA Solutions in 4 Markets to Enable a Global Energy Company to Gain 95% Time Savings', desc: 'Enterprise automation standardized operations across four markets, delivering 95% time savings and improving process consistency.', product: 'RPA · Automation', image: energyImg3.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-implemented-rpa-solutions-in-4-markets-to-enable-a-global-energy-company-to-gain-95-time-savings' },
    { id: 25, category: 'real_estate_mortgage', industry: 'Real Estate & Mortgage', statNum: '99.99%', statLabel: 'ERROR ACCURACY', tags: ['Financial Automation', 'P&L Reporting', 'Real Estate'], title: 'P&L Automation for a Real Estate Leader', desc: 'Financial automation streamlined profit and loss reporting, reducing manual reconciliation and delivering faster financial insights for property operations.', product: 'DoqumentAI', image: realestateImg2.src, link: 'https://www.qbotica.com/case-studies/how-qbotica-enabled-pl-automation-for-a-real-estate-leader' },
  ];

  const filteredCases = activeFilter === 'all'
    ? cases
    : cases.filter((c) => c.category === activeFilter);

  return (
    <>
      {/* ══════ FILTER BAR ══════ */}
      <div style={styles.filterOuter} id="case-studies">
        <div style={styles.filterInner}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              style={{
                ...styles.filterTab,
                ...(activeFilter === filter.id ? styles.filterTabActive : {}),
              }}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════ SECTION HEADER ══════ */}
      <div style={styles.sectionHead}>
        <div>
          <h2 style={styles.h2}>Browse stories by industry</h2>
          <p style={styles.p}>Real outcomes from real enterprises — select an industry to filter.</p>
        </div>
        <span style={styles.countBadge}>{filteredCases.length} stories</span>
      </div>

      {/* ══════ CASE GRID ══════ */}
      <div style={styles.gridWrap}>
        <div style={styles.caseGrid}>
          {filteredCases.map((caseItem) => (
            <a
              key={caseItem.id}
              href={caseItem.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.caseCard}
            >
              <div
                style={{
                  ...styles.ccImage,
                  backgroundImage: `linear-gradient(to bottom, rgba(11,17,32,0.12) 0%, rgba(11,17,32,0.75) 100%), url('${caseItem.image}')`,
                }}
              >
                <span style={styles.ccIndustry}>{caseItem.industry}</span>
                <div style={styles.ccStat}>
                  <div style={styles.ccStatNum}>{caseItem.statNum}</div>
                  <div style={styles.ccStatLabel}>{caseItem.statLabel}</div>
                </div>
              </div>

              <div style={styles.ccBody}>
                <div style={styles.ccTags}>
                  {caseItem.tags.map((tag, i) => (
                    <span key={i} style={styles.ccTag}>{tag}</span>
                  ))}
                </div>
                <div style={styles.ccTitle}>{caseItem.title}</div>
                <div style={styles.ccDesc}>{caseItem.desc}</div>

                <div style={styles.ccFooter}>
                  <span style={styles.ccProduct}>{caseItem.product}</span>
                  <span style={styles.ccLink}>Read story →</span>
                </div>
              </div>
            </a>
          ))}

          {filteredCases.length === 0 && (
            <div style={styles.emptyState}>
              <h3>No stories found for this filter</h3>
              <p>Try selecting a different industry, or view all stories.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}