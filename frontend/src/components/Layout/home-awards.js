'use client';

import { useEffect, useRef } from 'react';
import { DivTag, H2Tag, SectionTag } from '../Common/HTMLTags';
import Image from 'next/image';

export default function AwardsSection({ data }) {
  const awardSectionRef = useRef(null);
  const awardListRef = useRef(null);
  useEffect(() => {
    const awardSection = awardSectionRef.current;
    const awardList = awardListRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === awardSection && awardList) {
            if (entry.isIntersecting) {
              awardList.classList.add('animate-award');
            } else {
              awardList.classList.remove('animate-award');
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (awardSection) observer.observe(awardSection);
    return () => {
      if (awardSection) observer.unobserve(awardSection);
    };
  }, []);

  const award_cert_list = data?.award_and_certificate_list || [];
  const main_title = data?.main_title;
  const padding = data?.padding;
  let paddingClass = '';
  if (padding.padding_options && padding.padding_options === true) {
    const {
      padding_position = [],
      desktop_padding = {},
      mobile_padding = {}
    } = padding;

    if (padding_position.includes('top')) {
      if (desktop_padding?.padding_top_desktop)
        paddingClass += ` padding-top-desktop-${desktop_padding.padding_top_desktop}px`;
      if (mobile_padding?.padding_top_mobile)
        paddingClass += ` padding-top-mobile-${mobile_padding.padding_top_mobile}px`;
    }

    if (padding_position.includes('bottom')) {
      if (desktop_padding?.padding_bottom_desktop)
        paddingClass += ` padding-bottom-desktop-${desktop_padding.padding_bottom_desktop}px`;
      if (mobile_padding?.padding_bottom_mobile)
        paddingClass += ` padding-bottom-mobile-${mobile_padding.padding_bottom_mobile}px`;
    }
  }
  return (
    <SectionTag className='our-award-info premium-awards' ref={awardSectionRef}>
      <DivTag className="container our-award-info-data">
        <DivTag className={`sub-section ${paddingClass}`} >
          <DivTag className="row">
            <DivTag className="award-top-title">
              {main_title && (
                <H2Tag className="award-heading" dangerouslySetInnerHTML={{ __html: main_title }} />
              )}
            </DivTag>

            <DivTag className="our-award-list" ref={awardListRef}>
              {award_cert_list.length > 0 &&
                award_cert_list.map((item, index) => (
                  <DivTag className="our-award-itmes" key={index}>
                    <DivTag className="img-div">
                      <div className="img-inner">
                        <Image src={item.image?.url || ''} alt={item.title || 'award'} fill sizes="120px" style={{ objectFit: 'contain' }} />
                      </div>
                      {item.title && <div className="award-caption">{item.title}</div>}
                    </DivTag>
                  </DivTag>
                ))
              }
            </DivTag>
          </DivTag>
        </DivTag>
      </DivTag>

      <style jsx>{`
        .premium-awards { padding: 40px 0; position: relative; overflow: visible; }
        .premium-awards:before { content: ''; position: absolute; left: -6%; top: -10%; width: 420px; height: 420px; background: radial-gradient(circle at 20% 20%, rgba(124,58,237,0.08), transparent 40%); filter: blur(36px); z-index:1; pointer-events:none }
        .premium-awards:after { content: ''; position: absolute; right: -6%; bottom: -8%; width: 380px; height: 380px; background: radial-gradient(circle at 80% 80%, rgba(6,182,212,0.06), transparent 40%); filter: blur(36px); z-index:1; pointer-events:none }

        /* Remove any dotted/dashed decorations inside this section */
        .premium-awards, .premium-awards * {
          border-style: none !important;
          outline: none !important;
          background-image: none !important;
        }

        .award-top-title { width:100%; margin-bottom: 14px; z-index:3; position:relative }
       .award-heading {
  font-size: clamp(20px, 3.2vw, 36px);
  margin: 0;
  background: linear-gradient(90deg,#06b6d4,#7c3aed,#ff7ab6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  font-family: 'Inter Tight', sans-serif !important;
  font-size: clamp(42px, 7vw, 92px);
  font-weight: 900 !important;
  line-height: 0.92;
  letter-spacing: -0.07em;
}

/* IMPORTANT */
.award-heading * {
  font-family: inherit !important;
  font-weight: inherit !important;
}

        .our-award-list { z-index:2; display:flex; gap:16px; align-items:center; padding:10px 6px; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch }
        .our-award-list::-webkit-scrollbar { height:8px } 
        .our-award-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 8px }

        .our-award-itmes { flex:0 0 auto; scroll-snap-align:center; min-width:110px; max-width:150px; display:flex; justify-content:center }
        .img-div { width:110px; display:flex; flex-direction:column; align-items:center; gap:8px }
        .img-inner { position:relative; width:110px; height:88px; border-radius:12px; overflow:hidden; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); display:flex; align-items:center; justify-content:center; box-shadow: 0 12px 36px rgba(2,6,23,0.45); transition: transform 360ms cubic-bezier(.2,.9,.2,1), box-shadow 360ms ease }
        .award-caption { font-size:0.9rem; color: rgba(230,238,248,0.95); text-align:center; max-width:120px; font-family: 'Poppins', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial }

        /* Entrance animation triggered by observer */
        .our-award-list.animate-award .our-award-itmes { opacity:1; transform: translateY(0); }
        .our-award-itmes { opacity:0; transform: translateY(12px); transition: opacity 520ms ease, transform 520ms cubic-bezier(.2,.9,.2,1) }
        .our-award-list.animate-award .our-award-itmes:nth-child(1) { transition-delay: 60ms }
        .our-award-list.animate-award .our-award-itmes:nth-child(2) { transition-delay: 120ms }
        .our-award-list.animate-award .our-award-itmes:nth-child(3) { transition-delay: 180ms }
        .our-award-list.animate-award .our-award-itmes:nth-child(4) { transition-delay: 240ms }
        .our-award-list.animate-award .our-award-itmes:nth-child(5) { transition-delay: 300ms }
        .our-award-list.animate-award .our-award-itmes:nth-child(6) { transition-delay: 360ms }
        .our-award-list.animate-award .our-award-itmes:nth-child(7) { transition-delay: 420ms }

        .our-award-itmes:hover .img-inner { transform: translateY(-6px) scale(1.02); box-shadow: 0 22px 60px rgba(6,24,58,0.45) }

        @media (max-width:760px) {
          .img-inner { width:90px; height:72px }
          .award-caption { max-width:100px; font-size:0.8rem }
        }

        @media (prefers-reduced-motion: reduce) {
          .our-award-itmes, .img-inner { transition: none !important; transform: none !important }
        }
      `}</style>
    </SectionTag>
  );
}
