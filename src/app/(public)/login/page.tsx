"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Signin from "./tabs/signin";
import { Signup } from "./tabs";
type TabItems = "signin" | "signup" | "forgot";

export interface ChildProps {
  tab: TabItems;
  setTab: React.Dispatch<React.SetStateAction<TabItems>>;
  nextPath?: string;
}

const Login = () => {
  const params = useSearchParams();
  const [nextPath, setNextPath] = useState<string>();
  const [tab, setTab] = useState<TabItems>("signin");
  const { t } = useTranslation();
  useEffect(() => {
    const next = params.get("next");
    const page = params.get("page");
    if (page) setTab(page as TabItems);
    if (next) {
      setNextPath(next);
    }
  }, [params]);

  return (
    <div className="bg-background my-16 sm:mb-0 py-4 px-5 w-full  h-[80vh] flex justify-center items-center">
      <Tabs value={tab} className="h-full w-full flex justify-center ">
        <TabsList
          className={`grid w-full  ${
            tab === "forgot" ? "grid-cols-1" : "grid-cols-2"
          } bg-current-1 h-14 p-2 max-w-96 `}
        >
          {tab !== "forgot" ? (
            <>
              <TabsTrigger
                value="signin"
                onClick={() => setTab("signin")}
                className="h-full text-base  py-2"
              >
                {t("login")}
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                onClick={() => setTab("signup")}
                className="h-full text-base   py-2 "
              >
                {t("signup")}
              </TabsTrigger>
            </>
          ) : (
            <></>
          )}
          <TabsContent value="signin" className="h-full w-96 mt-20">
            <Signin setTab={setTab} nextPath={nextPath} tab={tab} />
          </TabsContent>
          <TabsContent value="signup" className="h-full w-96 mt-20">
            <Signup setTab={setTab} nextPath={nextPath} tab={tab} />
          </TabsContent>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Login;
