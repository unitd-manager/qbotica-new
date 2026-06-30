"use client";
import { useState, useEffect, useRef } from 'react';
import s from './style.module.css';

const LogoMark = ({ size = 18 }) => (
  <img src="/assets/images/logo-front.webp" alt="qBotica" style={{ height: size, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
);

const AtolioMark = ({ size = 18 }) => (
  <img src="/assets/images/atolioo.png" alt="Atolio" style={{ height: size, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
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

const ACCORDION_ITEMS = ['qbotica', 'atolio', 'contact'];

export default function AtolioPartnershipClient() {
  const [openItem, setOpenItem] = useState('qbotica');

  const toggle = (key) => setOpenItem((prev) => (prev === key ? null : key));

  return (
    <div className={s.apPage}>

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <div>
            <div className={s.kicker}><span className={s.kickerDot} /> Newsroom &middot; Partnership Announcement</div>

            <div className={s.heroPartnerRow}>
              <div className={s.heroPartnerPill}>
                <LogoMark size={40} />
              </div>
              <span className={s.heroX}>&times;</span>
              <div className={s.heroPartnerPill}>
                <AtolioMark size={40} />
              </div>
            </div>

            <h1>qBotica and Atolio Partner to Power <em>AI Agents</em> with Secure, Instant Access to Enterprise Knowledge</h1>
            <p className={s.heroSummary}>The partnership integrates Atolio&rsquo;s sovereign AI search platform into qBotica&rsquo;s Agentic AI and Automation-as-a-Service capabilities for regulated industries, including Financial Services, Insurance, and Healthcare.</p>
            <div className={s.metaRow}>
              <div className={s.metaPill}>Press Release</div>
              <div className={s.metaPill}>Strategic Partnership</div>
              <div className={s.metaPill}>Agentic AI</div>
              <div className={s.metaPill}>Enterprise Search</div>
              <div className={s.metaPill}>June 10, 2026</div>
            </div>
          </div>

          <aside className={s.spotlightCard}>
            <div>
              <h3>Secure AI Search Meets Intelligent Automation</h3>
              <p>Permission-aware enterprise knowledge access integrated into AI agents, automation workflows, copilots, and digital workers &mdash; running entirely inside your environment.</p>
              <div className={s.checkList}>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Permission-Aware Search</div>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Self-Hosted &amp; Air-Gapped Deployment</div>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Agentic AI Enablement</div>
                <div className={s.check}><div className={s.checkIcon}>&#10003;</div>Real-Time Compliance Enforcement</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* PRESS META BAR */}
      <section className={s.pressMeta}>
        <Reveal className={s.pressMetaGrid}>
          <div className={s.pmi}><span>Published</span><strong>June 10, 2026</strong></div>
          <div className={s.pmi}><span>Location</span><strong>Phoenix, Arizona</strong></div>
          <div className={s.pmi}><span>Category</span><strong>Partnership Announcement</strong></div>
          <div className={s.pmi}><span>Focus</span><strong>Regulated Industries</strong></div>
        </Reveal>
      </section>

      {/* ARTICLE */}
      <main className={s.articleWrap}>
        <Reveal className={s.article}>
          <article>

            <section className={`${s.articleSection} ${s.intro}`}>
              <p><span className={s.dateline}>PHOENIX, June 10, 2026</span> &mdash; Atolio, a secure, self-hosted enterprise AI search platform, and qBotica, a Deloitte Technology Fast 500 intelligent automation-as-a-service provider, today announced a strategic partnership combining Atolio&rsquo;s permission-aware AI search with qBotica&rsquo;s automation services. Together, the companies will help global enterprises securely connect fragmented enterprise knowledge with intelligent automation and agentic AI workflows.</p>
              <p>Enterprise teams increasingly hit the same wall: automation workflows are only as good as the data they can reach, and that data often sits behind complex permission models scattered across Jira, Confluence, Slack, SharePoint, Google Drive, and dozens of other systems. Through this partnership, qBotica will resell Atolio&rsquo;s AI-driven search as part of its automation-as-a-service suite, giving joint clients a single layer that respects document-level permissions in real time.</p>
            </section>

            <section className={`${s.articleSection} ${s.techSection}`}>
              <p>Atolio runs entirely inside the customer&rsquo;s environment, including AWS, Azure, GCP, and air-gapped Kubernetes deployments. The platform is already in production at organizations including U.S. Air Force Platform One and other regulated enterprises. qBotica brings implementation expertise across the United States, Canada, and the United Kingdom.</p>
            </section>

            <section className={`${s.articleSection} ${s.quote}`}>
              <div className={s.quoteHead}>
                <div className={s.quoteAvatar} style={{ background: '#1a56db' }}>DL</div>
                <div>
                  <div className={s.quoteCiteName}>David Lanstein</div>
                  <div className={s.quoteCiteRole}>Co-founder &amp; CEO, Atolio</div>
                </div>
              </div>
              <blockquote>&ldquo;Atolio and qBotica share a customer base that demands both secure infrastructure and real workflow automation. Most enterprise AI tools can&rsquo;t run inside a regulated customer&rsquo;s environment. qBotica&rsquo;s clients have been asking for one that can, and this partnership delivers it as one motion.&rdquo;</blockquote>
            </section>

            <section className={`${s.articleSection} ${s.quote}`}>
              <div className={s.quoteHead}>
                <div className={s.quoteAvatar} style={{ background: '#FF7705' }}>MV</div>
                <div>
                  <div className={s.quoteCiteName}>Mahesh Vinayagam</div>
                  <div className={s.quoteCiteRole}>CEO &amp; Founder, qBotica</div>
                </div>
              </div>
              <blockquote>&ldquo;Atolio&rsquo;s in-environment deployment and permission-aware architecture are a direct fit for what our financial services and insurance clients are asking for. Embedding secure AI search inside our automation workflows gives those clients a clearer path to data-driven decisions without compromising on compliance.&rdquo;</blockquote>
            </section>

            <section className={s.articleSection}>
              <h2 className={s.sectionTitle}>Three outcomes for joint clients</h2>
              <div className={s.outcomeGrid}>
                <div className={s.outcomeCard}>
                  <div className={s.outcomeNumber}>1</div>
                  <h3>Unified Data Intelligence</h3>
                  <p>Unified data intelligence across cloud and on-premise tools, with permission-aware access to fragmented data and real-time enforcement of document-level permissions.</p>
                </div>
                <div className={s.outcomeCard}>
                  <div className={s.outcomeNumber}>2</div>
                  <h3>Self-Hosted Deployment</h3>
                  <p>Self-hosted deployment, including air-gapped environments, with enterprise-grade security protocols that support privacy, control, and compliance.</p>
                </div>
                <div className={s.outcomeCard}>
                  <div className={s.outcomeNumber}>3</div>
                  <h3>AI Search in Automation</h3>
                  <p>AI search embedded directly into automation workflows, reducing time-to-knowledge by wiring AI-powered search into qBotica&rsquo;s digital workers and agentic automation.</p>
                </div>
              </div>
            </section>

            <section className={s.articleSection}>
              <h2 className={s.sectionTitle}>Market Focus</h2>
              <div className={s.marketTags}>
                <span className={`${s.marketTag} ${s.marketTagActive}`}>InsureTech</span>
                <span className={`${s.marketTag} ${s.marketTagActive}`}>Financial Services</span>
                <span className={s.marketTag}>Healthcare</span>
                <span className={s.marketTag}>Defense &amp; Government</span>
                <span className={s.marketTag}>Enterprise Operations</span>
              </div>
              <p>Both companies have identified InsureTech and financial services as early priority areas, with a joint event planned for early October and targeted VIP client engagement in the pipeline. Atolio&rsquo;s platform is also extensible via gRPC APIs, allowing qBotica to embed AI search into custom UIs, copilots, agents, and RAG workflows.</p>
              <p>For more information, visit <a href="https://www.atolio.com" target="_blank" rel="noreferrer">Atolio.com</a> and <a href="https://www.qbotica.com" target="_blank" rel="noreferrer">qbotica.com</a>.</p>
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
                    <p>qBotica is a global AI-first technology company specializing in Agentic AI, Intelligent Automation-as-a-Service, and enterprise automation transformation. Founded in 2017, qBotica helps organizations modernize operations by combining AI agents, intelligent document processing, robotic process automation, data orchestration, and human-in-the-loop governance into scalable, outcome-driven solutions.</p>
                    <p>Following its acquisition of Automatiga and the launch of qubi, qBotica&rsquo;s enterprise Agentic AI platform, the company is advancing a new model for autonomous business operations where AI agents, automation, and enterprise systems work together to improve speed, accuracy, compliance, and decision-making. qBotica serves clients across financial services, insurance, healthcare, logistics, and enterprise operations throughout the United States, Canada, and the United Kingdom.</p>
                    <a href="https://www.qbotica.com" target="_blank" rel="noreferrer" className={s.acLink}>Learn more about qBotica &rarr;</a>
                  </div>
                </div>

                <div className={`${s.accordion} ${openItem === 'atolio' ? s.accordionActive : ''}`}>
                  <button type="button" className={s.accordionHeader} onClick={() => toggle('atolio')}>
                    <div className={s.accordionHeaderLeft}>
                      <img src="/assets/images/atolioo.png" alt="Atolio" style={{ height: 30, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
                      About Atolio
                    </div>
                    <div className={s.accordionIcon}>+</div>
                  </button>
                  <div className={s.accordionContent}>
                    <p>Atolio provides a secure, on-premise enterprise AI and search platform that connects people with the information they need to do their best work. Built for the most demanding security environments, including U.S. Department of Defense deployments and global financial institutions, Atolio indexes, searches, and analyzes data across an organization&rsquo;s entire ecosystem without compromising privacy or control.</p>
                    <p>The platform mirrors document-level permissions in real time across enterprise tools and exposes its capabilities via open APIs for integration with automation platforms, copilots, and AI agents. Learn more at <a href="https://www.atolio.com" target="_blank" rel="noreferrer">www.atolio.com</a>.</p>
                    <a href="https://www.atolio.com" target="_blank" rel="noreferrer" className={s.acLink}>Visit Atolio.com &rarr;</a>
                  </div>
                </div>

                <div className={`${s.accordion} ${openItem === 'contact' ? s.accordionActive : ''}`}>
                  <button type="button" className={s.accordionHeader} onClick={() => toggle('contact')}>
                    <div className={s.accordionHeaderLeft}>
                      <div className={s.accordionLogoMark} style={{ background: '#6B7280' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                      </div>
                      Media Contact
                    </div>
                    <div className={s.accordionIcon}>+</div>
                  </button>
                  <div className={s.accordionContent}>
                    <div className={s.contactGrid}>
                      <div className={s.contactCard}>
                        <div className={s.contactCardLabel}>qBotica Press</div>
                        <div className={s.contactCardName}>Marketing Team</div>
                        <div className={s.contactCardDetail}>
                          <a href="mailto:media@qbotica.com">media@qbotica.com</a><br />
                          Phoenix, Arizona, USA
                        </div>
                      </div>
                      <div className={s.contactCard}>
                        <div className={s.contactCardLabel}>Atolio Press</div>
                        <div className={s.contactCardName}>Communications Team</div>
                        <div className={s.contactCardDetail}>
                          <a href="https://www.atolio.com" target="_blank" rel="noreferrer">www.atolio.com</a><br />
                          Contact via website
                        </div>
                      </div>
                    </div>
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
          <p>Learn how intelligent automation and AI agents can transform enterprise operations with secure, compliant, outcome-driven solutions.</p>
          <div className={s.ctaActions}>
            <a href="https://meetings.hubspot.com/automation-demo/scheduler" target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnPrimary}`}>Talk to an Expert</a>
            <a href="https://www.qbotica.com/services/ai-agents" className={`${s.btn} ${s.btnSecondary}`}>Explore AI Agents</a>
          </div>
        </div>
      </section>

    </div>
  );
}
