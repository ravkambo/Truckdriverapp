import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, RadioGroup, Checkbox } from './FormElements';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

export function FMCSR() {
  const { control, watch } = useFormContext();
  const hasViolations = watch('fmcsr.hasViolations');
  const hasAccidents = watch('fmcsr.hasAccidents');
  const { fields: vFields, append: vAppend, remove: vRemove } = useFieldArray({ control, name: "fmcsr.violations" });
  const { fields: aFields, append: aAppend, remove: aRemove } = useFieldArray({ control, name: "fmcsr.accidents" });

  const QUESTIONS = [
    { name: 'fmcsr.deniedSuspended', num: 1, label: 'Has any license, permit or privilege ever been denied, suspended or revoked for any reason?' },
    { name: 'fmcsr.convictedSuspension', num: 2, label: 'Have you ever been convicted of driving during license suspension or revocation, or driving without a valid license or an expired license, or are any charges pending?' },
    { name: 'fmcsr.convictedAlcohol', num: 3, label: 'Have you ever been convicted for any alcohol or controlled substance related offense while operating a motor vehicle, or are any charges pending?' },
    { name: 'fmcsr.convictedPossession', num: 4, label: 'Have you ever been convicted for possession, sale or transfer of an illegal substance (including but not limited to, marijuana, amphetamines, or derivatives thereof) while on duty, or are any charges pending?' },
    { name: 'fmcsr.convictedReckless', num: 5, label: 'Have you ever been convicted of reckless driving, careless driving or careless operation of a motor vehicle, or are any charges pending?' },
    { name: 'fmcsr.drugTestPositiveRefused', num: 6, label: 'Have you ever tested positive, or refused to test on a pre-employment drug or alcohol test by an employer to whom you applied, but did not obtain safety-sensitive transportation work covered by DOT agency drug and alcohol testing rules in the past three years, or have you ever tested positive or refused to test on any DOT-mandated drug or alcohol test?' },
  ];

  const PENALTIES = ['Fine', 'Suspension', 'Revocation', 'Community Service', 'Other'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">FMCSR Compliance</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Federal Motor Carrier Safety Regulations requirements.</p>
      </div>

      <div className="space-y-3">
        {QUESTIONS.map(q => {
          const val = watch(q.name);
          return (
            <div key={q.name} className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-l-4 border border-slate-200 dark:border-slate-700 border-l-slate-300 dark:border-l-slate-600">
              <div className="shrink-0 w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 mt-0.5">
                {q.num}
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{q.label}</p>
                <div className="flex gap-2">
                  {(['Yes', 'No'] as const).map(opt => (
                    <label key={opt} className={cn(
                      "flex items-center justify-center px-5 py-2 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all",
                      val === opt && opt === 'Yes' ? "bg-amber-500 border-amber-500 text-white" :
                      val === opt && opt === 'No'  ? "bg-emerald-500 border-emerald-500 text-white" :
                      "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                    )}>
                      <input type="radio" value={opt} {...control.register(q.name)} className="hidden" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-l-4 border border-slate-200 dark:border-slate-700 border-l-amber-400">
          <div className="flex-1 space-y-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">Have you had any moving violations or traffic convictions in the past 3 years?</p>
            <div className="flex gap-2">
              {(['Yes', 'No'] as const).map(opt => (
                <label key={opt} className={cn(
                  "flex items-center justify-center px-5 py-2 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all",
                  hasViolations === opt && opt === 'Yes' ? "bg-amber-500 border-amber-500 text-white" :
                  hasViolations === opt && opt === 'No'  ? "bg-emerald-500 border-emerald-500 text-white" :
                  "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                )}>
                  <input type="radio" value={opt} {...control.register('fmcsr.hasViolations')} className="hidden" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
        {hasViolations === 'Yes' && (
          <div className="space-y-4">
             <div className="flex justify-end">
                <button type="button" onClick={() => vAppend({ date: '', description: '', state: '', isCommercial: 'No', penalties: [] })} className="flex items-center gap-2 text-xs font-bold bg-logistics-blue text-white px-4 py-2 rounded-xl">
                  <Plus size={16} /> Add Violation
                </button>
             </div>
             {vFields.map((field, idx) => (
               <div key={field.id} className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Violation #{idx+1}</span>
                    <button type="button" onClick={() => vRemove(idx)} className="text-rose-500"><Trash2 size={16}/></button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Input name={`fmcsr.violations.${idx}.date`} label="Violation Date" type="date" />
                    <Input name={`fmcsr.violations.${idx}.state`} label="State/Prov" />
                    <RadioGroup name={`fmcsr.violations.${idx}.isCommercial`} label="In Commercial Vehicle?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
                  </div>
                  <Input name={`fmcsr.violations.${idx}.description`} label="Charge / Description" />
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Penalty / Fine (Check all that apply)</label>
                    <div className="flex flex-wrap gap-4">
                      {PENALTIES.map(p => (
                         <label key={p} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" value={p} {...control.register(`fmcsr.violations.${idx}.penalties`)} className="rounded border-slate-300 text-logistics-blue focus:ring-logistics-blue" />
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{p}</span>
                         </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input name={`fmcsr.violations.${idx}.fineAmount`} label="Fine Amount (if applicable)" />
                    <Input name={`fmcsr.violations.${idx}.comments`} label="Comments" />
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex gap-4 items-start p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-l-4 border border-slate-200 dark:border-slate-700 border-l-amber-400">
          <div className="flex-1 space-y-3">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">Were you involved in any accidents or incidents with any vehicle in the last 5 years?</p>
            <div className="flex gap-2">
              {(['Yes', 'No'] as const).map(opt => (
                <label key={opt} className={cn(
                  "flex items-center justify-center px-5 py-2 rounded-xl border-2 text-sm font-bold cursor-pointer transition-all",
                  hasAccidents === opt && opt === 'Yes' ? "bg-amber-500 border-amber-500 text-white" :
                  hasAccidents === opt && opt === 'No'  ? "bg-emerald-500 border-emerald-500 text-white" :
                  "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                )}>
                  <input type="radio" value={opt} {...control.register('fmcsr.hasAccidents')} className="hidden" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
        {hasAccidents === 'Yes' && (
          <div className="space-y-4">
             <div className="flex justify-end">
                <button type="button" onClick={() => aAppend({ date: '', type: '', hazmat: 'No', towed: 'No', city: '', state: '', isCommercial: 'No', isFault: 'No', isTicketed: 'No', details: '' })} className="flex items-center gap-2 text-xs font-bold bg-logistics-blue text-white px-4 py-2 rounded-xl">
                  <Plus size={16} /> Add Accident
                </button>
             </div>
             {aFields.map((field, idx) => (
               <div key={field.id} className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Accident #{idx+1}</span>
                    <button type="button" onClick={() => aRemove(idx)} className="text-rose-500"><Trash2 size={16}/></button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Input name={`fmcsr.accidents.${idx}.date`} label="Date" type="date" />
                    <Input name={`fmcsr.accidents.${idx}.city`} label="City" />
                    <Input name={`fmcsr.accidents.${idx}.state`} label="State/Prov" />
                    <Input name={`fmcsr.accidents.${idx}.type`} label="Type of Accident" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <RadioGroup name={`fmcsr.accidents.${idx}.hazmat`} label="Hazmat?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
                    <RadioGroup name={`fmcsr.accidents.${idx}.towed`} label="Towed?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
                    <RadioGroup name={`fmcsr.accidents.${idx}.isCommercial`} label="Commercial?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
                    <RadioGroup name={`fmcsr.accidents.${idx}.isFault`} label="At Fault?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
                    <RadioGroup name={`fmcsr.accidents.${idx}.isTicketed`} label="Ticketed?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
                  </div>
                  <Input name={`fmcsr.accidents.${idx}.details`} label="Detailed Accident Information" placeholder="Describe the accident/incident..." />
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function DisclosuresAndSignature() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Disclosures & Authorization</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Please review the following legal disclosures and provide your authorization.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white">Fair Credit Reporting Act (FCRA)</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            A Summary of Your Rights Under the Fair Credit Reporting Act is available for your review. 
            By checking the box below, you acknowledge receipt and understanding of these rights.
          </p>
          <a href="#" className="flex items-center gap-2 text-xs font-bold text-logistics-blue hover:underline">
            <ExternalLink size={14} /> View FCRA Summary of Rights
          </a>
          <Checkbox name="disclosures.fcraAcknowledgment" label="I acknowledge that I have read and understand the federal FCRA Summary of Rights and agree to use an electronic signature." />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white">PSP Authorization</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The Pre-Employment Screening Program (PSP) is a Federal Motor Carrier Safety Administration (FMCSA) program that allows carriers to access your safety record, including crash and inspection history. By checking the box below, you authorize this company to request your PSP report.
          </p>
          <a href="#" className="flex items-center gap-2 text-xs font-bold text-logistics-blue hover:underline">
            <ExternalLink size={14} /> View Pre-Employment Screening Program (PSP) Authorization
          </a>
          <Checkbox name="disclosures.pspAcknowledgment" label="I authorize the procurement of my PSP report as described above." />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white">Disclosure for Consumer Reports</h3>
          <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
            <p>In connection with your application, Cargo Clarity may order one or more consumer report(s) (commonly known as "background reports") from consumer reporting agencies.</p>
            <p>The consumer reports may include information concerning your character, general reputation, personal characteristics, drug and alcohol test results, motor vehicle records, driving records, criminal history, and more.</p>
            <p>I authorize Cargo Clarity to obtain one or more consumer report(s) or investigative consumer report(s) about me. This authorization remains on file as ongoing authorization during my employment or contract period.</p>
          </div>
          <Checkbox name="disclosures.consumerReportAuth" label="I authorize the procurement of consumer reports and investigative consumer reports as described above." />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-white">Safety Performance History Authorization <span className="normal-case font-normal text-slate-400">(49 C.F.R. Part 391.23)</span></h3>
          <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
            <p>I authorize my previous employers, contractors, and trucking schools to release to Cargo Clarity my DOT alcohol and controlled substance information and safety performance history for the past three (3) years.</p>
            <p>I understand I have the right to review this information, have errors corrected, and/or attach a rebuttal statement if accuracy cannot be agreed upon.</p>
          </div>
          <Checkbox name="disclosures.part391Auth" label="I authorize the release of information in accordance with 49 C.F.R. Part 391.23." />
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold">Certification & Signature</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
          I certify that this application was completed by me, and that all entries on it and information in it are true and complete to the best of my knowledge.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input name="signature.signatureName" label="Electronic Signature (Type Full Name)" placeholder="Full Legal Name" required />
          <Input name="signature.signatureDate" label="Date" type="date" readOnly />
        </div>
        <Checkbox name="signature.agreedToElectronic" label="I agree that my typed name above constitutes a binding electronic signature, as legally valid as a handwritten signature." />
      </div>
    </div>
  );
}
