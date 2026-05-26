'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  SectionTag,
  DivTag,
  H2Tag,
} from '../Common/HTMLTags';

import DotGrid from '../Common/DotGrid';
import { ArrowRight } from '../Common/Icons';

import styles from './content-highlight-modern.module.css';

export default function ContentHighlightModern({ data }) {
  if (!data || typeof data !== 'object') return null;

  const {
    title,
    description,
    image,
    background_color = '',
    text_alignment = 'left',
    image_position = 'right',
    button,
    class_name = '',
    enable_animation = 'true',
    id = '',
    padding = {},
  } = data;

  let paddingClass = '';

  if (padding?.padding_options === true) {
    const {
      padding_position = [],
      desktop_padding = {},
      mobile_padding = {},
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

  const isRight = image_position === 'right';

  return (
    <SectionTag
      id={id}
      className={`
        ${styles.premiumSection}
        ${class_name}
      `}
      style={background_color ? { background: background_color } : undefined}
    >
      {enable_animation === 'true' &&
        (isRight ? (
          <DotGrid className={styles.leftGrid} />
        ) : (
          <DotGrid className={styles.rightGrid} />
        ))}

      <DivTag className="container">
        <DivTag className={`${styles.wrapper} ${paddingClass}`}>
          <DivTag
            className={`
              row
              align-items-center
              ${isRight ? 'flex-row-reverse' : ''}
            `}
          >
            {/* IMAGE */}
            {image?.url && (
              <DivTag className="col-lg-6 mb-5 mb-lg-0">
                <DivTag className={styles.imageCard}>
                  <DivTag className={styles.glow}></DivTag>

                  <Image
                    src={image.url}
                    alt={image.alt || 'Section Image'}
                    width={700}
                    height={520}
                    quality={100}
                    className={styles.image}
                  />

                  <DivTag className={styles.imageOverlay}></DivTag>
                </DivTag>
              </DivTag>
            )}

            {/* CONTENT */}
            <DivTag className="col-lg-6">
              <DivTag
                className={`${styles.contentBox} text-${text_alignment}`}
              >
            

                {title && (
                  <H2Tag
                    className={styles.title}
                    dangerouslySetInnerHTML={{ __html: title }}
                  />
                )}

                {description && (
                  <DivTag
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}

                {button?.url && (
                  <Link
                    href={button.url}
                    target={button.target || '_self'}
                    className={styles.button}
                  >
                    <span>{button.title || 'Explore More'}</span>

                    <DivTag className={styles.iconWrap}>
                      <ArrowRight />
                    </DivTag>
                  </Link>
                )}
              </DivTag>
            </DivTag>
          </DivTag>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}