'use client';
import { DivTag, H3Tag, PTag, SpanTag } from '../Common/HTMLTags';

export default function PartnerFeaturedCard({ data }) {
  const image = data?.image || { url: '/images/atolio-new.jpg', alt: 'Atolio' };
  const hoverEyebrow = data?.hover_eyebrow || 'Solutions & Applications';
  const hoverTitle = data?.hover_title || 'Secure enterprise knowledge access';

  // ACF Repeater "tags" -> sub-field "tag"
  const tags = Array.isArray(data?.tags) && data.tags.length
    ? data.tags
    : [
        { tag: 'Enterprise Search' },
        { tag: 'Knowledge Management' },
        { tag: 'AI-Powered Discovery' },
        { tag: 'Knowledge Assistants' },
        { tag: 'Cross-Application Search' },
        { tag: 'Employee Productivity' },
      ];

  const title =
    data?.title ||
    'Secure enterprise knowledge access for AI agents and automation workflows.';
  const description =
    data?.description ||
    'Atolio helps enterprises access knowledge across internal systems while preserving permissions, security, and control.';
  const note =
    data?.note ||
    "Together, qBotica and Atolio help organizations connect trusted enterprise knowledge to intelligent search, AI assistants, and automated workflows.";

  const class_name = data?.class_name || '';
  const id = data?.id || '';

  return (
    <DivTag className={`partner-card featured ${class_name}`} id={id}>
      <DivTag className="partner-card-head" tabIndex={0}>
        {image?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.url} alt={image.alt || 'Partner'} className="partner-card-image" />
        )}

        <DivTag className="hover-panel">
          {hoverEyebrow && <small>{hoverEyebrow}</small>}
          {hoverTitle && <H3Tag dangerouslySetInnerHTML={{ __html: hoverTitle }} />}
          <DivTag className="tags">
            {tags.map((t, i) => (
              <SpanTag key={i} className="tag">{t?.tag}</SpanTag>
            ))}
          </DivTag>
        </DivTag>
      </DivTag>

      <DivTag className="partner-card-content">
        {title && <H3Tag dangerouslySetInnerHTML={{ __html: title }} />}
        {description && <PTag dangerouslySetInnerHTML={{ __html: description }} />}
        {note && <DivTag className="partner-note" dangerouslySetInnerHTML={{ __html: note }} />}
      </DivTag>
    </DivTag>
  );
}