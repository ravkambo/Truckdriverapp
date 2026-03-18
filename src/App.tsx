import { useState, useMemo, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, Truck, FileText, ShieldCheck, UserCheck, Sun, Moon, Phone, Download, Briefcase, GraduationCap, History, AlertTriangle } from 'lucide-react';
import { 
  FullApplicationSchema, 
  type FullApplication,
  PersonalInfoSchema,
  GeneralInfoSchema,
  DrivingExperienceSchema,
  LicenseSchema,
  MilitaryServiceSchema,
  EmploymentSchema,
  DriverTrainingSchoolSchema,
  OtherEducationSchema,
  UnemploymentSchema,
  FMCSRSchema,
  DocumentSchema,
  DisclosuresSchema,
  SignatureSchema
} from './types/form';
import { PersonalInfo, GeneralInformation } from './components/Steps1-2';
import { DrivingExperience, LicenseDetails } from './components/Steps3-4';
import { MilitaryAndEmployment, TrainingAndEducation } from './components/Steps5-6';
import { FMCSR, DisclosuresAndSignature } from './components/Steps7-8';
import { cn } from './lib/utils';
import { z } from 'zod';
import { generateBlankPDF } from './lib/pdfGenerator';

import { DocumentUpload } from './components/Step9-Documents';

const STEPS = [
  { id: 'personal', title: 'Personal Information', icon: UserCheck, schema: PersonalInfoSchema },
  { id: 'general', title: 'General Information', icon: Briefcase, schema: GeneralInfoSchema },
  { id: 'experience', title: 'Driving Experience', icon: Truck, schema: DrivingExperienceSchema },
  { id: 'licenses', title: 'License Details', icon: FileText, schema: z.array(LicenseSchema) },
  { id: 'employment', title: 'Employment History', icon: History, schema: z.any() }, // Combined military/employment/training/education/unemployment
  { id: 'fmcsr', title: 'FMCSR Compliance', icon: AlertTriangle, schema: FMCSRSchema },
  { id: 'documents', title: 'Document Upload', icon: FileText, schema: z.array(DocumentSchema).optional() },
  { id: 'disclosures', title: 'Consent & Disclosures', icon: ShieldCheck, schema: DisclosuresSchema },
  { id: 'signature', title: 'Certification & Signature', icon: CheckCircle2, schema: SignatureSchema },
];

const defaultExp = { hasExperience: 'No' as const, years: '' };

const STORAGE_KEY = 'truck_driver_app_v1';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [readyToSave, setReadyToSave] = useState(false);

  // Extract company name from URL or default to Cargo Clarity
  const companyName = useMemo(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('company') || 'Cargo Clarity';
    }
    return 'Cargo Clarity';
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const methods = useForm<FullApplication>({
    resolver: zodResolver(FullApplicationSchema),
    mode: 'onChange',
    defaultValues: {
      personal: { residenceThreeYears: 'Yes', country: 'USA', preferredContact: 'Cell Phone', privacyAgreement: false, previousAddresses: [] },
      general: { position: 'Company Driver', legallyEligible: 'Yes', currentlyEmployed: 'Yes', englishProficiency: 'Yes', workedHereBefore: 'No', hasTwic: 'No', knownByOtherName: 'No', referredByDriver: 'No' },
      experience: {
        straightTruck: defaultExp, tractorSemi: defaultExp, tractorTwoTrailers: defaultExp, flatbed: defaultExp,
        hazmat: defaultExp, dryvan: defaultExp, reefer: defaultExp, tanker: defaultExp, lumber: defaultExp,
        crossBorderCanada: defaultExp, crossBorderUSA: defaultExp, bondedLoads: defaultExp
      },
      licenses: [{ endorsements: [], isCurrent: true, isCDL: true, country: 'USA' }],
      military: { served: 'No' },
      employment: [],
      training: { attended: 'No', skillsTrained: [] },
      education: { attended: 'No' },
      unemployment: { unemployed: 'No', periods: [] },
      fmcsr: { 
        deniedSuspended: 'No', 
        convictedSuspension: 'No', 
        convictedAlcohol: 'No', 
        convictedPossession: 'No', 
        convictedReckless: 'No', 
        drugTestPositiveRefused: 'No', 
        hasViolations: 'No', 
        hasAccidents: 'No', 
        violations: [], 
        accidents: [] 
      },
      disclosures: { fcraAcknowledgment: false, pspAcknowledgment: false, consumerReportAuth: false, part391Auth: false },
      signature: { agreedToElectronic: false, signatureDate: new Date().toISOString().split('T')[0] }
    }
  });

  const { handleSubmit, trigger, watch, getValues } = methods;
  const formData = watch();

  // Check for saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        JSON.parse(saved);
        setShowResumePrompt(true);
      } else {
        setReadyToSave(true);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      setReadyToSave(true);
    }
  }, []);

  // Autosave whenever form data or step changes
  useEffect(() => {
    if (readyToSave) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: currentStep, values: formData }));
      } catch {
        // Ignore storage errors (e.g. quota exceeded with large file uploads)
      }
    }
  }, [formData, currentStep, readyToSave]);

  const handleResume = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { step, values } = JSON.parse(saved);
        methods.reset(values);
        setCurrentStep(step ?? 0);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setShowResumePrompt(false);
    setReadyToSave(true);
  };

  const handleStartOver = () => {
    localStorage.removeItem(STORAGE_KEY);
    setShowResumePrompt(false);
    setReadyToSave(true);
  };

  const handleDownloadPDF = () => {
    const data = getValues();
    generateBlankPDF(data, companyName);
  };

  const stepCompletion = useMemo(() => {
    return STEPS.map((step) => {
      // Custom mapping for our combined steps if needed
      let sectionData;
      if (step.id === 'employment') {
        // For employment history step, we'd ideally validate military, employment, training, education, and unemployment
        const m = MilitaryServiceSchema.safeParse((formData as any).military);
        const e = z.array(EmploymentSchema).safeParse((formData as any).employment);
        const t = DriverTrainingSchoolSchema.safeParse((formData as any).training);
        const ed = OtherEducationSchema.safeParse((formData as any).education);
        const u = UnemploymentSchema.safeParse((formData as any).unemployment);
        return m.success && e.success && t.success && ed.success && u.success;
      }
      
      sectionData = (formData as any)[step.id];
      if (!sectionData) return false;
      const result = step.schema.safeParse(sectionData);
      return result.success;
    });
  }, [formData]);

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await trigger(fields as any);
    
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
      window.scrollTo(0, 0);
    } else {
      console.log('Validation failed', methods.formState.errors);
      await trigger(fields as any);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 0: return ['personal'];
      case 1: return ['general'];
      case 2: return ['experience'];
      case 3: return ['licenses'];
      case 4: return ['military', 'employment', 'training', 'education', 'unemployment'];
      case 5: return ['fmcsr'];
      case 6: return ['documents'];
      case 7: return ['disclosures'];
      case 8: return ['signature'];
      default: return [];
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FullApplication) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/submit-application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail ?? 'Submission failed');
      }

      localStorage.removeItem(STORAGE_KEY);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an issue saving your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn("min-h-screen bg-logistics-bg-light dark:bg-logistics-bg-dark flex items-center justify-center p-4 transition-colors duration-300", isDarkMode && "dark")}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl text-center space-y-6 border border-slate-200 dark:border-slate-800"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Application Submitted</h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Thank you for your interest. Your application has been received and is being processed. You will receive a copy via email shortly.
          </p>
          <button
            onClick={handleDownloadPDF}
            className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <Download size={18} /> Download PDF Copy
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-logistics-blue text-white rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-logistics-blue/20"
          >
            Start New Application
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen bg-logistics-bg-light dark:bg-logistics-bg-dark text-slate-900 dark:text-slate-100 selection:bg-logistics-blue selection:text-white transition-colors duration-300", isDarkMode && "dark")}>
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-logistics-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-logistics-blue/20">
              <Truck size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">{companyName}</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Commercial Driver Application</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              className="hidden md:flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm font-bold"
              title="Download Application PDF"
            >
              <Download size={20} />
              <span className="hidden lg:inline">Download PDF</span>
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="tel:6477662660" className="flex items-center gap-2 bg-logistics-blue text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-logistics-blue/20">
              <Phone size={16} />
              <span className="hidden sm:inline">647-766-2660</span>
            </a>
          </div>
        </div>
      </header>

      {showResumePrompt && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <p className="flex-1 text-sm font-semibold text-amber-900 dark:text-amber-200">You have an application in progress. Resume where you left off?</p>
            <div className="flex gap-2 shrink-0">
              <button onClick={handleResume} className="px-4 py-2 bg-logistics-blue text-white text-sm font-bold rounded-xl hover:opacity-90 transition-all">Resume</button>
              <button onClick={handleStartOver} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">Start Over</button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1 space-y-2">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = stepCompletion[index];
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-full flex items-center gap-4 p-3.5 rounded-xl transition-all text-left group",
                    isActive ? "bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800" : "hover:bg-slate-200/50 dark:hover:bg-slate-800/50",
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                    isActive ? "bg-logistics-blue text-white shadow-lg shadow-logistics-blue/20" : isCompleted ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                  )}>
                    {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Step 0{index + 1}</span>
                    <span className={cn("text-sm font-bold", isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>{step.title}</span>
                  </div>
                </button>
              );
            })}
          </aside>

          <div className="lg:col-span-3">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-h-[600px] flex flex-col">
                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                      {currentStep === 0 && <PersonalInfo />}
                      {currentStep === 1 && <GeneralInformation />}
                      {currentStep === 2 && <DrivingExperience />}
                      {currentStep === 3 && <LicenseDetails />}
                      {currentStep === 4 && <MilitaryAndEmployment />}
                      {currentStep === 5 && <FMCSR />}
                      {currentStep === 6 && <DocumentUpload />}
                      {currentStep === 7 && <DisclosuresAndSignature />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={prevStep} disabled={currentStep === 0} className={cn("flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all", currentStep === 0 ? "opacity-0 pointer-events-none" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400")}>
                      <ChevronLeft size={18} /> Back
                    </button>
                    {currentStep === STEPS.length - 1 ? (
                      <button type="submit" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-emerald-600 text-white px-12 py-3.5 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                        Submit Profile <CheckCircle2 size={18} />
                      </button>
                    ) : (
                      <button type="button" onClick={nextStep} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-logistics-blue text-white px-12 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-logistics-blue/20">
                        Continue <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-12 border-t border-zinc-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-400 font-medium">© 2026 {companyName}. All rights reserved. FMCSA Compliant.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900">Privacy Policy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900">Terms of Service</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900">FCRA Rights</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
