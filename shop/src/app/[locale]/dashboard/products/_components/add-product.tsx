'use client';

import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEvent } from 'react';

import ButtonPrimary from '@/shared/button/ButtonPrimary';
import { ProductFormData, ProductFormSchema } from '@/schema';
import { useProduct } from '@/hooks/product/use-product';

import { ProductForm } from './product-form';

const AddProduct = () => {
  const t = useTranslations('Product');

  const method = useForm<ProductFormData, ProductFormData>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      quantity: 0,
      price: 1,
      slug: '',
      isPublished: true,
    },
  });

  const { handleSubmit } = method;

  const { createProduct, loading } = useProduct();

  const onSubmit = handleSubmit(createProduct);

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <div>
      <FormProvider {...method}>
        <form onSubmit={onSubmit} onKeyDown={checkKeyDown}>
          {/* Header */}
          <div className="flex justify-between items-center my-5">
            <h2 className="text-xl font-semibold">{t('create')}</h2>
          </div>

          <ProductForm />

          <div className="flex justify-end">
            <ButtonPrimary type="submit" disabled={loading} className="ml-5 mt-5 shadow-none" loading={loading}>
              {t('create')}
            </ButtonPrimary>
          </div>
        </form>
      </FormProvider>

      {loading && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="spinner-border border-primary-500" role="status">
            <span className="m-auto mb-10 inline-block h-10 w-10 animate-spin rounded-full border-4 border-primary-500 border-l-transparent align-middle"></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
