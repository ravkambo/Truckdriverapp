import { useFormContext } from 'react-hook-form';
import { Checkbox, Input } from './FormElements';
import { type FullApplication } from '../types/form';

export function Disclosures() {
  const { register, formState: { errors } } = useFormContext<FullApplication>();

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Consent & Disclosures</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Mandatory legal acknowledgments and authorizations.</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Federal FCRA Summary of Rights</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-medium">
            By checking this box, I (a) acknowledge that I have read and understand the federal FCRA Summary of Rights and have been given the opportunity to copy/print the Summary of Rights and (b) agree to use an electronic signature to demonstrate my consent.
          </p>
          <Checkbox
            label="I acknowledge and agree to the FCRA Summary of Rights"
            {...register('disclosures.fcraAcknowledgment')}
            error={errors.disclosures?.fcraAcknowledgment?.message as string}
          />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">PSP Disclosure and Authorization</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-medium">
            I acknowledge that I have read and understand the PSP Disclosure and Authorization and also have been given the opportunity to copy/print it, and agree to use an electronic signature.
          </p>
          <Checkbox
            label="I acknowledge and agree to the PSP Disclosure"
            {...register('disclosures.pspDisclosure')}
            error={errors.disclosures?.pspDisclosure?.message as string}
          />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">FCRA Disclosure and Authorization</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-medium">
            I acknowledge that I have read and understand the FCRA Disclosure and Authorization and also have been given the opportunity to copy/print it, and agree to use an electronic signature.
          </p>
          <Checkbox
            label="I acknowledge and agree to the FCRA Disclosure"
            {...register('disclosures.fcraDisclosure')}
            error={errors.disclosures?.fcraDisclosure?.message as string}
          />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Additional Consent or Certification</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-medium">
            I acknowledge that I have read and understand the Additional Consent or Certification and also have been given the opportunity to copy/print it, and agree to use an electronic signature.
          </p>
          <Checkbox
            label="I acknowledge and agree to the Additional Consent"
            {...register('disclosures.additionalConsent')}
            error={errors.disclosures?.additionalConsent?.message as string}
          />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">DOT Drug and Alcohol Release</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-medium">
            I acknowledge that I have read and understand the Employment Verification Acknowledgment and Release for DOT Drug and Alcohol testing.
          </p>
          <Checkbox
            label="I acknowledge and agree to the DOT Release"
            {...register('disclosures.employmentVerification')}
            error={errors.disclosures?.employmentVerification?.message as string}
          />
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Clearinghouse Release</h3>
          <Checkbox
            label="I acknowledge and agree to the Clearinghouse Release"
            {...register('disclosures.clearinghouseRelease')}
            error={errors.disclosures?.clearinghouseRelease?.message as string}
          />
        </div>

        <Checkbox
          label="User requested a copy to be sent to their email address"
          {...register('disclosures.userRequestedCopy')}
        />
      </div>
    </div>
  );
}

export function FinalSignature() {
  const { register, formState: { errors } } = useFormContext<FullApplication>();

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Certification & Signature</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Finalize and certify your driver profile.</p>
      </div>

      <div className="prose prose-sm text-slate-600 dark:text-slate-400 max-w-none leading-relaxed font-medium">
        <p>
          By signing my application below, I agree to use an electronic signature to demonstrate my consent. An electronic signature is as legally binding as an ink signature.
        </p>
        <p>
          This certifies that this application was completed by me, and that all entries on it and information in it are true and complete to the best of my knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input
          label="Full Name (Digital Signature)"
          {...register('signature.signatureName')}
          error={errors.signature?.signatureName?.message as string}
        />
        <Input
          label="Certification Date"
          type="date"
          {...register('signature.signatureDate')}
          error={errors.signature?.signatureDate?.message as string}
        />
      </div>

      <div className="p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Digital Signature Verification</p>
        <div className="h-28 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center shadow-inner">
          <span className="font-serif text-3xl italic text-slate-300 dark:text-slate-700 select-none"></span>
        </div>
        <Checkbox
          label="I certify that all information provided is true and correct to the best of my knowledge."
          {...register('signature.agreedToElectronic')}
          error={errors.signature?.agreedToElectronic?.message as string}
        />
      </div>
    </div>
  );
}
