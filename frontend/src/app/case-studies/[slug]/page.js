import { fetchPageBySlug } from '@/lib/wordpress';
import { DivTag, H2Tag, H1Tag, PTag } from '@/components/Common/HTMLTags';
import Image from 'next/image';
import { renderButton } from '@/components/Common/Button';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: 'Case Study Details',
    description: 'Detailed case study information',
  };
}

function findCaseStudyInData(data, slug) {
  if (!data?.acf?.page_sections) return null;

  for (const section of data.acf.page_sections) {
    if (section.acf_fc_layout === 'case_study_grid' && section.use_case_items) {
      const index = parseInt(slug, 10);
      if (!isNaN(index) && section.use_case_items[index]) {
        return {
          item: section.use_case_items[index],
          section: section,
        };
      }

      // Try slug matching
      for (const item of section.use_case_items) {
        if (item.slug === slug) {
          return { item, section };
        }
      }
    }
  }

  return null;
}

export default async function CaseStudyDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  try {
    const pageData = await fetchPageBySlug('case-studies');
    const caseStudyData = findCaseStudyInData(pageData, slug);

    if (!caseStudyData) {
      return (
        <DivTag style={{ padding: '60px 20px', textAlign: 'center' }}>
          <H1Tag>Case Study Not Found</H1Tag>
          <PTag>Sorry, we couldn't find that case study.</PTag>
          <Link href="/case-studies">
            <DivTag style={{ color: '#0052CC', marginTop: '20px', cursor: 'pointer' }}>
              ← Back to Case Studies
            </DivTag>
          </Link>
        </DivTag>
      );
    }

    const { item, section } = caseStudyData;

    return (
      <DivTag style={{ backgroundColor: '#fff' }}>
        {/* Back Link */}
        <DivTag style={{ padding: '20px 0', borderBottom: '1px solid #e0e0e0' }}>
          <DivTag style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <Link href="/case-studies">
              <DivTag style={{ color: '#0052CC', cursor: 'pointer', fontSize: '14px' }}>
                ← Back to Case Studies
              </DivTag>
            </Link>
          </DivTag>
        </DivTag>

        {/* Hero Section */}
        {item.image?.url && (
          <DivTag
            style={{
              width: '100%',
              height: '400px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Image
              src={item.image.url}
              alt={item.image.alt || item.title || 'Case Study'}
              width={1200}
              height={400}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              priority
            />
          </DivTag>
        )}

        {/* Content */}
        <DivTag style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
          <DivTag style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Industry Tag */}
            {item.industry && (
              <DivTag
                style={{
                  display: 'inline-block',
                  backgroundColor: '#FFA500',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                }}
              >
                {Array.isArray(item.industry) 
                  ? item.industry[0] 
                  : typeof item.industry === 'string'
                    ? item.industry.split(',')[0].trim()
                    : 'Industry'
                }
              </DivTag>
            )}

            {/* Title */}
            {item.title && (
              <H1Tag
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  color: '#000',
                }}
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
            )}

            {/* Description */}
            {item.description && (
              <DivTag
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '30px',
                }}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}

            {/* Button */}
            {item.button?.url && (
              <DivTag style={{ marginTop: '30px' }}>
                {renderButton(item.button)}
              </DivTag>
            )}

            {/* Additional Content */}
            {item.additional_content && (
              <DivTag
                style={{
                  marginTop: '40px',
                  padding: '30px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  lineHeight: '1.8',
                }}
                dangerouslySetInnerHTML={{ __html: item.additional_content }}
              />
            )}
          </DivTag>
        </DivTag>

        {/* Related Case Studies */}
        {section?.use_case_items && section.use_case_items.length > 1 && (
          <DivTag style={{ backgroundColor: '#f9f9f9', padding: '60px 0' }}>
            <DivTag style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
              <H2Tag style={{ marginBottom: '40px', textAlign: 'center', fontSize: '28px' }}>
                More Case Studies
              </H2Tag>

              <DivTag
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '30px',
                }}
              >
                {section.use_case_items.map((relatedItem, index) => (
                  <Link
                    key={index}
                    href={`/case-studies/${relatedItem.slug || index}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <DivTag
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {relatedItem.image?.url && (
                        <DivTag
                          style={{
                            width: '100%',
                            height: '180px',
                            overflow: 'hidden',
                            backgroundColor: '#f5f5f5',
                          }}
                        >
                          <Image
                            src={relatedItem.image.url}
                            alt={relatedItem.image.alt || relatedItem.title}
                            width={400}
                            height={180}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </DivTag>
                      )}

                      <DivTag style={{ padding: '15px' }}>
                        {relatedItem.industry && (
                          <DivTag
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#FFA500',
                              color: '#fff',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              marginBottom: '10px',
                            }}
                          >
                            {Array.isArray(relatedItem.industry) 
                              ? relatedItem.industry[0] 
                              : typeof relatedItem.industry === 'string'
                                ? relatedItem.industry.split(',')[0].trim()
                                : 'Industry'
                            }
                          </DivTag>
                        )}

                        {relatedItem.title && (
                          <H2Tag
                            style={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              marginBottom: '8px',
                              color: '#000',
                            }}
                            dangerouslySetInnerHTML={{ __html: relatedItem.title }}
                          />
                        )}

                        {relatedItem.description && (
                          <DivTag
                            style={{
                              fontSize: '13px',
                              color: '#666',
                              lineHeight: '1.5',
                            }}
                            dangerouslySetInnerHTML={{
                              __html: relatedItem.description.substring(0, 80) + '...',
                            }}
                          />
                        )}
                      </DivTag>
                    </DivTag>
                  </Link>
                ))}
              </DivTag>
            </DivTag>
          </DivTag>
        )}
      </DivTag>
    );
  } catch (error) {
    console.error('Error loading case study:', error);
    return (
      <DivTag style={{ padding: '60px 20px', textAlign: 'center' }}>
        <H1Tag>Error Loading Case Study</H1Tag>
        <PTag>Sorry, there was an error loading this case study.</PTag>
        <Link href="/case-studies">
          <DivTag style={{ color: '#0052CC', marginTop: '20px', cursor: 'pointer' }}>
            ← Back to Case Studies
          </DivTag>
        </Link>
      </DivTag>
    );
  }
}