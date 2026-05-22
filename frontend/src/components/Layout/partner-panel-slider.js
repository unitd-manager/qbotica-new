'use client';

import { useMemo, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { DivTag, H2Tag, PTag, SectionTag } from '../Common/HTMLTags';
import { ArrowNavLeft, ArrowNavRight } from '../Common/Icons';

export default function PartnerPanelSlider({ data }) {
  const sliderRef = useRef(null);

  const slides = useMemo(() => {
    if (!data || typeof data !== 'object') return [];
    if (!Array.isArray(data.slides)) return [];
    return data.slides.filter(Boolean);
  }, [data]);

  const settings = useMemo(() => {
    const hasMany = slides.length > 1;
    return {
      dots: false,
      arrows: false,
      infinite: hasMany,
      speed: 450,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: hasMany,
      autoplaySpeed: 6000,
      pauseOnHover: true,
      adaptiveHeight: false,
    };
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <SectionTag className="partner-panel-slider-section" id={data?.id || 'partner-panel-slider'}>
      <DivTag className="container">
        <DivTag className="partner-panel-slider-card">
          <button
            type="button"
            className="partner-panel-arrow partner-panel-arrow-left"
            aria-label="Previous"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ArrowNavLeft />
          </button>

          <button
            type="button"
            className="partner-panel-arrow partner-panel-arrow-right"
            aria-label="Next"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ArrowNavRight />
          </button>

          <Slider ref={sliderRef} {...settings} className="partner-panel-slider">
            {slides.map((slide, index) => (
              <DivTag key={slide?.key || index} className="partner-panel-slide">
                <DivTag className="partner-panel-inner">
                  <DivTag className="row g-0 align-items-stretch">
                    <DivTag className="col-lg-6 partner-panel-media">
                      <DivTag className="partner-panel-media-inner">
                        {slide?.logo?.url && (
                          <Image
                            src={slide.logo.url}
                            alt={slide.logo.alt || slide.title || 'Partner'}
                            width={520}
                            height={220}
                            className="img-fluid partner-panel-logo"
                          />
                        )}
                      </DivTag>
                    </DivTag>
                    <DivTag className="col-lg-6 partner-panel-content">
                      <DivTag className="partner-panel-content-inner">
                        {slide?.title && (
                          <H2Tag className="partner-panel-title" dangerouslySetInnerHTML={{ __html: slide.title }} />
                        )}
                        {slide?.description && (
                          <PTag className="partner-panel-desc" dangerouslySetInnerHTML={{ __html: slide.description }} />
                        )}
                      </DivTag>
                    </DivTag>
                  </DivTag>
                </DivTag>
              </DivTag>
            ))}
          </Slider>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}
