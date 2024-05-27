import { useQuery } from '@tanstack/react-query';

import { Conversation } from '@/utils';
import { QueryKeys } from '@/types';
import { ProductDto } from '@shoppy/api-client';
import { useAuth } from '@/context/auth-context';

export const useGetConversation = () => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.Products],
    queryFn: async () => Conversation.getConversation(),
    enabled: isAuthenticated,
  });

  return { data: data?.data, isLoading, isError };
};

export const useGetConversations = () => {
  const { isAuthenticated, user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.Conversations],
    queryFn: async () => Conversation.getConversations(),
    enabled: isAuthenticated && user?.accountType === 'admin',
  });

  return { data: data?.data, isLoading, isError };
};

export const useGetConversationById = (id: number) => {
  const { isAuthenticated } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QueryKeys.Conversations, id],
    queryFn: async () => Conversation.getConversationAdmin(id),
    enabled: !!id && isAuthenticated,
  });

  return { data: data?.data, isLoading, isError };
};
