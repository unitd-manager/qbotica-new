 'use client';
import { DivTag, H2Tag, PTag, SectionTag } from '../Common/HTMLTags';
import Link from 'next/link';
import { ArrowRight, ArrowNavLeft, ArrowNavRight } from '../Common/Icons';
import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import BoxGrid from '../Common/BoxGrid';
import styles from './footer-common-cta.module.css';

export default function FooterCommonCTA({ data }) {
  if (!data || typeof data !== 'object') return null;
  const {
    display_options = [],
    main_title,
    description,
    cta_button
  } = data;

  const showTitle = display_options.includes('main_title');
  const showDescription = display_options.includes('description');
  const showCTA = display_options.includes('cta_button');

  return (
    <SectionTag className={styles.footerCommonCta}>
      <BoxGrid position="left" />
      <BoxGrid position="right" />
      <DivTag className="container">
        <DivTag className={styles.inner}>
          <DivTag className={styles.card}>
            <DivTag className={styles.header}>
              {showTitle && main_title && (
                <H2Tag
                  className={styles.mainTitle}
                  dangerouslySetInnerHTML={{ __html: main_title }}
                />
              )}

              {showDescription && description && (
                <PTag
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </DivTag>

            {showCTA && cta_button?.url && (
              <DivTag className={styles.ctaRow}>
                <Link
                  href={cta_button.url}
                  target={cta_button.target || '_self'}
                  className={`${styles.btn} ${styles.primaryBtn}`}
                >
                  <span>{cta_button.title || 'Learn More'}</span>
                  <ArrowRight className={styles.rightIcon} />
                </Link>
              </DivTag>
            )}
          </DivTag>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}