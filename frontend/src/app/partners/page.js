import { fetchPageBySlug } from '@/lib/wordpress';
import { DivTag, SectionTag } from '@/components/Common/HTMLTags';
import { generatePageMetadatas, getStructuredData } from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';

import PartnerHero from '@/components/Layout/partner-hero';
import PartnerStrip from '@/components/Layout/partner-strip';
import PartnerShowcaseHeading from '@/components/Layout/partner-showcase-heading';
import PartnerFeaturedCard from '@/components/Layout/partner-featured-card';
import PartnerCardsGrid from '@/components/Layout/partner-cards-grid';
import PartnerCta from '@/components/Layout/partner-cta';

import './partners.css';

// WordPress page slug — create a Page in WP with this slug
const slug = 'partners';
const parent_path = '';

export async function generateMetadata() {
  return generatePageMetadatas(slug, 'page', parent_path, {
    title: 'Why Our Partners Love Us | qBotica',
    description:
      "We believe in the power of Automation to make people’s lives better & easier, & are looking for Partner companies who will take the journey with us.",
  });
}

export default async function QboticaPartnersPage() {
  try {
    console.log('==============================');
    console.log('Fetching Page');
    console.log('Slug:', slug);

    const pageData = await fetchPageBySlug(slug);

    console.log('Page Data:', pageData);
    console.log('ACF:', pageData?.acf);

    const metadata = await generatePageMetadatas(slug, 'page', parent_path, {});
    const structuredData = getStructuredData(metadata);

    // ACF Flexible Content field name on the "qbotica-partners" page: "qbotica_partners_sections"
    const pageSections = pageData?.acf?.qbotica_partners_sections ?? [];

    console.log('Available Layouts:');
    pageSections.forEach((section, index) => {
      console.log(`${index + 1}.`, section.acf_fc_layout, section);
    });

    const getSection = (layout) => {
      const section = pageSections.find((item) => item.acf_fc_layout === layout);
      return section || null;
    };

    return (
      <DivTag className="qbotica-partners-page">
        <StructuredData data={structuredData} />

        <PartnerHero data={getSection('hero_section')} />
        <PartnerStrip data={getSection('partner_strip_section')} />

        <SectionTag className="partners-showcase">
          <DivTag className="partners-container">
            <PartnerShowcaseHeading data={getSection('showcase_heading_section')} />
            <DivTag className="partners-grid">
              <PartnerFeaturedCard data={getSection('featured_partner_card')} />
              <PartnerCardsGrid data={getSection('partner_cards_grid')} />
            </DivTag>
          </DivTag>
        </SectionTag>

        <PartnerCta data={getSection('cta_section')} />
      </DivTag>
    );
  } catch (error) {
    console.error('Error rendering QboticaPartnersPage:', error);

    return (
      <DivTag className="qbotica-partners-page">
        <StructuredData data={{}} />

        <PartnerHero />
        <PartnerStrip />

        <SectionTag className="partners-showcase">
          <DivTag className="partners-container">
            <PartnerShowcaseHeading />
            <DivTag className="partners-grid">
              <PartnerFeaturedCard />
              <PartnerCardsGrid />
            </DivTag>
          </DivTag>
        </SectionTag>

        <PartnerCta />
      </DivTag>
    );
  }
}