import { FieldError } from 'react-hook-form';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

interface NumberInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClass?: string;
  required?: boolean;
  error?: FieldError;
  errorMsg?: string;
  desc?: string;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInput>(
  ({ label, labelClass, required, min, max, error, errorMsg, desc, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef?.current!);

    const increment = () => {
      if (!innerRef.current) return;
      if (innerRef.current!.value === '') innerRef.current!.value = '0';
      if (max && Number(innerRef.current!.value) >= Number(max)) return;
      innerRef.current.value = String(Number(innerRef.current!.value) + 1);
    };

    const decrement = () => {
      if (!innerRef.current) return;
      if (innerRef.current!.value === '') innerRef.current!.value = '0';

      if (min && Number(innerRef.current!.value) <= Number(min)) return;
      innerRef.current.value = String(Math.max(Number(innerRef.current!.value) - 1));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!innerRef.current) return;
      if (min && Number(e.target.value) < Number(min)) innerRef.current.value = String(min);
      if (max && Number(e.target.value) > Number(max)) innerRef.current.value = String(max);

      // Only allow numbers, negative sign, and decimal point
      innerRef.current.value = innerRef.current.value.replace(/[^0-9.-]/g, '');
    };

    return (
      <div>
        {label && (
          <label htmlFor={props.id} className={labelClass}>
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}

        <div
          className={cn(
            'px-4 py-2.5 bg-white border border-gray-200 rounded-xl dark:bg-neutral-900 dark:border-neutral-700 text-sm font-normal',
            'focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-200 focus-within:ring-opacity-50'
          )}
          data-hs-input-number=""
        >
          <div className="w-full flex justify-between items-center gap-x-5">
            <div className="grow">
              <input
                className={cn('w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white')}
                type="text"
                data-hs-input-number-input=""
                ref={innerRef}
                {...props}
                onChange={handleChange} // Only allow numbers
              />
            </div>
            <div className="flex justify-end items-center gap-x-1.5">
              <button
                onClick={decrement}
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                data-hs-input-number-decrement=""
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>
              <button
                onClick={increment}
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                data-hs-input-number-increment=""
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {error && <span className="text-red-500 text-xs mt-1">{errorMsg}</span>}
        {desc && <p className="text-xs text-gray-600 mt-1">{desc}</p>}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
