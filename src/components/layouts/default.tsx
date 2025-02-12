"use client";
import { Outlet } from "react-router-dom";
import Header from "../shared/header/header";
import { BottomNav } from "@/components/shared/bottom-nav";
import useMediaQuery from "@/hooks/use-media-query";
import Loader from "../shared/loader";
import { Suspense } from "react";
export default function Defaultlayout() {
  const { device } = useMediaQuery();

  return (
    <div className="flex-grow flex flex-col justify-center items-center h-screen w-full">
      <div
        className={`flex max-w-[90rem]  flex-col w-full h-max min-h-screen `}
      >
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
      {device === "mobile" && <BottomNav />}
    </div>
  );
}
