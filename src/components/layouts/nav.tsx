"use client";
import { BottomNav } from "../shared/bottom-nav";
import { Suspense } from "react";
import useMediaQuery from "@/hooks/use-media-query";
import Header from "../shared/header/header";
import Loader from "../shared/loader";
import { Footer } from "../shared/footer";
import Categories from "../shared/categorories";
import useHeader from "@/hooks/use-header";

export default function Navigationlayout({
  children,
}: React.PropsWithChildren) {
  const { device } = useMediaQuery();
  const { home } = useHeader();

  return (
    <div className="flex flex-col justify-center h-max w-full items-center ">
      <Header />
      {home && <Categories />}

      <div
        className={`flex max-w-[90rem]  flex-col w-full h-max min-h-screen `}
      >
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </div>
      <Footer />
      <div className={`max-w-[90rem] w-full  justify-center items-center  `}>
        {/* <ChatModal show={show} onClick={() => setShow(!show)} />
        <ChatButton onClick={() => setShow(!show)} /> */}
        {device === "mobile" && <BottomNav />}
      </div>
    </div>
  );
}
