import { useState, useMemo, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2, Truck, FileText, ShieldCheck, UserCheck, Sun, Moon, Phone } from 'lucide-react';
import { 
  FullApplicationSchema, 
  type FullApplication,
  PersonalInfoSchema,
  CompanyQuestionsSchema,
  LicenseSchema,
  EmploymentSchema,
  EducationSchema,
  RecordsSchema,
  DisclosuresSchema,
  SignatureSchema
} from './types/form';
import { PersonalInfo, CompanyQuestions } from './components/Steps1-2';
import { Licenses, EmploymentHistory } from './components/Steps3-4';
import { Education, Records } from './components/Steps5-6';
import { Disclosures, FinalSignature } from './components/Steps7-8';
import { cn } from './lib/utils';
import { z } from 'zod';

const STEPS = [
  { id: 'personal', title: 'Personal Information', icon: UserCheck, schema: PersonalInfoSchema },
  { id: 'company', title: 'Company Questions', icon: Truck, schema: CompanyQuestionsSchema },
  { id: 'licenses', title: 'Licenses', icon: FileText, schema: z.array(LicenseSchema) },
  { id: 'employment', title: 'Employment History', icon: FileText, schema: z.array(EmploymentSchema) },
  { id: 'education', title: 'Education', icon: FileText, schema: z.array(EducationSchema) },
  { id: 'records', title: 'Compliance Records', icon: ShieldCheck, schema: RecordsSchema },
  { id: 'disclosures', title: 'Consent & Disclosures', icon: ShieldCheck, schema: DisclosuresSchema },
  { id: 'signature', title: 'Certification & Signature', icon: CheckCircle2, schema: SignatureSchema },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      personal: { residenceThreeYears: 'Yes', preferredContact: 'Cell Phone', privacyAgreement: false },
      company: { crossingBorders: 'No' },
      licenses: [{}],
      employment: [{}],
      education: [{}],
      records: { 
        licenseDenied: 'No', convictedSuspended: 'No', convictedAlcohol: 'No', 
        convictedIllegalSubstance: 'No', convictedReckless: 'No', drugTestPositive: 'No',
        convictedCrime: 'No', deferredProsecution: 'No', criminalChargesPending: 'No',
        pledGuiltyFelony: 'No', ministerPermit: 'No', pledGuiltyMisdemeanor: 'No'
      },
      disclosures: { fcraAcknowledgment: false, pspDisclosure: false, employmentVerification: false, clearinghouseRelease: false, fcraDisclosure: false, additionalConsent: false },
      signature: { agreedToElectronic: false, signatureDate: new Date().toISOString().split('T')[0] }
    }
  });

  const { handleSubmit, trigger, watch } = methods;
  const formData = watch();

  const stepCompletion = useMemo(() => {
    return STEPS.map((step) => {
      const sectionData = (formData as any)[step.id];
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
      console.log('Validation failed for fields:', fields, methods.getValues());
      console.log('Errors:', methods.formState.errors);
      // Force a re-render to show errors
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
      case 1: return ['company'];
      case 2: return ['licenses'];
      case 3: return ['employment'];
      case 4: return ['education'];
      case 5: return ['records'];
      case 6: return ['disclosures'];
      case 7: return ['signature'];
      default: return [];
    }
  };

  const onSubmit = (data: FullApplication) => {
    console.log('Form Submitted:', data);
    setIsSubmitted(true);
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
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-logistics-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-logistics-blue/20">
              <Truck size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">Protected Loads Inc.</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">Fleet Management Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:block text-right">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Current Date</p>
              <p className="text-sm font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800" />
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <a 
                href="tel:6477662660" 
                className="flex items-center gap-2 bg-logistics-blue text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-logistics-blue/20 hover:opacity-90 transition-all"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">647-766-2660</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 space-y-8">
            <nav className="space-y-2">
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
                      <span className={cn(
                        "text-sm font-bold",
                        isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                      )}>{step.title}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 min-h-[600px] flex flex-col">
                <div className="flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentStep === 0 && <PersonalInfo />}
                      {currentStep === 1 && <CompanyQuestions />}
                      {currentStep === 2 && <Licenses />}
                      {currentStep === 3 && <EmploymentHistory />}
                      {currentStep === 4 && <Education />}
                      {currentStep === 5 && <Records />}
                      {currentStep === 6 && <Disclosures />}
                      {currentStep === 7 && <FinalSignature />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={cn(
                        "flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all",
                        currentStep === 0 ? "opacity-0 pointer-events-none" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                      )}
                    >
                      <ChevronLeft size={18} /> Back
                    </button>

                    {currentStep === STEPS.length - 1 ? (
                      <button
                        type="submit"
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-emerald-600 text-white px-12 py-3.5 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      >
                        Submit Profile <CheckCircle2 size={18} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-logistics-blue text-white px-12 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-logistics-blue/20"
                      >
                        Continue <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                  
                  {Object.keys(methods.formState.errors).length > 0 && (
                    <div className="flex items-center justify-center gap-2 text-rose-500 bg-rose-50 dark:bg-rose-900/20 py-2 rounded-lg">
                      <ShieldCheck size={14} />
                      <p className="text-xs font-bold uppercase tracking-widest">
                        Required fields missing in this section
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-12 border-t border-zinc-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-zinc-400 font-medium">
            © 2024 Protected Loads Inc. All rights reserved. FMCSA Compliant.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors">FCRA Rights</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
