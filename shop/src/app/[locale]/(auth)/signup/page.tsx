import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SignUpForm from './_components/signup-form';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Auth.register');

  return {
    title: t('title'),
  };
}

const PageSignUp = () => {
  return <SignUpForm />;
};

export default PageSignUp;
