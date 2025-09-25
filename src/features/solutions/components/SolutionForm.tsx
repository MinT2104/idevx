"use client";

import { useMemo, useState } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import SectionBuilder from "./SectionBuilder";
import SectionRenderer from "@/features/solutions/components/SectionRenderer";
import { useToast } from "@/ui/components/toast-provider";
import { useRouter } from "next/navigation";

type SectionValue = any;

export type SolutionFormValue = {
  key: string;
  kind: "solution" | "product";
  sections: SectionValue[];
};

export default function SolutionForm({
  initial,
  onSubmit,
  submitting,
}: {
  initial?: Partial<SolutionFormValue>;
  onSubmit: (value: SolutionFormValue) => Promise<void> | void;
  submitting?: boolean;
}) {
  const { error: toastError, warning: toastWarning } = useToast();
  const router = useRouter();
  const [key, setKey] = useState(initial?.key || "");
  const [kind, setKind] = useState<"solution" | "product">(
    (initial?.kind as any) || "solution"
  );
  const [sections, setSections] = useState<SectionValue[]>(
    (Array.isArray(initial?.sections) ? initial?.sections : []) || []
  );
  const [newSection, setNewSection] = useState<string>("{}");
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const addSection = () => {
    try {
      const parsed = newSection.trim() ? JSON.parse(newSection) : {};
      setSections((s) => [...s, parsed]);
      setNewSection("{}");
      setError(null);
    } catch (e: any) {
      const message = "JSON không hợp lệ cho section";
      setError(message);
      toastError("Lỗi", message);
    }
  };

  const updateSection = (index: number, value: string) => {
    try {
      const parsed = JSON.parse(value);
      setSections((s) => s.map((item, i) => (i === index ? parsed : item)));
      setError(null);
    } catch (e) {
      // ignore live errors
    }
  };

  const removeSection = (index: number) => {
    setSections((s) => s.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!key) {
      const message = "Cần nhập Key";
      setError(message);
      toastWarning("Thiếu thông tin", message);
      return;
    }
    try {
      // Sanitize sections to only include fields actually used by the renderer per type
      const sanitizedSections = sections.map((s: any) => sanitizeSection(s));
      await onSubmit({ key, kind, sections: sanitizedSections });
    } catch (e: any) {
      const message = e?.message || "Gửi biểu mẫu thất bại";
      setError(message);
      toastError("Lỗi", message);
    }
  };

  function sanitizeSection(s: any) {
    const base: any = { id: s.id, type: s.type };
    switch (s.type) {
      case "hero": {
        base.props = {
          title: s?.props?.title || "",
          description: s?.props?.description || "",
          buttons: Array.isArray(s?.props?.buttons)
            ? s.props.buttons.map((b: any) => ({
                text: b?.text || "",
                variant: b?.variant || undefined,
                size: b?.size || undefined,
                className: b?.className || undefined,
              }))
            : [],
        };
        return base;
      }
      case "trusted-by": {
        base.title = s.title || undefined;
        base.logos = Array.isArray(s.logos)
          ? s.logos.map((l: any) => ({
              src: l?.src || "",
              alt: l?.alt || "",
              className: l?.className || undefined,
            }))
          : [];
        return base;
      }
      case "testimonial": {
        base.backgroundColor = s.backgroundColor || undefined;
        base.quote = s.quote || "";
        base.author = {
          name: s?.author?.name || "",
          title: s?.author?.title || "",
          avatar: { src: s?.author?.avatar?.src || "" },
        };
        return base;
      }
      case "grid": {
        base.backgroundColor = s.backgroundColor || undefined;
        base.title = s.title || undefined;
        base.subtitle = s.subtitle || undefined;
        base.description = s.description || undefined;
        base.gridCols = s.gridCols || undefined;
        base.cardSize = s.cardSize || undefined;
        base.items = Array.isArray(s.items)
          ? s.items.map((it: any) => ({
              title: it?.title || "",
              description: it?.description || undefined,
              icon:
                typeof it?.icon === "string"
                  ? it.icon
                  : it?.icon === true
                    ? true
                    : undefined,
              button: it?.button
                ? {
                    text: it?.button?.text || undefined,
                    link: it?.button?.link || undefined,
                  }
                : undefined,
            }))
          : [];
        return base;
      }
      case "product-feature": {
        base.backgroundColor = s.backgroundColor || undefined;
        base.title = s.title || undefined;
        base.description = s.description || undefined;
        base.items = Array.isArray(s.items)
          ? s.items.map((it: any) => ({
              title: it?.title || "",
              points: Array.isArray(it?.points) ? [...it.points] : [],
            }))
          : [];
        base.image = s.image || undefined;
        base.imagePosition = s.imagePosition || undefined;
        return base;
      }
      case "component": {
        base.component = s.component || "";
        return base;
      }
      default:
        return s;
    }
  }

  const previewSections = useMemo(
    () => sections.map((s: any) => sanitizeSection(s)),
    [sections]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-28">
      <div className=" flex gap-4 items-center">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-800">
              Key <span className="text-red-500">*</span>
            </label>
            <Input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="e.g. ai-for-education"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-800">Kind</label>
          <Select value={kind} onValueChange={(v) => setKind(v as any)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select kind" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solution">Solution</SelectItem>
              <SelectItem value="product">Product</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-800">Sections</label>
        </div>
        <SectionBuilder value={sections} onChange={setSections} />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="pt-2" />

      {/* Sticky bottom action bar within content container */}
      <div className="fixed bottom-0 z-40">
        <div className="pointer-events-none px-0 pb-4">
          <div className="pointer-events-auto rounded-lg border border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-md">
            <div className="flex items-center justify-end gap-2 p-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPreviewOpen(true)}
                className="h-9 px-4"
              >
                Preview
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/admin/solutions")}
                className="h-9 px-4 bg-red-500 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!!submitting}
                className="h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {submitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setPreviewOpen(false)}
          />
          <div className="relative z-10 w-[92vw] max-w-5xl h-[85vh] bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-700">
                Live Preview
              </div>
              <button
                type="button"
                className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setPreviewOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="rounded-lg border border-gray-200 bg-white">
                {(previewSections || []).map((section: any, idx: number) => (
                  <SectionRenderer
                    key={section.id || idx}
                    section={section as any}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
