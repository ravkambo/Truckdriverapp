import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select, RadioGroup, Checkbox } from './FormElements';
import { Plus, Trash2 } from 'lucide-react';

export function PersonalInfo() {
  const { watch, control } = useFormContext();
  const residenceThreeYears = watch('personal.residenceThreeYears');
  const { fields, append, remove } = useFieldArray({
    control,
    name: "personal.previousAddresses"
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Please provide your legal contact and identification details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input name="personal.firstName" label="First Name" />
        <Input name="personal.middleName" label="Middle Name" />
        <Input name="personal.lastName" label="Last Name" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select name="personal.suffix" label="Suffix" options={[
          { label: 'None', value: '' },
          { label: 'Jr.', value: 'Jr.' },
          { label: 'Sr.', value: 'Sr.' },
          { label: 'II', value: 'II' },
          { label: 'III', value: 'III' },
          { label: 'IV', value: 'IV' },
        ]} />
        <Input name="personal.email" label="Email Address" type="email" placeholder="john.doe@example.com" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="personal.phone" label="Phone Number" placeholder="(555) 000-0000" />
        <Select name="personal.preferredContact" label="Preferred Contact Method" options={[
          { label: 'Cell Phone', value: 'Cell Phone' },
          { label: 'Email', value: 'Email' },
          { label: 'Home Phone', value: 'Home Phone' },
        ]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="personal.bestTimeToContact" label="Best Time to Contact" placeholder="e.g., Mornings after 9am" />
        <Input name="personal.ssn" label="SSN / SIN" placeholder="000-00-0000" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input name="personal.dob" label="Date of Birth" type="date" />
      </div>

      <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Current Address</h3>
        <Input name="personal.currentAddress" label="Street Address" placeholder="123 Logistics Way" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Input name="personal.city" label="City" className="md:col-span-2" />
          <Input name="personal.state" label="State/Province" />
          <Input name="personal.zip" label="Zip/Postal Code" />
        </div>
        <Select name="personal.country" label="Country" options={[
          { label: 'USA', value: 'USA' },
          { label: 'Canada', value: 'Canada' },
        ]} />
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <RadioGroup 
          name="personal.residenceThreeYears" 
          label="Have you lived at your current address for 3 years or longer?"
          options={[
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
          ]}
        />
      </div>

      {residenceThreeYears === 'No' && (
        <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Previous Addresses (Last 3 Years)</h3>
            <button
              type="button"
              onClick={() => append({ address: '', city: '', state: '', zip: '', country: 'USA', startDate: '', endDate: '' })}
              className="flex items-center gap-2 text-xs font-bold bg-logistics-blue text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"
            >
              <Plus size={14} /> Add Address
            </button>
          </div>
          
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">Previous Address #{index + 1}</span>
                <button type="button" onClick={() => remove(index)} className="text-rose-500 hover:text-rose-600">
                  <Trash2 size={16} />
                </button>
              </div>
              <Input name={`personal.previousAddresses.${index}.address`} label="Street Address" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input name={`personal.previousAddresses.${index}.city`} label="City" className="md:col-span-1" />
                <Input name={`personal.previousAddresses.${index}.state`} label="State/Prov" />
                <Input name={`personal.previousAddresses.${index}.zip`} label="Zip/Postal" />
                <Select name={`personal.previousAddresses.${index}.country`} label="Country" options={[{label:'USA', value:'USA'}, {label:'Canada', value:'Canada'}]} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input name={`personal.previousAddresses.${index}.startDate`} label="Start Date" type="date" />
                <Input name={`personal.previousAddresses.${index}.endDate`} label="End Date" type="date" />
              </div>
            </div>
          ))}
        </div>
      )}

      <Checkbox 
        name="personal.privacyAgreement" 
        label="I acknowledge that I have read and agree to the Privacy Policy and consent to the collection and processing of my personal data as described." 
      />
    </div>
  );
}

export function GeneralInformation() {
  const { watch } = useFormContext();
  const currentlyEmployed = watch('general.currentlyEmployed');
  const workedHereBefore = watch('general.workedHereBefore');
  const hasTwic = watch('general.hasTwic');
  const knownByOtherName = watch('general.knownByOtherName');
  const referredByDriver = watch('general.referredByDriver');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">General Information</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Please provide general background and eligibility information.</p>
      </div>

      <Select name="general.position" label="What position are you applying for?" options={[
        { label: 'Company Driver', value: 'Company Driver' },
        { label: 'Owner-Operator', value: 'Owner-Operator' },
        { label: 'Driver for Owner-Operator', value: 'Driver for Owner-Operator' },
      ]} />

      <RadioGroup name="general.legallyEligible" label="Are you legally eligible for employment in the United States or Canada?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />

      <div className="space-y-4">
        <RadioGroup name="general.currentlyEmployed" label="Are you currently employed?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
        {currentlyEmployed === 'No' && (
          <Input name="general.lastEmploymentEndDate" label="What date did your last employment end?" type="date" />
        )}
      </div>

      <RadioGroup name="general.englishProficiency" label="Do you read, write, and speak English?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />

      <div className="space-y-4">
        <RadioGroup name="general.workedHereBefore" label="Have you ever worked for this company before?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
        {workedHereBefore === 'Yes' && (
          <Input name="general.previousWorkDetails" label="Enter start/end dates, location, position, and reason for leaving" placeholder="Dates: 2020-2022, Location: Chicago, Position: Driver, Reason: Relocation" />
        )}
      </div>

      <div className="space-y-4">
        <RadioGroup name="general.hasTwic" label="Do you have a current TWIC card?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
        {hasTwic === 'Yes' && (
          <Input name="general.twicExpiration" label="TWIC Expiration Date" type="date" />
        )}
      </div>

      <div className="space-y-4">
        <RadioGroup name="general.knownByOtherName" label="Have you ever been known by any other name?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
        {knownByOtherName === 'Yes' && (
          <Input name="general.otherName" label="Enter other name" placeholder="Maiden name or alias" />
        )}
      </div>

      <div className="space-y-4">
        <RadioGroup name="general.referredByDriver" label="Were you referred by another driver currently employed by this company?" options={[{label:'Yes', value:'Yes'}, {label:'No', value:'No'}]} />
        {referredByDriver === 'Yes' && (
          <Input name="general.referringDriverName" label="Referring Driver's Name" placeholder="Enter driver's name" />
        )}
      </div>
    </div>
  );
}
