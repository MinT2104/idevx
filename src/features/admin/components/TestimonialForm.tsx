"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import ImageUpload from "./ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import {
  TestimonialItem,
  TestimonialType,
} from "@/features/testimonials/types";

type Props = {
  initial?: Partial<TestimonialItem> | null;
  onCancel: () => void;
  onSaved: () => void;
};

export default function TestimonialForm({ initial, onCancel, onSaved }: Props) {
  const [type, setType] = useState<TestimonialType>(
    (initial?.type as TestimonialType) || "quote"
  );
  const [statValue, setStatValue] = useState(initial?.statistic?.value || "");
  const [statDesc, setStatDesc] = useState(
    initial?.statistic?.description || ""
  );
  const [quoteText, setQuoteText] = useState(initial?.quote?.text || "");
  const [quoteImage, setQuoteImage] = useState(initial?.quote?.image || "");
  const [clientName, setClientName] = useState(initial?.client?.name || "");
  const [clientLogo, setClientLogo] = useState(initial?.client?.logo || "");
  const [companyName, setCompanyName] = useState(initial?.company?.name || "");
  const [companyLogo, setCompanyLogo] = useState(initial?.company?.logo || "");
  const [order, setOrder] = useState<number | "">(initial?.order ?? "");
  const [status, setStatus] = useState("active");
  const isEditing = Boolean(initial?.id);

  const canSubmit = useMemo(() => {
    if (type === "statistic") return Boolean(statValue && statDesc);
    return Boolean(quoteText && (clientLogo || companyLogo));
  }, [type, statValue, statDesc, quoteText, clientLogo, companyLogo]);

  async function handleUpload(file: File): Promise<string> {
    const presignRes = await fetch("/api/upload/presign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    const { presignedUrl, fileUrl } = await presignRes.json();
    const putRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!putRes.ok) throw new Error("Upload failed");
    return fileUrl as string;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: any = {
      type,
      order: typeof order === "string" ? undefined : order,
      status: "active",
    };
    if (type === "statistic") {
      payload.statistic = { value: statValue, description: statDesc };
    } else {
      payload.quote = { text: quoteText, image: quoteImage || undefined };
      if (clientName || clientLogo)
        payload.client = { name: clientName, logo: clientLogo };
      if (companyName || companyLogo)
        payload.company = {
          name: companyName,
          logo: companyLogo,
          imageClass: "w-auto h-5",
        };
    }

    const url = isEditing
      ? `/api/testimonials-admin/${initial?.id}`
      : "/api/testimonials-admin";
    const method = isEditing ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json.success) onSaved();
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <Select
            value={type}
            onValueChange={(v) => setType(v as TestimonialType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quote">Quote</SelectItem>
              <SelectItem value="statistic">Statistic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <Input
            type="number"
            inputMode="numeric"
            value={order as any}
            onChange={(e) =>
              setOrder(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Input
            value="active"
            disabled
            className="bg-gray-100 text-gray-600"
          />
        </div>
      </div>

      {type === "statistic" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statistic Value
            </label>
            <Input
              value={statValue}
              onChange={(e) => setStatValue(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Input
              value={statDesc}
              onChange={(e) => setStatDesc(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quote Text
            </label>
            <Input
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Client
              </label>
              <div className="space-y-3">
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client name"
                />
                <ImageUpload
                  label="Client Logo"
                  value={
                    clientLogo
                      ? { url: clientLogo, alt: clientName || "client" }
                      : undefined
                  }
                  onChange={(img) => setClientLogo(img?.url || "")}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <div className="space-y-3">
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company name"
                />
                <ImageUpload
                  label="Company Logo"
                  value={
                    companyLogo
                      ? { url: companyLogo, alt: companyName || "company" }
                      : undefined
                  }
                  onChange={(img) => setCompanyLogo(img?.url || "")}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!canSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isEditing ? "Save" : "Create"}
        </Button>
      </div>
    </form>
  );
}
