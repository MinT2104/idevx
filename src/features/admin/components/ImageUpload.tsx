"use client";

import { useState, useRef } from "react";
import { Button } from "@/ui/components/button";
import { useToast } from "@/ui/components/toast-provider";
import { ImageIcon, Upload, X, Copy } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value?: {
    url: string;
    alt: string;
  };
  onChange: (image: { url: string; alt: string } | null) => void;
  onUseForBoth?: (image: { url: string; alt: string }) => void;
  className?: string;
  height?: number; // preview height in px
  hint?: string; // helper text below
}

export default function ImageUpload({
  label,
  value,
  onChange,
  onUseForBoth,
  className = "",
  height = 192,
  hint,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error } = useToast();

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      error("Invalid file type", "Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      error("File too large", "Image size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      // Get presigned URL
      const response = await fetch("/api/upload/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized. Please sign in as admin to upload.");
        }
        throw new Error(data.error || "Failed to get presigned URL");
      }

      const { presignedUrl, fileUrl } = data;

      if (!presignedUrl) {
        throw new Error("Failed to get presigned URL");
      }

      console.log("Uploading to S3...", { presignedUrl, fileUrl });

      // Upload to S3
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      console.log(
        "Upload response:",
        uploadResponse.status,
        uploadResponse.statusText
      );

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload error response:", errorText);
        throw new Error(
          `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      // Update form with new image
      onChange({
        url: fileUrl,
        alt: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      });

      console.log("Upload successful:", fileUrl);
      success("Upload successful", "Image uploaded successfully");
    } catch (uploadError) {
      console.error("Upload error:", uploadError);
      error(
        "Upload failed",
        uploadError instanceof Error ? uploadError.message : "Unknown error"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCopyUrl = async () => {
    if (value?.url) {
      await navigator.clipboard.writeText(value.url);
      success("URL copied", "Image URL copied to clipboard!");
    }
  };

  const handleUseForBoth = () => {
    if (value) {
      onChange(value);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        // Image Preview
        <div className="space-y-3">
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white">
            <img
              src={value.url}
              alt={value.alt}
              style={{ height: `${height}px` }}
              className="w-full object-contain bg-white"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-start justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={value.alt}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
              placeholder="Image alt text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleCopyUrl}
              className="px-3"
            >
              <Copy className="h-4 w-4" />
            </Button>
            {onUseForBoth && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => onUseForBoth(value)}
                className="px-3 text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                Use for both
              </Button>
            )}
          </div>

          {hint && <p className="text-xs text-gray-400">{hint}</p>}
        </div>
      ) : (
        // Upload Area
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors flex items-center justify-center w-full ${
            dragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="space-y-3">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm text-gray-600 font-medium">
                  Uploading...
                </p>
              </>
            ) : (
              <>
                <ImageIcon className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-sm text-gray-600">
                    Drag and drop an image here, or{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
