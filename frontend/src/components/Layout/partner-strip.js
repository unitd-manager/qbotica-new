'use client';
import { SectionTag, DivTag, H2Tag, PTag } from '../Common/HTMLTags';

export default function PartnerStrip({ data }) {
  const heading = data?.heading || 'A connected ecosystem for enterprise transformation.';
  const description =
    data?.description ||
    "The partner page expands the homepage partner section by introducing each relationship and explaining how it supports qBotica's AI and automation strategy.";

  // ACF Repeater "logos" -> sub-fields: logo (image), extra_class (optional)
  const logos = Array.isArray(data?.logos) && data.logos.length
    ? data.logos
    : [
        { logo: { url: '/images/atolioo.png', alt: 'Atolio' }, extra_class: 'atolio-logo' },
        { logo: { url: '/images/uipath.webp', alt: 'UiPath' }, extra_class: '' },
        { logo: { url: '/images/aws-1-1.webp', alt: 'AWS' }, extra_class: '' },
        { logo: { url: '/images/microsoft.png', alt: 'Microsoft' }, extra_class: '' },
        { logo: { url: '/images/anthrotext.png', alt: 'Anthropic' }, extra_class: 'anthropic-logo' },
      ];

  const class_name = data?.class_name || '';
  const id = data?.id || 'qbotica-partners-strip';

  return (
    <SectionTag className={`partner-strip ${class_name}`} id={id}>
      <DivTag className="partners-container">
        <DivTag className="partner-strip-card">
          <DivTag className="partner-strip-left">
            {heading && <H2Tag dangerouslySetInnerHTML={{ __html: heading }} />}
            {description && <PTag dangerouslySetInnerHTML={{ __html: description }} />}
          </DivTag>

          <DivTag className="partner-logos">
            {logos.map((item, i) => (
              <DivTag key={i} className="partner-logo">
                {item?.logo?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.logo.url}
                    alt={item.logo.alt || 'Partner'}
                    className={`partner-logo-img ${item.extra_class || ''}`}
                  />
                )}
              </DivTag>
            ))}
          </DivTag>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}