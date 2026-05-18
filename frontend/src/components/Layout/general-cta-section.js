"use client";
import { DivTag, H2Tag, H5Tag, PTag, SectionTag } from '../Common/HTMLTags';
import Link from 'next/link';
import { ArrowRight } from '../Common/Icons';
import BoxGrid from '../Common/BoxGrid';
import styles from './general-cta-section.module.css';

export default function GeneralCTASection({ data }) {
  if (!data || typeof data !== 'object') return null;
  const {
    display_options = [],
    main_title,
    description,
    sub_description,
    cta_button,
    secondary_cta_button,
    class_name = '',
    id = '',
    padding
  } = data;

  const showTitle = display_options.includes('main_title');
  const showDescription = display_options.includes('description') || Boolean(description);
  const showSubDescription = display_options.includes('sub_description');
  const showCTA = display_options.includes('cta_button');
  const showSecondaryCTA = display_options.includes('secondary_cta_button');
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
    <SectionTag className={`${styles.ctaSection} general-cta-section`}>
      {/* <BoxGrid position="left" />
      <BoxGrid position="right" /> */}
      <DivTag className="container">
        <DivTag className={`sub-section ${paddingClass}`}>
          <DivTag className="row">
            <DivTag className={`${styles.inner} cta-section-header`}>
              {showTitle && main_title && (
                <H2Tag className={styles.mainTitle} dangerouslySetInnerHTML={{ __html: main_title }} />
              )}

              {showDescription && description && (
                <DivTag className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
              )}

              {showSubDescription && sub_description && (
                <H5Tag className={styles.subDescription} dangerouslySetInnerHTML={{ __html: sub_description }} />
              )}

              <DivTag className={styles.buttonRow}>
                {showCTA && cta_button?.url && (
                  <Link
                    href={cta_button.url}
                    target={cta_button.target || '_self'}
                    className={`${styles.btn} ${styles.primaryBtn}`}
                  >
                    <span>{cta_button.title || 'Learn More'}</span>
                    <ArrowRight className="right-arrow-icon" />
                  </Link>
                )}

                {showSecondaryCTA && secondary_cta_button?.url && (
                  <Link
                    href={secondary_cta_button.url}
                    target={secondary_cta_button.target || '_self'}
                    className={`${styles.btn} ${styles.secondaryBtn}`}
                  >
                    <span>{secondary_cta_button.title || 'Talk to an Expert'}</span>
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