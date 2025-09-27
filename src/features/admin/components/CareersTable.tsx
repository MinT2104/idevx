"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import DataTable, { Column } from "./DataTable";
import { Search } from "lucide-react";

type Career = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  linkedin?: string | null;
  website?: string | null;
  message?: string | null;
  cvUrl: string;
  status: "applied" | "reviewed" | "shortlisted" | "rejected" | "hired";
  createdAt: string;
};

export default function CareersTable() {
  const [items, setItems] = useState<Career[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [status, setStatusFilter] = useState("all");
  const [viewingMessage, setViewingMessage] = useState<Career | null>(null);
  const [previewCvUrl, setPreviewCvUrl] = useState<string | null>(null);

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "applied", label: "Applied" },
    { value: "reviewed", label: "Reviewed" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "rejected", label: "Rejected" },
    { value: "hired", label: "Hired" },
  ];

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(pagination.page),
        limit: String(pagination.limit),
        status: status === "all" ? "" : status,
        search,
      });
      const res = await fetch(`/api/careers-admin?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
        const total = json.pagination?.total || json.data.length;
        setPagination((p) => ({
          ...p,
          total,
          totalPages: Math.ceil(total / p.limit),
        }));
      }
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, status, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const updateStatus = async (id: string, newStatus: Career["status"]) => {
    await fetch(`/api/careers-admin/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete application?")) return;
    await fetch(`/api/careers-admin/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const columns: Column<Career>[] = [
    {
      key: "name",
      header: "Candidate",
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      key: "position",
      header: "Position",
      render: (row) => (
        <span className="text-sm text-gray-800">{row.position}</span>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (row) => (
        <div className="text-sm">
          <div className="text-gray-800">{row.phone}</div>
          {row.linkedin && (
            <a
              href={row.linkedin}
              target="_blank"
              className="text-blue-600 hover:underline text-xs"
            >
              LinkedIn
            </a>
          )}
        </div>
      ),
    },
    {
      key: "links",
      header: "Links",
      render: (row) => (
        <div className="flex flex-col gap-1 text-xs">
          {row.linkedin && (
            <a
              href={row.linkedin}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {row.website && (
            <a
              href={row.website}
              target="_blank"
              className="text-blue-600 hover:underline break-all"
            >
              Website
            </a>
          )}
        </div>
      ),
    },
    {
      key: "cv",
      header: "CV",
      render: (row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPreviewCvUrl(row.cvUrl)}
        >
          Preview
        </Button>
      ),
    },
    {
      key: "message",
      header: "Cover Letter",
      render: (row) =>
        row.message ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="truncate max-w-[220px]">
              {row.message.slice(0, 80)}
              {row.message.length > 80 ? "…" : ""}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setViewingMessage(row)}
            >
              View
            </Button>
          </div>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Select
          value={row.status}
          onValueChange={(v) => updateStatus(row.id, v as Career["status"])}
        >
          <SelectTrigger className="h-8 w-36 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions
              .filter((s) => s.value !== "all")
              .map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateStatus(row.id, "shortlisted")}
          >
            Shortlist
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateStatus(row.id, "rejected")}
            className="text-red-600"
          >
            Reject
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => remove(row.id)}
            className="text-red-600"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, email or position..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPagination((p) => ({ ...p, page: 1 }));
                }}
                className="pl-10 bg-white text-black"
              />
            </div>
          </div>

          <div className="md:w-48">
            <Select
              value={status}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPagination((p) => ({ ...p, page: 1 }));
              }}
            >
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            {pagination.total} applications
          </div>
        </div>
      </div>

      <DataTable
        data={items}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={(p) => setPagination((prev) => ({ ...prev, page: p }))}
        onSort={() => {}}
        sortBy="createdAt"
        sortOrder="desc"
        emptyState={<div>No applications found.</div>}
      />

      {viewingMessage && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewingMessage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cover Letter
                  </h3>
                  <p className="text-sm text-gray-500">
                    {viewingMessage.name} • {viewingMessage.position}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingMessage(null)}
                >
                  Close
                </Button>
              </div>
              <div className="rounded-md border p-3 whitespace-pre-wrap text-sm text-gray-900 bg-gray-50 min-h-[120px]">
                {viewingMessage.message}
              </div>
            </div>
          </div>
        </div>
      )}

      {previewCvUrl && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewCvUrl(null)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-5xl h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-medium text-gray-900">CV Preview</h3>
              <div className="flex items-center gap-2">
                <a
                  href={previewCvUrl}
                  target="_blank"
                  className="text-blue-600 text-sm"
                >
                  Open in new tab
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewCvUrl(null)}
                >
                  Close
                </Button>
              </div>
            </div>
            <div className="w-full h-full bg-gray-50">
              {/* Try to embed PDF/image. For non-supported (doc/docx) browsers may download. */}
              <iframe
                src={previewCvUrl}
                className="w-full h-full"
                title="CV Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
