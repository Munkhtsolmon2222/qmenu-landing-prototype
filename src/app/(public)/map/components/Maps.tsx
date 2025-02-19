"use client";
import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";
import { Icons } from "@/components/shared/icons";
import { Center } from "../page";
import defaultImage from "@/assets/images/restaurant.png";
import { BranchDetail } from "@/lib/types";
import Loader from "@/components/shared/loader";
import { useRouter } from "next/navigation";

const containerStyle = {
  width: "100%",
  height: "64vh",
};

type Props = {
  branches: BranchDetail[];
  center: Center;
  setCenter: React.Dispatch<React.SetStateAction<Center>>;
};

const Maps = ({ branches, center, setCenter }: Props) => {
  const loaderOptions = useMemo(
    () => ({
      googleMapsApiKey: process.env.GOOGLE_MAPS_API,
      id: "google-map-script",
    }),
    []
  );
  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onLoad = (mapInstance: google.maps.Map) => {
    mapInstance.setCenter(center);
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = () => {
    if (map) {
      const newCenter = map.getCenter();
      if (newCenter) {
        setCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
      }
    }
    setIsDragging(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loadError) return <div>Error loading Google Maps</div>;

  return (
    <div>
      <div className="w-full">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            options={{
              disableDefaultUI: true,
              zoomControl: false,
              gestureHandling: "greedy",
              disableDoubleClickZoom: true,
            }}
          >
            <div
              className="custom-marker"
              style={{
                position: "absolute",
                transform: `translate(-50%, ${isDragging ? "-120%" : "-100%"})`,
                top: "50%",
                left: "50%",
              }}
            >
              <Icons.pin style={{ width: 40, height: 40 }} />
            </div>
            {branches?.map((e) => (
              <OverlayView
                key={e.id}
                position={{ lat: e.latitude, lng: e.longitude }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div
                  onClick={() => router.push(`/restaurant/${e.id}`)}
                  className="cursor-pointer"
                  style={{
                    transform: "translate(-50%, -100%)",
                  }}
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
                    <image
                      href={
                        typeof e.logo === "string" ? e.logo : defaultImage.src
                      } // Handling StaticImageData type
                      x="8"
                      y="6"
                      className="w-8 h-8"
                      clipPath="url(#circleView)"
                    />
                  </svg>
                </div>
              </OverlayView>
            ))}
          </GoogleMap>
        ) : (
          <Loader />
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex flex-col items-center">
              <Loader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
