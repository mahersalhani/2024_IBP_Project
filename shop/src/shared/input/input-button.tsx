import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { Input } from '.';
import { cn } from '@/lib/utils';

export interface InputButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  errorMsg?: string;
  required?: boolean;
  label?: string;
  onClick?: () => void;
  buttonLabel?: string;
  desc?: string;
}

export const InputButton = forwardRef<HTMLInputElement, InputButtonProps>((props, ref) => {
  const { className, error, errorMsg, required, label, onClick, desc, buttonLabel, ...args } = props;

  return (
    <div>
      {label && (
        <label htmlFor={args.id}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex w-full">
        <Input ref={ref} {...args} className={cn('ltr:rounded-r-none rtl:rounded-l-none')} />

        <button
          type="button"
          className={cn(
            'bg-primary-500 text-white px-3 py-1 rounded-r-md ltr:rounded-l-none rtl:rounded-r-none text-xs'
          )}
          onClick={onClick}
        >
          {buttonLabel ? buttonLabel : 'generate'}
        </button>
      </div>

      {error && <span className="text-red-500 text-xs mt-1">{errorMsg}</span>}
      {desc && <p className="text-xs text-gray-600 mt-1">{desc}</p>}
    </div>
  );
});

InputButton.displayName = 'InputButton';
