"use client";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSearchLocation from "@/hooks/useSearchLocation";
import useUrlSearchParams from "@/hooks/useUrlSearchParams";
import { LoaderIcon } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CENTER } from "@/lib/config/constant";
import { useTranslation } from "react-i18next";
function SearchLocation() {
  const { getSearchParam, setSearchParam } = useUrlSearchParams();
  const query = getSearchParam("q");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const { places, loading, error } = useSearchLocation(query);
  const { t } = useTranslation();

  const handleSearch = (e) => {
    setSearchParam("q", e.target.value);
    setOpen(true);
  };

  const onClear = () => {
    setSearchParam("q", null);
  };
  const handleGeolocationSuccess = (position: {
    coords: { latitude; longitude };
  }) => {
    const { latitude, longitude } = position.coords;
    const now = new Date().getTime();
    localStorage.setItem(
      "position",
      JSON.stringify({ latitude, longitude, timestamp: now })
    );
  };

  const handleGeolocationError = () => {
    const now = new Date().getTime();
    localStorage.setItem(
      "position",
      JSON.stringify({
        latitude: CENTER.lat,
        longitude: CENTER.long,
        timestamp: now,
      })
    );
  };

  const onSelectCurrent = () => {
    setSearchParam("q", null);
    setName(null);
    navigator.geolocation.getCurrentPosition(
      handleGeolocationSuccess,
      handleGeolocationError
    );
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          onClick={() => setOpen(!open)}
          className="flex justify-between max-w-40  w-full gap-2 px-2 py-3.5 rounded-full bg-white dark:bg-current-1"
        >
          <div>
            <Icons.pin className="w-6 h-6" />
          </div>
          <p className="truncate max-w-24">{name ?? t("location")}</p>

          <Icons.chevronDown className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-24">
        <DropdownMenuLabel>{t("Enter your location")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={query ?? ""}
          onValueChange={(val) => console.log(val)}
        >
          <Input
            type="text"
            className={`md:h-10 h-9  bg-background   w-full  text-gray-400 placeholder-gray-400`}
            placeholder={t("Location")}
            value={query ?? ""}
            onChange={handleSearch}
          />
          <Button
            variant={"outline"}
            className="flex cursor-pointer gap-1 relative w-full my-2 items-center justify-start"
            onClick={onSelectCurrent}
          >
            <div>
              <Icons.mappinned className="opacity-100 z-50" />
            </div>
            <div className="animate-ping w-4 absolute bg-current h-4 rounded-full top-3 left-5 opacity-30 z-10"></div>
            <p className="font-semibold">{t("Current location")}</p>
          </Button>
          {open && (
            <div className="bg-background z-[99]  border rounded-md">
              {loading ? (
                <div className="min-h-32 flex items-center justify-center w-full">
                  <LoaderIcon className="animate-spin" />
                </div>
              ) : (
                <>
                  {places?.length === 0 || error ? (
                    <div className="flex flex-col gap-2 items-center justify-center w-full p-4">
                      <span className="text-center text-muted-foreground">
                        {t(`No results found for`)}
                      </span>
                      <Button
                        size={"sm"}
                        className="text-xs mt-2 bg-current"
                        onClick={onClear}
                      >
                        {t("Clear")}
                      </Button>
                    </div>
                  ) : (
                    <div className="px-2 py-2 ">
                      {places?.length > 0 && (
                        <ul className="max-h-[40vh] mt-2 overflow-x-hidden">
                          <div className="flex flex-col gap-2 ">
                            {places?.map((result, index) => (
                              <div
                                className={`border-b cursor-pointer hover:bg-current-1`}
                                key={index}
                                onClick={() => {
                                  setSearchParam("q", result.displayName.text);
                                  setName(result.displayName.text);
                                  const now = new Date().getTime();
                                  localStorage.setItem(
                                    "position",
                                    JSON.stringify({
                                      latitude: result.location.latitude,
                                      longitude: result.location.longitude,
                                      timestamp: now,
                                    })
                                  );
                                  setOpen(false);
                                }}
                              >
                                <p className="w-full truncate font-semibold">
                                  {result.displayName.text}
                                </p>
                                <p className="w-full truncate">
                                  {result.formattedAddress}
                                </p>
                              </div>
                            ))}
                          </div>
                        </ul>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SearchLocation;
