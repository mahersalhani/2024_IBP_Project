'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { Loader } from '@/components/loader';
import { params, paths } from '@/constants';
import { useAuth } from '@/context/auth-context';
import useRedirect from '@/hooks/use-redirect';
import { useRouter } from '@/navigation';

interface GuestGuardProps {
  children: ReactNode;
}

export const GuestGuard = (props: GuestGuardProps) => {
  const { children } = props;

  const router = useRouter();
  const { isAuthenticated, isInitialized, emailVerified } = useAuth();
  const [checked, setChecked] = useState<boolean>(false);
  const redirect = useRedirect();

  const check = useCallback(() => {
    if (!isInitialized) return;

    if (isAuthenticated) {
      if (!emailVerified) router.replace(paths.verifyEmail + params.redirect.query(redirect || paths.index));
      else router.replace(redirect || paths.index);
    } else setChecked(true);
  }, [isInitialized, isAuthenticated, emailVerified, router, redirect]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) return <Loader />;

  return <>{children}</>;
};
