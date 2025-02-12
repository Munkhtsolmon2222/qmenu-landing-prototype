"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTag } from "@/hooks/useTags";
import { ORDERS_ARRAY, TagType } from "@/lib/config/constant";
import useMediaQuery from "@/hooks/use-media-query";
import Loader from "@/components/shared/loader";
import { PAGE_MAP } from "@/lib/config/page";
import { HEIGHT } from "../page";
import { useRouter } from "next/navigation";
export function NavMenu() {
  const { tags, loading: fetching } = useTag(TagType.K);
  const { tags: filter, loading: fethcing } = useTag(TagType.F);
  const [scrolled, setScrolled] = React.useState(false);
  const { device } = useMediaQuery();
  const router = useRouter();
  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const height = device === "mobile" ? 177 : HEIGHT;
      if (offset > height) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [device]);
  const loader = fetching || fethcing;

  const array = [
    {
      key: "cuisine",
      name: "Хоолны төрөл",
      filters: tags?.map((e) => e.name),
    },
    {
      key: "tags",
      name: "Давуу тал",
      filters: filter?.map((e) => e.name),
    },
    {
      key: "recommended",
      name: "Захиалгын төрөл",
      filters: ORDERS_ARRAY.map((e) => e.label),
    },
  ];
  const text = scrolled ? "" : "text-white";

  if (loader) return <Loader />;

  return (
    <div className="z-[99999] absolute">
      <NavigationMenu className="z-50">
        <NavigationMenuList>
          {array.map((e) => (
            <NavigationMenuItem
              key="NavigationMenuItem "
              className="hover:bg-transparent"
            >
              <NavigationMenuTrigger
                className={`bg-transparent ${text} hover:${text} hover:bg-transparent`}
              >
                {e.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[400px] ">
                  {e?.filters?.map((filter) => (
                    <ListItem
                      key="ListItem"
                      onClick={() => router.push(PAGE_MAP + "?type=" + filter)}
                      title={filter?.toString()}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
