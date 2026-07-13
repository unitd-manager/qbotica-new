"use client";
import React, { useState } from 'react';
import styles from '../Common/home-new.module.css';

const TABS_DATA = [
  { number: '01', label: 'Agentic AI', title: 'Agentic AI That Actually Works', text: 'Agentic AI is not chatbots or copilots. It’s an execution model where AI doesn’t just assist — it acts. It understands the work, makes decisions, and executes tasks across your existing systems. It doesn’t stop at insight. It completes the job. This is the shift from ‘How can AI help?’ to ‘Let AI handle it.’', desc: 'AI that acts, executes, and completes operational work.' },
  { number: '02', label: 'Why AI Fails', title: 'Why Most AI Fails in Operations', text: 'Most AI tools fail for one reason: they stop before execution. Traditional platforms identify problems but leave resolution to your team. Assistants support individuals, but they don’t complete workflows across systems. The challenge isn’t the model — it’s operating in the messy reality of documents, approvals, exceptions, and legacy environments.', desc: 'Why most AI never reaches operational execution.' },
  { number: '03', label: 'Execution Engine', title: 'We Don’t Deploy Tools. We Run Work.', text: 'qBotica converges AI agents, automation, and orchestration into a single execution engine. We handle the messy reality of business: reading messy documents, making complex decisions, and taking action in legacy ERPs.This isn’t a demo. This is Agentic AI in production.', desc: 'Where AI agents, automation, and orchestration converge.' },
  { number: '04', label: 'How It Works', title: 'How Agentic AI Runs the Business', text: 'Agentic AI operates through four intelligent stages: Understand, Decide, Act, and Orchestrate. It first analyzes business data from documents, emails, and enterprise systems to understand context and intent. It then applies AI reasoning and business rules to make informed decisions, executes actions across workflows and applications, and finally coordinates multiple agents, automation systems, and human input to manage complex business operations at enterprise scale. This end-to-end approach enables faster decisions, streamlined processes, and intelligent automation across the organization.', desc: 'Understand, decide, act, and orchestrate business operations.' },
  { number: '05', label: 'The Vision', title: 'The Vision', text: 'For two hundred years, organizations have been built around the same constraint: humans were the only available unit of intelligent execution.That assumption is now changing. qBotica helps enterprises shift from human-coordinated workflows to natively agentic operations, where agents become the default executor and humans stay focused on judgment, oversight, and strategy.', desc: 'The shift toward natively agentic enterprises.' }
];

export default function QboticaApproach() {
  const [activeTab, setActiveTab] = useState(0);

  const sanitize = (html) => {
    if (!html) return '';
    return String(html).replace(/<[^>]*>/g, '').trim();
  };

  const buildTabs = (src) => {
    if (!src || !Array.isArray(src) || src.length === 0) return TABS_DATA;
    return src.map((s, i) => {
      const title = s?.main_title || s?.title || s?.kicker || `Section ${i + 1}`;
      const text = s?.description
        ? sanitize(s.description)
        : (s?.steps && Array.isArray(s.steps)
            ? s.steps.slice(0, 3).map(st => sanitize(st.title || st.description || '')).filter(Boolean).join('. ')
            : (s?.timelines && Array.isArray(s.timelines)
                ? s.timelines.slice(0, 3).map(t => sanitize(t.left?.title || t.right?.title || t.left?.description || '')).filter(Boolean).join('. ')
                : (s?.main_solutions && Array.isArray(s.main_solutions)
                    ? (s.main_solutions[0]?.solutions_list || []).slice(0,3).map(sol => sanitize(sol.title)).filter(Boolean).join(', ')
                    : '')));
      const desc = s?.description || s?.kicker || '';
      const label = (s?.kicker && sanitize(s.kicker)) || sanitize(title).split(' ').slice(0,2).join(' ');
      const number = String(i + 1).padStart(2, '0');
      return { number, label, title: sanitize(title), text, desc };
    });
  };

  const tabs = TABS_DATA;

  return (
    <section className={styles.interactiveSection} id="interactive">
      <div className={styles.interactiveHeader}>
        <div className={styles.sectionKickerPill}>qBotica Approach</div>
        <h2>From AI assistance to AI execution</h2>
      </div>

      <div className={styles.interactiveWrapper}>
        <article className={`${styles.contentCard} ${styles.fade}`} key={activeTab}>
          {/* <div className={styles.contentNumber}>{tabs[activeTab].number}</div> */}
          <h3>{tabs[activeTab].title}</h3>
          <p>{tabs[activeTab].text}</p>
          <button
            type="button"
            className={styles.nextPreview}
            onClick={() => setActiveTab((activeTab + 1) % tabs.length)}
            aria-label={`Go to next section: ${tabs[(activeTab + 1) % tabs.length].title}`}
          >
            <span className={styles.nextPreviewLabel}>Next</span>
            <span className={styles.nextPreviewTitle}>
              <span className={styles.nextPreviewIcon} aria-hidden="true">✈</span>
              {tabs[(activeTab + 1) % tabs.length].label}
            </span>
          </button>
        </article>

        <div
          className={styles.tabWrapper}
          role="tablist"
          aria-label="Automation approach tabs"
          style={{ '--plane-top': activeTab === tabs.length - 1 ? '90%' : `${(activeTab + 1) * 20}%` }}
        >
          <div className={styles.timelineTrack} />
          <span className={styles.airplaneIcon} aria-hidden="true">✈</span>
          {tabs.map((tab, idx) => (
            <React.Fragment key={idx}>
              <div className={styles.timelineCell}>
                <span className={`${styles.timelineDot} ${activeTab === idx ? styles.activeDot : ''}`} aria-hidden="true" />
              </div>
              <button
                type="button"
                className={`${styles.tabButton} ${activeTab === idx ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabDescription}>{tab.desc}</span>
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
