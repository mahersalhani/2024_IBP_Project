'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/context/auth-context';
import { Link } from '@/navigation';
import { LoginFormData, LoginFormSchema } from '@/schema';
import { Input } from '@/shared/input';
import { paths } from '@/constants';
import ButtonPrimary from '@/shared/button/ButtonPrimary';

const LoginForm = () => {
  const t = useTranslations('Auth.login');
  const loginErrorT = useTranslations('Auth.login.api_res');
  const [loginLoading, setLoginLoading] = useState(false);

  const searchParams = useSearchParams();
  const invalidProvider = searchParams.get('error');

  const { loginWithEmail } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setLoginLoading(true);

    const msg = await loginWithEmail(data.email, data.password);
    toast(loginErrorT(msg), {
      icon: msg === 'login_success' ? '👏' : '😢',
      position: 'top-right',
    });

    setLoginLoading(false);
  });

  return (
    <>
      <div className={`nc-PageLogin`} data-nc-id="PageLogin">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            {t('title')}
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            {/* FORM */}
            <form className="grid grid-cols-1 gap-6" onSubmit={onSubmit}>
              <label className="block">
                <Input
                  label={t('email')}
                  required
                  type="email"
                  placeholder="example@example.com"
                  className="mt-1"
                  error={errors.email}
                  errorMsg={errors.email?.message && loginErrorT(errors.email?.message as any)}
                  {...register('email')}
                />
              </label>

              <label className="block">
                <Input
                  label={t('password')}
                  required
                  placeholder="********"
                  type="password"
                  className="mt-1"
                  error={errors.password}
                  errorMsg={errors.password?.message && loginErrorT(errors.password?.message as any)}
                  {...register('password')}
                />

                <br />
                <Link href={paths.forgetPassword} className="text-sm text-primary-600">
                  {t('forget_password')}
                </Link>
              </label>
              <ButtonPrimary disabled={loginLoading} type="submit">
                {t('continue')}
              </ButtonPrimary>
            </form>

            {/* ==== */}
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              {t('new_user')} {` `}
              <Link className="text-primary-600" href="/signup">
                {t('create_account')}
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
