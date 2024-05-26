import React from 'react';
import Button, { ButtonProps } from './Button';
import { cn } from '@/lib/utils';

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ className = '', ...args }) => {
  return (
    <Button
      className={cn(
        'disabled:bg-opacity-90 disabled:cursor-not-allowed disabled:shadow-none disabled:text-primary-50 disabled:hover:bg-primary-600 disabled:hover:text-primary-50 disabled:ring-primary-500 disabled:ring-2',
        'bg-primary-600 hover:bg-primary-500 text-primary-50 shadow-xl focus:ring-primary-500',
        className
      )}
      {...args}
    />
  );
};

export default ButtonPrimary;
