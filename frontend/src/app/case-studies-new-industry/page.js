console.log("TESTING SERVICE PAGE IS RUNNING");
import { fetchPageBySlug } from '@/lib/wordpress';
import { DivTag } from '../../components/Common/HTMLTags';
import {
  generatePageMetadatas,
  getStructuredData,
} from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';
import CustomerSuccessHero from '@/components/Layout/case-study-success-stories';
import ImpactBar from '@/components/Layout/case-study-impact-bar';
import FeaturedCaseStudy from '@/components/Layout/case-study-featured';
import CaseStudiesFilter from '@/components/Layout/case-study-filterbar';
import Testimonials from '@/components/Layout/case-study-testimonials';
import ReadyToBuildPanel from '@/components/Layout/case-study-ready-to-build';

const slug = 'automation-as-a-service';
const parent_path = '';

export async function generateMetadata() {
  return generatePageMetadatas(slug, 'page', parent_path, {
    title: 'Automation as a Service Solutions | qBotica',
    description:
      "Unlock business efficiency with qBotica's Automation as a Service. Automate workflows, reduce costs, and accelerate digital transformation at scale.",
  });
}

export default async function AutomationAsAServicePage() {
  try {
    console.log('==============================');
    console.log('Fetching Page');
    console.log('Slug:', slug);

    const pageData = await fetchPageBySlug(slug);

    console.log('Page Data:', pageData);
    console.log('ACF:', pageData?.acf);
    console.log('Testing Service Field:', pageData?.acf?.testing_service);
    console.log(
      'Section Count:',
      pageData?.acf?.testing_service?.length || 0
    );

    const metadata = await generatePageMetadatas(
      slug,
      'page',
      parent_path,
      {}
    );

    const structuredData = getStructuredData(metadata);

    // ← Changed from page_sections to testing_service
    const pageSections = pageData?.acf?.testing_service ?? [];

    console.log('Available Layouts:');
    pageSections.forEach((section, index) => {
      console.log(`${index + 1}.`, section.acf_fc_layout, section);
    });

    const getSection = (layout) => {
      const section = pageSections.find(
        (item) => item.acf_fc_layout === layout
      );
      console.log(`Searching: ${layout}`);
      console.log('Result:', section);
      return section || null;
    };

    return (
      <DivTag className="automation-service-page">
        <StructuredData data={structuredData} />

        <CustomerSuccessHero
          data={getSection('hero_section')}
        />
        <ImpactBar data={getSection('impact_bar')} />
        <FeaturedCaseStudy data={getSection('featured_case_study')} />
         <CaseStudiesFilter data={getSection('case_study_filter')} />
        <Testimonials data={getSection('testimonials_and_cta')} />
       <ReadyToBuildPanel />
      </DivTag>
    );
  } catch (error) {
    console.error('Error rendering page:', error);

    return (
      <DivTag className="automation-service-page">
        <StructuredData data={{}} />
        <CustomerSuccessHero />
        <ImpactBar />
        <FeaturedCaseStudy />
        <CaseStudiesFilter />
        <Testimonials/>
        <ReadyToBuildPanel />
      </DivTag>
    );
  }
}