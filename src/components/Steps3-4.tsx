import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select } from './FormElements';
import { Plus, Trash2, Camera, Loader2 } from 'lucide-react';
import { type FullApplication } from '../types/form';
import React, { useState } from 'react';
import { extractLicenseData } from '../services/geminiService';
import { cn } from '../lib/utils';

export function Licenses() {
  const { register, control, formState: { errors }, setValue } = useFormContext<FullApplication>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'licenses'
  });

  const [isScanning, setIsScanning] = useState<number | null>(null);

  const handleScanLicense = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(index);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const data = await extractLicenseData(base64, file.type);
        
        if (data.licenseNumber) setValue(`licenses.${index}.licenseNumber`, data.licenseNumber);
        if (data.state) setValue(`licenses.${index}.state`, data.state);
        if (data.country) setValue(`licenses.${index}.country`, data.country);
        if (data.class) setValue(`licenses.${index}.class`, data.class);
        if (data.expirationDate) setValue(`licenses.${index}.expirationDate`, data.expirationDate);
        if (data.physicalExpirationDate) setValue(`licenses.${index}.physicalExpirationDate`, data.physicalExpirationDate);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Scanning failed:", error);
      alert("Failed to scan license. Please enter details manually.");
    } finally {
      setIsScanning(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Licenses</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Driver license information and endorsements.</p>
        </div>
        <button
          type="button"
          onClick={() => append({} as any)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-logistics-blue text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-logistics-blue/20"
        >
          <Plus size={14} /> Add License
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-8 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-6 relative bg-slate-50/50 dark:bg-slate-900/50">
          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}

          <div className="flex flex-col gap-4 mb-8">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Scan License Document</label>
            <div className="flex items-center gap-4">
              <label className={cn(
                "flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-bold text-logistics-blue shadow-sm",
                isScanning === index && "opacity-50 cursor-not-allowed"
              )}>
                {isScanning === index ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Camera size={16} />
                )}
                {isScanning === index ? "Scanning..." : "AI Auto-Fill Scan"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleScanLicense(index, e)}
                  disabled={isScanning === index}
                />
              </label>
              <p className="text-[10px] text-slate-400 font-medium max-w-[150px] leading-tight">AI will automatically extract data and fill the fields below.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="License Number"
              {...register(`licenses.${index}.licenseNumber`)}
              error={(errors.licenses as any)?.[index]?.licenseNumber?.message}
            />
            <Input
              label="State/Province"
              {...register(`licenses.${index}.state`)}
              error={(errors.licenses as any)?.[index]?.state?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Country"
              {...register(`licenses.${index}.country`)}
              error={(errors.licenses as any)?.[index]?.country?.message}
            />
            <Input
              label="License Class"
              {...register(`licenses.${index}.class`)}
              error={(errors.licenses as any)?.[index]?.class?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="License Expiration Date"
              type="date"
              {...register(`licenses.${index}.expirationDate`)}
              error={(errors.licenses as any)?.[index]?.expirationDate?.message}
            />
            <Input
              label="Physical Expiration Date"
              type="date"
              {...register(`licenses.${index}.physicalExpirationDate`)}
              error={(errors.licenses as any)?.[index]?.physicalExpirationDate?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Current License?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`licenses.${index}.isCurrent`)}
              error={(errors.licenses as any)?.[index]?.isCurrent?.message}
            />
            <Select
              label="Commercial Driver License?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`licenses.${index}.isCDL`)}
              error={(errors.licenses as any)?.[index]?.isCDL?.message}
            />
          </div>

          <Input
            label="Endorsements"
            {...register(`licenses.${index}.endorsements`)}
            error={(errors.licenses as any)?.[index]?.endorsements?.message}
          />
        </div>
      ))}
    </div>
  );
}

export function EmploymentHistory() {
  const { register, control, formState: { errors } } = useFormContext<FullApplication>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employment'
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Employment History</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Provide at least 3 years of history (10 years for CMV drivers).</p>
        </div>
        <button
          type="button"
          onClick={() => append({} as any)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-logistics-blue text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-logistics-blue/20"
        >
          <Plus size={14} /> Add Employer
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-8 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-8 relative bg-slate-50/50 dark:bg-slate-900/50">
          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Company Name"
              {...register(`employment.${index}.company`)}
              error={(errors.employment as any)?.[index]?.company?.message}
            />
            <Input
              label="Start Date"
              type="date"
              {...register(`employment.${index}.startDate`)}
              error={(errors.employment as any)?.[index]?.startDate?.message}
            />
            <Input
              label="End Date"
              type="date"
              {...register(`employment.${index}.endDate`)}
              error={(errors.employment as any)?.[index]?.endDate?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Address"
              {...register(`employment.${index}.address`)}
              error={(errors.employment as any)?.[index]?.address?.message}
            />
            <Input
              label="City, State, Zip"
              {...register(`employment.${index}.cityStateZip`)}
              error={(errors.employment as any)?.[index]?.cityStateZip?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Country"
              {...register(`employment.${index}.country`)}
              error={(errors.employment as any)?.[index]?.country?.message}
            />
            <Input
              label="Phone"
              {...register(`employment.${index}.phone`)}
              error={(errors.employment as any)?.[index]?.phone?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Position Held"
              {...register(`employment.${index}.position`)}
              error={(errors.employment as any)?.[index]?.position?.message}
            />
            <Input
              label="Reason for leaving?"
              {...register(`employment.${index}.reasonForLeaving`)}
              error={(errors.employment as any)?.[index]?.reasonForLeaving?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Terminated/Laid off?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`employment.${index}.terminated`)}
              error={(errors.employment as any)?.[index]?.terminated?.message}
            />
            <Select
              label="Current employer?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`employment.${index}.isCurrent`)}
              error={(errors.employment as any)?.[index]?.isCurrent?.message}
            />
            <Select
              label="May we contact?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`employment.${index}.mayContact`)}
              error={(errors.employment as any)?.[index]?.mayContact?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Operate a CMV?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`employment.${index}.operatedCMV`)}
              error={(errors.employment as any)?.[index]?.operatedCMV?.message}
            />
            <Select
              label="Subject to FMCSR?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`employment.${index}.subjectToFMCSR`)}
              error={(errors.employment as any)?.[index]?.subjectToFMCSR?.message}
            />
            <Select
              label="Safety sensitive (DOT)?"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`employment.${index}.safetySensitive`)}
              error={(errors.employment as any)?.[index]?.safetySensitive?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Areas Driven"
              {...register(`employment.${index}.areasDriven`)}
            />
            <Input
              label="Miles weekly"
              {...register(`employment.${index}.milesWeekly`)}
            />
            <Input
              label="Pay Range"
              {...register(`employment.${index}.payRange`)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Common Truck"
              {...register(`employment.${index}.truckType`)}
            />
            <Input
              label="Common Trailer"
              {...register(`employment.${index}.trailerType`)}
            />
            <Input
              label="Trailer Length"
              {...register(`employment.${index}.trailerLength`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
