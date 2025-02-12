"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "@/graphql/query";
import { debounce } from "lodash";
import { LoaderIcon } from "lucide-react";
import { Button } from "./button";
import { SearchBranch } from "../cards/SearchBranchCard";
import { Separator } from "./separator";
import { SearchProduct } from "../cards/SearchProductCard";
import { Icons } from "../shared/icons";
import SearchEventCard from "../cards/SearchEventCard";
import { IEvent } from "@/lib/types";
import { PAGE_EVENT } from "@/lib/config/page";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface Props {
  suffix?;
  prefix?;
  placeholder?: string;
  context?: boolean;
  className?: string;
}

export default function InputSuffix(props: Props) {
  const { suffix, placeholder, prefix, context, className } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{
    products?;
    branches?;
    events?;
    productTotal?: number;
    branchTotal?: number;
    eventTotal?: number;
  }>({
    products: [],
    branches: [],
    events: [],
    productTotal: 0,
    branchTotal: 0,
    eventTotal: 0,
  });

  const router = useRouter();
  const { t } = useTranslation();

  const [search, { loading }] = useLazyQuery(SEARCH);

  const onSearch = debounce((value: string) => {
    search({
      variables: { value: value },
      onCompleted(data) {
        setSearchResults(data.search);
      },
    });
  }, 1000);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const onClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-md ">
      <div className="relative">
        <div
          className={`flex flex-row h-max rounded-full pl-3 bg-background justify-between items-center relative border-[1px] xl:w-[24rem] w-full md:w-[20rem] overflow-hidden ${className}`}
        >
          {prefix && <div className="h-full">{prefix}</div>}
          <Input
            type="text"
            className={`border-none md:h-10 h-9 w-full bg-background active:border-none focus:border-none outline-none text-gray-400 placeholder-gray-400 `}
            placeholder={placeholder ? placeholder : "bat@example.com"}
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="right-1 flex items-center top-1.5 z-50">
            {suffix && <div className="h-full">{suffix}</div>}
          </div>
        </div>
      </div>
      {context}
      {searchTerm?.length > 0 && (
        <div className="absolute mt-2 sm:w-28 md:w-[800px] rounded-md border bg-background shadow-lg z-[99]">
          {loading ? (
            <div className="min-h-32 flex items-center justify-center w-full">
              <LoaderIcon className="animate-spin" />
            </div>
          ) : (
            <>
              {searchResults?.products?.length === 0 &&
              searchResults?.branches?.length === 0 &&
              searchResults?.events?.length === 0 ? (
                <div className="min-h-32 flex flex-col gap-2 items-center justify-center w-full p-4 ">
                  <span className="text-center text-muted-foreground">
                    {searchTerm} түлхүүр үгт илэрц олдсонгүй
                  </span>
                  <Button
                    size={"sm"}
                    className="text-xs mt-2"
                    onClick={onClear}
                  >
                    Цэвэрлэх
                  </Button>
                </div>
              ) : (
                <div className="px-4 py-2 sm:w-28 md:w-[800px]">
                  <div className="flex justify-between w-full h-max ">
                    <p className="font-semibold">{t("Search result")}</p>
                    <Icons.close onClick={onClear} />
                  </div>
                  <Separator />
                  {searchResults?.branches?.length > 0 && (
                    <ul className="max-h-[40vh] my-2 overflow-x-hidden">
                      <div className="flex justify-between mb-1 w-full sticky top-0 bg-white z-50 ">
                        <p className="text-md font-bold ">
                          {t("Organization")} :
                        </p>
                        <p>
                          {t("Total")}({searchResults?.branchTotal})
                        </p>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                        {searchResults?.branches.map((result, index) => (
                          <SearchBranch key={index} place={result} />
                        ))}
                      </div>
                    </ul>
                  )}
                  {searchResults?.products?.length > 0 && (
                    <>
                      <Separator />
                      <ul className="max-h-[40vh] mt-2 overflow-x-hidden">
                        <div className="flex justify-between mb-1 w-full sticky top-0 bg-white z-50 ">
                          <p className="text-md font-bold ">{t("Product")} :</p>
                          <p>
                            {t("Total")}({searchResults?.productTotal})
                          </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-1 grid-cols-1">
                          {searchResults?.products.map((result, index) => (
                            <SearchProduct key={index} food={result} />
                          ))}
                        </div>
                      </ul>
                    </>
                  )}
                  {searchResults?.events?.length > 0 && (
                    <>
                      <Separator />
                      <ul className="max-h-[40vh] mt-2 overflow-x-hidden">
                        <div className="flex justify-between mb-1 w-full sticky top-0 bg-white z-50 ">
                          <p className="text-md font-bold ">{t("Reception")}</p>
                          <p>
                            {t("Total")}({searchResults?.eventTotal})
                          </p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-1 grid-cols-1">
                          {searchResults?.events.map((event: IEvent, index) => (
                            <SearchEventCard
                              key={index}
                              event={event}
                              onClick={() =>
                                router.push(`${PAGE_EVENT}/${event.id}`)
                              }
                            />
                          ))}
                        </div>
                      </ul>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
