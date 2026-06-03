'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import {
  DivTag,
  H2Tag,
  SectionTag,
} from '../Common/HTMLTags';

export default function HomePartnersSection({ homePartners = [] }) {
  return (
    <SectionTag className="home-partners-section" id="home-partners">
      <DivTag className="container">
        <DivTag className="sub-section">
          <DivTag className="home-partners-card">

            <DivTag className="section-head">
              <span className="mini-badge">Global Collaborations</span>

              <H2Tag>
                Trusted by <span>Innovative Brands</span>
              </H2Tag>

              <p>
                Building impactful digital experiences together with
                industry-leading companies and technology partners worldwide.
              </p>
            </DivTag>

            <DivTag className="partner-logo-grid" role="list">
              {homePartners.map((partner, index) => {
                const tooltipId = `partner-tip-${index}`;

                return (
                  <DivTag
                    key={partner.image?.url || index}
                    className="partner-logo-card"
                    role="listitem"
                    tabIndex={0}
                    aria-label={
                      partner.description ||
                      partner.image?.alt ||
                      'Partner'
                    }
                    aria-describedby={tooltipId}
                  >
                    <div className="partner-card-glow"></div>

                    <Image
                      src={
                        partner.image?.url ||
                        '/assets/images/logo-placeholder.webp'
                      }
                      alt={partner.image?.alt || 'Partner'}
                      width={220}
                      height={80}
                      className="partner-logo-img"
                    />

                    <DivTag
                      className="partner-logo-tooltip"
                      id={tooltipId}
                      role="tooltip"
                    >
                      {partner.description ||
                        partner.image?.alt ||
                        'Partner'}
                    </DivTag>
                  </DivTag>
                );
              })}
            </DivTag>

            <DivTag className="home-partners-cta">
              <Link
                href="https://qbdevweb.unitdtechnologies.com/partners"
                className="partners-btn"
                target="_self"
              >
                <span>Explore All Partners</span>

                <ArrowRight className="right-arrow-icon" />
              </Link>
            </DivTag>

          </DivTag>
        </DivTag>
      </DivTag>

      <style jsx>{`
        .home-partners-section {
          position: relative;
          padding: 120px 0;
          overflow: hidden;

          background:
            radial-gradient(circle at top left,
            rgba(124,58,237,0.14),
            transparent 30%),

            radial-gradient(circle at bottom right,
            rgba(6,182,212,0.14),
            transparent 30%),

            #040816;
        }

        .home-partners-section::before {
          content: '';
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.03) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(255,255,255,0.03) 1px,
              transparent 1px
            );

          background-size: 80px 80px;

          mask-image:
            radial-gradient(circle at center,
            black 30%,
            transparent 80%);

          pointer-events: none;
        }

        .home-partners-card {
          position: relative;
          z-index: 2;

          padding: 80px;
          border-radius: 40px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.02)
            );

          border: 1px solid rgba(255,255,255,0.08);

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          box-shadow:
            0 20px 80px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .section-head {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 70px;
        }

        .mini-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 10px 20px;
          border-radius: 999px;

          background: rgba(255,255,255,0.06);

          border:
            1px solid rgba(255,255,255,0.08);

          color: #a5f3fc;

          font-size: 14px;
          font-weight: 600;

          letter-spacing: .08em;
          text-transform: uppercase;

          margin-bottom: 24px;
        }

        .section-head h2 {
          margin: 0;

          font-size: clamp(42px, 7vw, 84px);

          line-height: .95;
          letter-spacing: -.06em;

          font-weight: 900;

          color: #fff;
        }

        .section-head h2 span {
          background:
            linear-gradient(
              135deg,
              #06b6d4,
              #7c3aed,
              #ff7ab6
            );

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-head p {
          margin: 28px auto 0;
          max-width: 760px;

          color: rgba(255,255,255,0.72);

          font-size: 18px;
          line-height: 1.8;
        }

        .partner-logo-grid {
          display: grid;

          grid-template-columns:
            repeat(auto-fit, minmax(220px, 1fr));

          gap: 28px;
        }

        .partner-logo-card {
          position: relative;

          height: 180px;
          border-radius: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          overflow: hidden;
          isolation: isolate;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.08),
              rgba(255,255,255,0.03)
            );

          border:
            1px solid rgba(255,255,255,0.08);

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          transition:
            transform .45s cubic-bezier(.2,.9,.2,1),
            border-color .45s ease,
            box-shadow .45s ease;
        }

        .partner-card-glow {
          position: absolute;

          width: 220px;
          height: 220px;

          background:
            radial-gradient(circle,
            rgba(124,58,237,0.35),
            transparent 70%);

          opacity: 0;

          transition: opacity .45s ease;

          filter: blur(20px);
        }

        .partner-logo-card:hover {
          transform:
            translateY(-10px)
            scale(1.03);

          border-color:
            rgba(255,255,255,0.14);

          box-shadow:
            0 25px 70px rgba(0,0,0,0.45),
            0 0 60px rgba(124,58,237,0.18),
            0 0 40px rgba(6,182,212,0.14);
        }

        .partner-logo-card:hover .partner-card-glow {
          opacity: 1;
        }

        .partner-logo-img {
          position: relative;
          z-index: 2;

          width: auto;
          max-width: 160px;
          height: auto;

          object-fit: contain;

          filter:
            brightness(1.1)
            drop-shadow(
              0 10px 24px rgba(0,0,0,0.35)
            );

          transition:
            transform .45s ease,
            filter .45s ease;
        }

        .partner-logo-card:hover .partner-logo-img {
          transform: scale(1.08);

          filter:
            brightness(1.2)
            drop-shadow(
              0 14px 28px rgba(0,0,0,0.45)
            );
        }

        .partner-logo-tooltip {
          position: absolute;

          left: 50%;
          bottom: 18px;

          transform: translateX(-50%);

          background: rgba(0,0,0,0.65);
          color: #fff;

          padding: 8px 14px;
          border-radius: 999px;

          font-size: 13px;
          white-space: nowrap;

          opacity: 0;
          visibility: hidden;

          transition: .3s ease;
        }

        .partner-logo-card:hover .partner-logo-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .home-partners-cta {
          display: flex;
          justify-content: center;

          margin-top: 70px;
        }

        .partners-btn {
          position: relative;

          display: inline-flex;
          align-items: center;
          gap: 12px;

          padding: 18px 34px;
          border-radius: 999px;

          background:
            linear-gradient(
              135deg,
              #06b6d4,
              #7c3aed
            );

          color: #fff;
          text-decoration: none;

          font-weight: 700;
          font-size: 16px;

          overflow: hidden;

          transition:
            transform .35s ease,
            box-shadow .35s ease;
        }

        .partners-btn:hover {
          transform: translateY(-4px);

          box-shadow:
            0 16px 40px rgba(124,58,237,0.35),
            0 10px 30px rgba(6,182,212,0.25);
        }

        .right-arrow-icon {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 992px) {
          .home-partners-card {
            padding: 50px 30px;
          }

          .partner-logo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .home-partners-section {
            padding: 80px 0;
          }

          .section-head h2 {
            font-size: 52px;
          }

          .section-head p {
            font-size: 16px;
          }

          .partner-logo-grid {
            grid-template-columns: 1fr;
          }

          .partner-logo-card {
            height: 140px;
          }

          .home-partners-card {
            padding: 40px 20px;
            border-radius: 30px;
          }
        }
      `}</style>
    </SectionTag>
  );
}