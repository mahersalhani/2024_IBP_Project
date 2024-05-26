import Image, { StaticImageData } from 'next/image';

import { avatarColors } from '@/constants';
import VerifyIcon from '@/components/VerifyIcon';

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string | StaticImageData;
  username?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
  placeholder?: string;
}

const Avatar = (props: AvatarProps) => {
  const {
    imgUrl,
    username,
    containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
    sizeClass = 'h-6 w-6 text-sm',
    radius = 'rounded-full',
    hasChecked,
    hasCheckedClass = 'w-4 h-4 bottom-1 -right-0.5',
    placeholder,
  } = props;

  const url = imgUrl;
  const name = username || 'John Doe';

  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {url && (
        <Image
          fill
          sizes="100px"
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={url}
          alt={name}
          placeholder={placeholder ? 'blur' : 'empty'}
          blurDataURL={placeholder}
        />
      )}
      <span className="wil-avatar__name">{name[0]}</span>

      {hasChecked && (
        <span className={`  text-white  absolute  ${hasCheckedClass}`}>
          <VerifyIcon className="" />
        </span>
      )}
    </div>
  );
};

export default Avatar;
