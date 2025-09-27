"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";

type SalaryRange = { min: number; max: number; currency: string };

type JobFormData = {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  level: string;
  salaryRange: SalaryRange;
  postedAt: string;
  applicationDeadline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
  howToApply: string;
  status: "open" | "closed";
};

export default function JobForm({
  mode,
  initialData,
  id,
}: {
  mode: "create" | "edit";
  initialData?: Partial<JobFormData>;
  id?: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState<JobFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    department: initialData?.department || "",
    location: initialData?.location || "",
    type: initialData?.type || "Full-time",
    level: initialData?.level || "Mid",
    salaryRange: initialData?.salaryRange || {
      min: 0,
      max: 0,
      currency: "USD",
    },
    postedAt: initialData?.postedAt || new Date().toISOString().slice(0, 10),
    applicationDeadline:
      initialData?.applicationDeadline || new Date().toISOString().slice(0, 10),
    description: initialData?.description || "",
    responsibilities: initialData?.responsibilities || [],
    requirements: initialData?.requirements || [],
    niceToHave: initialData?.niceToHave || [],
    benefits: initialData?.benefits || [],
    howToApply: initialData?.howToApply || "",
    status: (initialData?.status as any) || "open",
  });

  const setField = (key: keyof JobFormData, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));

  const setSalary = (key: keyof SalaryRange, value: number | string) =>
    setForm((p) => ({
      ...p,
      salaryRange: {
        ...p.salaryRange,
        [key]: typeof value === "string" ? Number(value) : value,
      },
    }));

  const toLines = (arr?: string[]) => (arr && arr.length ? arr.join("\n") : "");
  const fromLines = (s: string) =>
    s
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean);

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    const isEmpty = (s?: string) => !s || !String(s).trim();
    if (isEmpty(form.title)) e.title = "Title is required";
    if (isEmpty(form.slug)) e.slug = "Slug is required";
    if (!/^[-a-z0-9]+$/.test(form.slug))
      e.slug = e.slug || "Slug must be lowercase letters, numbers, hyphens";
    if (isEmpty(form.department)) e.department = "Department is required";
    if (isEmpty(form.location)) e.location = "Location is required";
    if (isEmpty(form.type)) e.type = "Employment type is required";
    if (isEmpty(form.level)) e.level = "Level is required";
    if (form.salaryRange == null || isNaN(form.salaryRange.min as any))
      e.salaryMin = "Min salary is required";
    if (form.salaryRange == null || isNaN(form.salaryRange.max as any))
      e.salaryMax = "Max salary is required";
    if (form.salaryRange && Number(form.salaryRange.min) < 0)
      e.salaryMin = "Min salary must be ≥ 0";
    if (form.salaryRange && Number(form.salaryRange.max) <= 0)
      e.salaryMax = "Max salary must be > 0";
    if (
      form.salaryRange &&
      Number(form.salaryRange.max) > 0 &&
      Number(form.salaryRange.min) > Number(form.salaryRange.max)
    )
      e.salaryMax = "Max salary must be ≥ Min salary";
    if (isEmpty(form.salaryRange?.currency))
      e.currency = "Currency is required";
    if (isEmpty(form.postedAt)) e.postedAt = "Posted date is required";
    if (isEmpty(form.applicationDeadline))
      e.applicationDeadline = "Deadline is required";
    if (form.postedAt && form.postedAt < today)
      e.postedAt = "Posted date cannot be in the past";
    if (form.applicationDeadline && form.applicationDeadline < today)
      e.applicationDeadline = "Deadline cannot be in the past";
    if (
      form.applicationDeadline &&
      form.postedAt &&
      new Date(form.applicationDeadline) < new Date(form.postedAt)
    )
      e.applicationDeadline = "Deadline must be after posted date";
    if (isEmpty(form.description)) e.description = "Description is required";
    if (!form.responsibilities || form.responsibilities.length === 0)
      e.responsibilities = "At least one responsibility";
    if (!form.requirements || form.requirements.length === 0)
      e.requirements = "At least one requirement";
    if (isEmpty(form.howToApply)) e.howToApply = "How to apply is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (!validate()) {
      setSaving(false);
      return;
    }
    try {
      const payload = {
        ...form,
        postedAt: new Date(form.postedAt).toISOString(),
        applicationDeadline: new Date(form.applicationDeadline).toISOString(),
      } as any;
      const url =
        mode === "create" ? "/api/jobs-admin" : `/api/jobs-admin/${id}`;
      const method = mode === "create" ? "POST" : "PATCH";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed");
      router.push("/admin/jobs");
    } catch (err) {
      alert((err as any)?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Job title, department, and location details
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Title *
              </label>
              <Input
                value={form.title}
                onChange={(e) => {
                  const v = e.target.value;
                  setField("title", v);
                  // Auto-generate slug when creating or when slug is empty
                  if (mode === "create" || !form.slug) {
                    setField("slug", slugify(v));
                  }
                  if (errors.title) setErrors((p) => ({ ...p, title: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="e.g. Senior AI Engineer"
              />
              {errors.title && (
                <p className="text-xs text-red-600 mt-1">{errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Slug (auto)
              </label>
              <Input
                value={form.slug}
                readOnly
                className="bg-gray-100 border-gray-200 text-gray-700"
                placeholder="auto-generated"
              />
              {errors.slug && (
                <p className="text-xs text-red-600 mt-1">{errors.slug}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Department *
              </label>
              <Input
                value={form.department}
                onChange={(e) => {
                  setField("department", e.target.value);
                  if (errors.department)
                    setErrors((p) => ({ ...p, department: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="e.g. Engineering"
              />
              {errors.department && (
                <p className="text-xs text-red-600 mt-1">{errors.department}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <Input
                value={form.location}
                onChange={(e) => {
                  setField("location", e.target.value);
                  if (errors.location)
                    setErrors((p) => ({ ...p, location: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="e.g. Remote, Ho Chi Minh City"
              />
              {errors.location && (
                <p className="text-xs text-red-600 mt-1">{errors.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
            <p className="text-sm text-gray-600 mt-1">
              Type, level, and compensation information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Employment Type *
              </label>
              <Input
                value={form.type}
                onChange={(e) => {
                  setField("type", e.target.value);
                  if (errors.type) setErrors((p) => ({ ...p, type: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="Full-time, Part-time, Contract"
              />
              {errors.type && (
                <p className="text-xs text-red-600 mt-1">{errors.type}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Experience Level *
              </label>
              <Input
                value={form.level}
                onChange={(e) => {
                  setField("level", e.target.value);
                  if (errors.level) setErrors((p) => ({ ...p, level: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="Junior, Mid, Senior, Manager"
              />
              {errors.level && (
                <p className="text-xs text-red-600 mt-1">{errors.level}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Salary Range (Min) *
              </label>
              <Input
                type="number"
                value={form.salaryRange.min}
                onChange={(e) => {
                  setSalary("min", e.target.value);
                  if (errors.salaryMin)
                    setErrors((p) => ({ ...p, salaryMin: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="3000"
              />
              {errors.salaryMin && (
                <p className="text-xs text-red-600 mt-1">{errors.salaryMin}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Salary Range (Max) *
              </label>
              <Input
                type="number"
                value={form.salaryRange.max}
                onChange={(e) => {
                  setSalary("max", e.target.value);
                  if (errors.salaryMax)
                    setErrors((p) => ({ ...p, salaryMax: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="5000"
              />
              {errors.salaryMax && (
                <p className="text-xs text-red-600 mt-1">{errors.salaryMax}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Currency *
              </label>
              <Input
                value={form.salaryRange.currency}
                onChange={(e) => {
                  setSalary("currency", e.target.value);
                  if (errors.currency)
                    setErrors((p) => ({ ...p, currency: "" }));
                }}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
                placeholder="USD, VND, EUR"
              />
              {errors.currency && (
                <p className="text-xs text-red-600 mt-1">{errors.currency}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Status *
              </label>
              <select
                value={form.status}
                onChange={(e) => setField("status", e.target.value as any)}
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 text-black"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
            <p className="text-sm text-gray-600 mt-1">
              Posting and application deadlines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Posted Date *
              </label>
              <Input
                type="date"
                value={form.postedAt}
                onChange={(e) => {
                  setField("postedAt", e.target.value);
                  if (errors.postedAt)
                    setErrors((p) => ({ ...p, postedAt: "" }));
                }}
                min={today}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
              />
              {errors.postedAt && (
                <p className="text-xs text-red-600 mt-1">{errors.postedAt}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Application Deadline *
              </label>
              <Input
                type="date"
                value={form.applicationDeadline}
                onChange={(e) => {
                  setField("applicationDeadline", e.target.value);
                  if (errors.applicationDeadline)
                    setErrors((p) => ({ ...p, applicationDeadline: "" }));
                }}
                min={today}
                className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"
              />
              {errors.applicationDeadline && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.applicationDeadline}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Job Description
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Brief overview of the role and responsibilities
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              className="w-full bg-white border border-gray-300 rounded-md p-4 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none text-black"
              rows={5}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Describe the role, what the candidate will be doing, and key highlights..."
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Requirements & Responsibilities */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Requirements & Responsibilities
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              List each item on a new line
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Responsibilities *
              </label>
              <textarea
                className="w-full bg-white border border-gray-300 rounded-md p-4 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none text-black"
                rows={6}
                value={toLines(form.responsibilities)}
                onChange={(e) =>
                  setField("responsibilities", fromLines(e.target.value))
                }
                placeholder="Design and implement scalable AI pipelines&#10;Optimize model training and inference performance&#10;Collaborate with product managers and data scientists"
              />
              {errors.responsibilities && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.responsibilities}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Requirements *
              </label>
              <textarea
                className="w-full bg-white border border-gray-300 rounded-md p-4 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none text-black"
                rows={6}
                value={toLines(form.requirements)}
                onChange={(e) =>
                  setField("requirements", fromLines(e.target.value))
                }
                placeholder="5+ years in Machine Learning/AI Engineering&#10;Proficiency in Python and PyTorch/TensorFlow&#10;Experience with cloud platforms"
              />
              {errors.requirements && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.requirements}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Nice to Have & Benefits */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Information
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Optional requirements and company benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nice to Have
              </label>
              <textarea
                className="w-full bg-white border border-gray-300 rounded-md p-4 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none text-black"
                rows={4}
                value={toLines(form.niceToHave)}
                onChange={(e) =>
                  setField("niceToHave", fromLines(e.target.value))
                }
                placeholder="Experience with MLOps&#10;Research publications&#10;Open source contributions"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Benefits
              </label>
              <textarea
                className="w-full bg-white border border-gray-300 rounded-md p-4 text-sm focus:border-blue-500 focus:ring-blue-500 resize-none text-black"
                rows={4}
                value={toLines(form.benefits)}
                onChange={(e) =>
                  setField("benefits", fromLines(e.target.value))
                }
                placeholder="Remote-first culture&#10;Flexible working hours&#10;Learning budget&#10;Health insurance"
              />
            </div>
          </div>
        </div>

        {/* How to Apply */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Application Process
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Instructions for candidates on how to apply
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              How to Apply *
            </label>
            <Input
              value={form.howToApply}
              onChange={(e) => setField("howToApply", e.target.value)}
              className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Send CV to careers@company.com or apply via our website"
            />
            {errors.howToApply && (
              <p className="text-xs text-red-600 mt-1">{errors.howToApply}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/jobs")}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {saving
              ? "Saving..."
              : mode === "create"
                ? "Create Job"
                : "Update Job"}
          </Button>
        </div>
      </form>
    </div>
  );
}
