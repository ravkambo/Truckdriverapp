import { useFormContext } from 'react-hook-form';
import { cn } from '../lib/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  className?: string;
}

export function Input({ name, label, className, ...props }: InputProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = (errors as any)[name.split('.')[0]]?.[name.split('.')[1]] || (errors as any)[name];

  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">{label}</label>
      <input
        {...register(name)}
        className={cn(
          "w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-logistics-blue transition-all outline-none",
          error && "ring-2 ring-rose-500"
        )}
        {...props}
      />
      {error && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight ml-1">{error.message}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  className?: string;
}

export function Select({ name, label, options, className, ...props }: SelectProps) {
  const { register, formState: { errors } } = useFormContext();
  const error = (errors as any)[name.split('.')[0]]?.[name.split('.')[1]] || (errors as any)[name];

  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">{label}</label>
      <select
        {...register(name)}
        className={cn(
          "w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-logistics-blue transition-all outline-none appearance-none",
          error && "ring-2 ring-rose-500"
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight ml-1">{error.message}</p>}
    </div>
  );
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  className?: string;
}

export function RadioGroup({ name, label, options, className, ...props }: RadioGroupProps & { key?: string }) {
  const { register, watch, formState: { errors } } = useFormContext();
  const error = (errors as any)[name.split('.')[0]]?.[name.split('.')[1]] || (errors as any)[name];
  const currentValue = watch(name);

  return (
    <div className={cn("space-y-3", className)}>
      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-1">{label}</label>
      <div className="flex gap-4">
        {options.map((opt) => (
          <label key={opt.value} className={cn(
            "flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all cursor-pointer",
            currentValue === opt.value 
              ? "bg-logistics-blue border-logistics-blue text-white" 
              : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
          )}>
            <input type="radio" value={opt.value} {...register(name)} className="hidden" />
            <span className="text-sm font-bold">{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight ml-1">{error.message}</p>}
    </div>
  );
}

export function Checkbox({ name, label, className }: { name: string; label: string; className?: string }) {
  const { register, watch, formState: { errors } } = useFormContext();
  const error = (errors as any)[name.split('.')[0]]?.[name.split('.')[1]] || (errors as any)[name];
  const isChecked = watch(name);

  return (
    <div className={cn("space-y-1", className)}>
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className={cn(
          "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
          isChecked ? "bg-logistics-blue border-logistics-blue" : "border-slate-200 dark:border-slate-700 group-hover:border-slate-300"
        )}>
          {isChecked && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
        </div>
        <input type="checkbox" {...register(name)} className="hidden" />
        <span className="text-sm leading-tight text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
      </label>
      {error && <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight ml-1">{error.message}</p>}
    </div>
  );
}
