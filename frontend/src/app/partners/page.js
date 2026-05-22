import { fetchPageBySlug } from '@/lib/wordpress'
import { DivTag, H1Tag, PTag } from '../../components/Common/HTMLTags';
import {
  DynamicComponent,
  applyPaddingToLayouts,
  processLayoutData
} from '@/lib/page-layout-utils';
import { generatePageMetadatas, getStructuredData } from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';
import PartnerPanelSlider from '@/components/Layout/partner-panel-slider';

const slug = 'partners';
const parent_path = '';

const partnerPanelSliderData = {
  id: 'partner-panel-slider',
  slides: [
    {
      key: 'uipath',
      logo: { url: '/assets/images/uipath.webp', alt: 'UiPath' },
      title: 'YOUR TRUSTED UIPATH PARTNER',
      description:
        'As a UiPath partner, we help you maximize value from your automation and agentic AI initiatives with the right strategy, execution, and scale.',
    },
    {
      key: 'microsoft',
      logo: { url: '/assets/images/microsoft.png', alt: 'Microsoft' },
      title: 'MICROSOFT ECOSYSTEM INTEGRATION',
      description:
        'Connect agents and automation across Microsoft tools and services to run workflows end-to-end with governance and enterprise controls.',
    },
    {
      key: 'aws',
      logo: { url: '/assets/images/aws-1-1.webp', alt: 'AWS' },
      title: 'AWS CLOUD INFRASTRUCTURE',
      description:
        'Design and run secure, scalable solutions on AWS that support real-world enterprise operations and reliable execution.',
    },
    {
      key: 'atolio',
      logo: { url: '/assets/images/atoliooo.png', alt: 'Atolio' },
      title: 'ATOLIO DATA INTELLIGENCE',
      description:
        'Enable agents with trusted enterprise knowledge and governance by connecting content, search, and data intelligence across your systems.',
    },
  ],
};

export async function generateMetadata() {
  return generatePageMetadatas(slug, 'page', parent_path, {});
}

export default async function PartnersPage() {
  try {
    const pageData = await fetchPageBySlug(slug);
    const metadata = await generatePageMetadatas(slug, 'page', parent_path, {});
    const structuredData = getStructuredData(metadata);
    if (!pageData || !pageData.acf || !pageData.acf.layouts?.length) {
      return (
        <DivTag className="parners-page">
          <StructuredData data={structuredData} />
          <DivTag className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100">
            <H1Tag>Welcome</H1Tag>
            <PTag>Content is being updated. Please check back soon.</PTag>
          </DivTag>
        </DivTag>
      );
    }
    const processedLayouts = applyPaddingToLayouts(pageData.acf.layouts);
    const finalLayouts = await processLayoutData(processedLayouts);
    return (
      <DivTag className="parners-page light-gray">
        <StructuredData data={structuredData} />
        {finalLayouts.map((item) => (
          <DynamicComponent
            key={`${item.layout.layout_type}-${item.index}`}
            layout={item.layout}
            data={item.data}
          />
        ))}
                <PartnerPanelSlider data={partnerPanelSliderData} />

      </DivTag>
    );
  } catch (error) {
    console.error('Error rendering SolutionPage:', error);
    return (
      <DivTag className="solutions-page light-gray">
        <div className="text-center py-16">
          <h1>Something went wrong</h1>
          <p>We are experiencing technical difficulties. Please try again later.</p>
        </div>
      </DivTag>
    );
  }
}
