import { useMutation } from '@tanstack/react-query';
import { DeleteImageDto } from '@shoppy/api-client';

import { Image } from '@/utils';

interface IUseUploadImageProps {
  file: File;
  width?: number;
  height?: number;
  path?: string;
  quality?: number;
}

export const useUploadImage = (path: string) => {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: ({ file, width, height }: IUseUploadImageProps) => Image.uploadImage(path, file, width, height),
  });

  return {
    uploadImage: mutateAsync,
    uploadImageIsLoading: isPending,
    uploadImageError: error,
  };
};

export const useUploadImageNew = () => {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: ({ file, width, height, path, quality }: IUseUploadImageProps) =>
      Image.uploadImage(path || '', file, width, height, quality),
  });

  return {
    uploadImage: mutateAsync,
    uploadImageIsLoading: isPending,
    uploadImageError: error,
  };
};

export const useDeleteImage = () => {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: (requestData: DeleteImageDto) => Image.deleteImage(requestData),
  });

  return {
    deleteImage: mutateAsync,
    deleteImageIsLoading: isPending,
    deleteImageError: error,
  };
};
