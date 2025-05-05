'use client';
import { usePathname } from 'next/navigation';
import { useHeader } from '@/lib/hooks';
import { Icons } from '@/components/general';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const home = pathname === '/';
  const { restaurant } = useHeader();

  if (!home) return <></>;
  if (restaurant) return <></>;

  return (
    <footer className="bg-gray-900 text-white py-12 px-2 mt-14">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-16 lg:gap-16">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img alt="qmenu logo" src={'./other/logoQmenu.png'} className="h-[34px] w-[150px]" />
            </Link>
            <p className="text-gray-400 mb-4 max-w-xs">
              Ресторан удирдлагын хүчирхэг цогц систем таны бизнесийг дараагийн түвшинд хүргэх
              болно.
            </p>
            <div className="items-center gap-2 hidden md:flex">
              <Phone className="h-4 w-4" />
              <span>77772040</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Бүтээгдэхүүн</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/for-business#solution" className="text-gray-400 hover:text-white">
                  Шийдлүүд
                </Link>
              </li>
              <li>
                <Link href="/for-business#pricing" className="text-gray-400 hover:text-white">
                  Үнийн санал
                </Link>
              </li>
              <li>
                <Link href="/for-business#products" className="text-gray-400 hover:text-white">
                  Интеграци
                </Link>
              </li>
              <li>
                <Link href="/for-business#faq" className="text-gray-400 hover:text-white">
                  Түгээмэл асуултууд
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Компани</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/for-business" className="text-gray-400 hover:text-white">
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link href="/for-business#knowledge" className="text-gray-400 hover:text-white">
                  Мэдлэг
                </Link>
              </li>
              <li>
                <Link href="/for-business#" className="text-gray-400 hover:text-white">
                  Холбоо барих
                </Link>
              </li>
              <li>
                <Link href="/for-business#partners" className="text-gray-400 hover:text-white">
                  Түншүүд
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Холбогдох</h3>

            <div className="space-y-2">
              <div className="flex items-center gap-4 mb-4">
                <Phone className="text-gray-400 hover:text-white w-6 h-6 flex-shrink-0" />
                <a href="tel:77772040" className="text-gray-400 hover:text-white hover:underline">
                  77772040
                </a>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-gray-400 hover:text-white w-6 h-6 flex-shrink-0" />
                <a
                  href="mailto:info@qmenu.mn"
                  className="text-gray-400 hover:text-white hover:underline"
                >
                  info@qmenu.mn
                </a>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-gray-400 hover:text-white w-6 h-6 flex-shrink-0" />
                <span className="text-gray-400 hover:text-white">
                  RoyalPlaza 205, BZD 26 khoroo
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center px-2">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} QMenu. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div className="flex gap-2 mt-4 md:mt-0 ml-10">
            <Link
              href="https://www.facebook.com/QmenuDigitalMenu"
              className="text-gray-400 hover:text-white text-sm"
            >
              <Icons.facebook className="w-6 h-6 text-gray-700 hover:text-blue-700  " />
            </Link>
            <Link
              href="https://www.instagram.com/qmenu.mn/"
              className="text-gray-400 hover:text-white text-sm"
            >
              <Icons.instagram className="w-6 h-6 text-gray-700 rounded hover:text-orange-700" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
