console.log("TESTING SERVICE PAGE IS RUNNING");
import { fetchPageBySlug } from '@/lib/wordpress';
import { DivTag } from '../../components/Common/HTMLTags';
import {
  generatePageMetadatas,
  getStructuredData,
} from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';
import CaseStudyLandingHero from '@/components/Layout/case-study-landing-hero-section';
import CaseStudyLandingImpactBar from '@/components/Layout/case-study-landing-impactbar';
import CaseStudyLandingFeatured from '@/components/Layout/case-study-landing-featured';
import CaseStudyLandingGrid from '@/components/Layout/case-study-landing-grid';
import CaseStudyLandingTestimonial from '@/components/Layout/case-study-landing-testimonial';
import CaseStudyLandingReadyToBuild from '@/components/Layout/case-study-landing-ready-to-build';

const slug = 'ai-success-stories';
const parent_path = '';

export async function generateMetadata() {
  return generatePageMetadatas(slug, 'page', parent_path, {
    title: 'AI That Delivers, Not Just Talks | qBotica',
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
    console.log('AI Success Stories Field:', pageData?.acf?.['case_study_landing_page']);
    console.log(
      'Section Count:',
      pageData?.acf?.['case_study_landing_page']?.length || 0
    );

    const metadata = await generatePageMetadatas(
      slug,
      'page',
      parent_path,
      {}
    );

    const structuredData = getStructuredData(metadata);

    // ← Changed from page_sections to case_study_landing_page
    const pageSections = pageData?.acf?.['case_study_landing_page'] ?? [];
console.log("Page Sections:", pageSections);

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
    const heroSection = getSection("case_study_landing_hero_section");
    console.log("Hero Section:", heroSection)
     const imapctbarSection = getSection("case_study_landing_impact_bar_section");
    console.log("Impact Bar Section:", imapctbarSection);
    const featuredSection = getSection("case_study_landing_featured_section");
    console.log("Featured Section:", featuredSection);
    const gridSection = getSection("case_study_landing_grid_section");
    console.log("Grid Section:", gridSection);
    const testimonialSection = getSection("case_study_landing_testimonial_section");
    console.log("Testimonial Section:", testimonialSection);
    const readyToBuildSection = getSection("case_study_landing_ready_to_build_section");
    console.log("Ready To Build Section:", readyToBuildSection);

    return (
      <DivTag className="automation-service-page">
        <StructuredData data={structuredData} />

        <CaseStudyLandingHero
          data={heroSection}
        />
        <CaseStudyLandingImpactBar data={imapctbarSection} />
        <CaseStudyLandingFeatured data={featuredSection} />
        <CaseStudyLandingGrid data={gridSection} />
        <CaseStudyLandingTestimonial data={testimonialSection} />
        <CaseStudyLandingReadyToBuild data={readyToBuildSection} />
      </DivTag>
    );
  } catch (error) {
    console.error('Error rendering page:', error);

    return (
      <DivTag className="automation-service-page">
        <StructuredData data={{}} />
        <CaseStudyLandingHero />
        <CaseStudyLandingImpactBar />
        <CaseStudyLandingFeatured />
        <CaseStudyLandingGrid />
        <CaseStudyLandingTestimonial />
        <CaseStudyLandingReadyToBuild />

      </DivTag>
    );
  }
}