import { Icons } from "@/components/shared/icons";
import { BranchDetail, OrderType } from "@/lib/types";
import { ReactNode } from "react";
interface Filter {
  key: OrderType;
  name: string;
  special?: boolean;
  icon?: ReactNode;
}

interface Props {
  filter: string[];
  filters: Filter[];
  addFilter: (value: string) => void;
  removeFilter: (all: boolean, filter: string | null) => void;
  branches?: BranchDetail[];
  result?: boolean;
}

const FilterComponents = (props: Props) => {
  const { addFilter, filter, removeFilter, filters, branches, result } = props;
  // const { t } = useTranslation();
  const onChangeFilter = (item: OrderType) => {
    const remove = filter.includes(item);

    if (remove) {
      removeFilter(false, item);
    } else {
      addFilter(item);
    }
  };

  return (
    <div className="flex flex-col w-full md:pt-4 pt-3 pb-2 overflow-hidden">
      <div className="gap-2  overflow-y-auto no-scrollbar w-full  flex flex-row">
        {filters?.map((e, index) => (
          <div
            key={index}
            className="p-0 basis-27 cursor-pointer"
            onClick={() => onChangeFilter(e.key)}
          >
            {e.special ? (
              <div className="relative">
                <div
                  key={e.key}
                  className={`rounded-full bg-primary-foreground pr-5 pl-3 border py-1.5 flex flex-row items-center bg-red-600 text-primary-foreground gap-1 cursor-pointer text-nowrap  text-sm md:text-base
              `}
                >
                  {e.icon}
                  {e.name}
                </div>
              </div>
            ) : (
              <div
                key={e.key}
                className={`rounded-full  border  justify-center cursor-pointer py-1.5 flex flex-row items-center text-sm md:text-base text-nowrap ${
                  filter.includes(e.key)
                    ? "bg-black text-primary-foreground pl-5 pr-3"
                    : "bg-primary-foreground px-5"
                }`}
              >
                {e.name}
                {filter.includes(e.key) && (
                  <Icons.close className="md:w-6 md:h-6 md:pt-[2px] h-4 w-4 " />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {filter.length > 0 && !result && (
        <div className="flex flex-col justify-between mt-3 text-sm md:text-base  gap-2">
          <div className="w-full flex justify-between text-md font-semibold">
            <h2 className="text-lg  xl:text-xl ">
              Хайлтын үр :<span className="font-bold"> {branches?.length}</span>
            </h2>
            <div
              className="rounded-full bg-primary-foreground  self-end flex   pr-5 pl-3 border py-1.5 cursor-pointer "
              onClick={() => removeFilter(true, null)}
            >
              Дахин тохируулах
            </div>
          </div>
          {/* <div className="gap-4  overflow-y-auto no-scrollbar w-full  flex flex-row">
            {branches?.map((e: any, index: number) => (
              <RestaurantGrid place={e} key={e.id} services />
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default FilterComponents;
