'use client';
import { SectionTag, DivTag, H1Tag, PTag } from '../Common/HTMLTags';

export default function PartnerHero({ data }) {
  const title = data?.title || 'Build with the enterprise ecosystem.';
  const description =
    data?.description ||
    "qBotica works across leading platforms and technologies to deliver intelligent automation, Agentic AI, enterprise cloud solutions, and secure AI experiences.";
  const class_name = data?.class_name || '';
  const id = data?.id || 'qbotica-partners-hero';

  return (
    <SectionTag className={`partners-hero ${class_name}`} id={id}>
      <DivTag className="partners-container">
        {title && (
          <H1Tag dangerouslySetInnerHTML={{ __html: title }} />
        )}
        {description && (
          <PTag dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </DivTag>
    </SectionTag>
  );
}