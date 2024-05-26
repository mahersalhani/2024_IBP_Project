import { useTranslations } from 'next-intl';
import { Controller, useFormContext } from 'react-hook-form';

import { ProductFormData } from '@/schema';
import DropZone from '@/components/drop-zone';

const ProductImages = () => {
  const {
    formState: { errors },
    clearErrors,
    control,
  } = useFormContext<ProductFormData, ProductFormData>();

  const t = useTranslations('Product');
  const commonT = useTranslations('Common');

  return (
    <div className="space-y-5 panel">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t('images')}</h2>
      </div>

      {/* Content */}
      <div className="space-y-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:space-y-0">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{t('cover_image')}</label>
          <Controller
            name="coverImage"
            control={control}
            render={({ field }) => (
              <DropZone
                onChange={(files) => {
                  field.onChange(files[0]);
                  clearErrors('coverImage');
                }}
                value={field.value ? [field.value] : []}
              />
            )}
          />
          {errors.coverImage && <p className="text-sm text-red-600">{commonT(errors.coverImage.message as any)}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
