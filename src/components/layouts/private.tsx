"use client";
import { BottomNav } from "../shared/bottom-nav";
import Header from "../shared/header/header";
import { Suspense } from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { Router } from "@/routes/router";
import { Outlet } from "react-router-dom";
import Loader from "../shared/loader";

export default function Privatelayout() {
  // const [show, setShow] = useState(false);
  const { device } = useMediaQuery();
  return (
    <div className="flex-grow flex flex-col justify-center items-center h-screen w-full">
      <Header />
      <div
        className={`flex max-w-[90rem]  flex-col w-full h-max min-h-screen `}
      >
        <Router>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Router>
      </div>
      <div className={`max-w-[90rem] w-full  justify-center items-center`}>
        {device === "mobile" && <BottomNav />}
      </div>
    </div>
  );
}
