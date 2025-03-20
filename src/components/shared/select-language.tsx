'use client';
import { useTranslation } from 'react-i18next';
import en from '@/assets/images/en.png';
import mn from '@/assets/images/mn.png';
import ko from '@/assets/images/ko.png';
import zh from '@/assets/images/zh.png';
import ja from '@/assets/images/ja.png';
import ru from '@/assets/images/ru.png';
import fr from '@/assets/images/fr.png';
import de from '@/assets/images/de.png';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export const SelectLanguage = ({ className }: { className?: string }) => {
  const { i18n } = useTranslation();
  const pathname = usePathname();

  const selectLanguage = [
    {
      name: 'Mongolian',
      code: 'mn',
      flag: mn,
    },
    {
      name: 'English',
      code: 'en',
      flag: en,
    },
    {
      name: 'Korean',
      code: 'ko',
      flag: ko,
    },
    {
      name: 'China',
      code: 'zh',
      flag: zh,
    },
    {
      name: 'Japan',
      code: 'ja',
      flag: ja,
    },
    {
      name: 'Russian',
      code: 'ru',
      flag: ru,
    },
    {
      name: 'French',
      code: 'fr',
      flag: fr,
    },
    {
      name: 'German',
      code: 'de',
      flag: de,
    },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLangCode = localStorage.getItem('saveLang');
    return selectLanguage.find((lang) => lang.code === savedLangCode) || selectLanguage[0];
  });

  const onChangeLanguage = (langCode: string) => {
    const selected = selectLanguage.find((lang) => lang.code === langCode);
    if (selected) {
      setCurrentLanguage(selected);
      i18n.changeLanguage(langCode);
      localStorage?.setItem('saveLang', langCode);
    }
  };

  useEffect(() => {
    const savedLangCode = localStorage?.getItem('saveLang');
    if (savedLangCode && savedLangCode !== i18n.language) {
      const item = selectLanguage.find((lang) => lang.code === savedLangCode);
      if (item) setCurrentLanguage(item);
      i18n.changeLanguage(savedLangCode);
    }
  }, [i18n, pathname]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('cursor-pointer', className)}>
        <Image
          src={currentLanguage.flag}
          alt={currentLanguage.name}
          className="w-7 h-5 object-cover overflow-hidden rounded-sm left-2"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="text-sm top-full bg-background z-10 grid grid-cols-3 gap-3 p-1">
          {selectLanguage.map((lang) => (
            <div
              key={lang.code}
              onClick={() => onChangeLanguage(lang.code)}
              className="flex items-center hover:bg-gray-200 cursor-pointer"
            >
              <Image src={lang.flag} alt={lang.name} className="w-full object-cover rounded-sm" />
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SelectLanguage;
