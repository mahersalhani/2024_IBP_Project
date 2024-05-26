import { TextareaHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  errorMsg?: string;
  required?: boolean;
  label?: string;
  labelClass?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, errorMsg, required, label, labelClass = '', rows, ...args }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={args.id} className={labelClass}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {/* <textarea className={`form-input ${error && 'border-red-500'} ${className}`} ref={ref} {...args} /> */}
        <textarea
          ref={ref}
          className={`block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
          rows={rows}
          {...args}
        />
        {error && <span className="text-red-500">{errorMsg}</span>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
