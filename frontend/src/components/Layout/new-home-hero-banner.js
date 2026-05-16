import Link from 'next/link';
import Image from 'next/image';
import { DivTag, H1Tag, SectionTag } from '@/components/Common/HTMLTags';
import { ArrowRight } from '@/components/Common/Icons';

export default function NewHomeHeroBanner({ data }) {
  if (!data) return null;

  const {
    sub_title,
    main_title,
    description,
    button,
    secondary_button,
    banner_two_images = [],
  } = data;

  const heroImage = banner_two_images?.[1]?.main_image || banner_two_images?.[0]?.main_image;

  return (
    <SectionTag className="nh-hero-banner">
      <DivTag className="nh-hero-bg" />
      <DivTag className="nh-hero-container">
        <DivTag className="nh-hero-grid">
          <DivTag className="nh-hero-content">
            {sub_title ? (
              <DivTag className="nh-hero-eyebrow">{sub_title}</DivTag>
            ) : null}

            {main_title ? (
              <H1Tag
                className="nh-hero-title"
                dangerouslySetInnerHTML={{ __html: main_title }}
              />
            ) : null}

            {description ? (
              <DivTag
                className="nh-hero-desc"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : null}

            {(button?.url || secondary_button?.url) ? (
              <DivTag className="nh-hero-actions">
                {button?.url ? (
                  <Link
                    href={button.url}
                    className="btn primary-btn"
                    target={button.target || '_self'}
                    rel={button.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    {button.title} <ArrowRight className="right-arrow-icon" />
                  </Link>
                ) : null}

                {secondary_button?.url ? (
                  <Link
                    href={secondary_button.url}
                    className="btn secondary-btn"
                    target={secondary_button.target || '_self'}
                    rel={secondary_button.target === '_blank' ? 'noopener noreferrer' : undefined}
                  >
                    {secondary_button.title} <ArrowRight className="right-arrow-icon" />
                  </Link>
                ) : null}
              </DivTag>
            ) : null}
          </DivTag>

          <DivTag className="nh-hero-media" aria-hidden="true">
            <DivTag className="nh-hero-media-inner">
              {heroImage?.url ? (
                <Image
                  src={heroImage.url}
                  alt={heroImage.alt || 'Hero'}
                  fill
                  priority
                  sizes="(max-width: 991px) 92vw, 46vw"
                  style={{ objectFit: 'contain', objectPosition: 'right bottom' }}
                />
              ) : null}
            </DivTag>
          </DivTag>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}
