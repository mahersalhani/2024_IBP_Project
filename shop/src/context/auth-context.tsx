'use client';

import type { ReactNode } from 'react';
import { ShopUserRes, RegisterDto } from '@shoppy/api-client';
import { createContext, useEffect, useReducer, useMemo, useContext, useCallback, useState, use } from 'react';
import { useCurrentUser, useLogin, useResendVerifyEmail, useSignup, useVerifyEmail } from '@/hooks/auth';

import en from '@/messages/en.json';
import { ShopAuth } from '@/utils';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: ShopUserRes | null;
  emailVerified: boolean;
  openAuthDialog: boolean;
}

type TLoginRes = keyof typeof en.Auth.login.api_res;
type TSignupRes = keyof typeof en.Auth.register.api_res;
type TVerifyEmailRes = keyof typeof en.Auth.verify_email.api_res;
type TResendVerifyEmailRes = keyof typeof en.Auth.resend_verify_email.api_res;

export interface AuthContextValue extends State {
  logout: () => Promise<void>;
  signUp: (data: RegisterDto) => Promise<TSignupRes>;
  verifyEmail: (code: string) => Promise<TVerifyEmailRes>;
  loginWithEmail: (email: string, password: string) => Promise<TLoginRes>;
  resendVerifyEmail: () => Promise<{ msg: TResendVerifyEmailRes; status: number }>;
  handleCloseAuthDialog: () => void;
  handleOpenAuthDialog: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

enum ActionType {
  SELECT_SHOP = 'SELECT_SHOP',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  AUTH_STATE_CHANGED = 'AUTH_STATE_CHANGED',
}

const initialState: State = {
  user: null,
  isInitialized: false,
  emailVerified: false,
  isAuthenticated: false,
  openAuthDialog: false,
};

const reducer = (state: State, action: any): State => {
  if (action.type === ActionType.AUTH_STATE_CHANGED) {
    const { isAuthenticated, user, emailVerified } = action.payload;

    return {
      ...state,

      user,
      emailVerified,
      isAuthenticated,
      isInitialized: true,
    };
  } else if (action.type === ActionType.SELECT_SHOP) {
    const { emailVerified } = action.payload;

    return {
      ...state,
      emailVerified,
    };
  }

  return state;
};

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  logout: () => Promise.resolve(),
  signUp: () => Promise.resolve('register_success'),
  loginWithEmail: () => Promise.resolve('login_success'),
  verifyEmail: () => Promise.resolve('verify_email_success'),
  resendVerifyEmail: () => Promise.resolve({ msg: 'resend_verify_email_success', status: 201 }),
  handleCloseAuthDialog: () => {},
  handleOpenAuthDialog: () => {},
});

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const { data: userData, error, isLoading } = useCurrentUser();

  const { login } = useLogin();
  const { signup } = useSignup();
  const { verifyEmail } = useVerifyEmail();
  const { resendVerifyEmail } = useResendVerifyEmail();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  const handleOpenAuthDialog = () => !state.isAuthenticated && setOpenAuthDialog(true);
  const handleCloseAuthDialog = () => setOpenAuthDialog(false);

  useEffect(() => {
    if (isLoading) return;

    if (userData) {
      dispatch({
        type: ActionType.AUTH_STATE_CHANGED,
        payload: {
          isInitialized: true,
          isAuthenticated: true,
          emailVerified: userData?.emailVerified,
          user: {
            id: userData?.uid,
            profileImage: userData.profileImage || undefined,
            email: userData?.email || undefined,
            phone: userData?.phone || undefined,
            displayName: userData?.displayName,
            accountType: userData.accountType,
          },
        },
      });
    } else {
      dispatch({
        type: ActionType.AUTH_STATE_CHANGED,
        payload: {
          isInitialized: true,
          isAuthenticated: false,
          emailVerified: false,
          user: null,
        },
      });
    }
  }, [userData, error, isLoading]);

  useEffect(() => {
    if (state.isAuthenticated) handleCloseAuthDialog();
  }, [state.isAuthenticated]);

  const logout = async (): Promise<void> => {
    await ShopAuth.logout();

    dispatch({
      type: ActionType.AUTH_STATE_CHANGED,
      payload: {
        isAuthenticated: false,
        emailVerified: false,
        user: null,
      },
    });
  };

  const loginWithEmail = useCallback(
    async (email: string, password: string): Promise<TLoginRes> => {
      try {
        const res = await login({ email, password });

        if (res.status === 200) {
          const user = res.data?.user;

          dispatch({
            type: ActionType.AUTH_STATE_CHANGED,
            payload: {
              isAuthenticated: true,
              emailVerified: user?.emailVerified,
              user: {
                id: user?.uid,
                profileImage: user.profileImage,
                email: user?.email || undefined,
                phone: user?.phone || undefined,
                displayName: user.displayName,
                accountType: user.accountType,
              },
            },
          });

          return 'login_success';
        } else if (res.status === 401) return 'wrong_credential';

        return 'login_fail';
      } catch (error) {
        return 'login_fail';
      }
    },
    [login]
  );

  const signUp = useCallback(
    async (data: RegisterDto): Promise<TSignupRes> => {
      try {
        const res: any = await signup(data);

        if (res.status === 201) {
          const user = res.data;

          dispatch({
            type: ActionType.AUTH_STATE_CHANGED,
            payload: {
              isAuthenticated: true,
              emailVerified: user?.emailVerified,
              user: {
                id: user?.uid,
                profileImage: user.profileImage || undefined,
                email: user?.email || undefined,
                username: `${user?.username}`,
                phone: user?.phone || undefined,
                placeholder: user.placeholder,
                displayName: user.displayName,
              },
            },
          });

          return 'register_success';
        } else if (res.status === 400) {
          if (res.data?.message === 'USERNAME_EXISTS') {
            return 'username_taken';
          } else if (res.data?.message === 'EMAIL_EXISTS') {
            return 'email_taken';
          }
        }

        return 'register_fail';
      } catch (error) {
        return 'register_fail';
      }
    },
    [signup]
  );

  const _verifyEmail = useCallback(
    async (code: string): Promise<TVerifyEmailRes> => {
      const res = await verifyEmail({ code });

      if (res.status === 200) {
        dispatch({
          type: ActionType.SELECT_SHOP,
          payload: { emailVerified: true },
        });

        return 'verify_email_success';
      } else if (res.status === 400) {
        if (res.data?.message === 'INVALID_CODE') {
          return 'invalid_code';
        } else if (res.data?.message === 'CODE_EXPIRED') {
          return 'code_expired';
        }
      }

      return 'verify_email_fail';
    },
    [verifyEmail]
  );

  const _resendVerifyEmail = useCallback(async (): Promise<{ msg: TResendVerifyEmailRes; status: number }> => {
    try {
      const res = await resendVerifyEmail();

      if (res.status === 200)
        return {
          msg: 'resend_verify_email_success',
          status: 201,
        };
      else if (res.status === 429)
        return {
          msg: 'too_many_requests',
          status: 429,
        };

      return {
        msg: 'resend_verify_email_fail',
        status: 500,
      };
    } catch (error) {
      return { msg: 'resend_verify_email_fail', status: 400 };
    }
  }, [resendVerifyEmail]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      openAuthDialog,
      logout,
      signUp,
      verifyEmail: _verifyEmail,
      loginWithEmail,
      resendVerifyEmail: _resendVerifyEmail,
      handleCloseAuthDialog,
      handleOpenAuthDialog,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_resendVerifyEmail, _verifyEmail, loginWithEmail, openAuthDialog, signUp, state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
};
