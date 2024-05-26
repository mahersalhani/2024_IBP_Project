import { useQuery } from '@tanstack/react-query';

import { Admin } from '@/utils';
import { QueryKeys } from '@/types';
import { QueryOrder, UserRole } from '@shoppy/api-client';

export interface IQueryUsers {
  page: number;
  limit: number;
  search?: string;
  role?: UserRole;
  isBlocked?: boolean;
  sort?: string;
  order?: QueryOrder;
}
export const useGetUsers = (props: IQueryUsers) => {
  const { limit, page, search, isBlocked, order, role, sort } = props;

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.Users, props],
    queryFn: async () => Admin.getUsers(page, limit, search, role, isBlocked, sort, order),
  });

  return { data: data?.data, isLoading, isError };
};
