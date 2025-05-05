'use client';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.svg';
import logosmall from '@/assets/favicon.ico';
import { useEffect } from 'react';
import gsap from 'gsap';

export const Header = () => {
  const { device } = useMediaQuery();

  useEffect(() => {
    const headerElement = document.querySelector('.header');

    gsap.set(headerElement, {
      opacity: 0,
      y: -100,
    });

    const timeout = setTimeout(() => {
      gsap.to(headerElement, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }, 3500); // 3.5 seconds

    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(headerElement, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        });
      } else {
        gsap.to(headerElement, {
          opacity: 0,
          y: -100,
          duration: 1,
          ease: 'power3.out',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 px-4 md:px-10 header">
      <div className="container flex h-16 items-center justify-between mx-auto gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={40}
            height={40}
            src={device === 'mobile' ? logosmall : logo}
            alt="logo"
            className="w-8 h-8 sm:w-28 sm:h-12 md:w-32 md:h-14"
          />{' '}
        </Link>

        <nav className="hidden md:flex items-center lg:gap-12 gap-8">
          <Link href="#products" className="font-medium hover:text-primary">
            Бүтээгдэхүүн
          </Link>
          <Link href="#pricing" className="font-medium hover:text-primary">
            Үнийн санал
          </Link>
          <Link href="#partners" className="font-medium hover:text-primary">
            Партнерууд
          </Link>
          <Link href="#faq" className="font-medium hover:text-primary">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">
            Ресторан бүртгүүлэх
          </Button>
          <a href={'https://master.qrms.mn/'}>
            {' '}
            <Button className="bg-[#9c021f] text-white hover:bg-red-700">Туршиж үзэх</Button>
          </a>
        </div>
      </div>
    </header>
  );
};
