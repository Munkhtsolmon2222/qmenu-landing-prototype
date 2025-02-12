"use client";
import { light } from "./styles";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { BranchDetail } from "@/lib/types";
import defaultImage from "@/assets/images/restaurant.png";
import Image from "next/image";

interface Props {
  position;
  locations: BranchDetail[];
}
export const Wrapper = (props: Props) => {
  const { position, locations } = props;

  return (
    <Map
      mapId={"47474e7b2e5aa2a7"}
      defaultZoom={18}
      defaultCenter={position ?? { lat: 0, lng: 0 }}
      styles={light}
      gestureHandling={"greedy"}
    >
      {locations?.map((e, index) => (
        <div key={index}>
          {e?.latitude && e?.longitude && (
            <AdvancedMarker
              key={e.id}
              position={{ lat: e?.latitude ?? 0, lng: e?.longitude ?? 0 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                className="fill-red-600"
              >
                <path
                  fillRule="evenodd"
                  d="m23.08 44.702l.14.08l.056.032a1.52 1.52 0 0 0 1.446 0l.056-.03l.142-.082q.182-.106.51-.305c.434-.266 1.048-.66 1.78-1.178a39.2 39.2 0 0 0 5.364-4.564c3.888-3.98 7.926-9.96 7.926-17.654a16.5 16.5 0 0 0-33 0c0 7.694 4.038 13.674 7.926 17.654a39.2 39.2 0 0 0 5.364 4.564a34 34 0 0 0 2.29 1.484M24 27a6 6 0 1 0 0-12a6 6 0 0 0 0 12"
                  clipRule="evenodd"
                />
                <defs>
                  <clipPath id="circleView">
                    <circle cx="24" cy="21" r="14" />
                  </clipPath>
                </defs>
                <Image
                  src={e.logo ?? defaultImage}
                  alt="Logo"
                  width={32}
                  height={32}
                />
              </svg>
            </AdvancedMarker>
          )}
        </div>
      ))}
    </Map>
  );
};

export default Wrapper;
