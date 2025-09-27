"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { Checkbox } from "@/ui/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@/ui/components/radio-group";
import { Slider } from "@/ui/components/slider";
import { useToast } from "@/ui/components/toast-provider";
import { cn } from "@/core/utils/utils";
import ExporeDevxToday from "@/features/models/components/ExporeDevxToday";

interface QuotationFormData {
  projectModel: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  skype: string;
  website: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  agreeToPrivacy: boolean;
}

const PaymentType = ["Payment by Fixed Price", "Pay by Hrs"];

export default function QuotationPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<QuotationFormData>({
    projectModel: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    skype: "",
    website: "",
    description: "",
    budget: {
      min: 0,
      max: 100000,
    },
    agreeToPrivacy: false,
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    const type = "type" in e.target ? e.target.type : undefined;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Auto-advance to next step when current step is valid
    setTimeout(() => {
      // Create updated form data for validation
      const updatedFormData =
        type === "checkbox"
          ? { ...formData, [name]: (e.target as HTMLInputElement).checked }
          : { ...formData, [name]: value };

      // Check if current step would be valid with updated data
      const isStepValid = (step: number): boolean => {
        if (step === 1) {
          return !!updatedFormData.projectModel;
        }
        if (step === 2) {
          return !!(
            updatedFormData.name?.trim() &&
            updatedFormData.email?.trim() &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedFormData.email) &&
            updatedFormData.phone?.trim() &&
            updatedFormData.company?.trim() &&
            updatedFormData.description?.trim()
          );
        }
        if (step === 3) {
          return !!updatedFormData.agreeToPrivacy;
        }
        return false;
      };

      // Determine the correct step based on validation
      let targetStep = 1;

      if (isStepValid(1)) {
        targetStep = 2;
      }
      if (isStepValid(2)) {
        targetStep = 3;
      }

      // Only change step if target is different from current
      if (targetStep !== currentStep) {
        setCurrentStep(targetStep);
      }
    }, 100);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!formData.projectModel;
    }

    if (step === 2) {
      return !!(
        formData.name?.trim() &&
        formData.email?.trim() &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        formData.phone?.trim() &&
        formData.company?.trim() &&
        formData.description?.trim()
      );
    }

    if (step === 3) {
      return !!formData.agreeToPrivacy;
    }

    return false;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectModel) {
      newErrors.projectModel = "Please select a project model";
    }
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.company?.trim()) {
      newErrors.company = "Company name is required";
    }
    if (!formData.description?.trim()) {
      newErrors.description = "Project description is required";
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "You must agree to the Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quotation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        success(
          "Success",
          "Your quotation request has been submitted successfully!"
        );
        setFormData({
          projectModel: "",
          name: "",
          email: "",
          phone: "",
          company: "",
          skype: "",
          website: "",
          description: "",
          budget: {
            min: 0,
            max: 100000,
          },
          agreeToPrivacy: false,
        });
        setCurrentStep(1);
        setIsSubmitting(false);
        setErrors({});
      } else {
        throw new Error(data.error || "Failed to submit quotation");
      }
    } catch (err) {
      console.error("Quotation submission error:", err);
      error("Error", "Failed to submit quotation. Please try again.");
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Binary code background */}
        <div className="absolute top-0 left-0 text-gray-200 text-xs font-mono opacity-30 select-none">
          <div className="transform -rotate-90 origin-left translate-x-4 translate-y-8">
            01001000 01100101 01101100 01101100 01101111
          </div>
        </div>
        <div className="absolute top-0 right-0 text-gray-200 text-xs font-mono opacity-30 select-none">
          <div className="transform rotate-90 origin-right -translate-x-4 translate-y-8">
            01010111 01101111 01110010 01101100 01100100
          </div>
        </div>

        {/* Geometric background shape */}
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-tr from-orange-100 to-transparent opacity-20 transform -skew-y-2"></div>

        {/* Watermarks */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-gray-200 text-6xl font-bold opacity-10 select-none">
          DevX.ai
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-200 text-6xl font-bold opacity-10 select-none">
          QUOTES
        </div>
      </div>

      {/* Main Content Container - Vertical Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="text-center py-16 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Quotes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Unlock the power of Artificial Intelligence for your business.
            Request a quotation and discover how our team can design, build, and
            deploy AI-driven solutions tailored to your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() => {
                const formSection = document.getElementById("quotation-form");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              className="px-8 py-3 text-lg bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => router.push("/talk-to-us")}
            >
              Talk to an Engineer
            </Button>
          </div>
        </div>

        {/* Form Section */}
        <div
          id="quotation-form"
          className="flex-1 max-w-6xl mx-auto px-4 pb-16 w-full"
        >
          <div className="flex lg:flex-row justify-center gap-8">
            {/* Step Indicator - Left Side */}
            <div className="w-fit">
              <div className="bg-white p-6 w-full lg:w-auto">
                <div className="flex lg:flex-col items-center justify-center lg:justify-start space-x-4 lg:space-x-0">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={cn(
                        "flex items-center flex-col",
                        step === 1 && "h-[245px]",
                        step === 2 && "h-[545px]",
                        step === 3 && "h-[150px]"
                      )}
                    >
                      <div className="flex items-center flex-col">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300 ${
                            step <= currentStep
                              ? "bg-orange-600"
                              : "bg-gray-300"
                          }`}
                        >
                          {step}
                        </div>
                      </div>
                      {step < 3 && (
                        <div
                          className={`hidden lg:block w-1 h-full ${
                            step < currentStep ? "bg-orange-600" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Content - Right Side */}
            <div className="lg:w-3/4">
              <div className="bg-white p-8">
                <form onSubmit={handleSubmit} className="space-y-12">
                  {/* Step 1: Project Model */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Kindly share your Payment Type
                      </h2>
                    </div>
                    <RadioGroup
                      value={formData.projectModel}
                      onValueChange={(value) =>
                        handleInputChange({
                          target: { name: "projectModel", value },
                        })
                      }
                      className="space-y-4"
                    >
                      {PaymentType.map((model) => (
                        <label
                          key={model}
                          className="flex w-60 items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <RadioGroupItem value={model} />
                          <span className="text-gray-700">{model}</span>
                        </label>
                      ))}
                    </RadioGroup>
                    {errors.projectModel && (
                      <p className="text-red-600 text-sm">
                        {errors.projectModel}
                      </p>
                    )}
                  </div>

                  {/* Step 2: User Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Let&apos;s start by understanding you
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full"
                        />
                        {errors.name && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your Email"
                          className="w-full"
                        />
                        {errors.email && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Number *
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Your Phone Number"
                          className="w-full"
                        />
                        {errors.phone && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name *
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Company Name"
                          className="w-full"
                        />
                        {errors.company && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.company}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Skype Detail
                        </label>
                        <Input
                          name="skype"
                          value={formData.skype}
                          onChange={handleInputChange}
                          placeholder="Skype Detail"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <Input
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="http://"
                          className="w-full"
                        />
                      </div>

                      <div className="col-span-2">
                        <label className=" block text-sm font-medium text-gray-700 mb-2">
                          Describe your project in brief *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Please describe your project requirements..."
                          className="w-full h-32 px-3 py-2 border bg-white text-black border-gray-300 rounded-md focus:ring-0 focus:border-transparent resize-none"
                        />
                        {errors.description && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Requirements */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-2xl font-bold text-gray-700 mb-4">
                        What&apos;s your budget range?
                      </label>
                      <div className="space-y-6">
                        {/* Budget Range Slider */}
                        <div>
                          <Slider
                            value={[formData.budget.min, formData.budget.max]}
                            min={0}
                            max={100000}
                            step={1000}
                            onValueChange={(values) =>
                              setFormData((prev) => ({
                                ...prev,
                                budget: { min: values[0], max: values[1] },
                              }))
                            }
                          />
                          <div className="flex justify-between text-sm text-gray-600 mt-4">
                            <span>$0</span>
                            <span>$100,000</span>
                          </div>
                        </div>

                        {/* Budget Range Summary */}
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">
                            Your Budget Range
                          </p>
                          <p className="text-xl font-bold text-orange-600">
                            ${formData.budget.min.toLocaleString()} - $
                            {formData.budget.max.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        name="agreeToPrivacy"
                        checked={formData.agreeToPrivacy}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            agreeToPrivacy: checked as boolean,
                          }));

                          // Auto-advance when privacy is checked and step 3 is valid
                          setTimeout(() => {
                            if (checked && validateStep(3)) {
                              // Step 3 is complete, ready for submission
                            }
                          }, 100);
                        }}
                      />
                      <label className="text-sm text-gray-700">
                        I agree to{" "}
                        <a
                          href="/privacy"
                          className="text-orange-600 hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    {errors.agreeToPrivacy && (
                      <p className="text-red-600 text-sm">
                        {errors.agreeToPrivacy}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center mt-12">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-12 py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold"
                    >
                      {isSubmitting ? "Submitting..." : "SUBMIT QUOTATION"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <ExporeDevxToday />
      </div>
    </div>
  );
}
