"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { CENTER } from "@/lib/config/constant";

const useNearbyPlaces = (query: string | unknown) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | string>(null);
  // const test = process.env.test;
  // console.log(test);
  const API_KEY = process.env.GOOGLE_MAPS_API;
  useEffect(() => {
    if (!query) return;
    const fetchNearbyPlaces = async () => {
      setLoading(true);
      setError(null);

      const data = {
        textQuery: query,
        languageCode: "mn",
        regionCode: "cn",
        locationBias: {
          circle: {
            center: {
              latitude: CENTER.lat,
              longitude: CENTER.long,
            },
            radius: 500.0,
          },
        },
      };

      try {
        const response = await axios.post(
          "https://places.googleapis.com/v1/places:searchText",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": API_KEY,
              "X-Goog-FieldMask":
                "places.location,places.formattedAddress,places.displayName",
            },
          }
        );
        setPlaces(response.data.places || []);
      } catch (err) {
        setError(err);
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [query, API_KEY]);

  return { places, loading, error };
};

export default useNearbyPlaces;
