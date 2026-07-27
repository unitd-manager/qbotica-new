"use client";
import { useState, useEffect, useRef } from 'react';
import s from "../app/atolio-partnership2/style.module.css";

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

export default function AtolioPartnershipClient({ data }) {
  const layouts = data?.acf?.atolio || [];

  const [openItem, setOpenItem] = useState('qbotica');
  const toggle = (key) => setOpenItem((prev) => (prev === key ? null : key));

  // Helper to grab a layout block by its acf_fc_layout name
  const getLayout = (name) => layouts.find((l) => l.acf_fc_layout === name);

  const hero = getLayout('hero_section');
  const spotlight = getLayout('spotlight_');
  const pressMeta = getLayout('press_meta');
  const article = getLayout('article');
  const outcomes = getLayout('outcomes');
  const marketFocus = getLayout('market_focus');
  const aboutCompanies = getLayout('about_companies');
  const mediaContact = getLayout('media_contact');
  const relatedNews = getLayout('related_news');
  const cta = getLayout('cta');

  return (
    <div className={s.apPage}>

      {/* HERO */}
      {hero && (
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div>
              <div className={s.kicker}>
                <span className={s.kickerDot} /> {hero._hero_kicker}
              </div>

              <div className={s.heroPartnerRow}>
                <div className={s.heroPartnerPill}>
                  <img
                    src={hero.partner_1_logo?.url || '/assets/images/logo-front.webp'}
                    alt="qBotica"
                    style={{ height: 35, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
                  />
                </div>
                <span className={s.heroX}>&times;</span>
                <div className={s.heroPartnerPill}>
                  <img
                    src={hero.partner_2_logo?.url || '/assets/images/atolioo.png'}
                    alt="Atolio"
                    style={{ height: 35, width: 'auto', objectFit: 'contain', flexShrink: 0, transform: 'scale(1.4)' }}
                  />
                </div>
              </div>

              <h1>
                {hero.headline_before} <em>{hero.hero_headline}</em> {hero.headline_after}
              </h1>
              <p className={s.heroSummary}>{hero.hero_summary}</p>

              <div className={s.metaRow}>
                {(hero.hero_tags || []).map((tag, i) => (
                  <div key={i} className={s.metaPill}>{tag.tag_label}</div>
                ))}
              </div>
            </div>

            {spotlight && (
              <aside className={s.spotlightCard}>
                <div>
                  <h3>{spotlight.spotlight_title}</h3>
                  <p>{spotlight.spotlight_description}</p>
                  <div className={s.checkList}>
                    {(spotlight.spotlight_checklist_ || []).map((item, i) => (
                      <div key={i} className={s.check}>
                        <div className={s.checkIcon}>&#10003;</div>
                        {item.checklist_item}
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* PRESS META BAR */}
      {pressMeta && (
        <section className={s.pressMeta}>
          <Reveal className={s.pressMetaGrid}>
            <div className={s.pmi}><span>Published</span><strong>{pressMeta.published_date}</strong></div>
            <div className={s.pmi}><span>Location</span><strong>{pressMeta.location}</strong></div>
            <div className={s.pmi}><span>Category</span><strong>{pressMeta.category}</strong></div>
            <div className={s.pmi}><span>Focus</span><strong>{pressMeta.focus}</strong></div>
          </Reveal>
        </section>
      )}

      {/* ARTICLE */}
      <main className={s.articleWrap}>
        <Reveal className={s.article}>
          <article>

            {article && (
              <>
                <section className={`${s.articleSection} ${s.intro}`}>
                  <p>
                    <span className={s.dateline}>{article.article_dateline}</span>
                    {' '}&mdash; {article.intro_content}
                  </p>
                  <p>{article.intro_content2}</p>
                </section>

                <section
                  className={`${s.articleSection} ${s.techSection}`}
                  dangerouslySetInnerHTML={{ __html: article.tech_section_content }}
                />

                {/* Quotes block — add once sub-field names are confirmed */}
                {(article.quotes || []).map((q, i) => (
                  <section key={i} className={`${s.articleSection} ${s.quote}`}>
                    <div className={s.quoteHead}>
                      <div className={s.quoteAvatar} style={{ background: q.quote_avatar_color }}>
                        {q.quote_initials}
                      </div>
                      <div>
                        <div className={s.quoteCiteName}>{q.quote_name}</div>
                        <div className={s.quoteCiteRole}>{q.quote_role}</div>
                      </div>
                    </div>
                    <blockquote>&ldquo;{q.quote_text}&rdquo;</blockquote>
                  </section>
                ))}
              </>
            )}

            {outcomes && (
              <section className={s.articleSection}>
                <h2 className={s.sectionTitle}>{outcomes.outcomes_title}</h2>
                <div className={s.outcomeGrid}>
                  {(outcomes.outcomes_list || []).map((o, i) => (
                    <div key={i} className={s.outcomeCard}>
                      <div className={s.outcomeNumber}>{o.outcome_number}</div>
                      <h3>{o.outcome_title}</h3>
                      <p>{o.outcome_description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {marketFocus && (
              <section className={s.articleSection}>
                <h2 className={s.sectionTitle}>{marketFocus.market_focus_title}</h2>
                <div className={s.marketTags}>
                  {(marketFocus.market_tags || []).map((tag, i) => (
                    <span
                      key={i}
                      className={`${s.marketTag} ${tag.is_active ? s.marketTagActive : ''}`}
                    >
                      {tag.tag_name}
                    </span>
                  ))}
                </div>
                <p>{marketFocus.market_focus_description}</p>
                <p>
                  {marketFocus.market_focus_links_text}{' '}
                  <a href={marketFocus.market_focus_link_1_url} target="_blank" rel="noreferrer">
                    {marketFocus.market_focus_link_1_text}
                  </a>{' '}
                  and{' '}
                  <a href={marketFocus.market_focus_link_2_url} target="_blank" rel="noreferrer">
                    {marketFocus.market_focus_link_2_text}
                  </a>.
                </p>
              </section>
            )}

            {(aboutCompanies || mediaContact) && (
              <section className={s.articleSection}>
                <h2 className={s.sectionTitle}>About the Companies</h2>
                <div className={s.accordionWrap}>

                  {aboutCompanies && (aboutCompanies.accordion_items || []).map((item, i) => {
                    const key = item.accordion_title?.toLowerCase().includes('atolio') ? 'atolio' : 'qbotica';
                    return (
                      <div
                        key={i}
                        className={`${s.accordion} ${openItem === key ? s.accordionActive : ''}`}
                      >
                        <button
                          type="button"
                          className={s.accordionHeader}
                          onClick={() => toggle(key)}
                        >
                          <div className={s.accordionHeaderLeft}>
                            {item.accordion_icon?.url && (
                              <img
                                src={item.accordion_icon.url}
                                alt={item.accordion_title}
                                style={{ width: 32, height: 32, objectFit: 'contain', flexShrink: 0 }}
                              />
                            )}
                            {item.accordion_title}
                          </div>
                          <div className={s.accordionIcon}>+</div>
                        </button>
                        <div className={s.accordionContent}>
                          <div dangerouslySetInnerHTML={{ __html: item.accordion_content }} />
                          {item.accordion_link_url && (
                            
                         <a   href={item.accordion_link_url}
                              target="_blank"
                              rel="noreferrer"
                              className={s.acLink}
                            >
                              {item.accordion_link_text}
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {mediaContact && (
                    <div className={`${s.accordion} ${openItem === 'contact' ? s.accordionActive : ''}`}>
                      <button type="button" className={s.accordionHeader} onClick={() => toggle('contact')}>
                        <div className={s.accordionHeaderLeft}>
                          <div className={s.accordionLogoMark} style={{ background: '#6B7280' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                            </svg>
                          </div>
                          Media Contact
                        </div>
                        <div className={s.accordionIcon}>+</div>
                      </button>
                      <div className={s.accordionContent}>
                        <div className={s.contactGrid}>
                          {(mediaContact.contacts || []).map((c, i) => (
                            <div key={i} className={s.contactCard}>
                              <div className={s.contactCardLabel}>{c.contact_label}</div>
                              <div className={s.contactCardName}>{c.contact_name}</div>
                              <div className={s.contactCardDetail}>
                                {c.contact_email && (
                                  <a href={`mailto:${c.contact_email}`}>{c.contact_email}</a>
                                )}
                                <br />
                                {c.contact_detail}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </section>
            )}

          </article>
        </Reveal>
      </main>

      {/* RELATED NEWS */}
      {relatedNews && (
  <Reveal>
    <section className={s.related}>
      <div className={s.relatedInner}>
        <div className={s.relatedHeader}>
          <h2>{relatedNews.related_news_title || "Related News"}</h2>
          <p>{relatedNews.related_news_description}</p>
        </div>

        <div className={s.relatedGrid}>
          {(relatedNews.related_articles || []).map((a, i) => {
            const bgStyle = {
              backgroundImage: `linear-gradient(to bottom, rgba(11,17,32,.08), rgba(11,17,32,.88)), url('${a.article_image?.url || ""}')`,
            };

            return (
              <a
                key={i}
                href={a.article_url || "#"}
                target="_blank"
                rel="noreferrer"
                className={s.relatedCard}
                style={bgStyle}
              >
                <span>{a.article_tag}</span>
                <h3>{a.article_title}</h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  </Reveal>
)}
      
      
      {/* CTA */}
      {cta && (
        <section className={s.cta}>
          <div className={s.ctaInner}>
            <h2>{cta.cta_title}</h2>
            <p>{cta.cta_description}</p>
            <div className={s.ctaActions}>
              <a href={cta.cta_primary_url || '#'} target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnPrimary}`}>
                {cta.cta_primary_text}
              </a>
              <a href={cta.cta_secondary_url || '#'} className={`${s.btn} ${s.btnSecondary}`}>
                {cta.cta_secondary_text}
              </a>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}