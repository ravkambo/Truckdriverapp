import { useFormContext } from 'react-hook-form';
import { Input, Select, Checkbox } from './FormElements';
import { type FullApplication } from '../types/form';

export function PersonalInfo() {
  const { register, formState: { errors } } = useFormContext<FullApplication>();

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Personal Information</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Basic contact and identification details for your driver profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          {...register('personal.fullName')}
          error={errors.personal?.fullName?.message as string}
        />
        <Select
          label="Residence 3 years or longer?"
          options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
          {...register('personal.residenceThreeYears')}
          error={errors.personal?.residenceThreeYears?.message as string}
        />
      </div>

      <Input
        label="Current Address"
        {...register('personal.currentAddress')}
        error={errors.personal?.currentAddress?.message as string}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="City"
          {...register('personal.city')}
          error={errors.personal?.city?.message as string}
        />
        <Input
          label="State/Province"
          {...register('personal.state')}
          error={errors.personal?.state?.message as string}
        />
        <Input
          label="Zip/Postal"
          {...register('personal.zip')}
          error={errors.personal?.zip?.message as string}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Country"
          {...register('personal.country')}
          error={errors.personal?.country?.message as string}
        />
        <Input
          label="SSN/SIN"
          {...register('personal.ssn')}
          error={errors.personal?.ssn?.message as string}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          {...register('personal.dob')}
          error={errors.personal?.dob?.message as string}
        />
        <Input
          label="Primary Phone"
          {...register('personal.phone')}
          error={errors.personal?.phone?.message as string}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Preferred method of contact"
          options={[
            { label: 'Cell Phone', value: 'Cell Phone' },
            { label: 'Email', value: 'Email' },
            { label: 'Home Phone', value: 'Home Phone' }
          ]}
          {...register('personal.preferredContact')}
          error={errors.personal?.preferredContact?.message as string}
        />
        <Input
          label="Best time to contact you"
          {...register('personal.bestTimeToContact')}
          error={errors.personal?.bestTimeToContact?.message as string}
        />
      </div>

      <Input
        label="Email"
        type="email"
        {...register('personal.email')}
        error={errors.personal?.email?.message as string}
      />

      <Checkbox
        label="I agree to the use and disclosure of my information as described in the privacy policy"
        {...register('personal.privacyAgreement')}
        error={errors.personal?.privacyAgreement?.message as string}
      />
    </div>
  );
}

export function CompanyQuestions() {
  const { register, formState: { errors } } = useFormContext<FullApplication>();

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Company Questions</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Details about the position you are applying for.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="What company are you applying to?"
          {...register('company.applyingToCompany')}
          error={errors.company?.applyingToCompany?.message as string}
        />
        <Input
          label="What position are you applying for?"
          {...register('company.position')}
          error={errors.company?.position?.message as string}
        />
      </div>

      <Input
        label="What is the address for the company you are applying for?"
        {...register('company.companyAddress')}
        error={errors.company?.companyAddress?.message as string}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Who referred you?"
          {...register('company.referredBy')}
          error={errors.company?.referredBy?.message as string}
        />
        <Select
          label="Will you be crossing borders?"
          options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
          {...register('company.crossingBorders')}
          error={errors.company?.crossingBorders?.message as string}
        />
      </div>

      <Input
        label="In case of Emergency, notify: (name, relationship, address, phone)"
        {...register('company.emergencyContact')}
        error={errors.company?.emergencyContact?.message as string}
      />
    </div>
  );
}
