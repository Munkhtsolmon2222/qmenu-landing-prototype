'use client';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Image from 'next/image';

export const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="relative w-full h-auto md:h-[500px] overflow-hidden flex items-center mt-6 border-1 border-gray-200 rounded-2xl bg-gradient-to-r from-gray-[#f2f2f2] via-gray-100 to-gray-300"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full z-10">
        <div className="flex-1 max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-gray-900">
            Бизнест зориулсан <span className="text-[#AD1F28]">Qmenu</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 md:mb-8">
            Ресторанд зориулсан ухаалаг КАСС, QR цэс, КИОСК, гал тогооны удирдлага, мобайл касс
            болон бусад системүүдийг нэг дор багтаасан бүрэн автоматжуулсан удирдлагын платформ.
          </p>
          <Link href="/for-business">
            {' '}
            <Button size="lg" className="mb-6 md:mb-8 group bg-current-2 hover:bg-current-2">
              Дэлгэрэнгүй
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center mt-8 md:mt-0 mb-4 ">
          <div className="relative w-[280px] h-[340px] md:w-[340px] md:h-[420px] rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col items-center justify-center bg-white">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full absolute -top-8 md:-top-12 -left-8 md:-left-12 z-0 bg-[#f2f2f2]" />
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full absolute -bottom-8 md:-bottom-10 -right-8 md:-right-10 z-0 bg-[#f2f2f2]" />
            <Image
              alt="app screenshot"
              src={'./other/featureQrmenu.svg'}
              width={800}
              height={1400}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
