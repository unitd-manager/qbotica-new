'use client';
import { useState, useEffect } from 'react';
import { DivTag, H3Tag, PTag, SpanTag } from '../Common/HTMLTags';

const WP_BASE = process.env.NEXT_PUBLIC_WP_API_URL || 'https://qbadevadmin.unitdtechnologies.com';

export default function PartnerFeaturedCard({ data }) {
  const rawImage = data?.image;
  const fallbackImage = { url: '/images/atolio-new.jpg', alt: 'Atolio' };

  const [resolvedImage, setResolvedImage] = useState(
    typeof rawImage === 'object' && rawImage?.url ? rawImage : null
  );
  const [loading, setLoading] = useState(typeof rawImage === 'number');

  useEffect(() => {
    // If image is already a full object, nothing to do
    if (typeof rawImage === 'object' && rawImage?.url) {
      setResolvedImage(rawImage);
      return;
    }

    // If image is just a numeric ID, fetch the media object dynamically
    if (typeof rawImage === 'number') {
      let cancelled = false;
      setLoading(true);

      fetch(`${WP_BASE}/wp-json/wp/v2/media/${rawImage}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Media fetch failed: ${res.status}`);
          return res.json();
        })
        .then((media) => {
          if (cancelled) return;
          setResolvedImage({
            url: media.source_url,
            alt: media.alt_text || 'Atolio',
          });
        })
        .catch((err) => {
          console.error('Failed to resolve featured_partner_card image:', err);
          if (!cancelled) setResolvedImage(null);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });

      return () => {
        cancelled = true;
      };
    }
  }, [rawImage]);

  const image = resolvedImage || fallbackImage;

  const hoverEyebrow = data?.hover_eyebrow || 'Solutions & Applications';
  const hoverTitle = data?.hover_title || 'Secure enterprise knowledge access';

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
        {loading ? (
          <DivTag className="partner-card-image partner-card-image-loading" />
        ) : (
          image?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt={image.alt || 'Partner'} className="partner-card-image" />
          )
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