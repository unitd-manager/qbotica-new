'use client';

import './Hero.css';
import PolaroidCard from "./PolaroidCard";

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
            Transportation &amp; Supply Chain
          </div>

          <div className="cs-chip">
            Document AI
          </div>

          <div className="cs-chip">
            RPA
          </div>

        </div>

        {/* Polaroid Card */}
        <PolaroidCard
          logo="/images/case-studies/polaris-logo.png"
          client="Polaris Transportation Group"
          industry="Transportation & Supply Chain"
          since="Client Since 2023"
        />

        <h1 className="cs-title">

          From Inbox Chaos to

          <span>500+ Documents</span>

          Processed Daily

        </h1>

        <div className="cs-stats">

          {stats.map((item, index) => (

            <div
              className="cs-stat-card"
              key={index}
            >

              <h2>{item.value}</h2>

              <p style={{ whiteSpace: 'pre-line' }}>
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}