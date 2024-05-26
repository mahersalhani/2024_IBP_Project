import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | JSX.Element;
  subLabel?: string;
  className?: string;
  sizeClassName?: string;
  labelClassName?: string;
  name: string;
  defaultChecked?: boolean;
}

// const Checkbox = (props: CheckboxProps) => {
//   const {
//     subLabel = '',
//     label = '',
//     name,
//     className = '',
//     sizeClassName = 'w-6 h-6',
//     labelClassName = '',
//     defaultChecked,
//     onChange,
//   } = props;

//   return (
//     <div className={`flex text-sm sm:text-base ${className}`}>
//       <input
//         id={name}
//         name={name}
//         type="checkbox"
//         className={`focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
//         defaultChecked={defaultChecked}
//         onChange={(e) => onChange && onChange(e.target.checked)}
//       />
//       {label && (
//         <label
//           htmlFor={name}
//           className="ltr:pl-2.5 rtl:pr-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
//         >
//           {typeof label === 'string' ? (
//             <span className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${!!subLabel ? '-mt-0.5' : ''}`}>
//               {label}
//             </span>
//           ) : (
//             label
//           )}
//           {subLabel && <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">{subLabel}</p>}
//         </label>
//       )}
//     </div>
//   );
// };

// export default Checkbox;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, subLabel, sizeClassName, labelClassName, name, ...args }, ref) => {
    return (
      // <div className={`flex text-sm sm:text-base ${className}`}>
      <div className={cn('flex text-sm sm:text-base', 'justify-start items-center', className)}>
        <input
          id={name}
          name={name}
          type="checkbox"
          className={`focus:ring-action-primary text-primary-500 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-500 focus:ring-primary-500 ${sizeClassName}`}
          ref={ref}
          {...args}
        />
        {label && (
          <label
            htmlFor={name}
            className="ltr:pl-2.5 rtl:pr-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none"
          >
            {typeof label === 'string' ? (
              <span className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${!!subLabel ? '-mt-0.5' : ''}`}>
                {label}
              </span>
            ) : (
              label
            )}
            {subLabel && <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">{subLabel}</p>}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
