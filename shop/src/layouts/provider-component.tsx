'use client';
import React, { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/utils';
import { AuthProvider } from '@/context/auth-context';
import CommonClient from '@/components/common-client';

interface IProps {
  children?: ReactNode;
}

const ProviderComponent = ({ children }: IProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      <AuthProvider>
        {children}

        <CommonClient />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ProviderComponent;
