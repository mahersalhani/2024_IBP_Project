'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import toast from 'react-hot-toast';
import { useAuth } from '@/context/auth-context';
import { maskEmail } from '@/utils/helpers';

import { OTPForm } from '@/components/OtpForm';
import { FitLoader } from '@/components/FitLoader';

const PageSignUp = () => {
  const t = useTranslations('Auth.verify_email');
  const scopedResend = useTranslations('Auth.resend_verify_email.api_res');
  const scopedVerify = useTranslations('Auth.verify_email.api_res');

  const [verifyEmailLoading, setVerifyEmailLoading] = useState<boolean>(false);
  const [resendVerifyEmailLoading, setResendVerifyEmailLoading] = useState<boolean>(false);

  const { user, verifyEmail, resendVerifyEmail } = useAuth();

  const handleCompleted = async (code: string) => {
    setVerifyEmailLoading(true);
    const msg = await verifyEmail(code);

    toast(scopedVerify(msg), {
      icon: msg === 'verify_email_success' ? '👏' : msg === 'code_expired' ? '⏰' : '😢',
      position: 'top-right',
    });

    setVerifyEmailLoading(false);
  };

  const handleResendVerifyEmail = async () => {
    setResendVerifyEmailLoading(true);
    const { msg } = await resendVerifyEmail();

    toast(scopedResend(msg), {
      icon: msg === 'resend_verify_email_success' ? '📨' : msg === 'too_many_requests' ? '⚠️❗' : '😢',
      position: 'top-right',
    });

    setResendVerifyEmailLoading(false);
  };

  return (
    <div className="relative flex h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">{/* <p>{scopedVerify('title')}</p> */}</div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>{t('desc', { email: maskEmail(user?.email || '') })}</p>
            </div>
          </div>

          <div>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                <div className="flex gap-2">
                  <OTPForm placeholder="" length={6} onCompleted={handleCompleted} />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  <p>{t('not_received')}</p>
                  <button
                    className="flex flex-row items-center text-blue-600"
                    rel="noopener noreferrer"
                    onClick={handleResendVerifyEmail}
                    disabled={resendVerifyEmailLoading}
                  >
                    {!resendVerifyEmailLoading ? (
                      t('resend')
                    ) : (
                      <span className="animate-spin border-2 border-blue-600 border-l-transparent rounded-full w-4 h-4 inline-block align-middle m-auto ml-2" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FitLoader isLoading={verifyEmailLoading} />
      </div>
    </div>
  );
};

export default PageSignUp;
