'use client';
import { DivTag, H3Tag, PTag, SpanTag } from '../Common/HTMLTags';

const defaultCards = [
  {
    image: { url: '/images/uipath-building.jpg', alt: 'UiPath' },
    hover_eyebrow: 'Solutions & Applications',
    hover_title: 'Enterprise automation at scale',
    tags: [
      { tag: 'RPA' },
      { tag: 'Agentic Automation' },
      { tag: 'Document Understanding' },
      { tag: 'Process Mining' },
      { tag: 'Test Automation' },
      { tag: 'Managed Services' },
    ],
    title: 'Enterprise automation at scale',
    description:
      'UiPath supports automation programs across discovery, development, orchestration, document processing, testing, and ongoing operational support.',
  },
  {
    image: { url: '/images/aws.jpg', alt: 'AWS' },
    hover_eyebrow: 'Solutions & Applications',
    hover_title: 'Cloud infrastructure for AI and automation',
    tags: [
      { tag: 'Cloud Infrastructure' },
      { tag: 'AI & Machine Learning' },
      { tag: 'Data Platforms' },
      { tag: 'Serverless Applications' },
      { tag: 'Cloud Migration' },
      { tag: 'Application Modernization' },
    ],
    title: 'Scalable infrastructure for AI and automation.',
    description:
      'AWS provides cloud infrastructure options that support AI deployment, data workflows, and enterprise-scale automation solutions.',
  },
  {
    image: { url: '/images/microsoft-new.jpg', alt: 'Microsoft' },
    hover_eyebrow: 'Solutions & Applications',
    hover_title: 'Enterprise cloud, productivity and AI',
    tags: [
      { tag: 'AI Copilots' },
      { tag: 'Azure Cloud' },
      { tag: 'Microsoft 365' },
      { tag: 'Power Platform' },
      { tag: 'Data & Analytics' },
      { tag: 'Enterprise Security' },
    ],
    title: 'Cloud-ready transformation foundations.',
    description:
      'Microsoft technologies support enterprise applications, cloud platforms, productivity tools, and data environments.',
  },
  {
    image: { url: '/images/anthropic-office.jpg', alt: 'Anthropic' },
    hover_eyebrow: 'Solutions & Applications',
    hover_title: 'Responsible generative AI for enterprise workflows',
    tags: [
      { tag: 'Claude' },
      { tag: 'Generative AI' },
      { tag: 'AI Agents' },
      { tag: 'Knowledge Assistants' },
      { tag: 'Natural Language Processing' },
      { tag: 'Responsible AI' },
    ],
    title: 'Advanced AI capabilities for modern business workflows.',
    description:
      'Anthropic contributes AI technologies that support intelligent agents, conversational experiences, and AI-powered automation initiatives.',
  },
];

export default function PartnerCardsGrid({ data }) {
  // ACF Repeater "cards" -> sub-fields: image, hover_eyebrow, hover_title, tags (repeater), title, description
  const cards = Array.isArray(data?.cards) && data.cards.length ? data.cards : defaultCards;

  return (
    <>
      {cards.map((card, i) => {
        const tags = Array.isArray(card?.tags) ? card.tags : [];
        return (
          <DivTag key={i} className="partner-card">
            <DivTag className="partner-card-head" tabIndex={0}>
              {card?.image?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.image.url}
                  alt={card.image.alt || 'Partner'}
                  className="partner-card-image"
                />
              )}

              <DivTag className="hover-panel">
                {card?.hover_eyebrow && <small>{card.hover_eyebrow}</small>}
                {card?.hover_title && (
                  <H3Tag dangerouslySetInnerHTML={{ __html: card.hover_title }} />
                )}
                <DivTag className="tags">
                  {tags.map((t, j) => (
                    <SpanTag key={j} className="tag">{t?.tag}</SpanTag>
                  ))}
                </DivTag>
              </DivTag>
            </DivTag>

            <DivTag className="partner-card-content">
              {card?.title && <H3Tag dangerouslySetInnerHTML={{ __html: card.title }} />}
              {card?.description && (
                <PTag dangerouslySetInnerHTML={{ __html: card.description }} />
              )}
            </DivTag>
          </DivTag>
        );
      })}
    </>
  );
}