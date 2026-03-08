import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select, RadioGroup, Checkbox } from './FormElements';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

const EXP_TYPES = [
  { id: 'straightTruck', label: 'Straight Truck' },
  { id: 'tractorSemi', label: 'Tractor and Semi-Trailer' },
  { id: 'tractorTwoTrailers', label: 'Tractor - Two Trailers' },
  { id: 'flatbed', label: 'Flatbed' },
  { id: 'hazmat', label: 'Hazmat' },
  { id: 'dryvan', label: 'Dryvan' },
  { id: 'reefer', label: 'Reefer' },
  { id: 'tanker', label: 'Tanker' },
  { id: 'lumber', label: 'Lumber' },
  { id: 'crossBorderCanada', label: 'Cross-Border Canada and USA' },
  { id: 'crossBorderUSA', label: 'Cross-Border USA and Mexico' },
  { id: 'bondedLoads', label: 'Bonded Loads' },
];

export function DrivingExperience() {
  const { watch } = useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Driving Experience</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Please detail your experience with various equipment and load types.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Equipment / Load Type</th>
              <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Experience?</th>
              <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-slate-400">Years</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {EXP_TYPES.map((type) => {
              const hasExp = watch(`experience.${type.id}.hasExperience`);
              return (
                <tr key={type.id} className="group">
                  <td className="py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{type.label}</td>
                  <td className="py-2">
                    <RadioGroup 
                      name={`experience.${type.id}.hasExperience`} 
                      label="" 
                      options={[{label:'Y', value:'Yes'}, {label:'N', value:'No'}]} 
                      className="space-y-0"
                    />
                  </td>
                  <td className="py-2">
                    {hasExp === 'Yes' && (
                      <Select 
                        name={`experience.${type.id}.years`} 
                        label="" 
                        options={[
                          { label: '1 Year', value: '1' },
                          { label: '2 Years', value: '2' },
                          { label: '3 Years', value: '3' },
                          { label: '4 Years', value: '4' },
                          { label: '5+ Years', value: '5+' },
                        ]} 
                        className="w-28"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Input name="experience.others" label="Others (Please describe)" placeholder="Any other specialized experience..." />
    </div>
  );
}

export function LicenseDetails() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "licenses" });

  const LICENSE_CLASSES = [
    { label: '', value: '' },
    { label: 'Class A', value: 'Class A' },
    { label: 'Class AZ', value: 'Class AZ' },
    { label: 'Class B', value: 'Class B' },
    { label: 'Class C', value: 'Class C' },
    { label: 'Class D', value: 'Class D' },
    { label: 'Class E', value: 'Class E' },
    { label: 'Class F', value: 'Class F' },
    { label: 'Class O', value: 'Class O' },
    { label: 'Class R', value: 'Class R' },
    { label: 'Class 1', value: 'Class 1' },
    { label: 'Class 2', value: 'Class 2' },
    { label: 'Class 3', value: 'Class 3' },
    { label: 'Class 4', value: 'Class 4' },
    { label: 'Class 5', value: 'Class 5' },
    { label: 'Class A Permit', value: 'Class A Permit' },
    { label: 'Class B Permit', value: 'Class B Permit' },
    { label: 'Class G', value: 'Class G' },
    { label: 'Class G1', value: 'Class G1' },
    { label: 'Class G2', value: 'Class G2' },
    { label: 'None', value: 'None' },
  ];

  const ENDORSEMENTS = ['None', 'Other', 'Tanker', 'Doubles / Triples', 'X Endorsement', 'HazMat'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">License Details</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Please list all driver licenses held in the past 3 years.</p>
        </div>
        <button
          type="button"
          onClick={() => append({ endorsements: [], isCurrent: false, isCDL: false, country: 'USA' })}
          className="flex items-center gap-2 text-xs font-bold bg-logistics-blue text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-logistics-blue/20"
        >
          <Plus size={16} /> Add License
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">License #{index + 1}</h3>
            {index > 0 && (
              <button type="button" onClick={() => remove(index)} className="text-rose-500 hover:text-rose-600 p-2">
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name={`licenses.${index}.licenseNumber`} label="License Number" />
            <div className="grid grid-cols-2 gap-4">
              <Input name={`licenses.${index}.state`} label="State/Prov" />
              <Select name={`licenses.${index}.country`} label="Country" options={[{label:'USA', value:'USA'}, {label:'Canada', value:'Canada'}]} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select name={`licenses.${index}.class`} label="License Class" options={LICENSE_CLASSES} />
            <div className="grid grid-cols-2 gap-4">
              <Input name={`licenses.${index}.expirationDate`} label="License Expiration" type="date" />
              <Input name={`licenses.${index}.dotMedicalExpiration`} label="DOT Med Card Expiration" type="date" />
            </div>
          </div>

          <div className="flex flex-wrap gap-8 py-4">
            <Checkbox name={`licenses.${index}.isCurrent`} label="Is this your current driver's license?" />
            <Checkbox name={`licenses.${index}.isCDL`} label="Is this a commercial driver license?" />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Endorsements (Select all that apply)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ENDORSEMENTS.map(e => (
                <label key={e} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-logistics-blue transition-all group">
                   <div className={cn(
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                    (watch(`licenses.${index}.endorsements`) || []).includes(e) ? "bg-logistics-blue border-logistics-blue" : "border-slate-200 dark:border-slate-700 group-hover:border-slate-300"
                  )}>
                    {(watch(`licenses.${index}.endorsements`) || []).includes(e) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                  </div>
                  <input 
                    type="checkbox" 
                    value={e} 
                    {...control.register(`licenses.${index}.endorsements`)} 
                    className="hidden" 
                  />
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{e}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
