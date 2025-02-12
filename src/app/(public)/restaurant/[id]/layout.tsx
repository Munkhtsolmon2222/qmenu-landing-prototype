"use client";

import RestaurantTabs from "@/app/(public)/restaurant/components/tabs/page";
import { GET_PARTICIPANT } from "@/graphql/query/menu";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LoaderIcon } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext, setAccessToken } from "@/lib/providers/auth";
import useMediaQuery from "@/hooks/use-media-query";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import defaultImage from "@/assets/images/restaurant.png";
import About from "../components/about";
import { PAGE_NOT_FOUND } from "@/lib/config/page";
import { CURRENT_TOKEN } from "@/graphql/query";
import { OrderDialogRestaurant } from "../components/OrderDialogRestaurant";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { id: id2 } = useParams();
  const token = localStorage.getItem("token");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loadParticipant } = useRestaurantStore();
  const { setPosition } = useContext(AuthContext);
  const [loadLocation, setLoadLocation] = useState<boolean>(true);
  const { width } = useMediaQuery();
  const [getToken] = useMutation(CURRENT_TOKEN);

  const [getParticipant, { data: participant, loading }] = useLazyQuery(
    GET_PARTICIPANT,
    {
      onCompleted: (data) => {
        setAccessToken(data.getParticipant.token);
        loadParticipant(data.getParticipant);
        setLoadLocation(false);
      },
      onError: () => setLoadLocation(false),
    }
  );

  const fetchLocations = useCallback(
    (id?: string) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          getParticipant({
            variables: {
              id,
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          getParticipant({ variables: { id } });
        }
      );
    },
    [setPosition, getParticipant]
  );

  useEffect(() => {
    const idRaw = id2 ?? searchParams.get("id");
    const id = Array.isArray(idRaw) ? idRaw[0] : idRaw;

    if (!id) return router.push(PAGE_NOT_FOUND);

    if (!token) {
      getToken({
        variables: {
          code: "",
          type: "QM",
          token,
          systemType: null,
        },
        onCompleted: (data) => {
          localStorage.setItem("token", data?.getToken?.token);
          fetchLocations(id);
        },
      });
    } else {
      fetchLocations(id);
    }
  }, [searchParams, fetchLocations, getToken, id2, router, token]);

  if (loading || loadLocation)
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin" />
      </div>
    );

  const branch = participant?.getParticipant?.branch;

  if (!branch) return <></>;

  return (
    <div className="w-full max-w-3xl xl:max-w-full xl:px-10 sm:mt-2 mx-auto px-0 sm:px-4 bg-background flex flex-col sm:gap-5">
      <div className="relative z-0 w-full overflow-x-hidden flex gap-3 h-96 sm:rounded-xl sm:h-60">
        <Image
          id="restaurant-image"
          alt="Restaurant Exterior"
          className="w-full h-full object-cover sm:rounded-xl"
          height={400}
          src={
            !branch?.banner || branch.banner === ""
              ? defaultImage
              : branch?.banner
          }
          style={{
            aspectRatio: "600/400",
            objectFit: "cover",
          }}
          width={600}
        />
      </div>
      <About branch={branch} width={width ?? window.innerWidth} />
      <RestaurantTabs participant={participant?.getParticipant} />
      <OrderDialogRestaurant>{children}</OrderDialogRestaurant>
    </div>
  );
}
