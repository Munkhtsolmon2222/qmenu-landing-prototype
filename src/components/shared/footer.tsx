"use client";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import useHeader from "@/hooks/use-header";
import { useTranslation } from "react-i18next";
import logo from "@/assets/images/logo.svg";
import { Icons } from "../shared/icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
export function Footer() {
  const pathname = usePathname();
  const home = pathname === "/";
  const { restaurant } = useHeader();
  const { t } = useTranslation();
  if (!home) return <></>;
  if (restaurant) return <></>;

  return (
    <footer className="w-full">
      <footer
        id="footer"
        className={`justify-center w-full flex  items-center  rounded-t-xl bg-current-1 px-14 mt-14   `}
      >
        <div className="max-w-[90rem] w-full flex-col flex md:flex-row justify-between md:gap-8 md:items-end py-8  gap-1   border-b-[2px] border-gray-600  ">
          <div className="md:w-3/5 w-full flex md:flex-row flex-col md:items-end gap-4 justify-between">
            <div className=" flex-row md:items-end items-end justify-center sm:justify-center md:gap-4 font-medium sm:gap-6 ">
              <Image width={150} height={350} src={logo} alt="logo" />
              <p className="max-w-80 text-gray-600 mb-2 hidden md:block">
                {t("Comprehensive restaurant management system")}
              </p>
              <div className="hidden sm:flex items-center gap-2 pt-1">
                <a href="https://www.facebook.com/QmenuDigitalMenu">
                  <Icons.facebook className="w-6 h-6 text-gray-700 hover:text-blue-700  " />
                </a>
                <a href="https://www.instagram.com/qmenu.mn/">
                  <Icons.instagram className="w-6 h-6 text-gray-700 rounded hover:text-orange-700" />
                </a>
              </div>
            </div>
            <div className="font-semibold -mt-2.5  text-gray-600 sm:text-center ">
              <div>
                <div className="flex items-center gap-3">
                  <div className="">
                    <Icons.phone />
                  </div>
                  <a
                    href="tel:+97677772040"
                    className="underline cursor-pointer"
                  >
                    77772040
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-3  text-gray-600">
                  <div>
                    <Icons.mail />{" "}
                  </div>
                  <a
                    href="mailto:info@qmenu.mn"
                    className="underline cursor-pointer"
                  >
                    info@qmenu.mn
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className=" text-gray-600">
                    <Icons.map />
                  </div>
                  <a
                    href="tel:+97677772040"
                    className="underline cursor-pointer text-gray-600"
                  >
                    RoyalPlaza 205, BZD 26 khoroo
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="md:items-end sm:justify-start md:gap-6 font-medium mb-9  text-gray-600">
            <NewsletterForm />
          </div>
        </div>
      </footer>
      <footer className="bg-current-1 text-center py-5  text-gray-500 ">
        <a className="font-semibold text-lg text-center ">
          <span className="text-md">©</span>
          <span>{new Date().getFullYear()}</span> <span>QMENU</span>
        </a>
      </footer>
    </footer>
  );
}
