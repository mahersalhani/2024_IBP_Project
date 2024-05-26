'use client';

import Image from 'next/image';

import ImageUploading, { ImageListType, ImageUploadingPropsType } from 'react-images-uploading';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { FILE_SIZE_LIMIT, MAX_NUMBER_OF_FILES } from '@/constants';

interface DropZoneImagesProps {
  images: ImageListType;
  onImageRemove: (index: number) => void;
}
const DropZoneImages = ({ images, onImageRemove }: DropZoneImagesProps) => {
  return images.map((image, index) => (
    <div key={index} className="relative bg-gray-100 rounded-md overflow-hidden w-32 h-32 border border-gray-300">
      <div className="relative w-32 h-32 rounded-md overflow-hidden">
        {image?.dataURL?.includes('data:image') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.dataURL} className="object-contain w-full h-full" alt="" />
        ) : (
          // TODO - Add image not found
          <Image src={image.dataURL || ''} className="object-contain" alt="" layout="fill" />
        )}
      </div>

      <button
        type="button"
        onClick={() => onImageRemove(index)}
        className="absolute top-0 right-0 z-10 bg-white p-1 rounded-full border border-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  ));
};

interface DropZoneProps extends ImageUploadingPropsType {}

const DropZone = (props: DropZoneProps) => {
  const t = useTranslations('Common');

  return (
    <div>
      <ImageUploading
        onError={(errors) => {
          if (errors?.maxFileSize) toast.error(t('file_size_limit'));
          if (errors?.maxNumber) toast.error(t('max_number_of_files'));
          if (errors?.acceptType) toast.error(t('file_type_not_supported'));
        }}
        maxFileSize={FILE_SIZE_LIMIT}
        maxNumber={MAX_NUMBER_OF_FILES}
        {...props}
      >
        {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
          <div>
            <div
              className={cn(
                'relative w-full h-96 border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center flex-col gap-4',
                'cursor-pointer hover:border-primary-500 z-0',
                isDragging && 'bg-primary-100 border-primary-500'
              )}
            >
              <div>
                <div className="relative size-32 opacity-70">
                  <Image src="/assets/drop.png" alt="empty" fill sizes="250px" className="h-auto w-auto" priority />
                </div>
                <p className="text-gray-500 opacity-70">{t('drag_and_drop')}</p>

                <button
                  type="button"
                  onClick={onImageUpload}
                  className={cn('absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-20')}
                  {...dragProps}
                />
              </div>
            </div>

            {imageList.length > 0 && (
              <div className="mt-4">
                <div className="size-full flex flex-wrap gap-4">
                  <DropZoneImages images={imageList} onImageRemove={onImageRemove} />
                </div>
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default DropZone;
