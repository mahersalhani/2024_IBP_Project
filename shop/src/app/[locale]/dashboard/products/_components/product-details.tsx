import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { ProductFormData } from '@/schema';
import { Input } from '@/shared/input';
import { NumberInput } from '@/shared/input/number-input';
import TextArea from '@/shared/textarea';
import Checkbox from '@/shared/checkbox';

const ProductDetails = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<ProductFormData, ProductFormData>();

  const t = useTranslations('Product');
  const commonT = useTranslations('Common');

  return (
    <div className="space-y-5 panel">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('details')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Input
          id="name"
          label={commonT('name')}
          error={errors.name}
          errorMsg={errors.name?.message && commonT(errors.name?.message as any)}
          autoComplete="off"
          {...register('name')}
        />

        <TextArea
          id="description"
          label={commonT('description')}
          error={errors.name}
          errorMsg={errors.name?.message && commonT(errors.name?.message as any)}
          autoComplete="off"
          rows={3}
          {...register('description')}
        />

        <Checkbox id="isPublished" label={t('publish')} {...register('isPublished')} />

        <NumberInput
          id="quantity"
          label={commonT('quantity')}
          min={-1}
          error={errors.quantity}
          errorMsg={errors.quantity?.message && commonT(errors.quantity?.message as any)}
          desc={commonT('set_unlimited_quantity')}
          {...register('quantity')}
        />

        <NumberInput
          id="price"
          label={commonT('price')}
          error={errors.price}
          errorMsg={errors.price?.message && commonT(errors.price?.message as any)}
          min={1}
          {...register('price')}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
