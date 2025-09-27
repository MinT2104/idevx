"use client";

import { useEffect, useState } from "react";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { useSearchParams } from "next/navigation";

export default function ApplyCareerPage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    linkedin: "",
    website: "",
    message: "",
    cvUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Prefill from query params (e.g., ?position=Senior%20AI%20Engineer)
  useEffect(() => {
    const position = searchParams.get("position") || "";
    const type = searchParams.get("type") || "";
    const level = searchParams.get("level") || "";
    const combinedPosition =
      position && type ? `${position} (${type})` : position;
    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const phone = searchParams.get("phone") || "";
    const linkedin = searchParams.get("linkedin") || "";
    const website = searchParams.get("website") || "";
    const message = searchParams.get("message") || "";
    if (position || name || email || phone || linkedin || website || message) {
      setForm((prev) => ({
        ...prev,
        position: combinedPosition || prev.position,
        name: name || prev.name,
        email: email || prev.email,
        phone: phone || prev.phone,
        linkedin: linkedin || prev.linkedin,
        website: website || prev.website,
        message: message || prev.message,
      }));
      if (combinedPosition && errors.position) {
        setErrors((e) => ({ ...e, position: "" }));
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleUpload = async (file: File) => {
    const res = await fetch("/api/upload/career-presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to presign");
    const putRes = await fetch(data.presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!putRes.ok) throw new Error("Upload failed");
    setForm((prev) => ({ ...prev, cvUrl: data.fileUrl }));
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (
        !(
          file.type.startsWith("image/") ||
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
      ) {
        setErrors((prev) => ({ ...prev, cvUrl: "Unsupported file type" }));
        return;
      }
      await handleUpload(file);
      setErrors((prev) => ({ ...prev, cvUrl: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, cvUrl: err.message || "Upload failed" }));
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.position.trim()) e.position = "Position is required";
    if (!form.cvUrl) e.cvUrl = "Please upload your CV (PDF/DOC/DOCX)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    if (!validate()) {
      setIsSubmitting(false);
      return;
    }
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        position: form.position,
        linkedin: form.linkedin || undefined,
        website: form.website || undefined,
        message: form.message || undefined,
        cvUrl: form.cvUrl,
      };
      const resp = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await resp.json();
      if (!json.success) throw new Error(json.error || "Failed");
      setSubmitStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        position: "",
        linkedin: "",
        website: "",
        message: "",
        cvUrl: "",
      });
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_50%)]" />
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl relative">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
            Careers
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Join the DevX Team
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2">
            {(() => {
              const type = searchParams.get("type");
              const level = searchParams.get("level");
              return (
                <>
                  {level && (
                    <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                      {level}
                    </span>
                  )}
                  {type && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        String(type).toLowerCase().includes("full")
                          ? "bg-green-100 text-green-700"
                          : String(type).toLowerCase().includes("part")
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {type}
                    </span>
                  )}
                </>
              );
            })()}
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Tell us about you and attach your latest CV. Our team will get back
            within 3–5 business days.
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
            Thank you! We will contact you soon.
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
            Submission failed. Please try again.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Full Name*
                </label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`h-11 bg-white ${errors.name ? "border-red-500" : ""}`}
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
                  Email*
                </label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`h-11 bg-white ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Phone*
                </label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`h-11 bg-white ${errors.phone ? "border-red-500" : ""}`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Position Applying For*
                </label>
                <Input
                  id="position"
                  value={form.position}
                  onChange={handleChange}
                  className={`h-11 bg-white ${errors.position ? "border-red-500" : ""}`}
                />
                {errors.position && (
                  <p className="mt-1 text-xs text-red-600">{errors.position}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm text-gray-700 mb-2"
                >
                  LinkedIn (optional)
                </label>
                <Input
                  id="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="h-11 bg-white"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Portfolio Website (optional)
                </label>
                <Input
                  id="website"
                  value={form.website}
                  onChange={handleChange}
                  className="h-11 bg-white"
                  placeholder="https://"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-gray-700 mb-2"
              >
                Cover Letter (optional)
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full border bg-white text-black p-3 text-sm border-gray-300 focus:border-gray-400 rounded-md"
                placeholder="Tell us why you're a great fit..."
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <label className="block text-sm text-gray-700 mb-2">
                Upload CV (PDF/DOC/DOCX)*
              </label>
              <div className="border-2 border-dashed rounded-xl p-6 text-center transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="cv-input"
                />
                <label htmlFor="cv-input" className="block cursor-pointer">
                  <div className="text-gray-600">
                    <div className="text-sm">
                      Drag & drop or{" "}
                      <span className="text-blue-600">browse</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Max 10MB • PDF, DOC, DOCX
                    </div>
                  </div>
                </label>
              </div>
              {form.cvUrl && (
                <p className="mt-2 text-xs text-green-700 break-all">
                  Uploaded: {form.cvUrl}
                </p>
              )}
              {errors.cvUrl && (
                <p className="mt-2 text-xs text-red-600">{errors.cvUrl}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 shadow-sm"
            >
              {isSubmitting ? "SUBMITTING..." : "APPLY NOW"}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Your information is kept confidential.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
