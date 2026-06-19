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
      <section className={heroStyles.heroContainer} style={{ minHeight: 'auto', padding: '140px 40px 120px' }}>
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
          <div className={heroStyles.buttonRow} style={{ justifyContent: 'center', marginTop: 32 }}>
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
      <section style={{ padding: '40px 6%', background: '#F7F4EE' }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          background: 'linear-gradient(135deg, #071b3a 0%, #102b55 100%)',
          borderRadius: 28,
          padding: 'clamp(40px, 5vw, 64px) clamp(36px, 5vw, 72px)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 90px rgba(7,27,58,0.22)',
        }}>
          {/* glow accents */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,123,32,0.22), transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(47,109,246,0.18), transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.85, color: 'rgba(255,255,255,0.88)', margin: 0, position: 'relative', zIndex: 1 }}>
            Both companies have identified the InsureTech and financial services verticals as early priority areas, with a joint event planned for early October and targeted VIP client engagement in the pipeline. Atolio&rsquo;s platform is also extensible via gRPC APIs, allowing qBotica to embed AI search directly into custom UIs, copilots, agents, and RAG workflows, creating meaningful professional services opportunities beyond resale.
          </p>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: '#F7F4EE', padding: '80px 6% 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f47b20', marginBottom: 48 }}>About the Companies</p>

          {/* Atolio row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 0, borderTop: '1px solid rgba(7,27,58,0.1)', paddingTop: 52, paddingBottom: 52, alignItems: 'start' }}>
            <div style={{ paddingRight: 60 }}>
              <img src="/assets/images/atolioo.png" alt="Atolio" style={{ height: 28, objectFit: 'contain', display: 'block', marginBottom: 20 }} />
              <span style={{ display: 'inline-block', background: 'rgba(47,109,246,0.1)', color: '#2f6df6', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99 }}>AI Search Platform</span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 2, color: '#4a5568', margin: 0 }}>
              Atolio provides a secure, on-premise enterprise AI and search platform that connects people with the information they need to do their best work. Built for the most demanding security environments, including U.S. Department of Defense deployments and global financial institutions, Atolio indexes, searches, and analyzes data across an organization&rsquo;s entire ecosystem without compromising privacy or control. The platform mirrors document-level permissions in real time across enterprise tools and exposes its capabilities via open APIs for integration with automation platforms, copilots, and AI agents. Learn more at{' '}
              <a href="https://www.atolio.com" target="_blank" rel="noreferrer" style={{ color: '#2f6df6', fontWeight: 700 }}>www.atolio.com</a>.
            </p>
          </div>

          {/* qBotica row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 0, borderTop: '1px solid rgba(7,27,58,0.1)', paddingTop: 52, paddingBottom: 52, alignItems: 'start' }}>
            <div style={{ paddingRight: 60 }}>
              <img src="/assets/images/logo-front.webp" alt="qBotica" style={{ height: 28, objectFit: 'contain', display: 'block', marginBottom: 20, filter: 'brightness(0)' }} />
              <span style={{ display: 'inline-block', background: 'rgba(244,123,32,0.1)', color: '#f47b20', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99 }}>Agentic AI &amp; Automation</span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 2, color: '#4a5568', margin: 0 }}>
              qBotica is a global AI-first technology company specializing in Agentic AI, Intelligent Automation-as-a-Service, and enterprise automation transformation. Founded in 2017, qBotica helps organizations modernize operations by combining AI agents, intelligent document processing, robotic process automation, data orchestration, and human-in-the-loop governance into scalable, outcome-driven solutions. Following its acquisition of Automatiga and the launch of qubi, qBotica&rsquo;s enterprise Agentic AI platform, the company is advancing a new model for autonomous business operations where AI agents, automation, and enterprise systems work together to improve speed, accuracy, compliance, and decision-making. qBotica serves clients across financial services, insurance, healthcare, logistics, and enterprise operations throughout the United States, Canada, and the United Kingdom. qBotica has been recognized as a UiPath Global and Americas Innovation Partner of the Year, a Deloitte Technology Fast 500 company, a four-time Inc. 5000 honoree, and was ranked #166 on Forbes&rsquo; 2026 list of America&rsquo;s Best Startup Employers. Learn more at{' '}
              <a href="https://qbotica.com" target="_blank" rel="noreferrer" style={{ color: '#f47b20', fontWeight: 700 }}>qbotica.com</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: '#071b3a', padding: '80px 6%', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 48px' }}>For more information, visit</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>

          {/* Atolio pill */}
          <a href="https://www.atolio.com" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            background: 'rgba(47,109,246,0.12)', border: '1px solid rgba(47,109,246,0.35)',
            padding: '18px 32px', borderRadius: 14, textDecoration: 'none',
          }}>
            <img src="/assets/images/atolioo.png" alt="Atolio" style={{ height: 22, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>atolio.com &rarr;</span>
          </a>

          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 22 }}>&times;</span>

          {/* qBotica pill */}
          <a href="https://qbotica.com" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            background: 'rgba(244,123,32,0.12)', border: '1px solid rgba(244,123,32,0.35)',
            padding: '18px 32px', borderRadius: 14, textDecoration: 'none',
          }}>
            <img src="/assets/images/logo-icon.webp" alt="qBotica" style={{ height: 22, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>qbotica.com &rarr;</span>
          </a>

        </div>
      </section>

    </div>
  );
}
