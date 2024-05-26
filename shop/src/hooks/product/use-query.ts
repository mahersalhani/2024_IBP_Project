import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { Shop } from '@/utils';
import { QueryKeys } from '@/types';
import { ProductDto, ProductsRes } from '@shoppy/api-client';

export interface IQueryProducts {
  page: number;
  limit: number;
  search?: string;
}
export const useGetProducts = (props: IQueryProducts) => {
  const { limit, page, search } = props;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.Products, props],
    queryFn: async () => Shop.getProducts(page, limit, search),
  });

  return { data: data?.data, isLoading, isError };
};

export interface DesignsSearch {
  sort: string;
  limit: number;
  search?: string;
  order: 'ASC' | 'DESC';
  colors?: string[];
  sizes?: string[];
}

interface DesignsPage {
  results: ProductDto[];
  next?: number;
}
export const useInfiniteGetDesigns = (props: DesignsSearch) => {
  const { limit, search, sort, order } = props;

  async function getData({ pageParam = 1 }) {
    const res = await Shop.getProducts(pageParam, limit, search, true);

    const data: DesignsPage = {
      results: res.data.products,
      next: res.data.total > pageParam * limit ? pageParam + 1 : undefined,
    };

    return data;
  }

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    DesignsPage,
    Error
  >({
    queryKey: [QueryKeys.Product, props.sort, props.order, props.colors, props.search, props.sizes],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    queryFn: async ({ pageParam = 1 }: any) => getData({ pageParam }), // TODO fix type
  });

  return { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage };
};
