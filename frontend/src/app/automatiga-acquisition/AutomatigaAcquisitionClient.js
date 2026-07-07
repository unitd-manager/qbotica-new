"use client";
import { useState, useEffect, useRef } from 'react';
import s from './style.module.css';

const LogoMark = ({ size = 18 }) => (
  <img src="/assets/images/logo-front.webp" alt="qBotica" style={{ height: size, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
);

const AutomatigaMark = ({ size = 18 }) => (
  <div style={{ background: '#0EA5A8', width: size, height: size, borderRadius: size * 0.22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" stroke="white" strokeWidth="2" fill="none" /></svg>
  </div>
);

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${s.reveal} ${visible ? s.revealVisible : ''} ${className}`}>
      {children}
    </div>
  );
}

export default function AutomatigaAcquisitionClient() {
  const [openItem, setOpenItem] = useState('qbotica');

  const toggle = (key) => setOpenItem((prev) => (prev === key ? null : key));

  return (
    <div className={s.apPage}>

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <div>
            <div className={s.kicker}><span className={s.kickerDot} /> Newsroom &middot; Acquisition Announcement</div>

            <div className={s.heroPartnerRow}>
              <div className={s.heroPartnerPill}>
                <LogoMark size={35} />
                              </div>
              <span className={s.heroX}>&times;</span>
              <div className={s.heroPartnerPill}>
                <AutomatigaMark size={35} />
                <span className={s.hppName}>Automatiga</span>
              </div>
            </div>

            <h1>qBotica Acquires <em>Automatiga</em> to Accelerate Agentic AI and Launches qubi Enterprise Platform</h1>
            <p className={s.heroSummary}>Strategic acquisition strengthens AI-first platform capabilities, expands global delivery, and accelerates the shift toward autonomous, agent-driven enterprise operations.</p>
            <div className={s.metaRow}>
              <div className={s.metaPill}>Press Release</div>
              <div className={s.metaPill}>Strategic Acquisition</div>
              <div className={s.metaPill}>Agentic AI</div>
              <div className={s.metaPill}>Platform Launch &mdash; qubi</div>
            </div>
          </div>

          <aside className={s.spotlightCard}>
            <div>
              <h3>Unified Agentic Automation Platform</h3>
              <p>Visual workflow design, autonomous and human-assisted execution modes, centralized orchestration, deep analytics, and an extensive library of enterprise-ready connectors.</p>
              <div className={s.checkList}>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Agentic Workflows</div>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Hybrid AI-Driven Decisioning</div>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Native RPA Capabilities</div>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Centralized Orchestration</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* PRESS META BAR */}
      <section className={s.pressMeta}>
        <Reveal className={s.pressMetaGrid}>
          <div className={s.pmi}><span>Location</span><strong>Phoenix, Arizona</strong></div>
          <div className={s.pmi}><span>Category</span><strong>Acquisition Announcement</strong></div>
          <div className={s.pmi}><span>Focus</span><strong>Agentic AI &amp; Automation</strong></div>
        </Reveal>
      </section>

      {/* ARTICLE */}
      <main className={s.articleWrap}>
        <Reveal className={s.article}>
          <article>

            <section className={`${s.articleSection} ${s.intro}`}>
              <p><span className={s.dateline}>PHOENIX, Arizona</span> &mdash; qBotica, a leading provider of Agentic AI and Intelligent Automation-as-a-Service, today announced that it has acquired Automatiga, a product-driven technology company advancing enterprise automation through its unified Agentic Automation Platform.</p>
              <p>The acquisition strengthens qBotica&rsquo;s position as an AI-first, platform-agnostic leader and accelerates its ability to deliver scalable, outcome-driven automation solutions to organizations across industries.</p>
            </section>

            <section className={`${s.articleSection} ${s.techSection}`}>
              <p>Automatiga delivers a unified Agentic Automation Platform that enables enterprises to design, deploy, and scale intelligent automation across their operations. The platform brings together agentic workflows, hybrid AI-driven decisioning, and native RPA capabilities within a single ecosystem. With visual workflow design, autonomous and human-assisted execution modes, centralized orchestration, deep analytics, and an extensive library of enterprise-ready connectors, Automatiga empowers organizations to automate complex processes with speed, intelligence, and enterprise-grade reliability.</p>
            </section>

            <section className={`${s.articleSection} ${s.quote}`}>
              <div className={s.quoteHead}>
                <div className={s.quoteAvatar} style={{ background: '#FF7705' }}>MV</div>
                <div>
                  <div className={s.quoteCiteName}>Mahesh Vinayagam</div>
                  <div className={s.quoteCiteRole}>CEO &amp; Founder, qBotica</div>
                </div>
              </div>
              <blockquote>&ldquo;This acquisition represents a major step forward in our strategy to lead the next generation of enterprise transformation through Agentic AI. Automatiga&rsquo;s agent-first platform and talented team enhance our ability to deliver end-to-end automation solutions that go beyond task automation&mdash;enabling intelligent, autonomous operations that drive real business outcomes. Together, we are building the foundation for truly AI-driven enterprises.&rdquo;</blockquote>
            </section>

            <section className={`${s.articleSection} ${s.quote}`}>
              <div className={s.quoteHead}>
                <div className={s.quoteAvatar} style={{ background: '#0EA5A8' }}>RG</div>
                <div>
                  <div className={s.quoteCiteName}>Rajeshkumar Ganesan</div>
                  <div className={s.quoteCiteRole}>CEO, Automatiga</div>
                </div>
              </div>
              <blockquote>&ldquo;We are excited to join qBotica and take Automatiga&rsquo;s vision to the next level. We built Automatiga as an agent-first platform to enable enterprises to design and orchestrate intelligent, autonomous workflows. With qBotica&rsquo;s leadership in AI and enterprise transformation, we can accelerate innovation and deliver even greater value to our customers worldwide.&rdquo;</blockquote>
            </section>

            <section className={s.articleSection}>
              <h2 className={s.sectionTitle}>Introducing qubi: qBotica&rsquo;s Agentic AI Platform</h2>
              <p>As part of this strategic expansion, qBotica is also launching qubi, its Agentic AI platform for enterprises. qubi is designed to orchestrate intelligent, autonomous workflows across front, middle, and back-office operations by leveraging collaborative AI agents that can reason, act, and adapt in real time.</p>
              <p>Built for enterprise scale, qubi combines agentic workflows, human-in-the-loop execution, and native automation capabilities to support both deterministic processes and dynamic, decision-driven use cases. The platform integrates seamlessly with existing systems, enabling organizations to deploy AI agents across functions such as customer experience, operations, finance, and supply chain without disrupting core infrastructure. With built-in governance, observability, and performance tracking, qubi empowers enterprises to move from isolated automation initiatives to fully orchestrated, AI-driven operations that continuously learn and improve.</p>
            </section>

            <section className={s.articleSection}>
              <h2 className={s.sectionTitle}>Global Delivery &amp; Client Impact</h2>
              <p>The addition of Automatiga expands qBotica&rsquo;s global engineering and delivery capabilities while enhancing its ability to support clients across financial services, healthcare, logistics, and other key industries. The combined organization will offer a unified approach to automation, integrating advanced platform technology with deep domain expertise and a strong focus on measurable results.</p>
              <p>Following the acquisition, qBotica will continue to invest in advancing its AI and automation capabilities, including the development of AI agents, voice AI solutions, and intelligent document processing technologies. Clients of both organizations will benefit from expanded capabilities, increased scalability, and a continued commitment to innovation and service excellence.</p>
            </section>

            <section className={s.articleSection}>
              <h2 className={s.sectionTitle}>About the Companies</h2>
              <div className={s.accordionWrap}>

                <div className={`${s.accordion} ${openItem === 'qbotica' ? s.accordionActive : ''}`}>
                  <button type="button" className={s.accordionHeader} onClick={() => toggle('qbotica')}>
                    <div className={s.accordionHeaderLeft}>
                      <img src="/assets/images/qbcomp.webp" alt="qBotica" style={{ width: 32, height: 32, objectFit: 'contain', flexShrink: 0 }} />
                      About qBotica
                    </div>
                    <div className={s.accordionIcon}>+</div>
                  </button>
                  <div className={s.accordionContent}>
                    <p>qBotica is a global, AI-first technology company specializing in Agentic AI and Intelligent Automation-as-a-Service, helping enterprises transform operations through scalable, outcome-driven solutions. Founded in 2017, qBotica partners with organizations across industries to design, build, and manage intelligent systems that automate complex processes and drive measurable impact.</p>
                    <p>Combining expertise in AI, robotic process automation (RPA), and data orchestration, qBotica enables organizations to move toward autonomous, AI-driven operations. Its solutions include AI agents, intelligent document processing, and voice AI, delivered through a flexible, platform-agnostic model. qBotica has been recognized four times on the Inc. 5000 list of fastest-growing private companies in the United States.</p>
                  </div>
                </div>

                <div className={`${s.accordion} ${openItem === 'automatiga' ? s.accordionActive : ''}`}>
                  <button type="button" className={s.accordionHeader} onClick={() => toggle('automatiga')}>
                    <div className={s.accordionHeaderLeft}>
                      <div className={s.accordionLogoMark} style={{ background: '#0EA5A8' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" stroke="white" strokeWidth="2" fill="none" /></svg>
                      </div>
                      About Automatiga
                    </div>
                    <div className={s.accordionIcon}>+</div>
                  </button>
                  <div className={s.accordionContent}>
                    <p>Automatiga is a product-driven technology company advancing enterprise automation through its unified Agentic Automation Platform. Built with an agent-first architecture, the platform enables organizations to design and orchestrate intelligent, autonomous workflows powered by collaborative AI agents.</p>
                    <p>It combines agentic intelligence, enterprise-grade workflow orchestration, and native RPA to support both decision-driven and deterministic processes within a single ecosystem. With modern architecture, deep integrations, and strong governance, Automatiga empowers enterprises to scale automation faster and operate more intelligently across the organization.</p>
                  </div>
                </div>

              </div>
            </section>

          </article>
        </Reveal>
      </main>

      {/* RELATED NEWS */}
      <Reveal>
        <section className={s.related}>
          <div className={s.relatedInner}>
            <div className={s.relatedHeader}>
              <h2>Related News</h2>
              <p>Stay current with qBotica&rsquo;s latest partnerships, platform updates, and thought leadership.</p>
            </div>
            <div className={s.relatedGrid}>
              <a href="https://www.qbotica.com/newsroom/qbotica-announces-acquisition-of-automatiga-to-expand-global-intelligent-automation-and-ai-capabilities" target="_blank" rel="noreferrer" className={s.relatedCard} style={{ backgroundImage: "linear-gradient(to bottom, rgba(11,17,32,.08), rgba(11,17,32,.88)), url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80')" }}>
                <span>Acquisition</span>
                <h3>qBotica acquires Automatiga to expand global intelligent automation and AI capabilities</h3>
              </a>
              <a href="https://www.qbotica.com/newsroom/mahesh-vinayagam-deloitte-technology-fast-500-leadership-reflections" target="_blank" rel="noreferrer" className={s.relatedCard} style={{ backgroundImage: "linear-gradient(to bottom, rgba(11,17,32,.08), rgba(11,17,32,.88)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80')" }}>
                <span>Leadership</span>
                <h3>Mahesh Vinayagam: Deloitte Technology Fast 500 leadership reflections</h3>
              </a>
              <a href="https://www.qbotica.com/newsroom/qbotica-and-kognitos-partner-to-bring-english-as-code-to-the-enterprise-for-key-operational-needs" target="_blank" rel="noreferrer" className={s.relatedCard} style={{ backgroundImage: "linear-gradient(to bottom, rgba(11,17,32,.08), rgba(11,17,32,.88)), url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80')" }}>
                <span>Partnership</span>
                <h3>qBotica and Kognitos partner to bring English as Code to the enterprise</h3>
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2>Ready to explore <em>Agentic AI?</em></h2>
          <p>Learn how qBotica&rsquo;s Agentic AI platform can orchestrate autonomous, AI-driven operations across your enterprise.</p>
          <div className={s.ctaActions}>
            <a href="https://meetings.hubspot.com/automation-demo/scheduler" target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnPrimary}`}>Talk to an Expert</a>
            <a href="https://www.qbotica.com/services/ai-agents" className={`${s.btn} ${s.btnSecondary}`}>Explore AI Agents</a>
          </div>
        </div>
      </section>

    </div>
  );
}
