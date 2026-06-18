import { fetchPageBySlug, fetchPostBySlugAndType } from '@/lib/wordpress'
import { DivTag, H1Tag, PTag } from '@/components/Common/HTMLTags';
import {
    DynamicComponent,
    applyPaddingToLayouts,
    processLayoutData
} from '@/lib/page-layout-utils';
import CaseStudySectionClientV2 from '@/components/CaseStudySectionClientV2';
import { generatePageMetadatas, getStructuredData } from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';
import CaseStudySectionClient from '@/components/CaseStudySectionClient';

const parent_path = 'case-studies';

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const pageData = await fetchPageBySlug(slug) || await fetchPostBySlugAndType(slug, 'case-study');

    const heroSection = pageData?.acf?.case_study_sections?.find(
        section => section.acf_fc_layout === 'case_study_hero'
    );

    const pageTitle = heroSection?.title || pageData?.title?.rendered || slug;
    const pageDescription = heroSection?.subtitle || pageData?.excerpt?.rendered || `Learn more about ${pageTitle}`;

    const metadata = await generatePageMetadatas(slug, 'page', parent_path, {
        title: pageTitle,
        description: pageDescription,
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://qbotica.com'}/${parent_path}/${slug}`
    });

    return {
        ...metadata,
        title: pageTitle,
        description: pageDescription,
        openGraph: {
            ...(metadata.openGraph || {}),
            title: pageTitle,
            description: pageDescription,
            url: `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://qbotica.com'}/${parent_path}/${slug}`
        },
        twitter: {
            ...(metadata.twitter || {}),
            title: pageTitle,
            description: pageDescription
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://qbotica.com'}/${parent_path}/${slug}`
        }
    };
}

export default async function SolutionPage({ params }) {

    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    try {
        const pageData = await fetchPageBySlug(slug) || await fetchPostBySlugAndType(slug, 'case-study');
        const metadata = await generatePageMetadatas(slug, 'page', parent_path, {});
        const structuredData = getStructuredData(metadata);
        
        const layouts = pageData?.acf?.layouts;
        const caseSections = pageData?.acf?.case_study_sections;

        if (!pageData || (!layouts?.length && !caseSections?.length)) {
            return (
                <DivTag className="case-studies-single-page">
                    <StructuredData data={structuredData} />
                    <DivTag className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100">
                        <H1Tag>Case Study</H1Tag>
                        <PTag>Content is being updated. Please check back soon.</PTag>
                    </DivTag>
                </DivTag>
            );
        }

        if (layouts?.length) {
            const processedLayouts = applyPaddingToLayouts(layouts);
            const finalLayouts = await processLayoutData(processedLayouts);
            return (
                <DivTag className="case-studies-single-page light-gray">
                    <StructuredData data={structuredData} />
                    {finalLayouts.map((item) => (
                        <DynamicComponent
                            key={`${item.layout.layout_type}-${item.index}`}
                            layout={item.layout}
                            data={item.data}
                        />
                    ))}
                </DivTag>
            );
        }

        // V2 Demo Page
if (slug === 'polaris-transportation-v2') {

    return (

        <DivTag className="case-studies-single-page light-gray">

            <StructuredData data={structuredData} />

            <CaseStudySectionClientV2 />

        </DivTag>

    );

}

// Existing Case Studies

return (

    <DivTag className="case-studies-single-page light-gray">

        <StructuredData data={structuredData} />

        <CaseStudySectionClient sections={caseSections} />

    </DivTag>

);
    } catch (error) {
        console.error('Error rendering SolutionPage:', error);

        return (
            <DivTag className="case-studies-single-page light-gray">
                <div className="text-center py-16">
                    <h1>Something went wrong</h1>
                    <p>We are experiencing technical difficulties. Please try again later.</p>
                </div>
            </DivTag>
        );
    }
}