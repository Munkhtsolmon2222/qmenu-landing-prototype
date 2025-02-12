"use client";
import InputSuffix from "@/components/ui/input-suffix";
import { Icons } from "@/components/shared/icons";
import AuthButtons from "./components/auth-buttons";
import ProfileButtons from "./components/profile-buttons";
import { getPayload } from "@/lib/providers/auth";
import { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import useMediaQuery from "@/hooks/use-media-query";
import logosmall from "@/assets/favicon.ico";
import { Button } from "@/components/ui/button";
import { PAGE_MAP } from "@/lib/config/page";
import SearchLocation from "./components/search-location";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
export const HEIGHT = 400;
import Image from "next/image";
export const Home = () => {
  const user = getPayload()?.role === "customer";
  const { device } = useMediaQuery();
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const height = device === "mobile" ? 177 : HEIGHT;
      if (offset > height) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [device]);

  const headerClass = scrolled ? "bg-current-1 shadow-md " : "bg-current-1";

  const icon = logo;

  return (
    <div
      className={`flex justify-between w-full top-0 sticky items-center  px-5  py-3 rounded-b-xl    flex-col  h-max bg-current-1  ${headerClass} border-b`}
    >
      <div
        className={`lg:max-w-[90rem] w-full flex  justify-between
         items-center gap-3 lg:px-4 md:flex-row flex-row`}
      >
        <Image
          width={100}
          height={100}
          src={device === "mobile" ? logosmall : icon}
          alt="logo"
          className={`md:max-h-14 md:w-32  max-w-32 cursor-pointer max-h-14 ${
            scrolled && device !== "mobile" && "mb-4"
          }`}
          onClick={() => router.push("/")}
        />
        <div
          className={`flex w-full gap-2  lg:w-max justify-center items-center sticky z-50`}
        >
          <div className="flex flex-col w-full">
            <div className="flex gap-3 justify-between w-full items-center">
              <InputSuffix
                placeholder={t("Food, Restaurant")}
                prefix={
                  <Icons.search className="hover:bg-transparent text-current h-5 w-5 md:h-6 md:w-6 md:hidden " />
                }
                suffix={
                  <Button
                    className="bg-current rounded-full hover:bg-current hidden md:flex"
                    onClick={() => router.push(PAGE_MAP)}
                  >
                    <Icons.search />
                  </Button>
                }
              />
              <SearchLocation />
            </div>

            {/* <div
              className={`md:flex   md:mr-6  w-80 md:w-max  overflow-scroll no-scrollbar ${
                scrolled ? "hidden" : "hidden"
              }`}
            >
              <NavMenu />
            </div> */}
          </div>

          {/* <div className="bg-current p-2 rounded-lg md:hidden ">
            <NotificationDrawer />
          </div> */}
        </div>
        {user ? <ProfileButtons /> : <AuthButtons />}
      </div>
    </div>
  );
};
