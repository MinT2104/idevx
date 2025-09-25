"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { Checkbox } from "@/ui/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import { useToast } from "@/ui/components/toast-provider";
import TagInput from "./TagInput";
import ImageUpload from "./ImageUpload";
import dynamic from "next/dynamic";
import {
  Save,
  Eye,
  Calendar,
  Image as ImageIcon,
  User,
  Tag as TagIcon,
  FileText,
  Settings,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  BlogFormData,
  Author,
  Category,
  Tag,
} from "@/features/blog/types/blog-form.types";

// Dynamic import for markdown editor
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface BlogFormProps {
  initialData?: BlogFormData;
  postId?: string;
}

export default function BlogForm({ initialData, postId }: BlogFormProps) {
  const router = useRouter();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form metadata
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  // Form data
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    subtitle: "",
    excerpt: "",
    slug: "",
    locale: "en",
    content: {
      type: "markdown",
      body: "",
    },
    taxonomy: {
      categories: [],
      tags: [],
    },
    authors: [],
    status: "draft",
    featured: false,
    ...initialData,
  });

  // Load form metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        console.log("Fetching metadata from /api/blog-form/metadata");
        const response = await fetch("/api/blog-form/metadata");
        console.log("Metadata response status:", response.status);

        const data = await response.json();
        console.log("Metadata response data:", data);

        if (data.success) {
          setAuthors(data.data.authors);
          setCategories(data.data.categories);
          setTags(data.data.tags);

          console.log("Metadata loaded:", {
            authors: data.data.authors,
            categories: data.data.categories,
            tags: data.data.tags,
          });

          // Auto-select DevX Editorial author
          if (data.data.authors.length > 0 && formData.authors.length === 0) {
            const devxAuthor = data.data.authors.find(
              (a: Author) => a.id === "devx-editorial"
            );
            if (devxAuthor) {
              setFormData((prev) => ({
                ...prev,
                authors: [devxAuthor],
              }));
            }
          }
        } else {
          console.error("Metadata fetch failed:", data.error);
          error("Failed to load form data", data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching metadata:", err);
        error(
          "Failed to load form data",
          "Please refresh the page and try again"
        );
      }
    };

    fetchMetadata();
  }, []);

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case "title":
        if (!value || value.trim().length === 0) {
          return "Title is required";
        }
        if (value.trim().length < 3) {
          return "Title must be at least 3 characters";
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
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // thay nhóm ký tự đặc biệt thành -
        .replace(/^-+|-+$/g, ""); // bỏ dấu - đầu/cuối
    }

    // Auto-generate slug from title
    if (field === "title") {
      setFormData((prev) => ({ ...prev, slug: toSlug(value) }));
    }
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof BlogFormData] as any),
        [field]: value,
      },
    }));
  };

  const handleAuthorChange = (authorId: string, checked: boolean) => {
    const author = authors.find((a) => a.id === authorId);
    if (!author) return;

    setFormData((prev) => ({
      ...prev,
      authors: checked
        ? [...prev.authors, author]
        : prev.authors.filter((a) => a.id !== authorId),
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      taxonomy: {
        ...prev.taxonomy,
        categories: checked
          ? [...prev.taxonomy.categories, categoryId]
          : prev.taxonomy.categories.filter((id) => id !== categoryId),
      },
    }));
  };

  const handleTagsChange = (tagIds: string[]) => {
    setFormData((prev) => ({
      ...prev,
      taxonomy: {
        ...prev.taxonomy,
        tags: tagIds,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newFieldErrors: Record<string, string> = {};

    // Validate required fields
    const titleError = validateField("title", formData.title);
    if (titleError) newFieldErrors.title = titleError;

    const slugError = validateField("slug", formData.slug);
    if (slugError) newFieldErrors.slug = slugError;

    const contentError = validateField("content", formData.content);
    if (contentError) newFieldErrors.content = contentError;

    // Validate authors
    if (formData.authors.length === 0) {
      newFieldErrors.authors = "At least one author is required";
    }

    // Validate categories
    if (formData.taxonomy.categories.length === 0) {
      newFieldErrors.categories = "At least one category is required";
    }

    setFieldErrors(newFieldErrors);
    return Object.keys(newFieldErrors).length === 0;
  };

  const handleSubmit = async (status: "draft" | "published") => {
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
        status,
        publishedAt:
          status === "published" ? new Date().toISOString() : undefined,
      };

      const url = postId ? `/api/blog-form/${postId}` : "/api/blog-form";
      const method = postId ? "PUT" : "POST";

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
          `${status === "published" ? "Published" : "Saved"} successfully!`,
          `Your blog post has been ${status === "published" ? "published" : "saved as draft"}`
        );

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/blog");
        }, 1500);
      } else {
        error("Save failed", data.error || "Failed to save post");
      }
    } catch (saveError) {
      console.error("Error saving post:", saveError);
      error("Save failed", "An error occurred while saving the post");
    } finally {
      setSaving(false);
    }
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter blog post title"
                className={`text-lg ${fieldErrors.title ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
              />
              {fieldErrors.title && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
              )}
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <Input
                type="text"
                value={formData.subtitle || ""}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder="Enter subtitle (optional)"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <Input
                type="text"
                value={formData.slug}
                disabled={true}
                placeholder="Auto-generated from title"
                className={`font-mono bg-gray-100 text-gray-600 cursor-not-allowed ${fieldErrors.slug ? "border-red-500" : ""}`}
              />
              <p className="text-xs text-gray-500 mt-1">
                URL: /blog/{formData.slug}
              </p>
              {fieldErrors.slug && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.slug}</p>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt || ""}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                placeholder="Brief description of the post"
                className="w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            {/* Hero Image */}
            <ImageUpload
              label="Hero Image"
              value={formData.heroImage}
              onChange={(image) => {
                handleInputChange("heroImage", image);
                // Auto-use hero image for card if card image is empty
                if (image && !formData.cardImage) {
                  handleInputChange("cardImage", image);
                }
              }}
              onUseForBoth={(image) => {
                handleInputChange("heroImage", image);
                handleInputChange("cardImage", image);
              }}
            />

            {/* Card Image */}
            <ImageUpload
              label="Card Image"
              value={formData.cardImage}
              onChange={(image) => {
                handleInputChange("cardImage", image);
                // Auto-use card image for hero if hero image is empty
                if (image && !formData.heroImage) {
                  handleInputChange("heroImage", image);
                }
              }}
              onUseForBoth={(image) => {
                handleInputChange("heroImage", image);
                handleInputChange("cardImage", image);
              }}
            />

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <div
                className={`border rounded-lg ${fieldErrors.content ? "border-red-500" : "border-gray-300"}`}
              >
                <MDEditor
                  value={formData.content.body}
                  onChange={(value) =>
                    handleNestedChange("content", "body", value || "")
                  }
                  data-color-mode="light"
                  height={400}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Publishing</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      handleInputChange("featured", checked)
                    }
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Featured post
                  </label>
                </div>
              </div>
            </div>

            {/* Authors */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Authors</span>
              </h3>

              <div className="space-y-2">
                {authors.map((author) => (
                  <div key={author.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`author-${author.id}`}
                      checked={true}
                      disabled={true}
                    />
                    <label
                      htmlFor={`author-${author.id}`}
                      className="text-sm text-gray-700 font-medium"
                    >
                      {author.name}
                      {author.roleOrTitle && (
                        <span className="text-gray-500 ml-1">
                          ({author.roleOrTitle})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
              {fieldErrors.authors && (
                <p className="text-red-500 text-sm mt-2">
                  {fieldErrors.authors}
                </p>
              )}
            </div>

            {/* Categories */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Categories</span>
              </h3>

              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={formData.taxonomy.categories.includes(
                        category.id
                      )}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, !!checked)
                      }
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="text-sm text-gray-700"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              {fieldErrors.categories && (
                <p className="text-red-500 text-sm mt-2">
                  {fieldErrors.categories}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <TagIcon className="h-5 w-5" />
                <span>Tags</span>
              </h3>

              <TagInput
                availableTags={tags}
                selectedTags={formData.taxonomy.tags || []}
                onTagsChange={handleTagsChange}
                placeholder="Type and press Enter to add tags..."
              />
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
                onClick={() => handleSubmit("draft")}
                disabled={saving}
                variant="outline"
                className="px-6 py-2 flex items-center space-x-2 border-blue-300 text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <span>{saving ? "Saving..." : "Save Draft"}</span>
              </Button>

              <Button
                onClick={() => handleSubmit("published")}
                disabled={saving}
                className="px-6 py-2 flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span>{saving ? "Publishing..." : "Publish Post"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
