import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NotFound');

  return {
    title: t('title'),
  };
}

export default function CatchAllPage() {
  notFound();
}
