"use client";
import { Home } from "./components/home/page";
import { Event } from "./components/event/page";
import { Profile } from "./components/profile/page";
import useHeader from "@/hooks/use-header";
import { Restaurant } from "./components/restaurant/page";
import { Default } from "./components/default/page";
const Header = () => {
  const { map, restaurant, profile, home, event } = useHeader();
  if (restaurant) return <Restaurant />;

  return (
    <div className="sticky top-0 z-50 w-full">
      {map ? (
        <Home />
      ) : profile ? (
        <Profile />
      ) : home ? (
        <Home />
      ) : event ? (
        <Event />
      ) : (
        <Default />
      )}
    </div>
  );
};

export default Header;
