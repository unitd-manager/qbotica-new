'use client';
import Image from 'next/image';
import { useEffect } from 'react';

const css = `
  .hp-wrap *,
  .hp-wrap *::before,
  .hp-wrap *::after { box-sizing: border-box; }
  .hp-wrap img { max-width: 100%; display: block; }
  .hp-wrap a { text-decoration: none; color: inherit; }
  .hp-wrap ul { list-style: none; }

  .hp-wrap {
    --o:#F97316;--od:#EA6000;--om:#FB923C;
    --ol:#FFF7ED;--op:#FFEDD5;
    --g50:#F8FAFC;--g100:#F1F5F9;--g200:#E2E8F0;
    --g400:#94A3B8;--g500:#64748B;--g700:#334155;--g900:#0F172A;
    --w:#fff;
    --ss:0 1px 4px rgba(15,23,42,.06),0 2px 8px rgba(15,23,42,.04);
    --sm:0 4px 16px rgba(15,23,42,.10),0 1px 4px rgba(15,23,42,.06);
    --so:0 8px 32px rgba(249,115,22,.35),0 2px 8px rgba(249,115,22,.20);
    --sc:0 1px 0 #fff inset,0 -1px 0 rgba(0,0,0,.04) inset,0 4px 20px rgba(15,23,42,.08);
    --r8:8px;--r16:16px;--r24:24px;
    --tr:all 0.26s cubic-bezier(0.4,0,0.2,1);
    font-family:'C',sans-serif;
    background:#fff;
    color:#1E293B;
    line-height:1.6;
    overflow-x:hidden;
  }

  .hp-wrap .con{max-width:1180px;margin:0 auto;padding:0 32px}
  .hp-wrap .sec{padding:56px 0}
  .hp-wrap .sec-alt{padding:56px 0;background:var(--g50)}
  .hp-wrap .sec-pale{padding:56px 0;background:var(--ol)}

  .hp-wrap .lbl{display:inline-flex;align-items:center;gap:8px;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--o);margin-bottom:12px}
  .hp-wrap .lbl::before{content:'';width:18px;height:2px;background:var(--o);border-radius:2px}

  .hp-wrap .h-hero{font-family:'Inter',sans-serif;font-size:clamp(2.4rem,4.5vw,3.6rem);font-weight:900;line-height:1.1;letter-spacing:-.03em;color:var(--g900)}
  .hp-wrap .h-hero em{font-style:normal;color:var(--o)}
  .hp-wrap .h-sec{font-family:'Inter',sans-serif;font-size:clamp(1.7rem,2.8vw,2.4rem);font-weight:800;line-height:1.2;letter-spacing:-.025em;color:var(--g900)}
  .hp-wrap .h-sec em{font-style:normal;color:var(--o)}
  .hp-wrap .h-card{font-family:'Inter',sans-serif;font-size:1rem;font-weight:700;color:var(--g900);letter-spacing:-.02em;margin-bottom:8px}
  .hp-wrap .subhead{font-size:clamp(.95rem,1.3vw,1.1rem);color:var(--g700);line-height:1.8;max-width:560px}
  .hp-wrap .lead{font-size:.95rem;color:var(--g700);line-height:1.8}
  .hp-wrap .p-sm{font-size:.85rem;color:var(--g700);line-height:1.7}

  .hp-wrap .btn{display:inline-flex;align-items:center;gap:9px;font-weight:600;font-size:.9rem;padding:12px 26px;border-radius:100px;transition:var(--tr);cursor:pointer;border:none}
  .hp-wrap .btn-p{background:linear-gradient(135deg,var(--o) 0%,var(--od) 100%);color:#fff;box-shadow:var(--so)}
  .hp-wrap .btn-p:hover{background:linear-gradient(135deg,var(--od) 0%,#C45000 100%);transform:translateY(-2px)}
  .hp-wrap .btn-o{background:#fff;color:var(--g900);border:1.5px solid var(--g200);box-shadow:var(--ss)}
  .hp-wrap .btn-o:hover{border-color:var(--o);color:var(--o);transform:translateY(-2px)}
  .hp-wrap .btn-w{background:#fff;color:var(--od);box-shadow:0 8px 28px rgba(0,0,0,.15)}
  .hp-wrap .btn-w:hover{background:var(--ol);transform:translateY(-2px)}
  .hp-wrap .btn-gw{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.45)}
  .hp-wrap .btn-gw:hover{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.7)}
  .hp-wrap .btn i{font-size:.8rem}

  .hp-wrap .pill{display:inline-flex;align-items:center;gap:8px;background:var(--op);border:1px solid rgba(249,115,22,.25);color:var(--od);font-size:.72rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:16px}
  .hp-wrap .pill-dot{width:6px;height:6px;background:var(--o);border-radius:50%;animation:hp-blink 2s ease-in-out infinite}
  @keyframes hp-blink{0%,100%{opacity:1}50%{opacity:.4}}

  /* HERO */
  .hp-wrap .hero{padding:56px 0 0;background:#fff}
  .hp-wrap .hero-inner{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:48px;padding-bottom:40px}
  .hp-wrap .hero-left{}
  .hp-wrap .hero-cta{display:flex;align-items:center;gap:12px;margin-top:22px;flex-wrap:wrap}
  .hp-wrap .hero-right{display:flex;align-items:center;justify-content:center}
  .hp-wrap .hero-img-wrapper{position:relative;width:100%;max-width:720px;aspect-ratio:1 / 1}
  .hp-wrap .hero-img{border-radius:var(--r24);box-shadow:0 16px 56px rgba(15,23,42,.14);display:block;object-fit:contain}
  .hp-wrap .hero-strip{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--g200);background:var(--g50)}
  .hp-wrap .hst{padding:20px 28px;border-right:1px solid var(--g200)}
  .hp-wrap .hst:last-child{border-right:none}
  .hp-wrap .hst-n{font-family:'Inter',sans-serif;font-size:1.8rem;font-weight:900;color:var(--o);line-height:1}
  .hp-wrap .hst-l{font-size:.78rem;color:var(--g500);margin-top:4px;font-weight:500}

  /* TRUST */
  .hp-wrap .trust{padding:36px 0;background:var(--ol);border-top:1px solid rgba(249,115,22,.15);border-bottom:1px solid rgba(249,115,22,.15)}
  .hp-wrap .trust-in{display:flex;flex-direction:column;align-items:center;gap:14px}
  .hp-wrap .trust-ttl{font-size:.76rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--g400)}
  .hp-wrap .trust-inds{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
  .hp-wrap .ti-chip{display:inline-flex;align-items:center;gap:7px;background:#fff;border:1px solid rgba(249,115,22,.2);color:var(--g700);font-size:.82rem;font-weight:600;padding:7px 16px;border-radius:100px}
  .hp-wrap .ti-chip i{color:var(--o);font-size:.78rem}
  .hp-wrap .trust-tags{display:flex;align-items:center;gap:18px;flex-wrap:wrap;justify-content:center}
  .hp-wrap .ttg{display:flex;align-items:center;gap:7px;font-size:.82rem;font-weight:600;color:var(--g700)}
  .hp-wrap .ttg i{color:var(--o)}
  .hp-wrap .ttg-sep{width:1px;height:14px;background:rgba(249,115,22,.25)}

  /* AGENTIC */
  .hp-wrap .ag-body{max-width:740px}
  .hp-wrap .ag-quote{background:var(--ol);border-left:4px solid var(--o);border-radius:0 var(--r8) var(--r8) 0;padding:16px 22px;margin-top:18px}
  .hp-wrap .ag-quote p{font-size:.95rem;font-weight:600;color:var(--g900);font-style:italic;line-height:1.65}

  /* PROBLEM */
  .hp-wrap .prob-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}
  .hp-wrap .prob-card{background:#fff;border:1.5px solid var(--g200);border-radius:var(--r16);padding:26px 22px;transition:var(--tr);box-shadow:var(--sc)}
  .hp-wrap .prob-card:hover{border-color:rgba(249,115,22,.35);transform:translateY(-4px);box-shadow:var(--sm)}
  .hp-wrap .prob-num{font-family:'Inter',sans-serif;font-size:1.8rem;font-weight:900;color:var(--op);margin-bottom:8px;line-height:1}
  .hp-wrap .prob-ico{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1rem;background:var(--op);color:var(--o);margin-bottom:12px}

  /* DIFFERENCE */
  .hp-wrap .diff-in{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start}
  .hp-wrap .diff-quote{margin-top:14px;font-size:.92rem;font-weight:600;color:var(--g700);font-style:italic}
  .hp-wrap .diff-feats{display:flex;flex-direction:column;gap:12px}
  .hp-wrap .df{background:#fff;border:1.5px solid var(--g200);border-radius:var(--r16);padding:18px 20px;transition:var(--tr);box-shadow:var(--ss);display:flex;gap:14px;align-items:flex-start}
  .hp-wrap .df:hover{border-color:rgba(249,115,22,.4);box-shadow:var(--sm);transform:translateX(4px)}
  .hp-wrap .df-ico{width:38px;height:38px;border-radius:10px;background:var(--op);color:var(--o);display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0}
  .hp-wrap .df-t{font-size:.88rem;font-weight:700;color:var(--g900);margin-bottom:3px}
  .hp-wrap .df-d{font-size:.8rem;color:var(--g500);line-height:1.6}

  /* HOW */
  .hp-wrap .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:40px;position:relative}
  .hp-wrap .steps-line{position:absolute;top:36px;left:calc(12.5% + 18px);right:calc(12.5% + 18px);height:2px;background:linear-gradient(90deg,var(--o),var(--om),var(--o))}
  .hp-wrap .step-b{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 12px;position:relative;z-index:1}
  .hp-wrap .step-orb{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--o) 0%,var(--od) 100%);display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:#fff;margin-bottom:18px;box-shadow:var(--so),0 0 0 8px var(--op);position:relative}
  .hp-wrap .step-orb .sn{position:absolute;top:-4px;right:-4px;width:20px;height:20px;background:#fff;border:2px solid var(--op);border-radius:50%;font-size:.6rem;font-weight:800;color:var(--o);display:flex;align-items:center;justify-content:center}
  .hp-wrap .step-t{font-family:'Inter',sans-serif;font-size:.98rem;font-weight:700;color:var(--g900);margin-bottom:7px;letter-spacing:-.02em}
  .hp-wrap .step-d{font-size:.8rem;color:var(--g500);line-height:1.7}

  /* WORKFLOWS */
  .hp-wrap .wf-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
  .hp-wrap .wf-card{background:#fff;border:1.5px solid var(--g200);border-radius:var(--r16);padding:24px 20px;transition:var(--tr);box-shadow:var(--sc)}
  .hp-wrap .wf-card:hover{border-color:rgba(249,115,22,.4);transform:translateY(-4px);box-shadow:var(--sm)}
  .hp-wrap .wf-ico{width:44px;height:44px;border-radius:12px;background:var(--op);color:var(--o);display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin-bottom:14px;transition:var(--tr)}
  .hp-wrap .wf-card:hover .wf-ico{background:var(--o);color:#fff}

  /* RESULTS */
.hp-wrap .res-bullets {
  display:grid;
  grid-template-columns:repeat(2,1fr); /* 2 columns side by side */
  gap:16px;
  margin-top:28px;
  max-width:900px;
  margin-left:auto;
  margin-right:auto; /* center the grid */
}
  .hp-wrap .res-row{display:flex;align-items:flex-start;gap:14px;padding:16px 18px;background:#fff;border:1.5px solid var(--g200);border-radius:var(--r8);box-shadow:var(--ss);transition:var(--tr)}
  .hp-wrap .res-row:hover{border-color:rgba(249,115,22,.3);box-shadow:var(--sm)}
  .hp-wrap .res-chk{width:26px;height:26px;border-radius:50%;background:var(--op);color:var(--o);display:flex;align-items:center;justify-content:center;font-size:.72rem;flex-shrink:0;margin-top:2px}
  .hp-wrap .res-t{font-size:.88rem;font-weight:700;color:var(--g900);margin-bottom:2px}
  .hp-wrap .res-d{font-size:.8rem;color:var(--g500);line-height:1.6}

  /* PLATFORM */
.hp-wrap .pillars {
  display:grid;
  grid-template-columns:repeat(2,1fr); /* two columns side by side */
  gap:16px;
  margin-top:22px;
  max-width:900px;
  margin-left:auto;
  margin-right:auto;
}  .hp-wrap .pillar{display:flex;align-items:center;gap:14px;background:#fff;border:1.5px solid var(--g200);border-radius:var(--r8);padding:13px 16px;transition:var(--tr);box-shadow:var(--ss)}
  .hp-wrap .pillar:hover{border-color:rgba(249,115,22,.35);transform:translateX(5px);box-shadow:var(--sm)}
  .hp-wrap .pl-ico{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0}
  .hp-wrap .pl-nm{font-size:.87rem;font-weight:700;color:var(--g900)}
  .hp-wrap .pl-ds{font-size:.75rem;color:var(--g400)}
  .hp-wrap .managed{display:flex;align-items:center;gap:14px;background:linear-gradient(135deg,var(--o) 0%,var(--od) 100%);border-radius:var(--r16);padding:18px 22px;margin-top:14px;max-width:700px;box-shadow:var(--so)}
  .hp-wrap .mg-ico{width:40px;height:40px;border-radius:11px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:#fff;flex-shrink:0}
  .hp-wrap .mg-t{font-size:.88rem;font-weight:700;color:#fff;margin-bottom:2px}
  .hp-wrap .mg-d{font-size:.78rem;color:rgba(255,255,255,.82)}

  /* WHY */
.hp-wrap .why-list {
  display:grid;
  grid-template-columns:repeat(2,1fr); /* two columns side by side */
  gap:16px;
  margin-top:32px;
  max-width:900px;
  margin-left:auto;
  margin-right:auto;
}  .hp-wrap .why-row{display:flex;align-items:flex-start;gap:14px;padding:16px 20px;background:#fff;border:1.5px solid var(--g200);border-radius:var(--r8);box-shadow:var(--ss);transition:var(--tr)}
  .hp-wrap .why-row:hover{border-color:rgba(249,115,22,.3);box-shadow:var(--sm)}
  .hp-wrap .why-dot{width:8px;height:8px;border-radius:50%;background:var(--o);flex-shrink:0;margin-top:6px}
  .hp-wrap .why-t{font-size:.88rem;font-weight:700;color:var(--g900);margin-bottom:2px}
  .hp-wrap .why-d{font-size:.8rem;color:var(--g500);line-height:1.6}

  /* ECOSYSTEM */
  .hp-wrap .eco-ls{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;margin-top:32px}
  .hp-wrap .eco-it{display:flex;align-items:center;justify-content:center;background:#fff;border:1.5px solid var(--g200);border-radius:var(--r8);padding:11px 22px;min-width:110px;height:46px;font-size:.78rem;font-weight:700;color:var(--g400);letter-spacing:.03em;transition:var(--tr);box-shadow:var(--ss)}
  .hp-wrap .eco-it:hover{border-color:rgba(249,115,22,.35);color:var(--g900);transform:translateY(-3px);box-shadow:var(--sm)}

  /* FINAL CTA */
  .hp-wrap .fcta{padding:70px 0;background:linear-gradient(135deg,var(--o) 0%,var(--od) 60%,#C45000 100%);position:relative;overflow:hidden;text-align:center}
  .hp-wrap .fcta::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:56px 56px;pointer-events:none}
  .hp-wrap .fcta-in{position:relative;z-index:2;max-width:660px;margin:0 auto}
  .hp-wrap .fcta-h{font-family:'Inter',sans-serif;font-size:clamp(1.8rem,3.2vw,2.7rem);font-weight:900;line-height:1.12;color:#fff;letter-spacing:0.90px;margin-bottom:14px}
  .hp-wrap .fcta-sub{font-size:.98rem;color:rgba(255,255,255,.85);line-height:1.7;margin-bottom:32px}
  .hp-wrap .fcta-btns{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}

  /* RESPONSIVE */
  @media(max-width:1024px){
    .hp-wrap .hero-inner{grid-template-columns:1fr;gap:24px}
    .hp-wrap .hero-right{display:flex;justify-content:center}
    .hp-wrap .hero-img{max-width:480px;width:100%}
    .hp-wrap .diff-in{grid-template-columns:1fr;gap:32px}
    .hp-wrap .steps{grid-template-columns:repeat(2,1fr)}
    .hp-wrap .steps-line{display:none}
    .hp-wrap .wf-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:768px){
    .hp-wrap .con{padding:0 20px}
    .hp-wrap .sec,.hp-wrap .sec-alt,.hp-wrap .sec-pale{padding:40px 0}
    .hp-wrap .prob-grid,.hp-wrap .steps,.hp-wrap .wf-grid{grid-template-columns:1fr}
    .hp-wrap .hero-strip{grid-template-columns:1fr}
    .hp-wrap .fcta-btns{flex-direction:column;align-items:stretch}
    .hp-wrap .trust-inds{gap:8px}
        /* Final CTA mobile padding fix */
    .hp-wrap .fcta {
      padding:50px 20px; /* more breathing room on mobile */
    }
    .hp-wrap .fcta-in {
      padding:0 10px; /* keep inner content aligned */
    }
.hp-wrap .res-bullets {
    grid-template-columns:1fr; /* stack vertically on mobile */
  }
     .hp-wrap .pillars {
    grid-template-columns:1fr; /* stack vertically on mobile */
  }
    .hp-wrap .why-list {
    grid-template-columns:1fr; /* stack vertically on mobile */
  }
     .steps-line {
    left: 20px; /* move line to left side */
    transform: none;
  }
  .step-orb {
    margin: 0 0 12px 0;
    left: 0;
  }
  .step-b {
    text-align: left;
    padding-left: 48px; /* space for orb + line */
  }
  }
`;

export default function HomepagePage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document
      .querySelectorAll(
        '.hp-wrap .prob-card,.hp-wrap .wf-card,.hp-wrap .df,.hp-wrap .pillar,.hp-wrap .res-row,.hp-wrap .why-row,.hp-wrap .step-b,.hp-wrap .eco-it'
      )
      .forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.45s ease ${i * 0.05}s,transform 0.45s ease ${i * 0.05}s`;
        obs.observe(el);
      });
    return () => obs.disconnect();
  }, []);

  const DEMO_LINK = "https://meetings.hubspot.com/enterprisedemo/solution-consultation";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="hp-wrap">

        {/* HERO */}
       {/* HERO */}
        <section className="hero">
          <div className="con">
            <div className="hero-inner">
              <div className="hero-left">
                <h1 className="h-hero">Agentic AI That <em>Runs Your Business</em></h1>
                <p className="subhead" style={{ marginTop: '16px' }}>
                  Move beyond pilots and &ldquo;assistants.&rdquo; qBotica runs your enterprise operations using Agentic AI to execute end-to-end workflows across your systems, documents, and decisions.
                </p>
                <div className="hero-cta">
                  <a 
                    href={DEMO_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-p"
                  >
                    Request a Demo <i className="fa-solid fa-arrow-right"></i>
                  </a>
                  <a 
                    href={DEMO_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-o"
                  >
                    <i className="fa-solid fa-play"></i> See Agentic AI in Action
                  </a>
                </div>
              </div>
              <div className="hero-right">
                <div className="hero-img-wrapper">
                  <Image
                    src="/assets/images/qbotica-globe.jpeg"
                    alt="qBotica Agentic AI Enterprise Globe"
                    className="hero-img"
                    fill
                    priority
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* TRUST BAR */}
        <section className="trust">
          <div className="con">
            <div className="trust-in">
              <p className="trust-ttl">Powering operations for global leaders in</p>
              <div className="trust-inds">
                <div className="ti-chip"><i className="fa-solid fa-heart-pulse"></i> Healthcare</div>
                <div className="ti-chip"><i className="fa-solid fa-landmark"></i> Finance</div>
                <div className="ti-chip"><i className="fa-solid fa-truck-fast"></i> Logistics</div>
                <div className="ti-chip"><i className="fa-solid fa-headset"></i> Customer Service</div>
              </div>
              <div className="trust-tags">
                <div className="ttg"><i className="fa-solid fa-bullseye"></i> Outcome Focused</div>
                <div className="ttg-sep"></div>
                <div className="ttg"><i className="fa-solid fa-shield-halved"></i> Enterprise Proven</div>
                <div className="ttg-sep"></div>
                <div className="ttg"><i className="fa-solid fa-rocket"></i> Execution Ready</div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IS AGENTIC AI */}
      
<section className="sec" id="what-is">
  <div className="con" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
    <span className="lbl">What Is Agentic AI</span>
    <h2 className="h-sec">Agentic AI: AI That <em>Actually Works.</em></h2>
    <div className="ag-body" style={{ marginTop: '16px' }}>
      <p className="lead">
        Agentic AI is not chatbots or copilots. It&apos;s an operating model where AI doesn&apos;t just assist &mdash; <strong>it acts.</strong>
      </p>
      <p className="lead" style={{ marginTop: '10px' }}>
        It understands the work, makes the decision, and executes the task across your existing systems. 
        It doesn&apos;t stop at an insight &mdash; it completes the job.
      </p>
      <div className="ag-quote" style={{ marginTop: '18px', display: 'inline-block', textAlign: 'center' }}>
        <p>
          {`This is the shift from "How can AI help?" to `}
          <strong style={{ color: 'var(--od)' }}>
            {`"Let AI do it."`}
          </strong>
        </p>
      </div>
    </div>
  </div>
</section>


        {/* THE PROBLEM */}
        <section className="sec-alt">
          <div className="con">
            <div style={{ textAlign: 'center', margin: '0 auto', marginBottom: '0' }}>
              <span className="lbl">The Problem</span>
              <h2 className="h-sec">Why Most AI <em>Fails at Operations</em></h2>
            </div>
            <div className="prob-grid">
              <div className="prob-card">
                <div className="prob-num">01</div>
                <div className="prob-ico"><i className="fa-solid fa-lightbulb"></i></div>
                <h3 className="h-card">Stops at Insight</h3>
                <p className="p-sm">Most tools tell you what&apos;s wrong but leave the fix to your team.</p>
              </div>
              <div className="prob-card">
                <div className="prob-num">02</div>
                <div className="prob-ico"><i className="fa-solid fa-hand-point-up"></i></div>
                <h3 className="h-card">Doesn&apos;t Execute</h3>
                <p className="p-sm">Assistants help individuals, but they don&apos;t complete workflows across systems.</p>
              </div>
              <div className="prob-card">
                <div className="prob-num">03</div>
                <div className="prob-ico"><i className="fa-solid fa-link-slash"></i></div>
                <h3 className="h-card">Disconnected from Reality</h3>
                <p className="p-sm">AI sits outside of real operations, unable to handle documents, exceptions, and approvals.</p>
              </div>
            </div>
          </div>
        </section>

        {/* QBOTICA DIFFERENCE */}
      {/* QBOTICA DIFFERENCE */}
{/* QBOTICA DIFFERENCE */}
<section className="sec" id="difference">
  <div className="con" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
    <span className="lbl">The qBotica Difference</span>
    <h2 className="h-sec">
      We Don&apos;t Deploy Tools.<br /><em>We Run Work.</em>
    </h2>
    <p className="lead" style={{ marginTop: '14px' }}>
      qBotica converges AI agents, automation, and orchestration into a single execution engine. 
      We handle the messy reality of business: reading messy documents, making complex decisions, 
      and taking action in legacy ERPs.
    </p>
    <p className="diff-quote" style={{ marginTop: '14px', fontStyle: 'italic' }}>
      &ldquo;This isn&apos;t a demo. This is Agentic AI in production.&rdquo;
    </p>
  </div>
</section>


        {/* HOW IT WORKS */}
        <section className="sec-alt" id="how">
          <div className="con">
            <div style={{ textAlign: 'center', margin: '0 auto', marginBottom: '40px' }}>
              <span className="lbl">How It Works</span>
              <h2 className="h-sec">How Agentic AI <em>Runs Your Business</em></h2>
            </div>
            <div className="steps">
              <div className="steps-line"></div>
              <div className="step-b">
                <div className="step-orb"><i className="fa-solid fa-file-lines"></i><span className="sn">1</span></div>
                <h3 className="step-t">Understand</h3>
                <p className="step-d">Read documents, emails, and data across structured and unstructured sources.</p>
              </div>
              <div className="step-b">
                <div className="step-orb"><i className="fa-solid fa-brain"></i><span className="sn">2</span></div>
                <h3 className="step-t">Decide</h3>
                <p className="step-d">Apply AI reasoning, business rules, and context to make informed decisions.</p>
              </div>
              <div className="step-b">
                <div className="step-orb"><i className="fa-solid fa-bolt"></i><span className="sn">3</span></div>
                <h3 className="step-t">Act</h3>
                <p className="step-d">Execute actions across enterprise systems, applications, and workflows.</p>
              </div>
              <div className="step-b">
                <div className="step-orb"><i className="fa-solid fa-network-wired"></i><span className="sn">4</span></div>
                <h3 className="step-t">Orchestrate</h3>
                <p className="step-d">Coordinate agents, automation, and human input to manage real-world complexity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOWS */}
        <section className="sec" id="workflows">
          <div className="con">
            <div style={{ textAlign: 'center', margin: '0 auto', marginBottom: '0' }}>
              <span className="lbl">Workflows</span>
              <h2 className="h-sec">Where Agentic AI <em>Delivers Impact</em></h2>
              <p className="lead" style={{ marginTop: '12px' }}>We focus on the workflows that matter most to your business.</p>
            </div>
            <div className="wf-grid">
              <div className="wf-card"><div className="wf-ico"><i className="fa-solid fa-file-invoice"></i></div><h3 className="h-card">Claims &amp; Document Processing</h3><p className="p-sm">Automate intake, validation, and decisioning across high-volume documents.</p></div>
              <div className="wf-card"><div className="wf-ico"><i className="fa-solid fa-chart-line"></i></div><h3 className="h-card">Finance &amp; Reconciliation</h3><p className="p-sm">Streamline reporting, audits, and financial operations with accuracy and speed.</p></div>
              <div className="wf-card"><div className="wf-ico"><i className="fa-solid fa-headset"></i></div><h3 className="h-card">Customer &amp; Contact Center</h3><p className="p-sm">Enable faster response, resolution, and service execution.</p></div>
              <div className="wf-card"><div className="wf-ico"><i className="fa-solid fa-truck-fast"></i></div><h3 className="h-card">Logistics &amp; Operations</h3><p className="p-sm">Automate scheduling, communication, and operational decision-making.</p></div>
              <div className="wf-card"><div className="wf-ico"><i className="fa-solid fa-building-columns"></i></div><h3 className="h-card">Back-Office &amp; Shared Services</h3><p className="p-sm">Reduce manual work across HR, procurement, and internal operations.</p></div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
      {/* RESULTS */}
<section className="sec-pale" id="results">
  <div className="con" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
    <span className="lbl">Results</span>
    <h2 className="h-sec">Proven in Real <em>Enterprise Environments</em></h2>
    <p className="lead" style={{ marginTop: '10px', color: 'var(--g700)' }}>
      This isn&apos;t theory. This is execution at scale. Enterprises working with qBotica are seeing:
    </p>

    <div className="res-bullets">
      <div className="res-row">
        <div className="res-chk"><i className="fa-solid fa-check"></i></div>
        <div>
          <div className="res-t">Faster Processing Times</div>
          <div className="res-d">Across core operations — claims, finance, customer service, and more.</div>
        </div>
      </div>
      <div className="res-row">
        <div className="res-chk"><i className="fa-solid fa-check"></i></div>
        <div>
          <div className="res-t">Significant Reduction in Manual Effort</div>
          <div className="res-d">Dramatic decrease in operational cost and human-driven bottlenecks.</div>
        </div>
      </div>
      <div className="res-row">
        <div className="res-chk"><i className="fa-solid fa-check"></i></div>
        <div>
          <div className="res-t">Improved Accuracy &amp; Consistency</div>
          <div className="res-d">AI-driven consistency eliminates human error across all workflows.</div>
        </div>
      </div>
      <div className="res-row">
        <div className="res-chk"><i className="fa-solid fa-check"></i></div>
        <div>
          <div className="res-t">Greater Visibility &amp; Control</div>
          <div className="res-d">Real-time oversight of every agent action, decision, and outcome.</div>
        </div>
      </div>
    </div>

    <p className="lead" style={{ marginTop: '20px', fontStyle: 'italic', color: 'var(--g700)' }}>
      We focus on measurable outcomes that matter to your business.
    </p>
  </div>
</section>
{/* PLATFORM */}
<section className="sec" id="platform">
  <div className="con" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
    <span className="lbl">Platform &amp; Delivery</span>
    <h2 className="h-sec">Built for <em>Enterprise Reality</em></h2>
    <p className="lead" style={{ marginTop: '12px', color: 'var(--g700)' }}>
      Running real business operations requires more than AI. qBotica combines:
    </p>

    <div className="pillars">
      <div className="pillar">
        <div className="pl-ico" style={{ background: 'var(--op)', color: 'var(--o)' }}>
          <i className="fa-solid fa-brain"></i>
        </div>
        <div>
          <div className="pl-nm">AI Agents that understand and reason</div>
          <div className="pl-ds">Purpose-built to handle context, decisions, and business rules</div>
        </div>
      </div>
      <div className="pillar">
        <div className="pl-ico" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
          <i className="fa-solid fa-gears"></i>
        </div>
        <div>
          <div className="pl-nm">Automation that executes at scale</div>
          <div className="pl-ds">End-to-end workflow execution across enterprise systems</div>
        </div>
      </div>
      <div className="pillar">
        <div className="pl-ico" style={{ background: '#F0FDF4', color: '#22C55E' }}>
          <i className="fa-solid fa-diagram-project"></i>
        </div>
        <div>
          <div className="pl-nm">Orchestration that connects systems and workflows</div>
          <div className="pl-ds">Coordinates agents, automation, and human touchpoints</div>
        </div>
      </div>
      <div className="pillar">
        <div className="pl-ico" style={{ background: '#FAF5FF', color: '#A855F7' }}>
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <div>
          <div className="pl-nm">Governance for control, compliance, and visibility</div>
          <div className="pl-ds">Audit trails, explainability, and enterprise-grade oversight</div>
        </div>
      </div>
      <div className="pillar">
        <div className="pl-ico" style={{ background: 'var(--op)', color: 'var(--o)' }}>
          <i className="fa-solid fa-user-check"></i>
        </div>
        <div>
          <div className="pl-nm">Human-in-the-loop where judgment is required</div>
          <div className="pl-ds">Seamless escalation to experts when needed</div>
        </div>
      </div>
    </div>

    <div className="managed" style={{ margin: '20px auto', textAlign: 'left' }}>
      <div className="mg-ico"><i className="fa-solid fa-server"></i></div>
      <div>
        <div className="mg-t">Delivered as a Managed Service</div>
        <div className="mg-d">You don&apos;t just deploy AI. You run it — with qBotica managing outcomes end-to-end.</div>
      </div>
    </div>
  </div>
</section>


        {/* WHY QBOTICA */}
      {/* WHY QBOTICA */}
<section className="sec-alt" id="why">
  <div className="con" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
    <span className="lbl">Why qBotica</span>
    <h2 className="h-sec">Why Enterprises <em>Choose qBotica</em></h2>

    <div className="why-list">
      <div className="why-row">
        <div className="why-dot"></div>
        <div><div className="why-t">Others sell tools. qBotica owns outcomes.</div></div>
      </div>
      <div className="why-row">
        <div className="why-dot"></div>
        <div><div className="why-t">Others deliver pilots. qBotica runs production workflows.</div></div>
      </div>
      <div className="why-row">
        <div className="why-dot"></div>
        <div><div className="why-t">Others separate AI, automation, and systems. qBotica orchestrates them together.</div></div>
      </div>
      <div className="why-row">
        <div className="why-dot"></div>
        <div><div className="why-t">Others leave execution to you. qBotica delivers it with you.</div></div>
      </div>
    </div>
  </div>
</section>


     {/* ECOSYSTEM */}
{/* ECOSYSTEM */}
<section className="sec" id="ecosystem">
  <div className="con" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
    <span className="lbl">Ecosystem</span>
    <h2 className="h-sec">Built on a Strong <em>Enterprise Ecosystem</em></h2>
    <p className="lead" style={{ marginTop: '12px', color: 'var(--g700)' }}>
      We work across leading enterprise platforms and technologies to deliver what works best for your environment.
    </p>
    <p className="lead" style={{ marginTop: '8px', color: 'var(--g700)' }}>
      Our approach is platform-agnostic, outcome-driven, and designed to integrate into your existing systems without disruption.
    </p>
  </div>
</section>



        {/* FINAL CTA */}
         <section className="fcta">
          <div className="fcta-in">
            <h2 className="fcta-h">Ready to Run Your Business with Agentic AI?</h2>
            <p className="fcta-sub">Book a demo and see how qBotica delivers real enterprise execution.</p>
            <div className="fcta-btns">
              <a 
                href={DEMO_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-w"
              >
                Request a Demo <i className="fa-solid fa-arrow-right"></i>
              </a>
              <a 
                href={DEMO_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gw"
              >
                <i className="fa-solid fa-play"></i> Talk to an Expert
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}