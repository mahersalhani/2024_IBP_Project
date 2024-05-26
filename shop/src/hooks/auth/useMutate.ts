import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginDto, RegisterDto, VerifyEmailDto } from '@shoppy/api-client';

import { ShopAuth, ShopUser } from '@/utils';
import { QueryKeys } from '@/types';

export const useLogin = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: LoginDto) => ShopAuth.login(data, { validateStatus: (res) => res < 500 }),
    retry: false,
  });

  return { login: mutateAsync, isLoading: isPending, error };
};

export const useSignup = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: RegisterDto) => ShopAuth.register(data, { validateStatus: (res) => res < 500 }),
    retry: false,
  });

  return { signup: mutateAsync, isLoading: isPending, error };
};

export const useVerifyEmail = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: VerifyEmailDto) => ShopAuth.verifyEmail(data, { validateStatus: (res) => res < 500 }),
    retry: false,
  });

  return { verifyEmail: mutateAsync, isLoading: isPending, error };
};

export const useResendVerifyEmail = () => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => ShopAuth.resendVerificationEmail({ validateStatus: (res) => res < 500 }),
    retry: false,
  });

  return { resendVerifyEmail: mutateAsync, isLoading: isPending, error };
};

interface IUpdateProfile {
  username?: string;
  phone?: string;
  avatar?: File;
}
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (data: IUpdateProfile) => ShopUser.updateProfile(data.username, data.phone, data.avatar),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CurrentUser] });
    },
  });

  return { updateProfile: mutateAsync, updateProfileLoading: isPending, error };
};
