import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select, RadioGroup, Checkbox } from './FormElements';
import { Plus, Trash2, Info } from 'lucide-react';
import { cn } from '../lib/utils';

function stateLabel(country?: string) { return country === 'Canada' ? 'Province' : 'State'; }
function zipLabel(country?: string) { return country === 'Canada' ? 'Postal Code' : 'Zip Code'; }

export function MilitaryAndEmployment() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "employment" });
  const allEmployments = useFormContext().watch('employment') || [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Employment History</h2>
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex gap-3 border border-amber-200 dark:border-amber-700">
          <Info className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            DOT regulations require us to collect up to 10 years of employment history: all employers from the past 3 years, plus any employers where you drove a commercial motor vehicle going back an additional 7 years (10 years total). <strong>Include any military experience.</strong> Please start from your most recent employer.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Employment Records</h3>
          <button
            type="button"
            onClick={() => append({ company: '', startDate: '', endDate: '', address: '', city: '', state: '', zip: '', country: 'USA', phone: '', position: '', reasonForLeaving: '', terminated: 'No', isCurrent: 'No', mayContact: 'No', operatedCMV: 'No', subjectToFMCSR: 'No', safetySensitiveFunction: 'No' })}
            className="flex items-center gap-2 text-xs font-bold bg-logistics-blue text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all"
          >
            <Plus size={16} /> Add Employer
          </button>
        </div>

        {fields.length === 0 && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-sm">No employers added yet.</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Tap <strong>"Add Employer"</strong> above to enter your first employer.</p>
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Employer #{index + 1}</h4>
              <button type="button" onClick={() => remove(index)} className="text-rose-500 hover:text-rose-600">
                <Trash2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name={`employment.${index}.company`} label="Company Name" required />
              <div className="grid grid-cols-2 gap-4">
                <Input name={`employment.${index}.startDate`} label="Start Date" type="month" required />
                <Input name={`employment.${index}.endDate`} label="End Date" type="month" required />
              </div>
            </div>

            <Input name={`employment.${index}.address`} label="Street Address" required />
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-4 ml-1">Approximate address is fine if you don't remember exactly — try searching the company name on Google Maps.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input name={`employment.${index}.city`} label="City" className="md:col-span-1" required />
              <Input name={`employment.${index}.state`} label={stateLabel(allEmployments[index]?.country)} required />
              <Input name={`employment.${index}.zip`} label={zipLabel(allEmployments[index]?.country)} required />
              <Select name={`employment.${index}.country`} label="Country" options={[{label:'USA', value:'USA'}, {label:'Canada', value:'Canada'}]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name={`employment.${index}.phone`} label="Telephone" required />
              <Input name={`employment.${index}.position`} label="Position Held" required />
            </div>

            <Input name={`employment.${index}.reasonForLeaving`} label="Reason for Leaving" required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
               <RadioGroup name={`employment.${index}.terminated`} label="Were you terminated/discharged/laid off?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
               <RadioGroup name={`employment.${index}.isCurrent`} label="Is this your current employer?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
               <RadioGroup name={`employment.${index}.mayContact`} label="May we contact this employer for employment verification?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
               <RadioGroup name={`employment.${index}.operatedCMV`} label="Did you operate a commercial motor vehicle?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
               <RadioGroup name={`employment.${index}.subjectToFMCSR`} label="Were you subject to Federal Motor Carrier or Transport Canada Safety Regulations while employed/contracted by this employer/contractor?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
               <RadioGroup name={`employment.${index}.safetySensitiveFunction`} label="Did you perform any safety-sensitive functions in this job, regulated by DOT and subject to drug and alcohol testing?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrainingAndEducation() {
  const { control, watch } = useFormContext();
  const attendedTraining = watch('training.attended');
  const attendedOtherSchool = watch('education.attended');
  const isUnemployed = watch('unemployment.unemployed');
  const trainingCountry = watch('training.country');
  const educationCountry = watch('education.country');
  const { fields: unempFields, append: appendUnemp, remove: removeUnemp } = useFieldArray({ control, name: "unemployment.periods" });

  const TRAINING_SKILLS = ['Border Crossing', 'Log Books', 'Federal Motor Carrier Regulations', 'Hazardous Materials'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Training & Education</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Please detail your driver training and other educational background.</p>
      </div>

      <div className="space-y-6">
        <RadioGroup name="training.attended" label="Have you attended a driver training school?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
        {attendedTraining === 'Yes' && (
          <div className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="training.schoolName" label="School Name" />
              <div className="grid grid-cols-2 gap-4">
                <Input name="training.startDate" label="Start Date" type="date" />
                <Input name="training.endDate" label="End Date" type="date" />
              </div>
            </div>
            <Input name="training.address" label="Address" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input name="training.city" label="City" />
              <Input name="training.state" label={stateLabel(trainingCountry)} />
              <Select name="training.country" label="Country" options={[{label:'USA', value:'USA'}, {label:'Canada', value:'Canada'}]} />
              <Input name="training.phone" label="Telephone" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
               <RadioGroup name="training.graduated" label="Did you graduate?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
               <div className="space-y-1">
                 <RadioGroup name="training.subjectToFMCSR" label="Subject to FMCSR / TC safety regs?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
                 <p className="text-xs text-slate-500 dark:text-slate-400 ml-1">FMCSR = Federal Motor Carrier Safety Regulations. TC = Transport Canada.</p>
               </div>
               <RadioGroup name="training.safetySensitive" label="Performed safety sensitive functions?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
            </div>
            <div className="grid grid-cols-1 gap-6">
               <Input name="training.hoursOfInstruction" label="Hours of Instruction" />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Skills Trained (Select all that apply)</label>
              <div className="grid grid-cols-2 gap-4">
                {TRAINING_SKILLS.map(s => (
                  <label key={s} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-logistics-blue transition-all group">
                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                      (watch('training.skillsTrained') || []).includes(s) ? "bg-logistics-blue border-logistics-blue" : "border-slate-200 dark:border-slate-700 group-hover:border-slate-300"
                    )}>
                      {(watch('training.skillsTrained') || []).includes(s) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                    <input type="checkbox" value={s} {...control.register('training.skillsTrained')} className="hidden" />
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <RadioGroup name="education.attended" label="Have you attended a school (not related to truck driving) in the last 3 years?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
        {attendedOtherSchool === 'Yes' && (
          <div className="p-8 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
            <Input name="education.schoolName" label="School Name" />
            <div className="grid grid-cols-2 gap-4">
              <Input name="education.startDate" label="Start Date" type="date" />
              <Input name="education.endDate" label="End Date" type="date" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input name="education.city" label="City" />
              <Input name="education.state" label={stateLabel(educationCountry)} />
              <Select name="education.country" label="Country" options={[{label:'USA', value:'USA'}, {label:'Canada', value:'Canada'}]} />
              <Input name="education.phone" label="Telephone" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="education.studyField" label="What did you study?" placeholder="e.g., Accounting, Mechanic" />
              <Input name="education.graduationDate" label="Graduation Date (Leave blank if no graduation)" type="date" />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <RadioGroup name="unemployment.unemployed" label="Have you been unemployed at any time within the last 3 years?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
          <p className="text-xs text-amber-600 dark:text-amber-400 ml-1">Don't worry — employment gaps are completely normal and expected. We just need to account for the full timeline as part of the application process.</p>
        </div>
        {isUnemployed === 'Yes' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => appendUnemp({ startDate: '', endDate: '', comments: '' })}
                className="flex items-center gap-2 text-xs font-bold bg-slate-200 dark:bg-slate-800 px-4 py-2 rounded-xl hover:opacity-90 transition-all"
              >
                <Plus size={16} /> Add Period
              </button>
            </div>
            {unempFields.map((field, idx) => (
              <div key={field.id} className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Unemployment Period #{idx+1}</span>
                    <button type="button" onClick={() => removeUnemp(idx)} className="text-rose-500 hover:text-rose-600"><Trash2 size={16}/></button>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <Input name={`unemployment.periods.${idx}.startDate`} label="Start Date" type="date" />
                   <Input name={`unemployment.periods.${idx}.endDate`} label="End Date" type="date" />
                 </div>
                 <Input name={`unemployment.periods.${idx}.comments`} label="Comments" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
