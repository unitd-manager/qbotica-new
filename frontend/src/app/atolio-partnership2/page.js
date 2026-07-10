import AtolioPartnershipClient from '@/components/AtolioPartnershipClient';

async function getData() {
  const res = await fetch(
    'https://qbadevadmin.unitdtechnologies.com/wp-json/wp/v2/pages/12000?acf_format=standard',
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch ACF data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <AtolioPartnershipClient data={data} />;
}