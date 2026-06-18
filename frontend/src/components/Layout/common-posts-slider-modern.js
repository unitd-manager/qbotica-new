'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './common-posts-slider-modern.module.css';

import { ArrowRight } from '../Common/Icons';

import {
  DivTag,
  H2Tag,
  H4Tag,
  SectionTag,
  SpanTag,
} from '../Common/HTMLTags';

export default function CommonPostPagesSliderModern({ data }) {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [animate, setAnimate] = useState(false);

  const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const setEqualHeight = useCallback(() => {
    if (!sliderRef.current) return;

    const cards =
      sliderRef.current.querySelectorAll(
        '.slick-slide .premiumCard'
      );

    let maxHeight = 0;

    cards.forEach((card) => {
      card.style.height = 'auto';
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEqualHeight();
    }, 200);

    window.addEventListener('resize', setEqualHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', setEqualHeight);
    };
  }, [setEqualHeight]);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const animateTimeoutRef = { current: null };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // clear pending hide timeout
          if (animateTimeoutRef.current) {
            clearTimeout(animateTimeoutRef.current);
            animateTimeoutRef.current = null;
          }
          setAnimate(true);
          setTimeout(setEqualHeight, 300);
        } else {
          // debounce hiding to avoid flicker when user stops scrolling
          if (animateTimeoutRef.current) clearTimeout(animateTimeoutRef.current);
          animateTimeoutRef.current = setTimeout(() => {
            setAnimate(false);
            animateTimeoutRef.current = null;
          }, 180);
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -25% 0px' }
    );

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
      if (animateTimeoutRef.current) {
        clearTimeout(animateTimeoutRef.current);
        animateTimeoutRef.current = null;
      }
    };
  }, [setEqualHeight]);

  if (!data) return null;

  const {
    posts = [],
    main_title,
    common_description,
    show_feature_image,
    show_title,
    show_description,
    show_date,
    class_name,
    id,
  } = data;

  if (!posts.length) return null;

  return (
    <SectionTag
      ref={sectionRef}
      className={`${styles.premiumSliderSection} ${
        animate ? styles.animate : ''
      } ${class_name || ''}`}
      id={id}
    >
      <DivTag className="container">
        <DivTag className={styles.headingWrapper}>
          {main_title && (
            <H2Tag
              className={styles.mainTitle}
              dangerouslySetInnerHTML={{
                __html: main_title,
              }}
            />
          )}

          {common_description && (
            <DivTag
              className={styles.sectionDesc}
              dangerouslySetInnerHTML={{
                __html: common_description,
              }}
            />
          )}
        </DivTag>

        <div
          className={styles.sliderWrapper}
          ref={sliderRef}
        >
          <Slider {...settings}>
            {posts.map((post, index) => (
              <DivTag key={post.id || index} className={styles.slideItem}>
                <DivTag className={`premiumCard ${styles.premiumCard}`}>
                  {(show_feature_image === 'yes' &&
                    post.featuredImage) && (
                    <DivTag className={styles.imageWrapper}>
                      <Image
                        src={
                          post.featuredImage?.url || post.featuredImage || '/images/placeholder.png'
                        }
                        alt={post.title || 'Post image'}
                        width={800}
                        height={600}
                        className={styles.cardImage}
                      />
                    </DivTag>
                  )}

                  <DivTag className={styles.cardContent}>
                    {(show_date === 'yes' && post.date) && (
                      <SpanTag className={styles.postDate}>
                        {post.date}
                      </SpanTag>
                    )}

                    {(show_title === 'yes' &&
                      post.title) && (
                      <H4Tag
                        className={styles.postTitle}
                        dangerouslySetInnerHTML={{
                          __html: post.title,
                        }}
                      />
                    )}

                    {(show_description === 'yes' &&
                      (post.excerpt ||
                        post.description)) && (
                    <div className={styles.descWrapper}>
  <DivTag
    className={styles.postDesc}
    dangerouslySetInnerHTML={{
      __html: post.excerpt || post.description,
    }}
  />
</div>
                    )}

                    <Link
                      href={post.link || '#'}
                      className={styles.readMoreBtnOverride}
                      aria-label={`Read more: ${post.title || 'post'}`}
                    >
                      Read More
                      <ArrowRight />
                    </Link>
                  </DivTag>
                </DivTag>
              </DivTag>
            ))}
          </Slider>
        </div>
      </DivTag>
    </SectionTag>
  );
}