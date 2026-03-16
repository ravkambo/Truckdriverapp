import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = "https://hallowed-sheep-602.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const sampleApplication = {
  personal: {
    firstName: "James",
    middleName: "Robert",
    lastName: "Mitchell",
    suffix: "",
    residenceThreeYears: "Yes",
    previousAddresses: [],
    currentAddress: "4821 Oakwood Drive",
    city: "Nashville",
    state: "TN",
    zip: "37201",
    country: "USA",
    ssn: "123456789",
    dob: "1985-04-12",
    phone: "6155550182",
    preferredContact: "Cell Phone",
    bestTimeToContact: "Morning",
    email: "james.mitchell@email.com",
    privacyAgreement: true,
  },
  general: {
    position: "Company Driver",
    legallyEligible: "Yes",
    currentlyEmployed: "Yes",
    lastEmploymentEndDate: "",
    englishProficiency: "Yes",
    workedHereBefore: "No",
    previousWorkDetails: "",
    hasTwic: "Yes",
    twicExpiration: "2027-06-30",
    knownByOtherName: "No",
    otherName: "",
    referredByDriver: "No",
    referringDriverName: "",
  },
  experience: {
    straightTruck: { hasExperience: "Yes", years: "5" },
    tractorSemi: { hasExperience: "Yes", years: "8" },
    tractorTwoTrailers: { hasExperience: "Yes", years: "3" },
    flatbed: { hasExperience: "Yes", years: "4" },
    hazmat: { hasExperience: "Yes", years: "2" },
    dryvan: { hasExperience: "Yes", years: "8" },
    reefer: { hasExperience: "Yes", years: "6" },
    tanker: { hasExperience: "No", years: "" },
    lumber: { hasExperience: "No", years: "" },
    crossBorderCanada: { hasExperience: "Yes", years: "3" },
    crossBorderUSA: { hasExperience: "Yes", years: "8" },
    bondedLoads: { hasExperience: "No", years: "" },
    others: "",
  },
  licenses: [
    {
      licenseNumber: "TN1234567",
      state: "TN",
      country: "USA",
      class: "A",
      expirationDate: "2028-04-12",
      dotMedicalExpiration: "2026-10-01",
      isCurrent: true,
      isCDL: true,
      endorsements: ["H", "T", "N"],
    },
  ],
  military: {
    served: "No",
  },
  employment: [
    {
      company: "Heartland Express",
      startDate: "2018-03-01",
      endDate: "2024-01-15",
      address: "901 N Kansas Ave",
      city: "North Liberty",
      state: "IA",
      zip: "52317",
      country: "USA",
      phone: "3195459100",
      position: "OTR Class A Driver",
      reasonForLeaving: "Seeking local/regional routes closer to family",
      terminated: "No",
      isCurrent: "No",
      mayContact: "Yes",
      operatedCMV: "Yes",
    },
    {
      company: "Werner Enterprises",
      startDate: "2015-06-01",
      endDate: "2018-02-28",
      address: "14507 Frontier Rd",
      city: "Omaha",
      state: "NE",
      zip: "68138",
      country: "USA",
      phone: "4023951400",
      position: "Long Haul Driver",
      reasonForLeaving: "Better compensation at Heartland",
      terminated: "No",
      isCurrent: "No",
      mayContact: "Yes",
      operatedCMV: "Yes",
    },
  ],
  training: {
    attended: "Yes",
    schoolName: "Tennessee Truck Driving School",
    startDate: "2015-01-05",
    endDate: "2015-05-20",
    state: "TN",
    address: "500 Vann Dr",
    address2: "",
    city: "Jackson",
    country: "USA",
    phone: "7316680001",
    graduated: "Yes",
    subjectToFMCSR: "Yes",
    safetySensitive: "Yes",
    gpa: "3.8",
    hoursOfInstruction: "320",
    skillsTrained: ["Pre-Trip Inspection", "Backing", "Coupling/Uncoupling", "Hazmat Handling"],
  },
  education: {
    attended: "Yes",
    schoolName: "Nashville Community College",
    startDate: "2003-09-01",
    endDate: "2005-05-15",
    city: "Nashville",
    state: "TN",
    country: "USA",
    phone: "6153665901",
    studyField: "Business Management",
    graduationDate: "2005-05-15",
  },
  unemployment: {
    unemployed: "No",
    periods: [],
  },
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
    otherDetails: "",
  },
  documents: [],
  disclosures: {
    fcraAcknowledgment: true,
    consumerReportAuth: true,
    part391Auth: true,
  },
  signature: {
    signatureName: "James Robert Mitchell",
    signatureDate: "2026-03-16",
    agreedToElectronic: true,
  },
};

async function main() {
  console.log("Submitting sample application for James Mitchell...");

  try {
    const id = await client.mutation(api.applications.submitApplication, {
      firstName: sampleApplication.personal.firstName,
      lastName: sampleApplication.personal.lastName,
      email: sampleApplication.personal.email,
      phone: sampleApplication.personal.phone,
      rawData: JSON.stringify(sampleApplication),
    });

    console.log("✓ Application submitted successfully!");
    console.log("  Convex document ID:", id);
    console.log("  Name:", sampleApplication.personal.firstName, sampleApplication.personal.lastName);
    console.log("  Email:", sampleApplication.personal.email);
    console.log("  CDL Class:", sampleApplication.licenses[0].class, "- Endorsements:", sampleApplication.licenses[0].endorsements.join(", "));
    console.log("  Years OTR experience: 8+");
    console.log("  Status: Pending");
  } catch (err) {
    console.error("✗ Submission failed:", err.message);
    process.exit(1);
  }
}

main();
