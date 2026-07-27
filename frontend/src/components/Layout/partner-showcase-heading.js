'use client';
import { DivTag, H2Tag, PTag } from '../Common/HTMLTags';

export default function PartnerShowcaseHeading({ data }) {
  const heading = data?.heading || "Meet the partners powering qBotica's ecosystem";
  const description =
    data?.description ||
    "Atolio is highlighted as the newest partnership, followed by the strategic technologies supporting qBotica's AI-first approach.";
  const class_name = data?.class_name || '';
  const id = data?.id || '';

  return (
    <DivTag className={`partners-heading ${class_name}`} id={id}>
      {heading && <H2Tag dangerouslySetInnerHTML={{ __html: heading }} />}
      {description && <PTag dangerouslySetInnerHTML={{ __html: description }} />}
    </DivTag>
  );
}