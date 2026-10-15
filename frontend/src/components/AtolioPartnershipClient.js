"use client";
import { useState, useEffect, useRef, Fragment } from 'react';
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


const BODY_TYPES = ['article', 'intro_section', 'content_section', 'outcomes', 'market_focus', 'about_companies', 'media_contact'];

// Turn the ACF layouts into page sections, keeping the order added in WordPress.
// Consecutive body layouts are grouped into one white article card.
function buildSections(layouts) {
  const sections = [];
  const spotlight = layouts.find((l) => l.acf_fc_layout === 'spotlight_');
  let spotlightUsed = false;

  layouts.forEach((l) => {
    const t = l.acf_fc_layout;
    if (t === 'hero_section') {
      sections.push({ kind: 'hero', hero: l, spotlight });
      spotlightUsed = true;
    } else if (t === 'press_meta') {
      sections.push({ kind: 'pressMeta', data: l });
    } else if (BODY_TYPES.includes(t)) {
      const last = sections[sections.length - 1];
      if (last && last.kind === 'body') last.items.push(l);
      else sections.push({ kind: 'body', items: [l] });
    } else if (t === 'related_news') {
      sections.push({ kind: 'related', data: l });
    } else if (t === 'cta') {
      sections.push({ kind: 'cta', data: l });
    }
  });

  // Spotlight added without a Hero row: still show it on its own
  if (spotlight && !spotlightUsed) {
    const idx = layouts.indexOf(spotlight);
    sections.splice(Math.min(idx, sections.length), 0, { kind: 'hero', hero: null, spotlight });
  }
  return sections;
}

export default function AtolioPartnershipClient({ data }) {
  const layouts = data?.acf?.atolio || [];
  const sections = buildSections(layouts);

  const [openItem, setOpenItem] = useState('a0');
  const toggle = (key) => setOpenItem((prev) => (prev === key ? null : key));

  const renderSpotlight = (spotlight) =>
    spotlight && (
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
    );

  const renderHero = (hero, spotlight, key) => (
    <section key={key} className={s.hero}>
      <div className={s.heroInner}>
        {hero ? (
          <div>
            {hero._hero_kicker && (
              <div className={s.kicker}>
                <span className={s.kickerDot} /> {hero._hero_kicker}
              </div>
            )}

            <div className={s.heroPartnerRow}>
              <div className={s.heroPartnerPill}>
                <img
                  src={hero.partner_1_logo?.url || '/assets/images/logo-front.webp'}
                  alt="qBotica"
                  style={{ height: 35, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
                />
              </div>
              {hero.partner_2_logo?.url && (
                <>
                  <span className={s.heroX}>&times;</span>
                  <div className={s.heroPartnerPill}>
                    <img
                      src={hero.partner_2_logo.url}
                      alt={hero.partner_2_logo.alt || 'Partner'}
                      style={{ height: 35, width: 'auto', objectFit: 'contain', flexShrink: 0, transform: 'scale(1.4)' }}
                    />
                  </div>
                </>
              )}
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
        ) : (
          <div />
        )}
        {renderSpotlight(spotlight)}
      </div>
    </section>
  );

  const renderPressMeta = (m, key) => (
    <section key={key} className={s.pressMeta}>
      <Reveal className={s.pressMetaGrid}>
        {m.published_date && <div className={s.pmi}><span>Published</span><strong>{m.published_date}</strong></div>}
        {m.location && <div className={s.pmi}><span>Location</span><strong>{m.location}</strong></div>}
        {m.category && <div className={s.pmi}><span>Category</span><strong>{m.category}</strong></div>}
        {m.focus && <div className={s.pmi}><span>Focus</span><strong>{m.focus}</strong></div>}
      </Reveal>
    </section>
  );

  const renderAccordions = (items) => {
    const abouts = items.filter((l) => l.acf_fc_layout === 'about_companies');
    const contacts = items.filter((l) => l.acf_fc_layout === 'media_contact');
    let n = 0;
    return (
      <section className={s.articleSection}>
        <h2 className={s.sectionTitle}>About the Companies</h2>
        <div className={s.accordionWrap}>
          {abouts.flatMap((a) => a.accordion_items || []).map((item, i) => {
            const key = `a${n++}`;
            return (
              <div key={`about-${i}`} className={`${s.accordion} ${openItem === key ? s.accordionActive : ''}`}>
                <button type="button" className={s.accordionHeader} onClick={() => toggle(key)}>
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
                    <a href={item.accordion_link_url} target="_blank" rel="noreferrer" className={s.acLink}>
                      {item.accordion_link_text}
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {contacts.map((mc, ci) => {
            const key = `a${n++}`;
            return (
              <div key={`contact-${ci}`} className={`${s.accordion} ${openItem === key ? s.accordionActive : ''}`}>
                <button type="button" className={s.accordionHeader} onClick={() => toggle(key)}>
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
                    {(mc.contacts || []).map((c, i) => (
                      <div key={i} className={s.contactCard}>
                        <div className={s.contactCardLabel}>{c.contact_label}</div>
                        <div className={s.contactCardName}>{c.contact_name}</div>
                        <div className={s.contactCardDetail}>
                          {c.contact_email && <a href={`mailto:${c.contact_email}`}>{c.contact_email}</a>}
                          <br />
                          {c.contact_detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const renderBlock = (block, idx) => {
    const type = block.acf_fc_layout;

    if (type === 'article') {
      return (
        <Fragment key={idx}>
          <section className={`${s.articleSection} ${s.intro}`}>
            <p>
              <span className={s.dateline}>{block.article_dateline}</span>
              {' '}&mdash; {block.intro_content}
            </p>
            <p>{block.intro_content2}</p>
          </section>

          <section
            className={`${s.articleSection} ${s.techSection}`}
            dangerouslySetInnerHTML={{ __html: block.tech_section_content }}
          />

          {(block.quotes || []).map((q, i) => (
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
        </Fragment>
      );
    }

    if (type === 'intro_section' || type === 'content_section') {
      return (
        <section key={idx} className={s.articleSection}>
          {block.section_heading && <h2 className={s.sectionTitle}>{block.section_heading}</h2>}
          {block.section_logo?.url && (
            <div className={s.qubiLogoLink}>
              <img
                src={block.section_logo.url}
                alt={block.section_logo.alt || block.section_heading || ''}
                className={s.qubiLogo}
              />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: block.section_content }} />
        </section>
      );
    }

    if (type === 'outcomes') {
      return (
        <section key={idx} className={s.articleSection}>
          <h2 className={s.sectionTitle}>{block.outcomes_title}</h2>
          <div className={s.outcomeGrid}>
            {(block.outcomes_list || []).map((o, i) => (
              <div key={i} className={s.outcomeCard}>
                <div className={s.outcomeNumber}>{o.outcome_number}</div>
                <h3>{o.outcome_title}</h3>
                <p>{o.outcome_description}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'market_focus') {
      return (
        <section key={idx} className={s.articleSection}>
          <h2 className={s.sectionTitle}>{block.market_focus_title}</h2>
          <div className={s.marketTags}>
            {(block.market_tags || []).map((tag, i) => (
              <span key={i} className={`${s.marketTag} ${tag.is_active ? s.marketTagActive : ''}`}>
                {tag.tag_name}
              </span>
            ))}
          </div>
          <p>{block.market_focus_description}</p>
          {block.market_focus_link_1_url && (
            <p>
              {block.market_focus_links_text}{' '}
              <a href={block.market_focus_link_1_url} target="_blank" rel="noreferrer">
                {block.market_focus_link_1_text}
              </a>
              {block.market_focus_link_2_url && (
                <>
                  {' '}and{' '}
                  <a href={block.market_focus_link_2_url} target="_blank" rel="noreferrer">
                    {block.market_focus_link_2_text}
                  </a>
                </>
              )}.
            </p>
          )}
        </section>
      );
    }

    return null;
  };

  const renderBody = (items, key) => {
    let accordionsDone = false;
    return (
      <main key={key} className={s.articleWrap}>
        <Reveal className={s.article}>
          <article>
            {items.map((block, idx) => {
              const t = block.acf_fc_layout;
              if (t === 'about_companies' || t === 'media_contact') {
                if (accordionsDone) return null;
                accordionsDone = true;
                return <Fragment key={idx}>{renderAccordions(items)}</Fragment>;
              }
              return renderBlock(block, idx);
            })}
          </article>
        </Reveal>
      </main>
    );
  };

  const renderRelated = (r, key) => (
    <Reveal key={key}>
      <section className={s.related}>
        <div className={s.relatedInner}>
          <div className={s.relatedHeader}>
            <h2>{r.related_news_title || 'Related News'}</h2>
            <p>{r.related_news_description}</p>
          </div>
          <div className={s.relatedGrid}>
            {(r.related_articles || []).map((a, i) => {
              const bgStyle = {
                backgroundImage: `linear-gradient(to bottom, rgba(11,17,32,.08), rgba(11,17,32,.88)), url('${a.article_image?.url || ''}')`,
              };
              return (
                <a key={i} href={a.article_url || '#'} target="_blank" rel="noreferrer" className={s.relatedCard} style={bgStyle}>
                  <span>{a.article_tag}</span>
                  <h3>{a.article_title}</h3>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </Reveal>
  );

  const renderCta = (c, key) => (
    <section key={key} className={s.cta}>
      <div className={s.ctaInner}>
        <h2>{c.cta_title}</h2>
        <p>{c.cta_description}</p>
        <div className={s.ctaActions}>
          <a href={c.cta_primary_url || '#'} target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnPrimary}`}>
            {c.cta_primary_text}
          </a>
          <a href={c.cta_secondary_url || '#'} className={`${s.btn} ${s.btnSecondary}`}>
            {c.cta_secondary_text}
          </a>
        </div>
      </div>
    </section>
  );

  return (
    <div className={s.apPage}>
      {sections.map((sec, i) => {
        switch (sec.kind) {
          case 'hero': return renderHero(sec.hero, sec.spotlight, i);
          case 'pressMeta': return renderPressMeta(sec.data, i);
          case 'body': return renderBody(sec.items, i);
          case 'related': return renderRelated(sec.data, i);
          case 'cta': return renderCta(sec.data, i);
          default: return null;
        }
      })}
    </div>
  );
}