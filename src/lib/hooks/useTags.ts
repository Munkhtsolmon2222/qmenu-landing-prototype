'use client';
import { TagType } from '../types';
import { useAction } from './useAction';
import { GET_TAGS_BY_TYPE } from '@/actions';

export const useTag = (type: TagType) => {
  const { data: tags = [], loading } = useAction(GET_TAGS_BY_TYPE, type, { lazy: !type });

  return {
    tags,
    loading,
  };
};
