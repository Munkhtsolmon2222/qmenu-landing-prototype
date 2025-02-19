"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AuthContext, isValidToken } from "@/lib/providers/auth";
import {
  CURRENT_TOKEN,
  FILTER_BRANCHES,
  FILTER_RESULT,
  GET_BRANCH_LIST,
} from "@/graphql/query";
import { GET_MASTER_CATEGORIES } from "@/graphql/query/menu";
import { GET_RECOMMENDED_PRODUCTS } from "@/graphql/query/product";
import {
  PartnerSystemType,
  SystemTypeByPartner,
  removePartnerType,
  setPartnerToken,
} from "@/lib/utils";
import { CENTER, PartnerObjType } from "@/lib/config/constant";
import { useRouter } from "next/navigation";

export const useHome = () => {
  const router = useRouter();
  const valid = isValidToken();
  const [filters, setFilter] = useState<string[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [loader, setLoader] = useState(true);
  const searchParams = useSearchParams();
  const { setPosition, authenticate } = useContext(AuthContext);

  const [getCategories, { data: categories, loading: fetching }] = useLazyQuery(
    GET_MASTER_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
      pollInterval: 0,
    }
  );

  const token =
    typeof window !== "undefined" ? localStorage?.getItem("token") : null;

  useEffect(() => {
    if (token) {
      getCategories();
    }
  }, [token, getCategories]);

  const [getProducts, { data: products, loading: fetchingProducts }] =
    useLazyQuery(GET_RECOMMENDED_PRODUCTS, {
      fetchPolicy: "cache-and-network",
      onCompleted() {
        setLoader(false);
      },
    });

  const [getBranches, { data: locations, loading }] = useLazyQuery(
    GET_BRANCH_LIST,
    {
      fetchPolicy: "cache-and-network",
      onCompleted() {
        setLoader(false);
      },
    }
  );

  const [filterBranches, { data: branches, loading: filtering }] =
    useLazyQuery(FILTER_BRANCHES);
  const [filterResult, { data: result, loading: filtering1 }] =
    useLazyQuery(FILTER_RESULT);
  const [getToken, { loading: getting }] = useMutation(CURRENT_TOKEN);

  const fetchToken = useCallback(async () => {
    const token = searchParams.get("token");
    const systemType =
      SystemTypeByPartner[searchParams.get("type") as keyof PartnerSystemType];

    if (token && systemType) setPartnerToken(token);
    else removePartnerType();

    const type = PartnerObjType[systemType]?.channel ?? "QM";

    await getToken({
      variables: {
        code: "",
        type,
        token,
        systemType,
      },
      onCompleted: (data) => {
        localStorage?.setItem("token", data?.getToken?.token);
      },
    });
  }, [getToken, searchParams]);

  const onChangeCategory = (item: string) => {
    if (item === category) {
      setCategory(null);
    } else {
      filterResult({ variables: { filters: [item] } });
      setCategory(item);
    }
  };

  const addFilter = (item: string) => {
    if (item !== null) {
      const filteredFilters = filters.filter((e) => e !== item);

      const items =
        filteredFilters.length > 0 ? [...filteredFilters, item] : [item];

      setFilter(items);
      filterBranches({ variables: { filters: items } });
    }
  };

  const removeFilter = (all: boolean, item: string | null) => {
    if (all) {
      setFilter([]);
      setCategory(null);
    } else {
      if (item !== null) {
        setFilter((prevFilter) => prevFilter.filter((f) => f !== item));
      }
    }
  };

  useEffect(() => {
    const fetchLocationAndData = (latitude, longitude) => {
      getBranches({ variables: { lat: latitude, lon: longitude } });
      getProducts({ variables: { lat: latitude, lon: longitude } });
    };

    const handleGeolocationSuccess = (position: {
      coords: { latitude; longitude };
    }) => {
      const { latitude, longitude } = position.coords;
      const now = new Date().getTime();
      setPosition({ lat: latitude, lon: longitude });
      localStorage?.setItem(
        "position",
        JSON.stringify({ latitude, longitude, timestamp: now })
      );
      fetchLocationAndData(latitude, longitude);
    };

    const handleGeolocationError = () => {
      localStorage?.setItem(
        "position",
        JSON.stringify({
          latitude: CENTER.lat,
          longitude: CENTER.long,
          timestamp: new Date().toISOString(),
        })
      );
      fetchLocationAndData(47.918822, 106.917561);
    };

    const processLocation = (location: string) => {
      const now = new Date().getTime();
      const storedPosition = JSON.parse(location);
      const { latitude, longitude, timestamp } = storedPosition;
      const oneDay = 24 * 60 * 60 * 1000;

      if (now - timestamp < oneDay) {
        setPosition({ lat: latitude, lon: longitude });
      } else {
        navigator.geolocation.getCurrentPosition(
          handleGeolocationSuccess,
          handleGeolocationError
        );
        return;
      }

      fetchLocationAndData(latitude, longitude);
    };

    const init = async () => {
      const token = localStorage.getItem("token");

      if (!token) await fetchToken();

      const location = localStorage.getItem("position");

      if (location) {
        processLocation(location);
      } else {
        navigator.geolocation.getCurrentPosition(
          handleGeolocationSuccess,
          handleGeolocationError
        );
      }
    };

    init();
  }, [fetchToken, getBranches, getProducts, setPosition]);

  return {
    removeFilter,
    filters,
    list: locations?.getBranchList,
    authenticate,
    router,
    valid,
    products: products?.getRecommendedProducts,
    categories: categories?.getMasterCategories,
    setPosition,
    getBranches,
    fetchToken,
    addFilter,
    onChangeCategory,
    filtering: filtering1 || filtering,
    category,
    filterBranches: branches?.filterBranches || null,
    result: result?.filterResult || null,
    loading: fetching || loading || getting || fetchingProducts || loader,
  };
};
