import { fetchPageBySlug } from '@/lib/wordpress'
import { DivTag, H1Tag, PTag } from '@/components/Common/HTMLTags';
import {
    DynamicComponent,
    applyPaddingToLayouts,
    processLayoutData
} from '@/lib/page-layout-utils';
import { generatePageMetadatas, getStructuredData } from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';
import AtolioPartnershipClient from '@/components/AtolioPartnershipClient';

const parent_path = 'newsroom';

// Custom post types that can hold press-release entries built with the
// "Atolio Partnership" ACF layouts (acf.atolio). Add/remove REST bases here.
const PRESS_POST_TYPES = ['newsroom'];
const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || process.env.WP_API_URL;

async function fetchPressEntry(slug) {
    for (const type of PRESS_POST_TYPES) {
        try {
            const res = await fetch(
                `${WP_API}/wp/v2/${type}?slug=${slug}&status=publish&acf_format=standard`,
                { next: { revalidate: 60 } }
            );
            if (!res.ok) continue; // post type not registered, or no access
            const data = await res.json();
            if (data?.[0]?.acf?.atolio?.length) return data[0];
        } catch (e) { /* try next type */ }
    }
    return null;
}



export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const entry = await fetchPressEntry(resolvedParams.slug);
    if (entry) {
        const title = (entry.title?.rendered || '').replace(/<[^>]*>/g, '');
        const hero = entry.acf.atolio.find((l) => l.acf_fc_layout === 'hero_section');
        return { title, description: hero?.hero_summary || undefined };
    }
    return generatePageMetadatas(resolvedParams.slug, 'page', parent_path, {});
}
export default async function SolutionPage({ params }) {

    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    try {
        // 1) Newsroom entry (custom post type) built with the press-release layouts
        const pressEntry = await fetchPressEntry(slug);
        if (pressEntry) {
            return <AtolioPartnershipClient data={pressEntry} />;
        }

        const pageData = await fetchPageBySlug(slug);

        const metadata = await generatePageMetadatas(resolvedParams.slug, 'page', parent_path, {});
        const structuredData = getStructuredData(metadata);
        if (!pageData || !pageData.acf || !pageData.acf.layouts?.length) {
            return (
                <DivTag className="newsroom-single-page">
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
            <DivTag className="newsroom-single-page light-gray">
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
    } catch (error) {
        console.error('Error rendering SolutionPage:', error);

        return (
            <DivTag className="newsroom-single-page light-gray">
                <div className="text-center py-16">
                    <h1>Something went wrong</h1>
                    <p>We are experiencing technical difficulties. Please try again later.</p>
                </div>
            </DivTag>
        );
    }
}