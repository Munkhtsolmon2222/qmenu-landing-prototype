"use client";
import { GET_TAGS_BY_TYPE } from "@/graphql/query";
import { TagType, Tag } from "@/lib/config/constant";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const useTag = (type: TagType) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const { data, loading } = useQuery(GET_TAGS_BY_TYPE, {
    variables: { type },
    skip: !type,
  });

  useEffect(() => {
    if (data?.getTagsByType) {
      setTags(data.getTagsByType);
    }
  }, [data]);

  return {
    tags,
    loading,
  };
};
