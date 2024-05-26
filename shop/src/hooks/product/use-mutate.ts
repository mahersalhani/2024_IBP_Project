import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductDto } from '@shoppy/api-client';

import { Admin } from '@/utils';
import { QueryKeys } from '@/types';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: (product: ProductDto) => Admin.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Products] });
    },
  });

  return {
    createProductMutate: mutateAsync,
    createProductIsLoading: isPending,
    createProductError: error,
  };
};

// export const useUpdateProduct = (slug: string) => {
//   const { mutateAsync, error, isPending } = useMutation({
//     mutationFn: (product: ProductDto) => Admin.updateProduct(slug, product),
//   });

//   return {
//     updateProduct: mutateAsync,
//     updateProductIsLoading: isPending,
//     updateProductError: error,
//   };
// };
