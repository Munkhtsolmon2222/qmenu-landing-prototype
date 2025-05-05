import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QMenu',
    url: 'https://qmenu.mn/for-business',
    image: 'https://qmenu.mn/banner.png',
    description:
      'QMenu бол ресторан удирдлагын иж бүрэн шийдэл юм. Дижитал цэс, кассийн программ, захиалгын удирдлага, POS систем, бараа материалын хяналт болон хүчирхэг шинжилгээ бүгд нэг дор.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MNT',
    },
    publisher: {
      '@type': 'Organization',
      name: 'QMenu',
      url: 'https://qmenu.mn',
    },
    metadata: {
      robots: 'index, follow',
    },
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
