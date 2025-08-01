import { useState, useEffect } from "react";

interface PaginationParams {
  page: number;
  perPage: number;
  [key: string]: any;
}

type SetState<T> = (value: T | ((prevState: T) => T)) => void;

interface UsePaginationWithFetchOptions<TItem, TParams> {
  fetcher: (params: TParams & PaginationParams) => Promise<TItem[]>;
  initialParams?: TParams;
  perPageDefault?: number;
}

interface UsePaginationWithFetchReturn<TItem, TParams> {
  page: number;
  params: TParams;
  setParams: (newParams: Partial<TParams>) => void;
  next: () => void;
  prev: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}

export function usePaginationWithFetch<
  TItem,
  TParams extends Record<string, any> = {}
>(
  options: UsePaginationWithFetchOptions<TItem, TParams>,
  setExternalItems: SetState<TItem[]>
): UsePaginationWithFetchReturn<TItem, TParams> {
  const {
    fetcher,
    initialParams = {} as TParams,
    perPageDefault = 5,
  } = options;

  const [page, setPage] = useState<number>(1);
  const [params, setParams] = useState<TParams>(initialParams);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateParams = (newParams: Partial<TParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
    setPage(1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetcher({ ...params, page, perPage: perPageDefault })
      .then((data) => {
        setHasNextPage(data.length >= perPageDefault);
        setExternalItems(data);
      })
      .finally(() => setIsLoading(false));
  }, [fetcher, page, params, perPageDefault, setExternalItems]);

  const next = () => {
    if (hasNextPage) setPage((p) => p + 1);
  };

  const prev = () => setPage((p) => Math.max(1, p - 1));

  return {
    page,
    params,
    setParams: updateParams,
    next,
    prev,
    hasNextPage,
    isLoading,
  };
}
