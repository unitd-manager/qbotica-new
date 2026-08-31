import { generatePageMetadatas } from '@/lib/rankmath-utils';
import '@/components/CaseStudyShort/shared.css';
import '@/components/CaseStudyShort/MoreCaseStudies.css';

const parent_path = '';
const slug = 'case-studies-short';

export async function generateMetadata() {
  return generatePageMetadatas(slug, 'page', parent_path, {
    title: 'Case Studies',
    description: 'See how organizations are using automation and GenAI to drive measurable results.',
  });
}

async function fetchAllCaseStudiesShort() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WP_API_URL}/wp/v2/customer-stories?status=publish&per_page=50`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const posts = await res.json();
    // Only list posts that actually have the short-form layout filled in —
    // this CPT is shared with the Polaris template, which uses different layouts.
    return posts.filter((post) =>
      post.acf?.customer_story_detail?.some((s) => s.acf_fc_layout === 'hero_section_short')
    );
  } catch (error) {
    console.error('Error fetching case studies list:', error);
    return [];
  }
}

export default async function CaseStudiesShortListPage() {
  const posts = await fetchAllCaseStudiesShort();

  const cards = posts.map((post) => {
    const hero = post.acf?.customer_story_detail?.find(
      (s) => s.acf_fc_layout === 'hero_section_short'
    );
    const headline = [hero?.hero_headline, hero?.hero_headline_highlight, hero?.hero_headline_suffix]
      .filter(Boolean)
      .join(' ');
    return {
      slug: post.slug,
      title: headline || post.title?.rendered || post.slug,
      tag: hero?.client_industry || '',
      text: hero?.breadcrumb_current || '',
      image: hero?.hero_background_image?.url || null,
    };
  });

  return (
    <div className="cs-short">
      <section className="css-more">
        <div className="wrap">
          <div className="css-more-head">
            <div>
              <div className="section-label">Case Studies</div>
              <h1 className="section-h2" style={{ fontSize: 'clamp(1.7rem,2.8vw,2.8rem)', marginTop: '.5rem' }}>
                Customer Success Stories
              </h1>
            </div>
          </div>

          {cards.length > 0 ? (
            <div className="css-case-grid">
              {cards.map((card) => (
                <a className="css-case-card" href={`/customer-success-stories/${card.slug}`} key={card.slug}>
                  <div className="css-case-img">
                    {card.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={card.image} alt={card.title} />
                    )}
                    {card.tag && <span className="css-case-tag">{card.tag}</span>}
                  </div>
                  <div className="css-case-body">
                    <h3 className="css-case-h3">{card.title}</h3>
                    {card.text && <p className="css-case-p">{card.text}</p>}
                    <span className="css-case-link">Read Case Study &rarr;</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="section-p">Content is being updated. Please check back soon.</p>
          )}
        </div>
      </section>
    </div>
  );
}
