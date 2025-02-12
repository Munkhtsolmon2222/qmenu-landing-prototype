"use client";
import { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { BranchDetail } from "@/lib/types";
import { RestaurantGrid } from "../cards/RestaurantGridCard";
interface Props {
  location: BranchDetail;
}
export const MarkerWithInfowindow = (props: Props) => {
  const { location } = props;

  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={{ lat: location.latitude, lng: location.longitude }}
        title={"AdvancedMarker that opens an Infowindow when clicked."}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <RestaurantGrid place={location} services={false} />
        </InfoWindow>
      )}
    </>
  );
};
