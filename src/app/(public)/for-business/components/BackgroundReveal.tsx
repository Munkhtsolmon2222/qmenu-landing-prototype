'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useScroll, useTransform } from 'framer-motion';
import { motion } from 'framer-motion';

const BackgroundReveal = () => {
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.05], [0, -500]);

  useEffect(() => {
    if (!isRevealed) {
      gsap.to(panelsRef.current, {
        yPercent: -1000,
        stagger: 0.2,
        duration: 5,
        ease: 'power4.inOut',
        onComplete: () => setIsRevealed(true),
      });

      gsap.fromTo(
        '.reveal-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          delay: 2, // Start after the panel animation
          stagger: 0.3,
        },
      );
    }
  }, [isRevealed]);

  return (
    <motion.div style={{ y: heroTranslateY }}>
      <div className="fixed inset-0 z-[9999] flex flex-row" id="reveal">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={(el: any) => (panelsRef.current[i] = el!)}
            className="flex-1 bg-current-2"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BackgroundReveal;
