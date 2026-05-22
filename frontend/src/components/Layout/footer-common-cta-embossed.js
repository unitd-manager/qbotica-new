import Link from 'next/link';
import { DivTag, H2Tag, SectionTag } from '../Common/HTMLTags';
import { ArrowRight } from '../Common/Icons';

export default function FooterCommonCTAEmbossed({ data }) {
  if (!data || typeof data !== 'object') return null;

  const {
    display_options = [],
    main_title,
    description,
    cta_button,
    class_name = '',
    id = '',
    padding = {}
  } = data;

  const showTitle = display_options.includes('main_title');
  const showDescription = display_options.includes('description');
  const showCTA = display_options.includes('cta_button');

  let paddingClass = '';
  if (padding?.padding_options === true) {
    const { padding_position = [], desktop_padding = {}, mobile_padding = {} } = padding;

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

  const renderTitle = () => {
    if (!main_title) return null;

    if (typeof main_title === 'string' && !main_title.includes('<')) {
      const firstDotIndex = main_title.indexOf('.');
      if (firstDotIndex !== -1 && firstDotIndex < main_title.length - 1) {
        const first = main_title.slice(0, firstDotIndex + 1).trim();
        const second = main_title.slice(firstDotIndex + 1).trim();
        return (
          <H2Tag className="fce-title">
            <span className="fce-title-normal">{first}</span>{' '}
            <span className="fce-title-accent">{second}</span>
          </H2Tag>
        );
      }
    }

    return <H2Tag className="fce-title" dangerouslySetInnerHTML={{ __html: main_title }} />;
  };

  return (
    <SectionTag className={`footer-common-cta-embossed ${class_name}`} id={id}>
      <DivTag className="container">
        <DivTag className={`fce-wrap ${paddingClass}`}>
          <DivTag className="fce-card">
            {showTitle && renderTitle()}
            {showDescription && description && (
              <DivTag className="fce-desc" dangerouslySetInnerHTML={{ __html: description }} />
            )}
            {showCTA && cta_button?.url ? (
              <DivTag className="fce-cta">
                <Link href={cta_button.url} target={cta_button.target || '_self'} className="btn primary-btn">
                  {cta_button.title || 'Learn More'} <ArrowRight className="right-arrow-icon" />
                </Link>
              </DivTag>
            ) : null}
          </DivTag>
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}

