'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useAuth } from '@/context/auth-context';
import { usePathname, useRouter } from '@/navigation';
import { params, paths } from '@/constants';
import useRedirect from '@/hooks/use-redirect';
import { Loader } from '@/components/loader';

interface AuthGuardProps {
  mostBeVerified?: boolean;
  children: ReactNode;
  isSeller?: boolean;
  callback?: () => void;
  isCustomer?: boolean;
}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children, mostBeVerified = true, callback, isSeller = false, isCustomer = false } = props;

  const router = useRouter();
  const pathname = usePathname();
  const redirect = useRedirect();
  const { isAuthenticated, isInitialized, emailVerified, user } = useAuth();
  const [checked, setChecked] = useState<boolean>(false);

  const check = useCallback(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      callback?.();
      return router.replace(paths.login + params.redirect.query(redirect || pathname));
    } else {
      if (mostBeVerified && !emailVerified) {
        callback?.();
        return router.replace(paths.verifyEmail + params.redirect.query(redirect || pathname));
      } else if (!mostBeVerified && emailVerified) {
        callback?.();
        return router.replace(redirect || paths.index);
      } else {
        if (isSeller) {
          if (user?.accountType === 'customer') return router.replace(paths.index);
          else setChecked(true);
        } else if (isCustomer) {
          if (user?.accountType === 'admin') return router.replace(paths.index);
          else setChecked(true);
        } else {
          setChecked(true);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isAuthenticated, router, redirect, pathname, mostBeVerified, emailVerified, user, isSeller]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) return <Loader />;

  return <>{children}</>;
};
