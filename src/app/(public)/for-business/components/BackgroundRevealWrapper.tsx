'use client';

import dynamic from 'next/dynamic';

// Dynamic import for BackgroundReveal
const DynamicBackgroundReveal = dynamic(() => import('./BackgroundReveal'), { ssr: false });

const BackgroundRevealWrapper = () => {
  return <DynamicBackgroundReveal />;
};

export default BackgroundRevealWrapper; 