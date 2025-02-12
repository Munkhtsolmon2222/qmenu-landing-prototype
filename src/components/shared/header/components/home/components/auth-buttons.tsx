"use client";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/use-media-query";
import { PAGE_LOGIN } from "@/lib/config/page";
import { useEffect, useState } from "react";
import { HEIGHT } from "../page";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import SelectLanguage from "@/components/ui/selectLanguage";

const AuthButtons = () => {
  const { device } = useMediaQuery();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const height = device === "mobile" ? 177 : HEIGHT;
      setScrolled(offset > height);
    };

    const optimizedScrollHandler = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", optimizedScrollHandler);
    return () => {
      window.removeEventListener("scroll", optimizedScrollHandler);
    };
  }, [device]);

  const navigateToPage = (page: string) => {
    const searchParams = new URLSearchParams({ page }).toString();
    router.push(`${PAGE_LOGIN}?${searchParams}`);
  };

  return (
    <div className="flex-row gap-2 hidden sm:flex">
      <SelectLanguage />
      <Button
        variant="ghost"
        className="rounded-full"
        onClick={() => navigateToPage("signin")}
      >
        {t("login")}
      </Button>
      <Button
        variant="outline"
        className={`rounded-full ${
          scrolled ? "bg-current" : "bg-current"
        } border-current text-white`}
        onClick={() => navigateToPage("signup")}
      >
        {t("signup")}
      </Button>
    </div>
  );
};

export default AuthButtons;
