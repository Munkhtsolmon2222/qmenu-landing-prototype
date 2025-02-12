"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { BranchDetail } from "../types";
import { useLazyQuery } from "@apollo/client";
import { FILTER_BRANCHES, FILTER_RESULT } from "@/graphql/query";
import { CENTER } from "../config/constant";
import { PAGE_EVENT } from "../config/page";
export const branchListLimit = 40;

const skipRoutes: string[] = [PAGE_EVENT];

export type FilterKey =
  | "star"
  | "type"
  | "food"
  | "branch"
  | "categories"
  | string;

interface Location {
  lat?: number;
  lon?: number;
  distance?: string;
}

interface FilterParams extends Location {
  limit?: number;
  replace?: boolean;
}

interface FilterContextType {
  branches: BranchDetail[];
  filters: string[] | null;
  activeFilters: string[] | null;
  addFilter: (
    key: FilterKey,
    value: string | null,
    limit?: number,
    location?: Location,
    categories?: string
  ) => void;
  removeFilter: (key: FilterKey, location?: Location) => void;
  loading: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
  getActiveFilters: (value: "all" | "filters") => React.ReactNode;
  applyFilters: (e?: FilterParams) => void;
  hasMore: boolean;
}

const FilterContext = createContext<FilterContextType>({} as FilterContextType);

export const useFilterContext = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState<string[] | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[] | null>(null);
  const [state, setState] = useState<BranchDetail[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const position = JSON.parse(
    localStorage?.getItem("position") ??
      `{"latitude":${CENTER.lat},"longitude":${CENTER.long},"timestamp":1725855945238}`
  );
  console.log(setFiltered, setActiveFilters, state);
  const [
    filterResult,
    {
      loading: loadResult,
      data: { filterResult: results } = { filterResult: { branches: [] } },
    },
  ] = useLazyQuery<{
    filterResult: { branches: BranchDetail[] };
  }>(FILTER_RESULT, {
    fetchPolicy: "cache-and-network",
  });
  console.log(loadResult);
  const [
    filterBranches,
    { loading, data: { filterBranches: branche } = { filterBranches: [] } },
  ] = useLazyQuery<{
    filterBranches: BranchDetail[];
  }>(FILTER_BRANCHES, {
    fetchPolicy: "cache-and-network",
  });

  const getSearchParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      star: params.get("star"),
      type: params.get("type"),
      food: params.get("food"),
      branch: params.get("branch"),
      filters: params.get("filters")?.split(",").filter(Boolean) ?? null,
      categories: params.get("categories")?.split(",").filter(Boolean) ?? null,
    };
  };

  const setSearchParams = (
    newParams: Partial<ReturnType<typeof getSearchParams>>,
    replace: boolean = false
  ) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value);
      }
    });

    if (replace) {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
      );
    } else {
      window.history.pushState({}, "", `${window.location.pathname}?${params}`);
    }
  };

  const addFilter = (
    key: string,
    value: string | null,
    limit?: number,
    location?: Location
  ) => {
    if (key === "branch") {
      setSearchParams({ categories: null }, true);
    }
    if (key === "categories") {
      setSearchParams({ branch: null }, true);
    }
    if (["star", "type", "food", "branch"].includes(key)) {
      setSearchParams({ [key]: value });
    }
    // else if (key === "categories") {
    //   setSearchParams({ categories: value }, true);
    // }
    else if (value !== null) {
      const currentParams = getSearchParams();
      const newFilters = [
        ...new Set([...(currentParams.categories || []), value]),
      ];
      setSearchParams({ categories: newFilters }, true);
    }
    applyFilters({ replace: true, limit, ...(location ?? {}) });
  };

  const removeFilter = (key: string, location?: Location) => {
    if (key === "all") {
      setSearchParams({
        star: null,
        type: null,
        food: null,
        branch: null,
        filters: null,
        categories: null,
      });
    } else if (
      ["star", "type", "food", "branch", "filters", "categories"].includes(key)
    ) {
      setSearchParams({ [key]: null });
    } else {
      const currentParams = getSearchParams();
      const newFilters =
        currentParams.categories?.filter((f) => f !== key) ?? [];
      setSearchParams(
        { categories: newFilters.length > 0 ? newFilters : null },
        true
      );
    }

    applyFilters({ replace: true, ...(location ?? {}) });
  };

  const applyFilters = useCallback(
    (options?: {
      replace?: boolean;
      limit?: number;
      lat?: number;
      lon?: number;
      distance?: string;
    }) => {
      const {
        replace = false,
        limit = branchListLimit,
        lat,
        lon,
        distance,
      } = options ?? {};

      const { star, type, food, branch, filters, categories } =
        getSearchParams();
      const allFilters = [
        ...(star ? [`${star}`] : []),
        ...(type ? [`${type}`] : []),
        ...(food ? [`${food}`] : []),
        ...(branch ? [`${branch}`] : []),
        ...(filters || []),
        ...(categories || []),
      ];

      if (categories) {
        filterResult({
          variables: {
            filters: allFilters,
            lat: lat ?? position.latitude ?? CENTER.lat,
            lon: lon ?? position.longitude ?? CENTER.long,
            limit: limit ?? branchListLimit,
            offset: replace ? 0 : offset ?? 0,
            distance,
          },
          onCompleted({ filterResult: data }) {
            setState((e) =>
              replace ? data.branches : e.concat(data.branches)
            );
            setOffset((e) => (replace ? limit : e + limit));
            setHasMore(data.branches.length >= limit);
          },
        });
      } else {
        filterBranches({
          variables: {
            filters: allFilters,
            lat: lat ?? position.latitude ?? CENTER.lat,
            lon: lon ?? position.longitude ?? CENTER.long,
            limit: limit ?? branchListLimit,
            offset: replace ? 0 : offset ?? 0,
            distance,
          },
          onCompleted({ filterBranches: data }) {
            setState((e) => (replace ? data : e.concat(data)));
            setOffset((e) => (replace ? limit : e + limit));
            setHasMore(data.length >= limit);
          },
        });
      }
    },
    [
      position.latitude,
      position.longitude,
      offset,
      filterBranches,
      filterResult,
    ]
  );
  useEffect(() => {
    if (!skipRoutes.includes(window.location.pathname))
      applyFilters({ replace: true });
  }, [applyFilters]);

  const getActiveFilters = (f: "all" | "filters") => {
    const { categories, star, type, food, branch, filters } = getSearchParams();
    if (f === "all") {
      return [star, type, food, branch, categories, ...(filters || [])];
    }
    return filters;
  };

  return (
    <FilterContext.Provider
      value={{
        branches: !getSearchParams().categories ? branche : results.branches,
        filters: filtered,
        activeFilters: activeFilters,
        removeFilter,
        addFilter,
        loading,
        open,
        setOpen,
        getActiveFilters,
        applyFilters,
        hasMore,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
