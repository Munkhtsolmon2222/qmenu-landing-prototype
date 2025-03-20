'use client';
import { useCallback, useEffect, useState } from 'react';
import { QueryError } from '../types';

export interface ActionOptions<ResultData> {
  onSuccess?: (data: ResultData | undefined) => void;
  onError?: (error: QueryError) => void;
  onFinally?: () => void;
}

type ActionFunction<T> = T extends (...args: any) => any ? T : never;

interface Options<ResultData> extends ActionOptions<ResultData> {
  lazy?: boolean;
  initialLoading?: boolean;
}

type Params<T> = Parameters<ActionFunction<T>>;

type ActionParams<Action, ResultData> =
  | [Options<ResultData>]
  | Params<Action>
  | [...Params<Action>, Options<ResultData>];

type TriggerOptions<ResultData> = Omit<Options<ResultData>, 'lazy'>;

export type TriggerAction<Action, ResultData> = (
  ...args:
    | [TriggerOptions<ResultData>]
    | Params<Action>
    | [...Params<Action>, TriggerOptions<ResultData>]
) => Promise<ResultData | undefined>;

export const useAction = <
  Action extends (...args: any[]) => Promise<{ data?: any; error?: QueryError }>,
  ResultData = Awaited<ReturnType<Action>>['data'],
  Result extends { data?: ResultData; error?: QueryError } = {
    data?: ResultData;
    error?: QueryError;
  },
>(
  action: Action,
  ...params: ActionParams<Action, ResultData>
): {
  action: TriggerAction<Action, ResultData>;
  data: ResultData | undefined;
  loading: boolean;
  setData: React.Dispatch<React.SetStateAction<ResultData | undefined>>;
} => {
  const { lazy, ...options } = (params[params.length - 1] as Options<ResultData>) ?? {};

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResultData | undefined>();

  const handleError = useCallback(
    ({ error }: Result, onError?: ActionOptions<ResultData>['onError']) => {
      const returnError = error ?? { message: 'Failed' };
      onError ? onError(returnError) : options.onError?.(returnError);
    },
    [options.onError],
  );

  const triggerAction: TriggerAction<Action, ResultData> = useCallback(
    async (...args) => {
      let responseData: ResultData | undefined;

      const { onError, onFinally, onSuccess } = (args?.[args.length - 1] ??
        {}) as Options<ResultData>;

      if (
        typeof onError === 'function' ||
        typeof onFinally === 'function' ||
        typeof onSuccess === 'function'
      )
        args = args.slice(0, -1) as Params<Action>;

      try {
        setLoading(true);

        const response = await action(...args);

        if (response.error) {
          handleError(response as Result, onError);
          return;
        }

        setData(response.data);

        onSuccess ? onSuccess(response.data) : options.onSuccess?.(response.data);

        responseData = response.data;
      } catch (error) {
        console.log('Query error: ', error);
      } finally {
        setLoading(false);

        onFinally ? onFinally() : options.onFinally?.();
      }

      return responseData;
    },
    [action, handleError, options.onSuccess, options.onFinally],
  );

  useEffect(() => {
    if (!lazy) triggerAction(...params);
  }, [lazy]);

  return { action: triggerAction, data, setData, loading };
};
