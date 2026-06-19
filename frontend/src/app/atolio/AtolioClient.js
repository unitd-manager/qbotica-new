"use client";
import { useState } from 'react';
import styles from '@/components/Common/home-new.module.css';

const BODY_TABS = [
  {
    number: '01',
    label: 'Announcement',
    text: "Atolio, a secure, self-hosted enterprise AI search platform, and qBotica, a Deloitte Technology Fast 500 intelligent automation as-a-services provider, today announced a strategic partnership that combines Atolio's permission-aware AI search with qBotica's automation services. This collaboration aims to empower global enterprises by integrating Atolio's powerful information discovery platform with qBotica's deep expertise in intelligent automation and digital transformation, bringing together two organizations uniquely positioned to serve the most demanding regulated industries in the market.",
  },
  {
    number: '02',
    label: 'The Challenge',
    text: "Enterprise teams increasingly hit the same wall: automation workflows are only as good as the data they can reach, and that data sits behind permission models scattered across Jira, Confluence, Slack, SharePoint, Google Drive, and dozens of other systems. Through this partnership, qBotica will resell Atolio's AI driven search as part of its automation-as-a-service suite, giving joint clients a single layer that respects document-level permissions in real time across the full enterprise stack.",
  },
  {
    number: '03',
    label: 'Deployment',
    text: "Atolio runs entirely inside the customer's environment, including AWS, Azure, GCP, and air-gapped Kubernetes deployments. The platform is already in production at organizations including U.S. Air Force Platform One and other regulated enterprises. qBotica brings enterprise relationships and implementation expertise across the United States, Canada, and the United Kingdom, with marquee clients in financial services, insurance, and enterprise operations.",
  },
  {
    number: '04',
    label: 'David Lanstein',
    text: "“Atolio and qBotica share a customer base that demands both secure infrastructure and real workflow automation,” said David Lanstein, Co-founder and CEO of Atolio. “Most enterprise AI tools can’t run inside a regulated customer’s environment. qBotica’s clients have been asking for one that can, and this partnership delivers it as one motion.”",
  },
  {
    number: '05',
    label: 'Mahesh Vinayagam',
    text: "“Atolio’s in-environment deployment and permission-aware architecture are a direct fit for what our financial services and insurance clients are asking for,” said Mahesh Vinayagam, CEO of qBotica. “Embedding secure AI search inside our automation workflows gives those clients a clearer path to data-driven decisions without compromising on compliance.”",
  },
];

const OUTCOMES = [
  {
    icon: '◈',
    label: 'Unified data intelligence across cloud and on-premise tools.',
    text: "Seamless, permission-aware access to fragmented data, with real-time enforcement of document-level permissions across the enterprise stack.",
  },
  {
    icon: '▣',
    label: 'Self-hosted deployment, including air-gapped environments.',
    text: "Enterprise-grade security protocols ensure data privacy and full compliance for highly regulated industries, with no data leaving the customer's environment.",
  },
  {
    icon: '✦',
    label: 'AI search embedded directly into automation workflows.',
    text: "Reduced time-to-knowledge for employees for greater operational efficiency, with AI powered search wired into qBotica's digital workers and agentic automation allowing teams to focus on high-value tasks.",
  },
];

export function AtolioTabs() {
  const [active, setActive] = useState(0);
  return (
    <section className={styles.interactiveSection} id="partnership-body">
      <div className={styles.interactiveHeader}>
        <div className={styles.interactiveKicker}>[CITY, STATE] &mdash; May 12, 2026</div>
        <h2>qBotica and Atolio Partner to Power AI Agents with Secure, Instant Access to Enterprise Knowledge</h2>
      </div>
      <div className={styles.interactiveWrapper}>
        <article className={`${styles.contentCard} ${styles.fade}`} key={active}>
          <div className={styles.contentNumber}>{BODY_TABS[active].number}</div>
          <p>{BODY_TABS[active].text}</p>
        </article>
        <div className={styles.tabButtons} role="tablist">
          {BODY_TABS.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.tabButton} ${active === idx ? styles.activeTab : ''}`}
              onClick={() => setActive(idx)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AtolioOutcomes() {
  const [active, setActive] = useState(0);
  return (
    <section className={styles.impactSection} id="outcomes">
      <div className={styles.impactHeader}>
        <h2>The partnership is focused on delivering three outcomes for joint clients:</h2>
      </div>

      <div className={styles.impactGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {OUTCOMES.map((item, idx) => (
          <article
            key={idx}
            className={`${styles.impactCard} ${active === idx ? styles.activeImpact : ''}`}
            onClick={() => setActive(idx)}
            onMouseEnter={() => setActive(idx)}
            tabIndex={0}
            onFocus={() => setActive(idx)}
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
          <div className={styles.impactDetailLabel}>0{active + 1}</div>
          <h3>{OUTCOMES[active].label}</h3>
          <p>{OUTCOMES[active].text}</p>
        </div>
      </div>
    </section>
  );
}
