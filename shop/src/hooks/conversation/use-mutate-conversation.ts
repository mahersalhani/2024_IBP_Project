import { useMutation } from '@tanstack/react-query';
import { MessageDto, ProductDto } from '@shoppy/api-client';

import { Conversation } from '@/utils';

export const useCreateMessage = () => {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: (product: MessageDto) => Conversation.createMessage(product),
  });

  return {
    createMessageMutate: mutateAsync,
    createMessageError: error,
    createMessageLoading: isPending,
  };
};

export const useCreateMessageAdmin = () => {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: (product: MessageDto) => Conversation.createMessageAdmin(product),
  });

  return {
    createMessageAdminMutate: mutateAsync,
    createMessageAdminError: error,
    createMessageAdminLoading: isPending,
  };
};
