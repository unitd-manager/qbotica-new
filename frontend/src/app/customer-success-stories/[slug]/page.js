import { notFound } from 'next/navigation';
import Hero from '@/components/Polaris/Hero';
import CaseStudyShort from '@/components/CaseStudyShort/CaseStudyShort';
import { generatePageMetadatas, getStructuredData } from '@/lib/rankmath-utils';
import StructuredData from '@/components/Common/StructuredData';

const parent_path = 'customer-success-stories';

async function fetchStoryPost(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/customer-stories?slug=${slug}&status=publish`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0] || null;
  } catch (error) {
    console.error('Error fetching customer story:', error);
    return null;
  }
}

function isShortForm(post) {
  return Boolean(
    post?.acf?.customer_story_detail?.some(
      (section) => section.acf_fc_layout === 'hero_section_short'
    )
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchStoryPost(slug);

  if (!isShortForm(post)) {
    return {};
  }

  const heroSection = post.acf.customer_story_detail.find(
    (section) => section.acf_fc_layout === 'hero_section'
  );

  const headline = [
    heroSection?.hero_headline,
    heroSection?.hero_headline_highlight,
    heroSection?.hero_headline_suffix,
  ]
    .filter(Boolean)
    .join(' ');
  const pageTitle = headline || post?.title?.rendered || slug;
  const pageDescription = heroSection?.breadcrumb_current || `Learn more about ${pageTitle}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://qbotica.com';
  const canonical = `${siteUrl}/${parent_path}/${slug}`;

  const metadata = await generatePageMetadatas(slug, 'page', parent_path, {
    title: pageTitle,
    description: pageDescription,
    canonical,
  });

  return {
    ...metadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: { ...(metadata.openGraph || {}), title: pageTitle, description: pageDescription, url: canonical },
    twitter: { ...(metadata.twitter || {}), title: pageTitle, description: pageDescription },
    alternates: { canonical },
  };
}

export default async function CustomerSuccessStory({ params }) {
  const { slug } = await params;
  const post = await fetchStoryPost(slug);

  if (!post) {
    notFound();
  }

  if (isShortForm(post)) {
    const metadata = await generatePageMetadatas(slug, 'page', parent_path, {});
    const structuredData = getStructuredData(metadata);
    return (
      <main>
        <StructuredData data={structuredData} />
        <CaseStudyShort slug={slug} />
      </main>
    );
  }

  return (
    <main>
      <Hero acf={post.acf} />
    </main>
  );
}