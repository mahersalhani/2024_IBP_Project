import { Metadata } from 'next';
import LoginForm from './_components/login-form';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth.login');

  return {
    title: t('title'),
  };
}

const PageLogin = () => {
  return <LoginForm />;
};

export default PageLogin;
