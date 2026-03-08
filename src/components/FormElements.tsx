import React from 'react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logistics-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all dark:bg-slate-900 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-500",
            error && "border-rose-500 focus-visible:ring-rose-500 dark:border-rose-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-[10px] font-semibold text-rose-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {label}
        </label>
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-logistics-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all dark:bg-slate-900 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-500",
            error && "border-rose-500 focus-visible:ring-rose-500 dark:border-rose-500",
            className
          )}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-[10px] font-semibold text-rose-500">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "mt-1 h-4 w-4 rounded border-slate-300 text-logistics-blue focus:ring-logistics-blue dark:border-slate-700 dark:bg-slate-900",
              className
            )}
            {...props}
          />
          <span className="text-sm text-slate-700 leading-tight group-hover:text-logistics-blue transition-colors dark:text-slate-300 dark:group-hover:text-logistics-blue">
            {label}
          </span>
        </label>
        {error && <span className="text-[10px] font-semibold text-rose-500">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
