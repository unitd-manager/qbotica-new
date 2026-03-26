'use client';

import Link from 'next/link';
import { SectionTag, DivTag, H2Tag } from '../Common/HTMLTags';
import Image from 'next/image';

export default function CaseStudyGridWithFilter({ data }) {
  if (!data || typeof data !== 'object') return null;

  const {
    main_title,
    description,
    use_case_items = [],
    class_name = '',
    id = '',
  } = data;

  if (!Array.isArray(use_case_items) || use_case_items.length === 0) {
    return null;
  }

  // Create a map of unique industries and one representative item from each
  const industryMap = new Map();
  use_case_items.forEach((item) => {
    if (item.industry) {
      const industryList = Array.isArray(item.industry) 
        ? item.industry 
        : typeof item.industry === 'string' 
          ? item.industry.split(',').map(i => i.trim())
          : [];
      
      industryList.forEach(industry => {
        if (industry && !industryMap.has(industry)) {
          industryMap.set(industry, item);
        }
      });
    }
  });

  const uniqueIndustries = Array.from(industryMap.entries());

  // Helper function to get clean industry slug
  const getIndustrySlug = (industry) => {
    // If industry contains a colon, use the part after it (the display name)
    if (industry.includes(':')) {
      return industry.split(':')[1].trim().toLowerCase().replace(/\s+/g, '-');
    }
    // Otherwise use the whole industry name
    return industry.toLowerCase().replace(/\s+/g, '-');
  };

  // Helper function to get display name
  const getIndustryDisplay = (industry) => {
    // If industry contains a colon, use the part after it
    if (industry.includes(':')) {
      return industry.split(':')[1].trim();
    }
    return industry;
  };

  return (
    <SectionTag 
      className={`case-study-grid-section ${class_name}`} 
      id={id}
      style={{ padding: '60px 0' }}
    >
      <DivTag style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        {(main_title || description) && (
          <DivTag style={{ marginBottom: '50px', textAlign: 'center' }}>
            {main_title && (
              <H2Tag 
                style={{ marginBottom: '20px', fontSize: '36px', fontWeight: 'bold' }}
                dangerouslySetInnerHTML={{ __html: main_title }} 
              />
            )}
            {description && (
              <DivTag
                style={{ 
                  lineHeight: '1.6', 
                  color: '#666',
                  maxWidth: '700px',
                  margin: '0 auto',
                  fontSize: '16px'
                }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </DivTag>
        )}

        {/* Industries Grid - Image Only */}
        <DivTag
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '40px',
          }}
        >
          {uniqueIndustries.map(([industry, item], index) => (
            <Link 
              key={index}
              href={`/case-studies/industry/${getIndustrySlug(industry)}`}
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
                  position: 'relative',
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
                {/* Image - Full Height */}
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.image.alt || getIndustryDisplay(industry)}
                    width={400}
                    height={300}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <DivTag
                    style={{
                      width: '100%',
                      height: '300px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                    }}
                  >
                    No Image
                  </DivTag>
                )}

                {/* Industry Badge - Overlay */}
                <DivTag
                  style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: '#FFA500',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                  }}
                >
                  {getIndustryDisplay(industry)}
                </DivTag>
              </DivTag>
            </Link>
          ))}
        </DivTag>
      </DivTag>
    </SectionTag>
  );
}
