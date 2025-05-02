'use client';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, StarIcon } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero = () => {
  return (
    <section className="relative w-full h-[500px] bg-gradient-to-br from-white via-primary/7 to-primary/5 overflow-hidden flex items-center mt-[24px]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            <span className="text-[#AD1F28]">Qmenu</span> for Restaurants
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum ratione earum, vero cum
            rem deserunt facilis fugit odit, distinctio adipisci voluptatum? Consectetur culpa optio
            dolores repellendus perspiciatis doloribus, magnam hic!
          </p>
          <Button size="lg" className="mb-8 group">
            Дэлгэрэнгүй
            <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center items-center mt-12 md:mt-0"
        >
          <div className="relative w-[340px] h-[420px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full absolute -top-12 -left-12 z-0" />
            <div className="w-24 h-24 bg-primary/20 rounded-full absolute -bottom-10 -right-10 z-0" />
            <span className="z-10 text-gray-400 text-lg">[App Screenshot Here]</span>
          </div>
        </motion.div>
      </div>
      <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
    </section>
  );
};
