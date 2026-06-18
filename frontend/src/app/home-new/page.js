"use client"

import { useState } from "react";
import styles from './../../components/Common/home-new.module.css'; // Ensure this matches your project's directory structure
import FinalCTASection from '@/components/Layout/FinalCTASection';
import ClientHighlights from '@/components/Layout/ClientHighlights';

// 1. DATA STRUCTURES (Add any extra text/sections safely here)
const TABS_DATA = [
  { number: "01", label: "Agentic AI", title: "Agentic AI That Actually Works", text: "Agentic AI is not chatbots or copilots. It’s an execution model where AI doesn’t just assist — it acts. It understands the work, makes decisions, and executes tasks across your existing systems. It doesn’t stop at insight. It completes the job. This is the shift from ‘How can AI help?’ to ‘Let AI handle it.’", desc: "AI that acts, executes, and completes operational work." },
  { number: "02", label: "Why AI Fails", title: "Why Most AI Fails in Operations", text: "Most AI tools fail for one reason: they stop before execution. Traditional platforms identify problems but leave resolution to your team. Assistants support individuals, but they don’t complete workflows across systems. The challenge isn’t the model — it’s operating in the messy reality of documents, approvals, exceptions, and legacy environments.", desc: "Why most AI never reaches operational execution." },
  { number: "03", label: "Execution Engine", title: "We Don’t Deploy Tools. We Run Work.", text: "qBotica converges AI agents, automation, and orchestration into a single execution engine. We handle the complexity of real enterprise operations — unstructured documents, business rules, approvals, exceptions, and legacy ERPs. This isn’t experimentation. This is Agentic AI running in production.", desc: "Where AI agents, automation, and orchestration converge." },
  { number: "04", label: "How It Works", title: "How Agentic AI Runs the Business", text: "Agentic AI creates a complete execution layer that understands, decides, acts, and orchestrates work across the enterprise. AI agents process documents, emails, CRMs, spreadsheets, and enterprise systems to understand context, apply reasoning, execute actions across platforms, and coordinate workflows with humans in the loop.", desc: "Understand, decide, act, and orchestrate business operations." },
  { number: "05", label: "The Vision", title: "The Vision", text: "The next generation of organizations will be natively agentic. qBotica helps enterprises transition from human-coordinated workflows to agentic operations, where AI agents become the default executor and humans focus on strategy, oversight, and judgment. The result is scalable execution, encoded operational knowledge, and fully observable enterprise workflows.", desc: "The shift toward natively agentic enterprises." }
];

const IMPACT_DATA = [
  { icon: "◈", label: "Claims Processing", title: "Move claims from intake to action.", text: "AI agents process intake documents, validate data, apply business rules, route exceptions, and coordinate approvals across enterprise systems — reducing manual handling while keeping humans in control where judgment matters.", tags: ["Document Intelligence", "Decision Automation", "Workflow Routing", "Human Oversight"] },
  { icon: "▣", label: "Financial Operations", title: "Close gaps across finance workflows.", text: "qBotica supports reconciliation, reporting, audit preparation, exception handling, and ERP coordination so finance teams can move faster with greater accuracy and operational visibility.", tags: ["Reconciliation", "Reporting", "Audit Support", "ERP Coordination"] },
  { icon: "✦", label: "Customer Operations", title: "Accelerate service execution at scale.", text: "AI-powered workflows help coordinate customer requests, route work, trigger next steps, and support faster resolution across contact centers, service teams, and back-office operations.", tags: ["Service Routing", "Response Coordination", "Workflow Automation", "Operational Visibility"] },
  { icon: "◎", label: "Supply Chain & Logistics", title: "Coordinate operations across moving parts.", text: "Automate scheduling, vendor communication, approvals, document handling, and operational decisions across logistics networks, enterprise systems, and distributed teams.", tags: ["Scheduling", "Approvals", "Vendor Coordination", "Process Visibility"] },
  { icon: "◇", label: "Shared Services", title: "Reduce repetitive work across internal teams.", text: "qBotica helps automate high-volume internal workflows across HR, procurement, onboarding, and shared services while preserving governance, controls, and human oversight.", tags: ["HR Operations", "Procurement", "Onboarding", "Governance"] }
];

export default function QboticaHomepage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeImpact, setActiveImpact] = useState(0);

  return (
    <div className={styles.bodyWrapper}>
      
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>Enterprise Agentic AI</div>
          <h1>Agentic AI<br />That Runs Your Business.</h1>
          <p>qBotica helps enterprises operationalize Agentic AI across real business workflows — combining AI reasoning, automation, orchestration, and enterprise execution.</p>
          <div className={styles.heroButtons}>
            <a className={styles.buttonPrimary} href="#interactive">Explore the Execution Model →</a>
            <a className={styles.heroSecondaryButton} href="#client-highlight">See Enterprise Results</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.orbGlow}></div>
          <div className={styles.orbCore}></div>
          <div className={styles.orbRing + " " + styles.ring1}></div>
          <div className={styles.orbRing + " " + styles.ring2}></div>
          <div className={styles.orbRing + " " + styles.ring3}></div>
        </div>
      </section>

      {/* 2. PARTNERS STRIP */}
      <section className={styles.partnersStrip}>
        <div className={styles.partnersInner}>
          <div className={styles.partnersCopy}>
            <h2>Built with the enterprise ecosystem.</h2>
            <p>qBotica works across leading platforms and technologies to deliver what fits your environment.</p>
            <div style={{ marginTop: "20px" }}>
              <a className={styles.buttonPrimary} href="#">Explore Partnerships →</a>
            </div>
          </div>
          <div className={styles.partnerLogos}>
            <div className={styles.partnerLogo}>UiPath</div>
            <div className={styles.partnerLogo}>Microsoft</div>
            <div className={styles.partnerLogo}>Kognitos</div>
            <div className={styles.partnerLogo}>Enterprise AI</div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE APPROACH SECTION */}
      <section className={styles.interactiveSection} id="interactive">
        <div className={styles.interactiveHeader}>
          <div className={styles.interactiveKicker}>qBotica Approach</div>
          <h2>From AI assistance to AI execution.</h2>
        </div>

        <div className={styles.interactiveWrapper}>
          {/* Key prop ensures the animation fires on changing indices */}
          <article className={`${styles.contentCard} ${styles.fade}`} key={activeTab}>
            <div className={styles.contentNumber}>{TABS_DATA[activeTab].number}</div>
            <h3>{TABS_DATA[activeTab].title}</h3>
            <p>{TABS_DATA[activeTab].text}</p>
            <a className={styles.buttonPrimary} href="#impact">See how it works →</a>
          </article>

          <div className={styles.tabButtons} role="tablist" aria-label="Automation approach tabs">
            {TABS_DATA.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.tabButton} ${activeTab === idx ? styles.activeTab : ""}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className={styles.tabLabel}>{tab.label}</span>
                <span className={styles.tabDescription}>{tab.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORKFLOW IMPACT SECTION */}
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
              className={`${styles.impactCard} ${activeImpact === idx ? styles.activeImpact : ""}`}
              onClick={() => setActiveImpact(idx)}
              onMouseEnter={() => setActiveImpact(idx)}
              onFocus={() => setActiveImpact(idx)}
              tabIndex={0}
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

      <ClientHighlights />

      {/* 6. LOGO SECTION */}
      <section className={styles.logoSection}>
        <div className={styles.simpleHeader}>
          <div className={styles.sectionKickerPill}>Enterprise Trust</div>
          <h2>Trusted across enterprise environments.</h2>
          <p>qBotica supports organizations across complex, regulated, and operationally intensive business functions.</p>
        </div>
        <div className={styles.logosCarousel}>
          <div className={styles.logosTrack}>
            {Array(16).fill("Client Logo").map((logoText, i) => (
              <div key={i} className={styles.clientLogo}>{logoText}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AWARDS SECTION */}
      <section className={styles.awardsSection}>
        <div className={styles.simpleHeader}>
          <div className={styles.sectionKickerPill}>Awards & Recognition</div>
          <h2>Recognized for enterprise automation leadership.</h2>
          <p>Market recognition reinforces qBotica’s focus on delivery, innovation, and measurable business outcomes.</p>
        </div>
        <div className={styles.awardsGrid}>
          <div className={styles.awardCard}><div className={styles.badge}>★</div><h3>Innovation Recognition</h3><p>Recognized for practical AI and automation solutions designed for enterprise operations.</p></div>
          <div className={styles.awardCard}><div className={styles.badge}>◆</div><h3>Partner Excellence</h3><p>Trusted across leading enterprise technology ecosystems and automation platforms.</p></div>
          <div className={styles.awardCard}><div className={styles.badge}>●</div><h3>Delivery Impact</h3><p>Focused on measurable results, production workflows, and long-term operational value.</p></div>
        </div>
      </section>

      {/* 8. LATEST NEWS SECTION */}
      <section className={styles.newsSection}>
        <div className={styles.simpleHeader}>
          <div className={styles.sectionKickerPill}>Latest From qBotica</div>
          <h2>Building the future of enterprise execution.</h2>
          <p>Explore the latest updates, insights, customer stories, and thought leadership from the qBotica team.</p>
        </div>
        <div className={styles.newsGrid}>
          <article className={styles.newsCard}><div className={styles.date}>Company News</div><h3>Agentic AI in production environments</h3><p>How enterprise teams are moving beyond AI pilots toward operational execution.</p></article>
          <article className={styles.newsCard}><div className={styles.date}>Insight</div><h3>From automation to orchestration</h3><p>Why the next phase of enterprise automation requires connected systems, governance, and AI reasoning.</p></article>
          <article className={styles.newsCard}><div className={styles.date}>Customer Story</div><h3>Scaling intelligent workflows</h3><p>How complex business functions benefit from AI-powered execution across documents, data, and systems.</p></article>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <FinalCTASection />

    </div>
  );
}