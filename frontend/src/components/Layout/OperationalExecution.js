"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../components/Common/home-new.module.css';

const IMPACT_DATA = [
  { icon: '◈', label: 'Claims Processing', title: 'Move claims from intake to action.', text: 'AI agents process intake documents, validate data, apply business rules, route exceptions, and coordinate approvals across enterprise systems — reducing manual handling while keeping humans in control where judgment matters.', tags: ['Document Intelligence', 'Decision Automation', 'Workflow Routing', 'Human Oversight'] },
  { icon: '▣', label: 'Financial Operations', title: 'Close gaps across finance workflows.', text: 'qBotica supports reconciliation, reporting, audit preparation, exception handling, and ERP coordination so finance teams can move faster with greater accuracy and operational visibility.', tags: ['Reconciliation', 'Reporting', 'Audit Support', 'ERP Coordination'] },
  { icon: '✦', label: 'Customer Operations', title: 'Accelerate service execution at scale.', text: 'AI-powered workflows help coordinate customer requests, route work, trigger next steps, and support faster resolution across contact centers, service teams, and back-office operations.', tags: ['Service Routing', 'Response Coordination', 'Workflow Automation', 'Operational Visibility'] },
  { icon: '◎', label: 'Supply Chain & Logistics', title: 'Coordinate operations across moving parts.', text: 'Automate scheduling, vendor communication, approvals, document handling, and operational decisions across logistics networks, enterprise systems, and distributed teams.', tags: ['Scheduling', 'Approvals', 'Vendor Coordination', 'Process Visibility'] },
  { icon: '◇', label: 'Shared Services', title: 'Reduce repetitive work across internal teams.', text: 'qBotica helps automate high-volume internal workflows across HR, procurement, onboarding, and shared services while preserving governance, controls, and human oversight.', tags: ['HR Operations', 'Procurement', 'Onboarding', 'Governance'] }
];

export default function OperationalExecution() {
  const [activeImpact, setActiveImpact] = useState(0);
  const router = useRouter();

  const CASE_STUDY_PATHS = [
    '/case-studies/industry/claims-processing',
    '/case-studies/industry/finance',
    '/case-studies/industry/customer-operations',
    '/case-studies/industry/supply-chain-logistics',
    '/case-studies/industry/shared-services'
  ];

  return (
    <section className={styles.impactSection} id="impact">
      <div className={styles.impactHeader}>
        <div className={styles.sectionKickerPill}>Operational Execution</div>
        <h2>Enterprise workflows executed by qBotica.</h2>
        <p>We focus on the operational workflows where speed, accuracy, decisions, and system coordination create measurable business impact.</p>
      </div>

      <div className={styles.impactGrid} aria-label="Enterprise workflow areas">
        {IMPACT_DATA.map((item, idx) => (
          <article
            key={idx}
            className={`${styles.impactCard} ${activeImpact === idx ? styles.activeImpact : ''}`}
            onClick={() => { setActiveImpact(idx); router.push(CASE_STUDY_PATHS[idx] || '/case-studies'); }}
            onMouseEnter={() => setActiveImpact(idx)}
            onFocus={() => setActiveImpact(idx)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveImpact(idx); router.push(CASE_STUDY_PATHS[idx] || '/case-studies'); } }}
            tabIndex={0}
            role="link"
          >
            <div>
              <div className={styles.impactTopline}>
                <span className={styles.impactNumber}>0{idx + 1}</span>
                <span className={styles.impactIcon}>{item.icon}</span>
              </div>
              <h3>{item.label}</h3>
            </div>
            <p>{item.text.slice(0, 70)}...</p>
          </article>
        ))}
      </div>

      <div className={styles.impactDetail}>
        <div className={styles.impactDetailContent}>
          <div className={styles.impactDetailLabel}>{IMPACT_DATA[activeImpact].label}</div>
          <h3>{IMPACT_DATA[activeImpact].title}</h3>
          <p>{IMPACT_DATA[activeImpact].text}</p>
          <div className={styles.impactTags}>
            {IMPACT_DATA[activeImpact].tags.map((tag, tagIdx) => (
              <span key={tagIdx}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
