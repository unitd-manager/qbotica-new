
import styles from '@/components/Common/home-new.module.css';
import heroStyles from '@/components/Layout/Herosection.module.css';
import { AtolioTabs, AtolioOutcomes } from './AtolioClient';

export const metadata = {
  title: "qBotica and Atolio Partner to Power AI Agents with Secure, Instant Access to Enterprise Knowledge",
  description: "qBotica and Atolio announce a strategic partnership combining Atolio's sovereign AI search with qBotica's Agentic AI and Intelligent Automation-as-a-Service capabilities.",
};

export default function AtolioPage() {
  return (
    <div className={styles.local} style={{ backgroundColor: '#F7F4EE' }}>

      {/* ── HERO ── */}
      <section className={heroStyles.heroContainer} style={{ minHeight: '85vh', padding: 'clamp(100px, 18vw, 140px) 6% clamp(80px, 14vw, 120px)' }}>
        <div className={heroStyles.ambientGlow} />
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <div className={heroStyles.badge} style={{ margin: '0 auto 28px' }}>
            <span className={heroStyles.badgeDot} />
            <span className={heroStyles.badgeText}>Press Release &mdash; May 12, 2026</span>
          </div>
          <h1 className={heroStyles.heading} style={{ fontSize: 'clamp(36px, 5vw, 66px)', textAlign: 'center' }}>
            qBotica &amp; Atolio Partner to Power{' '}
            <span className={heroStyles.gradientText}>AI Agents</span>{' '}
            with Secure Enterprise Search
          </h1>
          <p className={heroStyles.description} style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            The agreement integrates Atolio&rsquo;s sovereign AI search into qBotica&rsquo;s Agentic AI and
            Intelligent Automation-as-a-Service capabilities, initially focused on Financial Services,
            Insurance and Healthcare.
          </p>
          <div className={heroStyles.buttonRow} style={{ justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <a className={heroStyles.primaryBtn} href="#partnership-body">Read the Announcement &rarr;</a>
            <a className={heroStyles.secondaryBtn} href="#outcomes">See Partnership Outcomes &rarr;</a>
          </div>
        </div>
        <div className={heroStyles.heroGradient} />
      </section>

      {/* ── BODY PARAGRAPHS ── */}
      <AtolioTabs />

      {/* ── THREE OUTCOMES ── */}
      <AtolioOutcomes />

      {/* ── CLOSING PARAGRAPH ── */}
      <section style={{ padding: '48px 6%', background: '#F7F4EE' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', lineHeight: 1.85, color: '#4a5568', margin: 0 }}>
            Both companies have identified the InsureTech and financial services verticals as early priority areas, with a joint event planned for early October and targeted VIP client engagement in the pipeline. Atolio&rsquo;s platform is also extensible via gRPC APIs, allowing qBotica to embed AI search directly into custom UIs, copilots, agents, and RAG workflows, creating meaningful professional services opportunities beyond resale.
          </p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={styles.finalCta} style={{ padding: '64px 6%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'stretch' }}>

            {/* Atolio card */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(47,109,246,0.25)', borderRadius: 20, padding: '36px 36px', display: 'flex', flexDirection: 'column' }}>
              <img src="/assets/images/atolioo.png" alt="Atolio" style={{ height: 26, objectFit: 'contain', filter: 'brightness(0) invert(1)', display: 'block', marginBottom: 16 }} />
              <span style={{ display: 'inline-block', background: 'rgba(47,109,246,0.15)', color: '#7fa8ff', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99, marginBottom: 20, width: 'fit-content' }}>AI Search Platform</span>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.62)', margin: 0, flex: 1 }}>
                Atolio provides a secure, on-premise enterprise AI and search platform that connects people with the information they need to do their best work. Built for the most demanding security environments, including U.S. Department of Defense deployments and global financial institutions, Atolio indexes, searches, and analyzes data across an organization&rsquo;s entire ecosystem without compromising privacy or control. The platform mirrors document-level permissions in real time across enterprise tools and exposes its capabilities via open APIs for integration with automation platforms, copilots, and AI agents. Learn more at{' '}
                <a href="https://www.atolio.com" target="_blank" rel="noreferrer" style={{ color: '#7fa8ff', fontWeight: 700 }}>www.atolio.com</a>.
              </p>
            </div>

            {/* qBotica card */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(244,123,32,0.3)', borderRadius: 20, padding: '36px 36px', display: 'flex', flexDirection: 'column' }}>
              <img src="/assets/images/logo-front.webp" alt="qBotica" style={{ height: 26, objectFit: 'contain', display: 'block', marginBottom: 16 }} />
              <span style={{ display: 'inline-block', background: 'rgba(244,123,32,0.15)', color: '#ffab66', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99, marginBottom: 20, width: 'fit-content' }}>Agentic AI &amp; Automation</span>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.62)', margin: '0 0 16px' }}>
                qBotica is a global AI-first technology company specializing in Agentic AI, Intelligent Automation-as-a-Service, and enterprise automation transformation. Founded in 2017, qBotica helps organizations modernize operations by combining AI agents, intelligent document processing, robotic process automation, data orchestration, and human-in-the-loop governance into scalable, outcome-driven solutions.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.62)', margin: '0 0 16px' }}>
                Following its acquisition of Automatiga and the launch of qubi, qBotica&rsquo;s enterprise Agentic AI platform, the company is advancing a new model for autonomous business operations where AI agents, automation, and enterprise systems work together to improve speed, accuracy, compliance, and decision-making. qBotica serves clients across financial services, insurance, healthcare, logistics, and enterprise operations throughout the United States, Canada, and the United Kingdom.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: 8 }}>UiPath Partner of the Year</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: 8 }}>Deloitte Tech Fast 500</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: 8 }}>Inc. 5000 (4x)</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: 8 }}>Forbes #166 Best Startup Employers 2026</span>
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', margin: 0 }}>
                Learn more at{' '}
                <a href="https://qbotica.com" target="_blank" rel="noreferrer" style={{ color: '#ffab66', fontWeight: 700 }}>qbotica.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
