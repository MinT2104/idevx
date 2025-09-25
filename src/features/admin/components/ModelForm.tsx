"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import { useToast } from "@/ui/components/toast-provider";
import dynamic from "next/dynamic";
import {
  Save,
  Eye,
  Settings,
  AlertCircle,
  CheckCircle,
  FileText,
  Github,
  BookOpen,
} from "lucide-react";

// Dynamic import for markdown editor
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface ModelFormData {
  name: string;
  slug: string;
  type: string;
  description: string;
  logo: string;
  status: "active" | "inactive";
  // Model details
  readme?: string;
  github?: string;
  developedBy?: string;
  modelFamily?: string;
  useCase?: string;
  variant?: string;
  size?: string;
  license?: string;
  // Content
  content?: {
    type: "markdown";
    body: string;
  };
}

interface ModelFormProps {
  initialData?: Partial<ModelFormData>;
  modelId?: string;
}

export default function ModelForm({ initialData, modelId }: ModelFormProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form data
  const [formData, setFormData] = useState<ModelFormData>({
    name: "",
    slug: "",
    type: "",
    description: "",
    logo: "",
    status: "active",
    readme: "",
    github: "",
    developedBy: "",
    modelFamily: "",
    useCase: "",
    variant: "",
    size: "",
    license: "",
    content: {
      type: "markdown",
      body: "",
    },
    ...initialData,
  });

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case "name":
        if (!value || value.trim().length === 0) {
          return "Name is required";
        }
        if (value.trim().length < 3) {
          return "Name must be at least 3 characters";
        }
        break;
      case "slug":
        if (!value || value.trim().length === 0) {
          return "Slug is required";
        }
        if (!/^[a-z0-9-]+$/.test(value)) {
          return "Slug must contain only lowercase letters, numbers, and hyphens";
        }
        break;
      case "type":
        if (!value || value.trim().length === 0) {
          return "Type is required";
        }
        break;
      case "content":
        if (!value?.body || value.body.trim().length === 0) {
          return "Content is required";
        }
        break;
    }
    return "";
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    function toSlug(text: string): string {
      return text
        .normalize("NFD") // tách dấu tiếng Việt
        .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
        .toLowerCase() // đảm bảo lowercase
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // thay nhóm ký tự đặc biệt thành -
        .replace(/^-+|-+$/g, ""); // bỏ dấu - đầu/cuối
    }

    // Auto-generate slug from name with type prefix
    if (field === "name") {
      const baseSlug = toSlug(value);
      const typePrefix = formData.type ? `${formData.type}-` : "";
      setFormData((prev) => ({ ...prev, slug: `${typePrefix}${baseSlug}` }));
    }

    // Auto-generate slug when type changes
    if (field === "type" && formData.name) {
      const baseSlug = toSlug(formData.name);
      const typePrefix = value ? `${value}-` : "";
      setFormData((prev) => ({ ...prev, slug: `${typePrefix}${baseSlug}` }));
    }
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof ModelFormData] as any),
        [field]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newFieldErrors: Record<string, string> = {};

    // Validate required fields
    const nameError = validateField("name", formData.name);
    if (nameError) newFieldErrors.name = nameError;

    const slugError = validateField("slug", formData.slug);
    if (slugError) newFieldErrors.slug = slugError;

    const typeError = validateField("type", formData.type);
    if (typeError) newFieldErrors.type = typeError;

    const contentError = validateField("content", formData.content);
    if (contentError) newFieldErrors.content = contentError;

    setFieldErrors(newFieldErrors);
    return Object.keys(newFieldErrors).length === 0;
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");
    setErrors([]);

    // Validate form before submitting
    if (!validateForm()) {
      setSaving(false);
      return;
    }

    try {
      const submitData = {
        ...formData,
      };

      const url = modelId ? `/api/model-admin/${modelId}` : "/api/model-admin";
      const method = modelId ? "PUT" : "POST";

      console.log("Submitting to:", url, "with method:", method);
      console.log("Submit data:", submitData);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      console.log("Response status:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        success(
          `${modelId ? "Updated" : "Created"} successfully!`,
          `Your AI model has been ${modelId ? "updated" : "created"}`
        );

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/models");
        }, 1500);
      } else {
        error("Save failed", data.error || "Failed to save model");
      }
    } catch (saveError) {
      console.error("Error saving model:", saveError);
      error("Save failed", "An error occurred while saving the model");
    } finally {
      setSaving(false);
    }
  };

  const typeOptions = [
    { value: "llm", label: "LLM" },
    { value: "transcription", label: "Transcription" },
    { value: "text-to-speech", label: "Text to Speech" },
    { value: "image-generation", label: "Image Generation" },
    { value: "embedding", label: "Embedding" },
    { value: "speech-to-text", label: "Speech to Text" },
    { value: "image-processing", label: "Image Processing" },
  ];

  return (
    <div className="max-w-full mx-auto space-y-8">
      {/* Success/Error Messages */}
      {message && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-green-800">{message}</span>
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800 font-medium">
              Please fix the following errors:
            </span>
          </div>
          <ul className="text-red-700 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <div className="">
          {/* Main Content */}
          <div className=" space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Name *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter model name"
                className={`text-lg ${fieldErrors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="Auto-generated from name"
                className={`font-mono bg-gray-100 text-gray-600 cursor-not-allowed ${fieldErrors.slug ? "border-red-500" : ""}`}
                disabled={true}
              />
              <p className="text-xs text-gray-500 mt-1">
                URL: /models/{formData.slug}
              </p>
              {fieldErrors.slug && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.slug}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <Select
                value={formData.type}
                onValueChange={(value: any) => handleInputChange("type", value)}
              >
                <SelectTrigger
                  className={`${fieldErrors.type ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldErrors.type && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.type}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe the model's capabilities and use cases"
                className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <Input
                type="url"
                value={formData.logo}
                onChange={(e) => handleInputChange("logo", e.target.value)}
                placeholder="https://example.com/logo.png"
                className="bg-white text-black"
              />
            </div>

            {/* Readme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="inline h-4 w-4 mr-2" />
                README Link
              </label>
              <Input
                type="url"
                value={formData.readme || ""}
                onChange={(e) => handleInputChange("readme", e.target.value)}
                placeholder="https://github.com/user/repo/blob/main/README.md"
                className="bg-white text-black"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Github className="inline h-4 w-4 mr-2" />
                GitHub Repository
              </label>
              <Input
                type="url"
                value={formData.github || ""}
                onChange={(e) => handleInputChange("github", e.target.value)}
                placeholder="https://github.com/user/repo"
                className="bg-white text-black"
              />
            </div>

            {/* Model Details Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Model Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Developed By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Developed By
                  </label>
                  <Input
                    type="text"
                    value={formData.developedBy || ""}
                    onChange={(e) =>
                      handleInputChange("developedBy", e.target.value)
                    }
                    placeholder="e.g., OpenAI, Google, Meta"
                    className="bg-white text-black h-9"
                  />
                </div>

                {/* Model Family */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model Family
                  </label>
                  <Input
                    type="text"
                    value={formData.modelFamily || ""}
                    onChange={(e) =>
                      handleInputChange("modelFamily", e.target.value)
                    }
                    placeholder="e.g., GPT, LLaMA, Claude"
                    className="bg-white text-black h-9"
                  />
                </div>

                {/* Use Case */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Use Case
                  </label>
                  <Input
                    type="text"
                    value={formData.useCase || ""}
                    onChange={(e) =>
                      handleInputChange("useCase", e.target.value)
                    }
                    placeholder="e.g., large language, image generation"
                    className="bg-white text-black h-9"
                  />
                </div>

                {/* Variant */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variant
                  </label>
                  <Input
                    type="text"
                    value={formData.variant || ""}
                    onChange={(e) =>
                      handleInputChange("variant", e.target.value)
                    }
                    placeholder="e.g., 4, 5, 7B, 13B, 70B"
                    className="bg-white text-black h-9"
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model Size
                  </label>
                  <Input
                    type="text"
                    value={formData.size || ""}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    placeholder="e.g., 7B, 13B, 70B, Unknown"
                    className="bg-white text-black h-9"
                  />
                </div>

                {/* License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License
                  </label>
                  <Input
                    type="text"
                    value={formData.license || ""}
                    onChange={(e) =>
                      handleInputChange("license", e.target.value)
                    }
                    placeholder="e.g., MIT, Apache 2.0"
                    className="bg-white text-black h-9"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline h-4 w-4 mr-2" />
                Content *
              </label>
              <div
                className={`border rounded-lg ${fieldErrors.content ? "border-red-500" : "border-gray-300"}`}
              >
                <MDEditor
                  value={formData.content?.body || ""}
                  onChange={(value) =>
                    handleNestedChange("content", "body", value || "")
                  }
                  data-color-mode="light"
                  height={600}
                />
              </div>
              {fieldErrors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.content}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Supports Markdown formatting with live preview
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-200 mt-8 -mx-8 -mb-8 rounded-b-xl">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={saving}
              className="px-6 py-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span>
                  {saving
                    ? "Saving..."
                    : modelId
                      ? "Update Model"
                      : "Create Model"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
