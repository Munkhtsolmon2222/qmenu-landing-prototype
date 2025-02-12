"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
function useUrlSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const getSearchParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );
  const setSearchParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`${params.toString()}`);
    },
    [searchParams, router]
  );

  return { getSearchParam, setSearchParam };
}

export default useUrlSearchParams;
