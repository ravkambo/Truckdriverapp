import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  residenceThreeYears: z.enum(['Yes', 'No']),
  currentAddress: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zip: z.string().min(5, 'Zip/Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  ssn: z.string().min(9, 'SSN/SIN is required'),
  dob: z.string().min(10, 'Date of birth is required'),
  phone: z.string().min(10, 'Phone number is required'),
  preferredContact: z.enum(['Cell Phone', 'Email', 'Home Phone']),
  bestTimeToContact: z.string(),
  email: z.string().email('Invalid email address'),
  privacyAgreement: z.boolean().refine(v => v === true, 'You must agree to the privacy policy'),
});

export const CompanyQuestionsSchema = z.object({
  applyingToCompany: z.string().min(1, 'Company name is required'),
  companyAddress: z.string().min(1, 'Company address is required'),
  position: z.string().min(1, 'Position is required'),
  referredBy: z.string().optional(),
  crossingBorders: z.enum(['Yes', 'No']),
  emergencyContact: z.string().min(5, 'Emergency contact info is required'),
});

export const LicenseSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  class: z.string().min(1, 'License class is required'),
  expirationDate: z.string().min(1, 'Expiration date is required'),
  physicalExpirationDate: z.string().min(1, 'Physical expiration date is required'),
  isCurrent: z.enum(['Yes', 'No']),
  isCDL: z.enum(['Yes', 'No']),
  endorsements: z.string().optional(),
});

export const EmploymentSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  address: z.string().min(1, 'Address is required'),
  cityStateZip: z.string().min(1, 'City, State, Zip is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().min(1, 'Phone is required'),
  position: z.string().min(1, 'Position is required'),
  reasonForLeaving: z.string().min(1, 'Reason for leaving is required'),
  terminated: z.enum(['Yes', 'No']),
  isCurrent: z.enum(['Yes', 'No']),
  mayContact: z.enum(['Yes', 'No']),
  operatedCMV: z.enum(['Yes', 'No']),
  subjectToFMCSR: z.enum(['Yes', 'No']),
  safetySensitive: z.enum(['Yes', 'No']),
  areasDriven: z.string().optional(),
  milesWeekly: z.string().optional(),
  payRange: z.string().optional(),
  truckType: z.string().optional(),
  trailerType: z.string().optional(),
  trailerLength: z.string().optional(),
});

export const EducationSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  cityState: z.string().min(1, 'City/State is required'),
  country: z.string().min(1, 'Country is required'),
  studyField: z.string().min(1, 'Field of study is required'),
  graduationDate: z.string().optional(),
});

export const RecordsSchema = z.object({
  licenseDenied: z.enum(['Yes', 'No']),
  convictedSuspended: z.enum(['Yes', 'No']),
  convictedAlcohol: z.enum(['Yes', 'No']),
  convictedIllegalSubstance: z.enum(['Yes', 'No']),
  convictedReckless: z.enum(['Yes', 'No']),
  drugTestPositive: z.enum(['Yes', 'No']),
  accidentsLast5Years: z.string().min(1, 'Please describe accidents or state "None"'),
  violationsLast3Years: z.string().min(1, 'Please describe violations or state "None"'),
  convictedCrime: z.enum(['Yes', 'No']),
  deferredProsecution: z.enum(['Yes', 'No']),
  criminalChargesPending: z.enum(['Yes', 'No']),
  pledGuiltyFelony: z.enum(['Yes', 'No']),
  ministerPermit: z.enum(['Yes', 'No']),
  pledGuiltyMisdemeanor: z.enum(['Yes', 'No']),
});

export const DisclosuresSchema = z.object({
  fcraAcknowledgment: z.boolean().refine(v => v === true, 'Required'),
  pspDisclosure: z.boolean().refine(v => v === true, 'Required'),
  additionalConsent: z.boolean().refine(v => v === true, 'Required'),
  fcraDisclosure: z.boolean().refine(v => v === true, 'Required'),
  employmentVerification: z.boolean().refine(v => v === true, 'Required'),
  clearinghouseRelease: z.boolean().refine(v => v === true, 'Required'),
  userRequestedCopy: z.boolean().optional(),
});

export const SignatureSchema = z.object({
  signatureName: z.string().min(2, 'Full name is required for signature'),
  signatureDate: z.string(),
  agreedToElectronic: z.boolean().refine(v => v === true, 'You must agree to electronic signature'),
});

export const FullApplicationSchema = z.object({
  personal: PersonalInfoSchema,
  company: CompanyQuestionsSchema,
  licenses: z.array(LicenseSchema),
  employment: z.array(EmploymentSchema),
  education: z.array(EducationSchema),
  records: RecordsSchema,
  disclosures: DisclosuresSchema,
  signature: SignatureSchema,
});

export type FullApplication = z.infer<typeof FullApplicationSchema>;
