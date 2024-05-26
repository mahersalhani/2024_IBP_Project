import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  errorMsg?: string;
  required?: boolean;
  label?: string;
  rounded?:
    | 'rounded-none'
    | 'rounded-sm'
    | 'rounded'
    | 'rounded-md'
    | 'rounded-lg'
    | 'rounded-xl'
    | 'rounded-2xl'
    | 'rounded-3xl'
    | 'rounded-full';
  loading?: boolean;
  sizeClass?: string;
  fontClass?: string;
  labelClass?: string;
  desc?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      errorMsg,
      required,
      label,
      loading,
      className = '',
      sizeClass = 'h-11 px-4 py-3',
      fontClass = 'text-sm font-normal',
      rounded = 'rounded-xl',
      type = 'text',
      labelClass = '',
      desc,
      ...args
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor={args.id} className={labelClass}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div className="relative w-full">
          <input
            ref={ref}
            type={type}
            className={cn(
              'block w-full border-neutral-200',
              'focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50',
              'bg-white  disabled:bg-neutral-200 dark:disabled:bg-neutral-800',
              'dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900',
              rounded,
              fontClass,
              sizeClass,
              className
            )}
            {...args}
          />

          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600">
              <div className="flex items-center justify-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        {error && <span className="text-red-500 text-xs mt-1">{errorMsg}</span>}
        {desc && <p className="text-xs text-gray-600 mt-1">{desc}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
