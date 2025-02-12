import { useFilterContext } from "@/lib/providers/filter.context";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Icons } from "@/components/shared/icons";
import MainFilter from "@/components/shared/filter";
import useMediaQuery from "@/hooks/use-media-query";
function HomeFilter() {
  const { open, setOpen } = useFilterContext();
  const { device } = useMediaQuery();
  if (device === "mobile")
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Icons.filter className="hover:bg-transparent text-current h-[1.4rem] w-[1.4rem] md:h-6 md:w-6 cursor-pointer" />
        </DrawerTrigger>
        <DrawerContent>
          <MainFilter />
        </DrawerContent>
      </Drawer>
    );

  return (
    <Drawer open={open} direction="right" onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Icons.filter
          className="hover:bg-transparent text-current h-5 w-5 p-[1px] md:h-6 md:w-6 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </DrawerTrigger>
      <DrawerContent className="left-0 pt-8 flex md:w-3/12 w-8/12 min-h-screen  md:ml-[75%] ml-[33%]">
        <MainFilter />
      </DrawerContent>
    </Drawer>
  );
}

export default HomeFilter;
