import Hero from '@/components/Polaris/Hero';

export default async function CustomerSuccessStory({ params }) {
  const { slug } = await params;

  return (
    <main>
      <Hero slug={slug} />
    </main>
  );
}