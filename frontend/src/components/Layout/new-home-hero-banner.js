import Link from 'next/link';
import Image from 'next/image';
import { DivTag, H1Tag, SectionTag } from '@/components/Common/HTMLTags';
import { ArrowRight } from '@/components/Common/Icons';

function getTitleLines(value) {
  if (!value) return [];
  const html = String(value);
  const normalized = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?[^>]+>/g, '');
  return normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function NewHomeHeroBanner({ data }) {
  if (!data) return null;

  const {
    sub_title,
    main_title,
    description,
    button,
    secondary_button,
    banner_two_images = [],
    hero_image,
    image_position,
  } = data;

  const heroImage =
    hero_image ||
    banner_two_images?.[1]?.main_image ||
    banner_two_images?.[0]?.main_image;
  const titleLines = getTitleLines(main_title);
  const isImageLeft = image_position === 'left';

  return (
    <SectionTag className={`nh-hero-banner${isImageLeft ? ' is-image-left' : ''}`}>
      <DivTag className="nh-hero-bg" />
      <DivTag className="nh-hero-container">
        <DivTag className="nh-hero-grid">
          <DivTag className="nh-hero-content">
            {sub_title ? (
              <DivTag className="nh-hero-eyebrow">{sub_title}</DivTag>
            ) : null}

            {titleLines.length ? (
              <H1Tag className="nh-hero-title">
                {titleLines.map((line, index) => (
                  <span
                    key={`${line}-${index}`}
                    className={`nh-hero-title-line ${index === 0 ? '' : 'nh-hero-highlight'}`.trim()}
                  >
                    {line}
                  </span>
                ))}
              </H1Tag>
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
                  style={{
                    objectFit: 'contain',
                    objectPosition: isImageLeft ? 'left bottom' : 'right bottom'
                  }}
                />
              ) : null}
            </DivTag>
          </DivTag>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}
