"use client";

import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { useState } from "react";
import { createFeedbackSchema } from "@/features/feedback/schemas/feedback.schema";

export default function TalkToUsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    skype: "",
    website: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    // Clear error for this field when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({});

    try {
      // Validate form data
      const validatedData = createFeedbackSchema.parse(form);

      // Submit to API
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          skype: "",
          website: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        console.error("Failed to submit feedback:", result.error);
      }
    } catch (error: any) {
      if (error.name === "ZodError") {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus("error");
        console.error("Error submitting feedback:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left copy */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black leading-tight">
              We love AI, but
              <br /> it’s nice to talk to
              <br /> a human
            </h1>
            <p className="mt-6 text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
              Build your product with the most performant infrastructure
              available, powered by the DevX Inference Stack. Deploy and serve
              AI models performantly, scalably, and cost-efficiently, in our
              cloud or yours.
            </p>
            <p className="mt-6 text-gray-900 font-medium">
              Connect with our product experts to see how we can help.
            </p>
          </div>

          {/* Right form */}
          <div>
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800 text-sm">
                  Thank you for your message! We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">
                  Sorry, there was an error submitting your message. Please try
                  again.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Your Name*
                </label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`h-10 bg-white ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Your Email*
                </label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@company.com"
                  className={`h-10 bg-white ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Your Number*
                </label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={`h-10 bg-white ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Company Name*
                </label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  className={`h-10 bg-white ${errors.company ? "border-red-500" : ""}`}
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-600">{errors.company}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="skype"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Skype Detail*
                </label>
                <Input
                  id="skype"
                  value={form.skype}
                  onChange={handleChange}
                  placeholder="your.skype.username"
                  className={`h-10 bg-white ${errors.skype ? "border-red-500" : ""}`}
                />
                {errors.skype && (
                  <p className="mt-1 text-xs text-red-600">{errors.skype}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Your Website*
                </label>
                <Input
                  id="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://"
                  className={`h-10 bg-white ${errors.website ? "border-red-500" : ""}`}
                />
                {errors.website && (
                  <p className="mt-1 text-xs text-red-600">{errors.website}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project, requirements, or how we can help you..."
                  className={`w-full border bg-white text-black p-3 text-sm focus:outline-none focus:ring-0 ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-gray-400"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                )}
              </div>

              <p className="text-xs text-gray-600">
                DevX will handle your data pursuant to our Privacy Policy
              </p>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-black text-white rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "SUBMITTING..." : "GET IN TOUCH"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
