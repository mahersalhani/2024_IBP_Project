import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const Page404 = async () => {
  const t = useTranslations('NotFound');

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-neutral-900 dark:text-neutral-100">{t('title')}</h1>

          <p className="text-lg text-neutral-500 dark:text-neutral-400">{t('description')}</p>

          <div className="mt-8">
            <Link href="/" className="bg-primary-500 text-white px-6 py-3 rounded-md">
              {t('return_home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
