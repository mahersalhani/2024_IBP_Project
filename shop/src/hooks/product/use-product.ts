import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCreateProduct } from './use-mutate';
import { useUploadImageNew } from '../images';
import { ProductFormData } from '@/schema';
import { useRouter } from '@/navigation';
import { paths } from '@/constants';

export const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const { createProductMutate } = useCreateProduct();
  const { uploadImage } = useUploadImageNew();

  const router = useRouter();

  const createProduct = async (data: ProductFormData) => {
    try {
      setLoading(true);
      const { coverImage, description, name, price, quantity, slug, isPublished } = data;

      const res = await uploadImage(coverImage);

      if (!res) {
        toast.error('Failed to upload image');
        return;
      }

      const product = {
        coverImage: res.data.key,
        description,
        name,
        price,
        quantity,
        slug,
        isPublished: isPublished as boolean,
      };

      await createProductMutate(product);
      toast.success('Product created successfully');

      router.push(paths.products.index);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createProduct,
  };
};
