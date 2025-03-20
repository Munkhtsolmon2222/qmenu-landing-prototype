'use client';

import { GET_PAYLOAD } from '@/actions';
import { useAction } from './useAction';

export const usePayload = (lazy?: boolean) => {
  const { action: getPayload, data, loading } = useAction(GET_PAYLOAD, { lazy });
  return { payload: data, getPayload, loading };
};
