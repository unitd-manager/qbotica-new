'use client';
import { SectionTag, DivTag, H2Tag, PTag } from '../Common/HTMLTags';

export default function PartnerCta({ data }) {
  const title = data?.title || 'Ready to build with qBotica ecosystem?';
  const description =
    data?.description ||
    'Bring together trusted platforms, intelligent automation, and AI technologies to solve complex business challenges.';
  const class_name = data?.class_name || '';
  const id = data?.id || '';

  return (
    <SectionTag className={`partners-cta ${class_name}`} id={id}>
      <DivTag className="partners-container">
        {title && <H2Tag dangerouslySetInnerHTML={{ __html: title }} />}
        {description && <PTag dangerouslySetInnerHTML={{ __html: description }} />}
      </DivTag>
    </SectionTag>
  );
}