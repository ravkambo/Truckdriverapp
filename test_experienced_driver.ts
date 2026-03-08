import { FullApplicationSchema } from './src/types/form';

const experiencedDriverData = {
  personal: {
    firstName: "James",
    lastName: "Logan",
    middleName: "Howlett",
    suffix: "Sr.",
    email: "james.logan@example.com",
    phone: "555-010-9900",
    ssn: "999-00-1234",
    dob: "1975-05-20",
    currentAddress: "1407 Graymalkin Lane",
    city: "Salem Center",
    state: "NY",
    zip: "10560",
    country: "USA",
    residenceThreeYears: "No",
    previousAddresses: [
      { address: "123 Old Road", city: "Alberta", state: "AB", zip: "T0A", country: "Canada", startDate: "2020-01-01", endDate: "2022-01-01" },
      { address: "456 Forest Ave", city: "Vancouver", state: "BC", zip: "V5K", country: "Canada", startDate: "2018-01-01", endDate: "2020-01-01" }
    ],
    preferredContact: "Cell Phone",
    bestTimeToContact: "Morning",
    privacyAgreement: true
  },
  general: {
    position: "Owner-Operator",
    legallyEligible: "Yes",
    currentlyEmployed: "No",
    lastEmploymentEndDate: "2026-01-01",
    englishProficiency: "Yes",
    workedHereBefore: "No",
    hasTwic: "Yes",
    twicExpiration: "2028-12-31",
    knownByOtherName: "Yes",
    otherName: "Wolverine",
    referredByDriver: "No"
  },
  experience: {
    straightTruck: { hasExperience: "Yes", years: "5+" },
    tractorSemi: { hasExperience: "Yes", years: "5+" },
    tractorTwoTrailers: { hasExperience: "Yes", years: "5+" },
    flatbed: { hasExperience: "Yes", years: "5+" },
    hazmat: { hasExperience: "Yes", years: "5+" },
    dryvan: { hasExperience: "Yes", years: "5+" },
    reefer: { hasExperience: "Yes", years: "5+" },
    tanker: { hasExperience: "Yes", years: "5+" },
    lumber: { hasExperience: "Yes", years: "5+" },
    crossBorderCanada: { hasExperience: "Yes", years: "5+" },
    crossBorderUSA: { hasExperience: "Yes", years: "5+" },
    bondedLoads: { hasExperience: "Yes", years: "5+" },
    others: "Heavy Haul, Oversize Loads"
  },
  licenses: [
    { licenseNumber: "LIC123456", state: "NY", country: "USA", class: "Class A", expirationDate: "2030-01-01", dotMedicalExpiration: "2027-01-01", isCurrent: true, isCDL: true, endorsements: ["HazMat", "Tanker", "Doubles / Triples"] }
  ],
  military: { served: "Yes", country: "Canada", branch: "Special Forces", startDate: "1990-01-01", endDate: "1995-01-01", rankAtDischarge: "Captain", canObtainDD214: "Yes" },
  employment: [
    { company: "X-Logistics", startDate: "2022-01-01", endDate: "2026-01-01", address: "1 Westchester", city: "Westchester", state: "NY", zip: "10560", country: "USA", phone: "555-1111", position: "Lead Driver", reasonForLeaving: "Contract End", terminated: "No", isCurrent: "No", mayContact: "Yes", operatedCMV: "Yes" },
    { company: "Alpha Flight Trucking", startDate: "2015-01-01", endDate: "2022-01-01", address: "100 Maple St", city: "Toronto", state: "ON", zip: "M5V", country: "Canada", phone: "555-2222", position: "Heavy Haul Specialist", reasonForLeaving: "Relocation", terminated: "No", isCurrent: "No", mayContact: "Yes", operatedCMV: "Yes" },
    { company: "Department H Trans", startDate: "2010-01-01", endDate: "2015-01-01", address: "Ottawa Secret", city: "Ottawa", state: "ON", zip: "K1A", country: "Canada", phone: "555-3333", position: "Tactical Transport", reasonForLeaving: "Career Change", terminated: "No", isCurrent: "No", mayContact: "Yes", operatedCMV: "Yes" }
  ],
  training: { attended: "Yes", schoolName: "Xavier Driver Institute", startDate: "2000-01-01", endDate: "2000-06-01", state: "NY", address: "1407 Graymalkin", city: "Salem Center", country: "USA", phone: "555-0000", graduated: "Yes", subjectToFMCSR: "Yes", safetySensitive: "Yes", gpa: "4.0", hoursOfInstruction: "1000", skillsTrained: ["Log Books", "Hazardous Materials"] },
  education: { attended: "No" },
  unemployment: { unemployed: "No", periods: [] },
  fmcsr: { 
    deniedSuspended: "No", 
    convictedSuspension: "No", 
    convictedAlcohol: "No", 
    convictedPossession: "No", 
    convictedReckless: "No", 
    drugTestPositiveRefused: "No", 
    hasViolations: "No", 
    violations: [], 
    hasAccidents: "No", 
    accidents: [], 
    otherDetails: "None" 
  },
  disclosures: { fcraAcknowledgment: true, consumerReportAuth: true, part391Auth: true },
  signature: { signatureName: "James Howlett", signatureDate: "2026-03-08", agreedToElectronic: true }
};

try {
  FullApplicationSchema.parse(experiencedDriverData);
  console.log("SUCCESS: The application correctly validated a highly experienced driver profile with 15+ years of history and complex endorsements.");
} catch (error) {
  console.error("VALIDATION FAILED:", error);
  process.exit(1);
}
