"use client";
import MainFilter from "@/components/shared/filter";
import { Icons } from "@/components/shared/icons";
import Loader from "@/components/shared/loader";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import InputSuffix from "@/components/ui/input-suffix";
import { useTag } from "@/hooks/useTags";
import { TagType } from "@/lib/config/constant";
import { useFilterContext } from "@/lib/providers/filter.context";
export const Map = () => {
  const { removeFilter, addFilter, filters, open, setOpen } =
    useFilterContext();
  const { tags, loading } = useTag(TagType.F);

  const handleSelect = (value: string) => {
    if (filters?.includes(value)) {
      removeFilter(value);
      return filters?.filter((item) => item !== value);
    } else {
      addFilter("filters", value);
      return [...(filters || []), value];
    }
  };

  const handleOptionChange = (option) => {
    if (filters?.includes(option)) {
      return filters?.filter((item) => item !== option);
    } else {
      return [...(filters || []), option];
    }
  };

  const selecters = tags?.map((e) => {
    return {
      select: false,
      filter: true,
      name: e.name,
      key: e.name,
      filters: [{ name: "" }],
    };
  });

  if (loading) return <Loader />;

  return (
    <div className="absolute top-5 z-50 pt-3   md:mb-4 rounded-lg flex w-full justify-between gap-1 items-center flex-col ">
      <div className="flex w-full  items-center gap-4 px-5">
        <InputSuffix
          placeholder="Хоол, Ресторан..."
          prefix={
            <Icons.search className="bg-background text-current h-5 w-5 md:h-6 md:w-6" />
          }
          suffix={null}
        />
        <div className="bg-current w-max p-1.5 rounded-md">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Icons.filter className="text-white h-5 w-5 p-[1px] md:h-6 md:w-6 cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
              <MainFilter />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="gap-2  overflow-y-auto no-scrollbar w-full pl-5  my-2 flex flex-row">
        {selecters.map((filter, index) => {
          const active = filter.select
            ? filter.filters.some((e: any) => filters?.includes(e))
            : filters?.includes(filter.name);

          return (
            <div
              key={index}
              className={`${
                active ? "bg-current text-background" : ""
              } relative px-3 py-1 bg-background border rounded-full flex items-center space-x-2 max-w-40 cursor-pointer ${filters}`}
              onClick={() => filter?.filter && handleSelect(filter.name)}
            >
              {filter.select ? (
                <div className="left-0 w-full  rounded-md  z-10">
                  <select
                    className="w-max rounded-md border-none text-sm whitespace-nowrap outline-none"
                    onChange={(e) => handleOptionChange(e.target.value)}
                  >
                    {filter.filters.map((option, idx) => (
                      <option key={idx} value={option.name} className="px-2">
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="text-sm whitespace-nowrap">{filter.name}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
