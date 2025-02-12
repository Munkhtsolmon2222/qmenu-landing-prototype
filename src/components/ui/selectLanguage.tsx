"use client";
import en from "@/assets/images/en.png";
import mn from "@/assets/images/mn.png";
import ko from "@/assets/images/ko.png";
import zh from "@/assets/images/zh.png";
import ja from "@/assets/images/ja.png";
import ru from "@/assets/images/ru.png";
import fr from "@/assets/images/fr.png";
import de from "@/assets/images/de.png";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const selectLanguage = [
    {
      name: "English",
      code: "en",
      flag: en,
    },
    {
      name: "Mongolian",
      code: "mn",
      flag: mn,
    },
    {
      name: "Korean",
      code: "ko",
      flag: ko,
    },
    {
      name: "China",
      code: "zh",
      flag: zh,
    },
    {
      name: "Japan",
      code: "ja",
      flag: ja,
    },
    {
      name: "Russian",
      code: "ru",
      flag: ru,
    },
    {
      name: "French",
      code: "fr",
      flag: fr,
    },
    {
      name: "German",
      code: "de",
      flag: de,
    },
  ];
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLangCode = localStorage.getItem("saveLang");
    return (
      selectLanguage.find((lang) => lang.code === savedLangCode) ||
      selectLanguage[0]
    );
  });
  const onChangeLanguage = (langCode: string) => {
    const selected = selectLanguage.find((lang) => lang.code === langCode);
    if (selected) {
      setCurrentLanguage(selected);
      i18n.changeLanguage(langCode);
      localStorage.setItem("saveLang", langCode);
    }
    setOpen(false);
  };
  useEffect(() => {
    const savedLangCode = localStorage.getItem("saveLang");
    if (savedLangCode && savedLangCode !== i18n.language) {
      console.log(i18n.changeLanguage);
      i18n.changeLanguage(savedLangCode);
    }
  }, [i18n]);

  return (
    <div>
      <div className="relative">
        <Button variant="link" onClick={() => setOpen(!open)}>
          <Image
            width={7}
            height={5}
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            className="w-7 h-5 object-fill rounded-sm absolute left-2"
          />
        </Button>
        {open && (
          <div className="text-sm absolute top-full left-0 w-32 bg-white border rounded-lg shadow-lg mt-2 z-10 grid grid-cols-3">
            {selectLanguage.map((lang) => (
              <div
                key={lang.code}
                onClick={() => onChangeLanguage(lang.code)}
                className="flex items-center p-2 hover:bg-gray-200 cursor-pointer "
              >
                <Image
                  width={6}
                  height={5}
                  src={lang.flag}
                  alt={lang.name}
                  className="w-6 h-5 mr-2 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectLanguage;
