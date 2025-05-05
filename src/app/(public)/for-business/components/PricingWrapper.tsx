'use client';

import dynamic from 'next/dynamic';

const DynamicPricingPage = dynamic(() => import('./Pricing'), { ssr: false });

const PricingWrapper = () => {
  return <DynamicPricingPage />;
};

export default PricingWrapper;
