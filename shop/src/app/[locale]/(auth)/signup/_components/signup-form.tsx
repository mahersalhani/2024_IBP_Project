'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormData, SignupFormSchema } from '@/schema';

import toast from 'react-hot-toast';

import { useAuth } from '@/context/auth-context';
import { Input } from '@/shared/input';
import ButtonPrimary from '@/shared/button/ButtonPrimary';

const SignUpForm = () => {
  const t = useTranslations('Auth.register');
  const scopedResT = useTranslations('Auth.register.api_res');

  const { signUp } = useAuth();

  const [signupLoading, setSignupLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const [send, setSend] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setSignupLoading(true);

    const msg = await signUp({
      email: data.email,
      password: data.password,
      firstName: data.firstName as string,
      lastName: data.lastName as string,
    });

    toast(scopedResT(msg), {
      icon: msg === 'register_success' ? '👏' : '😢',
      position: 'top-right',
    });

    setSignupLoading(false);
  };

  return (
    <div data-nc-id="PageSignUp" className="dark:bg-neutral-900 py-24 lg:py-32">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          {t('title')}
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                label={t('first_name')}
                id="username"
                type="text"
                placeholder={t('first_name')}
                className="mt-1"
                error={errors.firstName}
                errorMsg={errors.firstName?.message && scopedResT(errors?.firstName?.message as any)}
                {...register('firstName')}
              />
              <Input
                label={t('last_name')}
                id="username"
                type="text"
                placeholder={t('last_name')}
                className="mt-1"
                error={errors.lastName}
                errorMsg={errors.lastName?.message && scopedResT(errors?.lastName?.message as any)}
                {...register('lastName')}
              />
            </div>

            <div className="block">
              <Input
                label={t('email')}
                id="email"
                required
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                error={errors.email}
                errorMsg={errors.email?.message && scopedResT(errors.email?.message as any)}
                {...register('email')}
              />
            </div>

            <div className="block">
              <Input
                label={t('password')}
                required
                id="password"
                type="password"
                placeholder="********"
                className="mt-1"
                error={errors.password}
                errorMsg={errors.password?.message && scopedResT(errors.password?.message as any)}
                {...register('password')}
              />
            </div>

            <ButtonPrimary loading={signupLoading} type="submit">
              {t('continue')}
            </ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            {t('have_account')}{' '}
            <Link className="text-primary-600" href="/login">
              {t('login')}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
