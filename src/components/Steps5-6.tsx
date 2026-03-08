import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select } from './FormElements';
import { Plus, Trash2 } from 'lucide-react';
import { type FullApplication } from '../types/form';

export function Education() {
  const { register, control, formState: { errors } } = useFormContext<FullApplication>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education'
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Education</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Academic history and certifications.</p>
        </div>
        <button
          type="button"
          onClick={() => append({} as any)}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-logistics-blue text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-logistics-blue/20"
        >
          <Plus size={14} /> Add Education
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

          <Input
            label="School Name"
            {...register(`education.${index}.schoolName`)}
            error={(errors.education as any)?.[index]?.schoolName?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              {...register(`education.${index}.startDate`)}
              error={(errors.education as any)?.[index]?.startDate?.message}
            />
            <Input
              label="End Date"
              type="date"
              {...register(`education.${index}.endDate`)}
              error={(errors.education as any)?.[index]?.endDate?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City, State/Province"
              {...register(`education.${index}.cityState`)}
              error={(errors.education as any)?.[index]?.cityState?.message}
            />
            <Input
              label="Country"
              {...register(`education.${index}.country`)}
              error={(errors.education as any)?.[index]?.country?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="What did you study?"
              {...register(`education.${index}.studyField`)}
              error={(errors.education as any)?.[index]?.studyField?.message}
            />
            <Input
              label="Graduation Date"
              type="date"
              {...register(`education.${index}.graduationDate`)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Records() {
  const { register, formState: { errors } } = useFormContext<FullApplication>();

  const questions = [
    { id: 'licenseDenied', label: '1. Has any license, permit or privilege ever been denied, suspended or revoked for any reason?' },
    { id: 'convictedSuspended', label: '2. Have you ever been convicted of driving during license suspension or revocation, or driving without a valid license or an expired license, or are any charges pending?' },
    { id: 'convictedAlcohol', label: '3. Have you ever been convicted for any alcohol or controlled substance related offense while operating a motor vehicle, or are any charges pending?' },
    { id: 'convictedIllegalSubstance', label: '4. Have you ever been convicted for possession, sale or transfer of an illegal substance (including marijuana, amphetamines, etc.) while on duty, or are any charges pending?' },
    { id: 'convictedReckless', label: '5. Have you ever been convicted of reckless driving, careless driving or careless operation of a motor vehicle, or are any charges pending?' },
    { id: 'drugTestPositive', label: '6. Have you ever tested positive, or refused to test on a pre-employment drug or alcohol test in the past three years, or any DOT-mandated test?' },
  ];

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Compliance Records</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Motor vehicle and criminal record disclosures for safety compliance.</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Motor Vehicle Record</h3>
        {questions.map((q) => (
          <div key={q.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center border-b border-slate-50 dark:border-slate-800/50 pb-6">
            <p className="md:col-span-3 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{q.label}</p>
            <Select
              label="Answer"
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              {...register(`records.${q.id}` as any)}
              error={(errors.records as any)?.[q.id]?.message}
            />
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Accidents & Violations</h3>
        <div className="grid grid-cols-1 gap-6">
          <Input
            label="Vehicle Accident Record (Last 5 Years)"
            {...register('records.accidentsLast5Years')}
            error={errors.records?.accidentsLast5Years?.message as string}
          />
          <Input
            label="Traffic Convictions \ Violations (Last 3 Years)"
            {...register('records.violationsLast3Years')}
            error={errors.records?.violationsLast3Years?.message as string}
          />
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Criminal Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Ever convicted of a crime?"
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            {...register('records.convictedCrime')}
            error={errors.records?.convictedCrime?.message as string}
          />
          <Select
            label="Any deferred prosecutions?"
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            {...register('records.deferredProsecution')}
            error={errors.records?.deferredProsecution?.message as string}
          />
          <Select
            label="Criminal charges pending?"
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            {...register('records.criminalChargesPending')}
            error={errors.records?.criminalChargesPending?.message as string}
          />
          <Select
            label="Pled guilty to a felony?"
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            {...register('records.pledGuiltyFelony')}
            error={errors.records?.pledGuiltyFelony?.message as string}
          />
          <Select
            label="Hold a minister's permit?"
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            {...register('records.ministerPermit')}
            error={errors.records?.ministerPermit?.message as string}
          />
          <Select
            label="Pled guilty to a misdemeanor (last 5 years)?"
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            {...register('records.pledGuiltyMisdemeanor')}
            error={errors.records?.pledGuiltyMisdemeanor?.message as string}
          />
        </div>
      </div>
    </div>
  );
}
