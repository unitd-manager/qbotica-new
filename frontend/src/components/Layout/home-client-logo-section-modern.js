'use client';

import Slider from 'react-slick';
import Image from 'next/image';

import styles from './client-logo-section-modern.module.css';

import {
  DivTag,
  H3Tag,
  SectionTag,
} from '../Common/HTMLTags';

export default function ClientLogoSectionModern({ data }) {
  const logoSliderSettings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true,
    swipe: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const logo_list = data?.logo_list || [];
  const main_title = data?.main_title;

  return (
    <SectionTag className={styles.logoSection}>
      <DivTag className={styles.container}>
        {/* TITLE */}
        <DivTag className={styles.sectionHead}>
          {main_title && (
            <H3Tag
              className={styles.title}
              dangerouslySetInnerHTML={{
                __html: main_title,
              }}
            />
          )}
        </DivTag>
      </DivTag>

      {/* LOGO MARQUEE */}
      <DivTag className={styles.sliderOuter}>
        <DivTag className={styles.fadeLeft} />
        <DivTag className={styles.fadeRight} />

        <Slider
          {...logoSliderSettings}
          className={styles.logoSlider}
        >
          {logo_list?.map((item, idx) => {
            const img = item.image;

            return (
              <DivTag
                key={img?.id || idx}
                className={styles.logoSlide}
              >
                <DivTag className={styles.logoCard}>
                  <Image
                    src={
                      img?.url ||
                      '/assets/images/logo-placeholder.webp'
                    }
                    alt={
                      img?.alt ||
                      `Client ${idx + 1}`
                    }
                    width={220}
                    height={90}
                    className={styles.logoImage}
                  />
                </DivTag>
              </DivTag>
            );
          })}
        </Slider>
      </DivTag>
    </SectionTag>
  );
}