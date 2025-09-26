"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  UserIcon,
  CogIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline";
import { useApi } from "@/lib/useApi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const step1Schema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  supportMail: z
    .string()
    .email("Please enter a valid support email address")
    .optional()
    .or(z.literal("")),

  industry: z.string().min(1, "Please select an industry"),
});

const step2Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  workEmail: z.string().email("Please enter a valid email address"),
  abbreviation: z
    .string()
    .min(3, "Abbreviation must be at least 3 letters")
    .max(6, "Abbreviation cannot be longer than 6 letters")
    .regex(
      /^[A-Z]+$/,
      "Abbreviation must contain only uppercase letters (A–Z)"
    ),
});

const step3Schema = z.object({
  // subdomain: z
  //   .string()
  //   .min(3, "Subdomain must be at least 3 characters")
  //   .regex(
  //     /^[a-z0-9-]+$/,
  //     "Only lowercase letters, numbers, and hyphens allowed"
  //   ),
  timezone: z.string().min(1, "Please select a timezone"),
});

// const step4Schema = z.object({
//   enablePortal: z.boolean(),
//   accentColor: z
//     .string()
//     .regex(/^#[0-9A-F]{6}$/i, "Please enter a valid hex color"),
// });

const step4Schema = z.object({
  // enablePortal: z.boolean(),
  // accentColor: z.string().regex(/^#[0-9A-F]{6}$/i, "Please enter a valid hex color"),
  companyLogo: z.instanceof(File).optional(),
  frontPageImage: z.instanceof(File).optional(),
  favicon: z.instanceof(File).optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type Step4Data = z.infer<typeof step4Schema>;

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Manufacturing",
  "Professional Services",
  "Non-profit",
  "Other",
];

const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const steps = [
  { id: 1, name: "Company Info", icon: BuildingOfficeIcon },
  { id: 2, name: "Admin Account", icon: UserIcon },
  { id: 3, name: "Workspace Settings", icon: CogIcon },
  { id: 4, name: "Client Portal", icon: PaintBrushIcon },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [userType, setUserType] = useState<string | null>(null);
  const { data, loading, error, callApi } = useApi();
  type MultiStepFormData = Step1Data & Step2Data & Step3Data & Step4Data & { userType?: string };
  const [formData, setFormData] = useState<Partial<MultiStepFormData>>({});


  useEffect(() => {
    const savedType = localStorage.getItem("userType");
    if (savedType) {
      setUserType(savedType);
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, []);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      timezone: "America/New_York",
    },
  });

  // const step4Form = useForm<Step4Data>({
  //   resolver: zodResolver(step4Schema),
  //   defaultValues: {
  //     enablePortal: true,
  //     accentColor: "#FFD700",
  //   },
  // });
    const step4Form = useForm<Step4Data>({ resolver: zodResolver(step4Schema) });


  const handleStep1Submit = (data: Step1Data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(3);
  };

  const handleStep3Submit = (data: Step3Data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(4);
  };

 

const handleStep4Submit = async (data: Step4Data) => {
  const collectedData = { ...formData, ...data, userType };
  const formPayload = new FormData();
  formPayload.append(
    "name",
    `${collectedData.firstName || ""} ${collectedData.lastName || ""}`
  );
  formPayload.append("email", collectedData.workEmail || "");
  formPayload.append("company", collectedData.companyName || "");
  formPayload.append("supportMail", collectedData.supportMail || collectedData.workEmail || "");
  formPayload.append(
    "initiateTicketName",
    collectedData.abbreviation?.toUpperCase() || "DEFAULT"
  );
 const statusInfo = localStorage.getItem("userType") || "{}";

formPayload.append(
  "isAgency",
  statusInfo === "agency" ? "true" : "false"
);

  if (collectedData.frontPageImage) {
    formPayload.append("frontPageImage", collectedData.frontPageImage);
  }
  if (collectedData.favicon) {
    formPayload.append("favicon", collectedData.favicon);
  }
  console.log("FormData contents:");
  for (const [key, value] of formPayload.entries()) {
    if (value instanceof File) {
      console.log(key, value.name, value.type, value.size + " bytes");
    } else {
      console.log(key, value);
    }
  }
  try {
    const response = await callApi("/auth/merchantSignup", formPayload);
    console.log("API response:", response);
    let message = response?.messgae;
    toast.success(message || "Workspace created successfully!");
    localStorage.removeItem("userType");
    setIsSubmitted(true);
  } catch (err: any) {
    console.error(err);
    toast.error(err.response?.data?.error || "Something went wrong");
  }
};




  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const savedType = localStorage.getItem("userType");
    if (!savedType) {
      setShowModal(true);
    }
  }, []);

  const handleUserTypeSelect = (type: any) => {
    setUserType(type);
    setSelectedType(type);
    localStorage.setItem("userType", type);
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);

  if (isSubmitted) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-6 py-6 sm:py-8 lg:px-8">
          <div className="text-center">
            <CheckIcon className="mx-auto h-12 w-12 text-green-600" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Workspace Created!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your company workspace has been successfully created. Check your
              email to verify your account and log in.
            </p>
            <div className="mt-10">
              <Button onClick={() => (window.location.href = "/signup")}>
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [e.target.name]: file, 
    }));
  }
};



  return (
    <div className="bg-white">
      <Toaster />
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Soft blurry grey overlay */}
          <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-md pointer-events-none"></div>

          {/* Modal box */}
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-200 z-10 pointer-events-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Who are you signing up as?
            </h2>
            <p className="text-gray-600 mb-6">
              Choose the type that best describes your role. This helps us
              tailor your workspace setup and options.
            </p>
            <div className="space-y-4">
              {["agency", "merchant"].map((type) => (
                <button
                  key={type}
                  onClick={() => handleUserTypeSelect(type)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                    selectedType === type
                      ? "bg-yellow-500 border-yellow-500 text-black"
                      : "bg-white border-gray-300 text-gray-800 hover:bg-yellow-50 hover:border-yellow-300"
                  }`}
                >
                  <span className="font-semibold capitalize">{type}</span>
                  <p className="text-sm mt-1">
                    {type === "agency"
                      ? "Manage multiple clients, projects, and workflows efficiently."
                      : "Focus on your own business operations and client support."}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create your company workspace
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            One secure place for your team and clients.
          </p>
        </div>

        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-12">
          <ol
            role="list"
            className="flex items-center justify-center space-x-5"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step.id < currentStep
                        ? "border-yellow-500 bg-yellow-500"
                        : step.id === currentStep
                        ? "border-yellow-500 bg-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckIcon className="h-5 w-5 text-black" />
                    ) : (
                      <step.icon
                        className={`h-5 w-5 ${
                          step.id === currentStep
                            ? "text-yellow-600"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      step.id <= currentStep
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <ChevronRightIcon className="ml-5 h-5 w-5 text-gray-400" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Step 1: Company Info */}
            {currentStep === 1 && (
              <form
                onSubmit={step1Form.handleSubmit(handleStep1Submit)}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Company Information
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tell us about your company
                  </p>
                </div>

                <Input
                  label="Company Name"
                  placeholder="Your company name"
                  {...step1Form.register("companyName")}
                  error={step1Form.formState.errors.companyName?.message}
                />

                <Input
                  label="Support Email"
                  type="email"
                  placeholder="support@yourcompany.com"
                  {...step1Form.register("supportMail")}
                  error={step1Form.formState.errors.supportMail?.message}
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    {...step1Form.register("industry")}
                    className="block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-0 sm:text-sm transition-colors duration-200"
                  >
                    <option value="" className="text-gray-500">
                      What industry are you in?
                    </option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {step1Form.formState.errors.industry && (
                    <p className="text-sm text-red-600">
                      {step1Form.formState.errors.industry.message}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" size="lg">
                    Next Step
                  </Button>
                </div>
              </form>
            )}

            {/* Step 2: Admin Account */}
            {currentStep === 2 && (
              <form
                onSubmit={step2Form.handleSubmit(handleStep2Submit)}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Admin Account
                  </h3>
                  <p className="text-sm text-gray-600">
                    Create your admin account
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Your first name"
                    {...step2Form.register("firstName")}
                    error={step2Form.formState.errors.firstName?.message}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Your last name"
                    {...step2Form.register("lastName")}
                    error={step2Form.formState.errors.lastName?.message}
                  />
                </div>

                <Input
                  label="Work Email"
                  type="email"
                  placeholder="your.email@company.com"
                  {...step2Form.register("workEmail")}
                  error={step2Form.formState.errors.workEmail?.message}
                />

                <Input
                  label="Abbreviation"
                  type="text"
                  placeholder="Enter 3–6 letters (A–Z)"
                  maxLength={6}
                  {...step2Form.register("abbreviation", {
                    onChange: (e) => {
                      let value = e.target.value
                        .replace(/[^A-Za-z]/g, "")
                        .toUpperCase();
                      step2Form.setValue("abbreviation", value, {
                        shouldValidate: true,
                      });
                    },
                  })}
                  error={step2Form.formState.errors.abbreviation?.message}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="flex-1"
                    size="lg"
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" size="lg">
                    Next Step
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Workspace Settings */}
            {currentStep === 3 && (
              <form
                onSubmit={step3Form.handleSubmit(handleStep3Submit)}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Workspace Settings
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configure your workspace
                  </p>
                </div>

                {/* <div>
                  <Input
                    label="Subdomain"
                    placeholder="yourcompany"
                    {...step3Form.register("subdomain")}
                    error={step3Form.formState.errors.subdomain?.message}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Your workspace will be available at:
                    yourcompany.replysystem.com
                  </p>
                </div> */}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    {...step3Form.register("timezone")}
                    className="block w-full rounded-lg border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-0 sm:text-sm transition-colors duration-200"
                  >
                    {timezones.map((timezone) => (
                      <option key={timezone} value={timezone}>
                        {timezone.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="flex-1"
                    size="lg"
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" size="lg">
                    Next Step
                  </Button>
                </div>
              </form>
            )}

            {/* Step 4: Client Portal */}
            {currentStep === 4 && (
              <form
                onSubmit={step4Form.handleSubmit(handleStep4Submit)}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Client Portal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Customize your client experience
                  </p>
                </div>
{/* 
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="enablePortal"
                      type="checkbox"
                      {...step4Form.register("enablePortal")}
                      className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="enablePortal"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Enable client portal
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Allow your clients to track requests and communicate through
                    a branded portal.
                  </p>
                </div>

                <div>
                  <Input
                    label="Accent Color"
                    type="color"
                    {...step4Form.register("accentColor")}
                    error={step4Form.formState.errors.accentColor?.message}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This color will be used for buttons and highlights in your
                    client portal.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-yellow-900 mb-2">
                    Logo Upload (Coming Soon)
                  </h4>
                  <p className="text-xs text-yellow-800">
                    You&apos;ll be able to upload your company logo after
                    creating your workspace.
                  </p>
                </div> */}


                <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Company Logo
                              </label>
                              <input
                                type="file"
                                name="companyLogo"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                              />
                              {formData.companyLogo && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Selected: {formData.companyLogo.name}
                                </p>
                              )}
                            </div>
                               <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Front Page Image
                              </label>
                              <input
                                type="file"
                                name="frontPageImage"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                              />
                              {formData.frontPageImage && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Selected: {formData.frontPageImage.name}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Favicon
                              </label>
                              <input
                                type="file"
                                name="favicon"
                                onChange={handleFileChange}
                                accept="image/*"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                              />
                              {formData.favicon && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Selected: {formData.favicon.name}
                                </p>
                              )}
                            </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goBack}
                    className="flex-1"
                    size="lg"
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating Workspace...
                      </>
                    ) : (
                      "Create Workspace"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
