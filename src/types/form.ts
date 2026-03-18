import { z } from 'zod';

export const PreviousAddressSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  country: z.enum(['Canada', 'USA']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
});

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  suffix: z.string().optional(),
  residenceThreeYears: z.enum(['Yes', 'No']),
  previousAddresses: z.array(PreviousAddressSchema).optional(),
  currentAddress: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zip: z.string().min(5, 'Zip/Postal code is required'),
  country: z.enum(['Canada', 'USA']),
  ssn: z.string().min(9, 'SSN/SIN is required'),
  dob: z.string().min(10, 'Date of birth is required'),
  phone: z.string().min(7, 'Phone number is required'),
  preferredContact: z.enum(['Cell Phone', 'Email', 'Home Phone']),
  bestTimeToContact: z.string().optional(),
  email: z.string().email('Invalid email address'),
  privacyAgreement: z.boolean().refine(v => v === true, 'You must agree to the privacy policy'),
});

export const GeneralInfoSchema = z.object({
  position: z.enum(['Company Driver', 'Owner-Operator', 'Driver for Owner-Operator']),
  legallyEligible: z.enum(['Yes', 'No']),
  currentlyEmployed: z.enum(['Yes', 'No']),
  lastEmploymentEndDate: z.string().optional(),
  englishProficiency: z.enum(['Yes', 'No']),
  workedHereBefore: z.enum(['Yes', 'No']),
  previousWork: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    position: z.string().optional(),
    reasonForLeaving: z.string().optional(),
  }).optional(),
  hasTwic: z.enum(['Yes', 'No']),
  twicExpiration: z.string().optional(),
  knownByOtherName: z.enum(['Yes', 'No']),
  otherName: z.string().optional(),
  referredByDriver: z.enum(['Yes', 'No']),
  referringDriverName: z.string().optional(),
});

export const ExperienceRowSchema = z.object({
  hasExperience: z.enum(['Yes', 'No']),
  years: z.string().optional(),
});

export const DrivingExperienceSchema = z.object({
  straightTruck: ExperienceRowSchema,
  tractorSemi: ExperienceRowSchema,
  tractorTwoTrailers: ExperienceRowSchema,
  flatbed: ExperienceRowSchema,
  hazmat: ExperienceRowSchema,
  dryvan: ExperienceRowSchema,
  reefer: ExperienceRowSchema,
  tanker: ExperienceRowSchema,
  lumber: ExperienceRowSchema,
  crossBorderCanada: ExperienceRowSchema,
  crossBorderUSA: ExperienceRowSchema,
  bondedLoads: ExperienceRowSchema,
  others: z.string().optional(),
});

export const LicenseSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  state: z.string().min(1, 'State is required'),
  country: z.enum(['Canada', 'USA']),
  class: z.string().min(1, 'License class is required'),
  expirationDate: z.string().min(1, 'Expiration date is required'),
  dotMedicalExpiration: z.string().min(1, 'DOT Medical expiration is required'),
  isCurrent: z.boolean(),
  isCDL: z.boolean(),
  endorsements: z.array(z.string()),
});

export const MilitaryServiceSchema = z.object({
  served: z.enum(['Yes', 'No']),
  country: z.string().optional(),
  branch: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  rankAtDischarge: z.string().optional(),
  canObtainDD214: z.enum(['Yes', 'No']).optional(),
});

export const EmploymentSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required'),
  country: z.enum(['Canada', 'USA']),
  phone: z.string().min(1, 'Phone is required'),
  position: z.string().min(1, 'Position is required'),
  reasonForLeaving: z.string().min(1, 'Reason for leaving is required'),
  terminated: z.enum(['Yes', 'No']),
  isCurrent: z.enum(['Yes', 'No']),
  mayContact: z.enum(['Yes', 'No']),
  operatedCMV: z.enum(['Yes', 'No']),
});

export const DriverTrainingSchoolSchema = z.object({
  attended: z.enum(['Yes', 'No']),
  schoolName: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  country: z.enum(['Canada', 'USA']).optional(),
  phone: z.string().optional(),
  graduated: z.enum(['Yes', 'No']).optional(),
  subjectToFMCSR: z.enum(['Yes', 'No']).optional(),
  safetySensitive: z.enum(['Yes', 'No']).optional(),
  gpa: z.string().optional(),
  hoursOfInstruction: z.string().optional(),
  skillsTrained: z.array(z.string()).optional(),
});

export const OtherEducationSchema = z.object({
  attended: z.enum(['Yes', 'No']),
  schoolName: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.enum(['Canada', 'USA']).optional(),
  phone: z.string().optional(),
  studyField: z.string().optional(),
  graduationDate: z.string().optional(),
});

export const UnemploymentSchema = z.object({
  unemployed: z.enum(['Yes', 'No']),
  periods: z.array(z.object({
    startDate: z.string(),
    endDate: z.string(),
    comments: z.string(),
  })).optional(),
});

export const ViolationSchema = z.object({
  date: z.string(),
  description: z.string(),
  state: z.string(),
  isCommercial: z.enum(['Yes', 'No']),
  penalties: z.array(z.string()),
  fineAmount: z.string().optional(),
  comments: z.string().optional(),
});

export const AccidentSchema = z.object({
  date: z.string(),
  type: z.string(),
  hazmat: z.enum(['Yes', 'No']),
  towed: z.enum(['Yes', 'No']),
  city: z.string(),
  state: z.string(),
  isCommercial: z.enum(['Yes', 'No']),
  isFault: z.enum(['Yes', 'No']),
  isTicketed: z.enum(['Yes', 'No']),
  details: z.string(),
});

export const FMCSRSchema = z.object({
  deniedSuspended: z.enum(['Yes', 'No']),
  convictedSuspension: z.enum(['Yes', 'No']),
  convictedAlcohol: z.enum(['Yes', 'No']),
  convictedPossession: z.enum(['Yes', 'No']),
  convictedReckless: z.enum(['Yes', 'No']),
  drugTestPositiveRefused: z.enum(['Yes', 'No']),
  hasViolations: z.enum(['Yes', 'No']),
  violations: z.array(ViolationSchema).optional(),
  hasAccidents: z.enum(['Yes', 'No']),
  accidents: z.array(AccidentSchema).optional(),
  otherDetails: z.string().optional(),
});

export const DisclosuresSchema = z.object({
  fcraAcknowledgment: z.boolean().refine(v => v === true, 'Required'),
  pspAcknowledgment: z.boolean().refine(v => v === true, 'Required'),
  consumerReportAuth: z.boolean().refine(v => v === true, 'Required'),
  part391Auth: z.boolean().refine(v => v === true, 'Required'),
});

export const SignatureSchema = z.object({
  signatureName: z.string().min(2, 'Full name is required for signature'),
  signatureDate: z.string(),
  agreedToElectronic: z.boolean().refine(v => v === true, 'You must agree to electronic signature'),
});

export const DocumentSchema = z.object({
  type: z.enum(['Driver Record', 'Reference Letter', 'Other']),
  description: z.string().optional(),
  fileName: z.string(),
  fileSize: z.number(),
  base64: z.string().optional(), // In a real app, you'd upload to S3/Cloud Storage
});

export const FullApplicationSchema = z.object({
  personal: PersonalInfoSchema,
  general: GeneralInfoSchema,
  experience: DrivingExperienceSchema,
  licenses: z.array(LicenseSchema),
  military: MilitaryServiceSchema,
  employment: z.array(EmploymentSchema),
  training: DriverTrainingSchoolSchema,
  education: OtherEducationSchema,
  unemployment: UnemploymentSchema,
  fmcsr: FMCSRSchema,
  documents: z.array(DocumentSchema).optional(),
  disclosures: DisclosuresSchema,
  signature: SignatureSchema,
});

export type FullApplication = z.infer<typeof FullApplicationSchema>;
