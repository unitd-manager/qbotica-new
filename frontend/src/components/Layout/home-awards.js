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
                     
                    </DivTag>
                  </DivTag>
                ))
              }
            </DivTag>
          </DivTag>
        </DivTag>
      </DivTag>

      <style jsx>{`
  .premium-awards {
    position: relative;
    padding: 120px 0 180px; /* increased bottom padding for visual breathing room */
    overflow: hidden;
    background:
      radial-gradient(circle at top left, rgba(124,58,237,0.14), transparent 30%),
      radial-gradient(circle at bottom right, rgba(6,182,212,0.12), transparent 30%),
      #050816;
  }

  .premium-awards::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(circle at center, black 30%, transparent 85%);
    pointer-events: none;
  }

  .award-top-title {
    width: 100%;
    text-align: center;
    margin-bottom: 70px;
    position: relative;
    z-index: 2;
  }

  .award-heading {
    margin: 0;
    font-family: 'Inter Tight', sans-serif !important;
    font-size: clamp(44px, 7vw, 96px);
    font-weight: 900 !important;
    line-height: 0.95;
    letter-spacing: -0.07em;

    background:
      linear-gradient(
        135deg,
        #ffffff 0%,
        #a5f3fc 20%,
        #c4b5fd 45%,
        #ffffff 70%,
        #f9a8d4 100%
      );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    text-shadow:
      0 0 30px rgba(124,58,237,0.18),
      0 0 80px rgba(6,182,212,0.12);
  }

  .award-heading * {
    font-family: inherit !important;
    font-weight: inherit !important;
  }

  .our-award-list {
    position: relative;
    z-index: 2;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 28px;
    width: 100%;
  }

  .our-award-itmes {
    opacity: 0;
    transform: translateY(30px);
    transition:
      opacity 0.7s ease,
      transform 0.7s cubic-bezier(.2,.9,.2,1);
  }

  .our-award-list.animate-award .our-award-itmes {
    opacity: 1;
    transform: translateY(0);
  }

  .our-award-itmes:nth-child(1) { transition-delay: .05s; }
  .our-award-itmes:nth-child(2) { transition-delay: .1s; }
  .our-award-itmes:nth-child(3) { transition-delay: .15s; }
  .our-award-itmes:nth-child(4) { transition-delay: .2s; }
  .our-award-itmes:nth-child(5) { transition-delay: .25s; }
  .our-award-itmes:nth-child(6) { transition-delay: .3s; }

  .img-div {
    position: relative;
    width: 100%;
  }

  .img-inner {
    position: relative;
    height: 170px;
    border-radius: 28px;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    background:
      linear-gradient(
        145deg,
        rgba(255,255,255,0.12),
        rgba(255,255,255,0.03)
      );

    border: 1px solid rgba(255,255,255,0.08);

    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    box-shadow:
      0 10px 40px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(255,255,255,0.08);

    transition:
      transform 0.45s cubic-bezier(.2,.9,.2,1),
      box-shadow 0.45s ease,
      border-color 0.45s ease;
  }

  .img-inner::before {
    content: '';
    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        135deg,
        rgba(255,255,255,0.08),
        transparent 40%,
        rgba(255,255,255,0.03)
      );

    pointer-events: none;
  }

  .img-inner::after {
    content: '';
    position: absolute;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%);
    filter: blur(30px);
    opacity: 0;
    transition: opacity .45s ease;
  }

  .our-award-itmes:hover .img-inner {
    transform:
      translateY(-10px)
      scale(1.04);

    border-color: rgba(255,255,255,0.16);

    box-shadow:
      0 30px 80px rgba(0,0,0,0.55),
      0 0 60px rgba(124,58,237,0.18),
      0 0 40px rgba(6,182,212,0.14);
  }

  .our-award-itmes:hover .img-inner::after {
    opacity: 1;
  }

  :global(.img-inner img) {
    object-fit: contain;
    padding: 24px;
    transition: transform .45s ease;
    filter:
      drop-shadow(0 8px 24px rgba(0,0,0,0.35));
  }

  .our-award-itmes:hover :global(.img-inner img) {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    .premium-awards {
      padding: 80px 0 120px; /* mobile: add bottom padding */
    }

    .our-award-list {
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }

    .img-inner {
      height: 130px;
      border-radius: 22px;
    }

    :global(.img-inner img) {
      padding: 18px;
    }
  }

  @media (max-width: 520px) {
    .award-heading {
      font-size: 52px;
      line-height: 1;
    }

    .our-award-list {
      grid-template-columns: repeat(2, 1fr);
    }

    .img-inner {
      height: 115px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .our-award-itmes,
    .img-inner,
    :global(.img-inner img) {
      transition: none !important;
      transform: none !important;
    }
  }
`}</style>
    </SectionTag>
  );
}
