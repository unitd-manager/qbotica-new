import { fetchPageBySlug } from '@/lib/wordpress';
import QubiNext15Client from './QubiNext15Client';
import { generatePageMetadatas, getStructuredData } from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';

// Import styles
import './styles.css';

const slug = 'qubi-agentic-ai-platform';
const parent_path = 'services';

export async function generateMetadata() {
  return generatePageMetadatas(slug, 'page', parent_path, {});
}

export default async function QubiNext15Page() {
  let pageSections = [];
  let structuredData = null;

  try {
    const [pageData, metadata] = await Promise.all([
      fetchPageBySlug(slug),
      generatePageMetadatas(slug, 'page', parent_path, {}),
    ]);
    structuredData = getStructuredData(metadata);
    console.log('\n===== PAGE.JS START =====');
    console.log('📡 Full Page Data:', pageData);
    console.log('📋 ACF Object:', pageData?.acf);
    console.log('🔍 page_sections field:', pageData?.acf?.page_sections);
    
    // WordPress ACF returns page_sections field
    pageSections = pageData?.acf?.page_sections || [];
    console.log('✅ Assigned pageSections:', pageSections);
    console.log('📊 pageSections length:', pageSections.length);
    console.log('📝 pageSections type:', Array.isArray(pageSections) ? 'Array' : typeof pageSections);
    
    if (Array.isArray(pageSections) && pageSections.length > 0) {
      console.log('🎯 First section:', pageSections[0]);
      console.log('🏷️ First section layout:', pageSections[0].acf_fc_layout);
    } else {
      console.log('⚠️ No sections array or empty');
    }
    console.log('===== PAGE.JS END =====\n');
  } catch (error) {
    console.error('❌ Error fetching page data:', error);
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <QubiNext15Client pageSections={pageSections} />
    </>
  );
}