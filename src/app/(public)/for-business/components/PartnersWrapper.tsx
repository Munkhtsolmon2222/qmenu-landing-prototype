'use client';

import dynamic from 'next/dynamic';

const DynamicPartners = dynamic(() => import('./Partners').then((mod) => mod.Partners), {
  ssr: false,
});

const PartnersWrapper = () => {
  return <DynamicPartners />;
};

export default PartnersWrapper;
