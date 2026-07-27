'use client';

import './Hero.css';
import Image from 'next/image';

export default function Hero() {

  const stats = [
  {
    value: '>90%',
    description: 'NOISE REMOVAL\nSUCCESS RATE ON\nVENDOR EMAILS',
  },
  {
    value: '500+',
    description: 'QUOTATIONS PROCESSED\nAUTOMATICALLY EACH DAY',
  },
  {
    value: '100%',
    description: 'END-TO-END WORKFLOW\nAUTOMATED WITHOUT\nHEADCOUNT INCREASE',
  },
  {
    value: '3hrs',
    description: 'DAILY TIME\nRECLAIMED BY THE\nOPERATIONS TEAM',
  },
];

  return (
    <section className="cs-hero">

      <div className="cs-hero-grid"></div>
      <div className="cs-hero-glow1"></div>
      <div className="cs-hero-glow2"></div>

      <div className="cs-hero-container">

        <div className="cs-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Resources</span>
          <span>/</span>
          <span>Case Studies</span>
          <span>/</span>
          <span className="active">
            Polaris Transportation
          </span>
        </div>

        <div className="cs-meta">

          <div className="cs-case-tag">
            <span className="dot"></span>
            CASE STUDY
          </div>

          <div className="cs-chip">
            Transportation & Supply Chain
          </div>

          <div className="cs-chip">
            Doqument AI
          </div>

          <div className="cs-chip">
            RPA
          </div>

          <div className="cs-client-card">

            <span className="side-notch side-notch-left"></span>
            <span className="side-notch side-notch-right"></span>

            <div className="ticket-left">

              <svg
                className="ticket-frame"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M8,0 L100,0 L100,92 A8,8 0 0 1 92,100 L8,100 A8,8 0 0 1 0,92 L0,8 A8,8 0 0 1 8,0 Z"
                  fill="none"
                  stroke="rgba(21,42,82,0.55)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="ticket-header">
                <svg className="plane-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2.5 1.5V22l4-1 4 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
                <span>ADMISSION PASS</span>
                <span className="header-line"></span>
              </div>

              <div className="ticket-logo">
                <Image
                  src="/assets/images/polaris-logo-copy.jpg"
                  alt="Polaris Transportation Group"
                  fill
                  className="polaris-logo"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>

              <div className="ticket-subdivider">
                <span className="sub-line"></span>
                <span className="star">&#10022;</span>
                <span className="sub-line"></span>
              </div>

              <div className="ticket-field">
                <span className="field-label">CLIENT</span>
                <span className="field-value">Polaris Transportation Group</span>
              </div>

            </div>

            <div className="ticket-divider">
              <span className="notch notch-top"></span>
              <span className="notch notch-bottom"></span>
            </div>

            <div className="ticket-right">

              <div className="vip-row">
                <span className="vip-line"></span>
                <span>VIP ACCESS</span>
                <span className="vip-line"></span>
              </div>

              <div className="case-study-title">CASE STUDY</div>
              <div className="case-study-sub">ADMISSION PASS</div>

              <div className="gold-line"></div>

              <div className="ticket-no-label">TICKET NO.</div>
              <div className="ticket-no-box">PTG-2025-001</div>

              <svg className="dashed-gold" viewBox="0 0 100 2" preserveAspectRatio="none">
                <line
                  x1="0" y1="1" x2="100" y2="1"
                  stroke="var(--ticket-gold)"
                  strokeWidth="1.2"
                  strokeDasharray="3,2.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="ticket-barcode"></div>

              <div className="ticket-caption">
                DIGITALLY TRANSFORMING
                <br />
                TRANSPORTATION
              </div>

            </div>

          </div>

        </div>

        <h1 className="cs-title">

          From Inbox Chaos to

          <span>
            500+ Documents
          </span>

          Processed Daily

        </h1>

        <div className="cs-stats">

          {stats.map((item, index) => (

            <div
              className="cs-stat-card"
              key={index}
            >

              <h2>{item.value}</h2>

              <p
                style={{
                  whiteSpace: 'pre-line'
                }}
              >
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}