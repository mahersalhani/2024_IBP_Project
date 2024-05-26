import { useQuery } from '@tanstack/react-query';

import { ShopAuth } from '@/utils';
import { QueryKeys } from '@/types';

export const useCurrentUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.CurrentUser],
    queryFn: () => ShopAuth.currentUser(),
    retry: false,
  });

  return {
    error,
    isLoading,
    data: data?.data,
  };
};
