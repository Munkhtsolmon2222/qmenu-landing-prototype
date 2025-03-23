import { Suspense } from 'react';
import {
  ActionResponseType,
  EsQueryInput,
  EsQueryInputWithParams,
  EsTagType,
  ParamFilter,
  ParamFilterItem,
  ParamFilterObjType,
  ParamFilterType,
  ParamsTagType,
  Payload,
  Tag,
} from './types';
import { jwtDecode } from 'jwt-decode';
import { TFunction } from 'i18next';
import { CUSTOMER, ParamFilters } from './constant';
import { toast } from 'sonner';
import { omit } from 'lodash';

export const withSuspense = <T extends React.ComponentType<any>>(
  Component: T,
  loader?: React.ReactNode,
): React.FC<React.ComponentProps<T>> => {
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={loader}>
      <Component {...props} />
    </Suspense>
  );
};

export function validUserToken(token?: string) {
  if (!token) return false;
  const payload: Payload = jwtDecode(token);
  return payload.role === CUSTOMER;
}

export function isValidToken(token?: string) {
  if (!token) return false;
  try {
    const { exp }: Payload = jwtDecode(token);
    if (exp * 1000 < new Date().getTime()) return false;
    return true;
  } catch (e) {
    return false;
  }
}

type SelectResult = Omit<ParamFilterType, 'items'> & { items: ParamFilterItem[] };

export const selectFilters = (
  items: (
    | {
        key: ParamFilter;
        tags?: Tag[];
        render?: () => ParamFilterItem[];
      }
    | ParamFilter
  )[],
  t?: TFunction,
  searchParams?: URLSearchParams,
): SelectResult[] => {
  const result = ParamFilters.reduce((res: SelectResult[], curr) => {
    const item = items.find((i) => (typeof i === 'string' ? i === curr.key : i.key === curr.key));
    if (!item) return res;

    const resItem: SelectResult = { ...curr, items: curr.items ?? [] };

    if (t) {
      if (resItem.name) resItem.name = t(resItem.name);
      if (resItem.placeholder) resItem.placeholder = t(resItem.placeholder);
    }

    if (typeof item !== 'string') {
      if (item.render) resItem.items = item.render();

      if (item.tags) resItem.items = item.tags.map((tag) => ({ name: tag.name, value: tag.name }));
    }

    resItem.items = resItem.items.map((item) => {
      if (searchParams) {
        const values = searchParams.getAll(resItem.key);
        if (values.includes(item.value)) item.active = true;
        else item.active = false;
      }
      if (t && typeof item.name === 'string') item.name = t(item.name);
      return item;
    });

    res = [...res, resItem];
    return res;
  }, []);

  return result.sort(
    (a, b) =>
      items.findIndex((i) => (typeof i === 'string' ? i === a.key : i.key === a.key)) -
      items.findIndex((i) => (typeof i === 'string' ? i === b.key : i.key === b.key)),
  );
};

export const getSearchParams = (searchParams: URLSearchParams) => {
  const params = new URLSearchParams(searchParams);

  return ParamFilters.reduce((res, filter) => {
    const values = params.getAll(filter.key);
    if (values.length) res[filter.key] = values;
    return res;
  }, {} as Record<ParamFilter, string[]>);
};

export const updateParams = (searchParams: URLSearchParams, key: ParamFilter, value: string) => {
  const params = new URLSearchParams(searchParams);

  if (key === ParamFilter.CATEGORY) params.delete(ParamFilter.TYPE);
  if (key === ParamFilter.TYPE) params.delete(ParamFilter.CATEGORY);
  if (key === ParamFilter.DISCOUNT) {
    Object.entries(ParamFilter).map(([key]) => {
      if (key !== ParamFilter.DISCOUNT) params.delete(key);
    });
  } else params.delete(ParamFilter.DISCOUNT);

  ParamFilters.forEach((filter) => {
    if (filter.key === key) {
      const values = params.getAll(filter.key);

      if (values.includes(value)) {
        params.delete(filter.key);
        values.forEach((val) => val !== value && params.append(filter.key, val));
      } else {
        if (!value) {
          params.delete(filter.key);
        } else {
          if (filter.single) params.set(filter.key, value);
          else params.append(filter.key, value);
        }
      }
    }
  });

  return params;
};

export const hookFormSubmit =
  <TData, TResult extends ActionResponseType<any>>(options: {
    action: (data: TData) => Promise<TResult | undefined>;
    trigger?: () => Promise<boolean>;
    getValues?: () => TData;
    onFinish?: (result: TResult | undefined) => void;
  }) =>
  async (e: FormData) => {
    const { action, trigger, getValues, onFinish } = options;

    const valid = trigger ? await trigger() : true;
    if (!valid) return;

    const data = getValues ? getValues() : (e as unknown as TData);

    const result = await action(data);
    onFinish?.(result);
  };

export function objectToFormData(
  data: Record<string, any>,
  parentKey: string = '',
  formData: FormData = new FormData(),
): FormData {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof File || value instanceof Blob) {
        formData.append(fullKey, value);
      } else if (Array.isArray(value)) {
        value.forEach((v, index) => {
          objectToFormData({ [`${index}`]: v }, fullKey, formData);
        });
      } else if (typeof value === 'object' && value !== null) {
        objectToFormData(value, fullKey, formData);
      } else {
        formData.append(fullKey, value === null ? '' : value.toString());
      }
    });
  } else if (parentKey) {
    formData.append(parentKey, data === null ? '' : data.toString());
  }

  return formData;
}

export const showToast = (...params: Parameters<typeof toast>) => {
  const options = params[1] ?? {};
  const message = params[0] ?? '';

  return toast(message, { position: 'top-right', ...options });
};

export const getEsInput = (input: EsQueryInputWithParams = {}): EsQueryInput => {
  const params = input.params;

  if (params && Object.keys(params).length) {
    let keywords: string[] = [];
    let tags: EsTagType[] = [];

    Object.entries(params).forEach(([key, values]) => {
      if (!values) return;
      if (!Array.isArray(values)) values = [values];

      const type = ParamsTagType[key];

      if (!type) {
        keywords = keywords.concat(values);
        return;
      }

      values.forEach((value: string) => tags.push({ type, value }));
    });

    input = { ...input, keywords, tags };
  }

  return omit(input, 'params');
};
