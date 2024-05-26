import { useQuery } from '@tanstack/react-query';

import { Shop } from '@/utils';
import { QueryKeys } from '@/types';

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

// export const useGetCollege = (id: string) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: [QueryKeys.College, { id }],
//     queryFn: async () => Shop.getCollege(id),
//   });

//   return { college: data?.data, isLoading, isError };
// };
