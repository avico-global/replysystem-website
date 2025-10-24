"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useApi } from "@/lib/useApi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const step1Schema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  workEmail: z.string().email("Please enter a valid email address"),
 companyName: z.string().min(2, "Company name must be at least 2 characters"),
});

type Step1Data = z.infer<typeof step1Schema>;

export default function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const[mess,setMess] = useState("");
  const [selectedType, setSelectedType] = useState<
    "agency" | "merchant" | null
  >(null);

  const [userType, setUserType] = useState<string | null>(null);
  // Only one declaration for callApi
  const { callApi } = useApi();
  // setFormData is intentionally unused at the moment (we only read formData below).
  // Disable the unused-vars rule for this line to avoid noise until we persist interim form state.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState<Record<string, unknown>>({});

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

  const handleStep1Submit = async (data: Step1Data) => {
    const collectedData = { ...formData, ...data, userType };
    const formPayload = new FormData();
    formPayload.append(
      "name",
      `${collectedData.firstName || ""} ${collectedData.lastName || ""}`
    );
    formPayload.append("email", collectedData.workEmail || "");
    formPayload.append("supportMail", collectedData.workEmail || "");
    formPayload.append("company", collectedData.companyName || "");

    const statusInfo = localStorage.getItem("userType") || "{}";

    formPayload.append("isAgency", statusInfo === "agency" ? "true" : "false");

    try {
      const response = await callApi("/auth/merchantSignup", formPayload);
      const message = response?.message;
      console.log("API response:",response, message);
      setMess(message || "");
      toast.success(message || "Workspace created successfully!");
      localStorage.removeItem("userType");
      setIsSubmitted(true);
      // @typescript-eslint/no-explicit-any
    } catch (err: unknown) {
      let errorMessage = "Something went wrong";
      let resData:
        | { error?: string; message?: string; errors?: string[] }
        | undefined;
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as {
          response?: {
            data?: { error?: string; message?: string; errors?: string[] };
          };
        };
        resData = errorObj.response?.data;
        errorMessage =
          resData?.error ||
          resData?.message ||
          (typeof err === "object" &&
          "message" in err &&
          typeof (err as { message?: string }).message === "string"
            ? (err as { message?: string }).message
            : undefined) ||
          "Something went wrong";
      }
      if (Array.isArray(resData?.errors) && resData.errors.length > 0) {
        errorMessage = resData.errors.join(", ");
      }

      // If errors array exists, join them
      if (Array.isArray(resData?.errors) && resData.errors.length > 0) {
        errorMessage = resData.errors.join(", ");
      }

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const savedType = localStorage.getItem("userType");
    if (!savedType) {
      setShowModal(true);
    }
  }, []);

  const handleUserTypeSelect = (type: "agency" | "merchant") => {
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
              {mess || "Your company workspace has been successfully created."}
            </p>
            
          </div>
        </div>
      </div>
    );
  }

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
              {(["agency", "merchant"] as const).map((type) => (
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

        <div className="mx-auto max-w-md">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form
              onSubmit={step1Form.handleSubmit(handleStep1Submit)}
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
                  {...step1Form.register("firstName")}
                  error={step1Form.formState.errors.firstName?.message}
                />
                <Input
                  label="Last Name"
                  placeholder="Your last name"
                  {...step1Form.register("lastName")}
                  error={step1Form.formState.errors.lastName?.message}
                />
              </div>

              <Input
                label="Work Email"
                type="email"
                placeholder="your.email@company.com"
                {...step1Form.register("workEmail")}
                error={step1Form.formState.errors.workEmail?.message}
              />
              <Input
                label="Company Name"
                placeholder="Your company name"
                {...step1Form.register("companyName")}
                error={step1Form.formState.errors.companyName?.message}
              />

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Workspace..." : "Create Workspace"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}