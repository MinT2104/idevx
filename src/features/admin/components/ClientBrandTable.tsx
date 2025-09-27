"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import { Search, Trash2, Calendar, Plus, X, Copy, Check } from "lucide-react";
import DataTable, { Column } from "./DataTable";
import Image from "next/image";
import ImageUpload from "./ImageUpload";

interface ClientBrandAdmin {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

interface ClientBrandTableProps {
  initialBrands?: ClientBrandAdmin[];
  initialPagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ClientBrandTable({
  initialBrands = [],
  initialPagination,
}: ClientBrandTableProps) {
  const [brands, setBrands] = useState<ClientBrandAdmin[]>(initialBrands);
  const [pagination, setPagination] = useState(
    initialPagination || {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    }
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Upload states
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    name: "",
    image: undefined as { url: string; alt: string } | undefined,
  });

  // Copy states
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Define table columns
  const columns: Column<ClientBrandAdmin>[] = [
    {
      key: "image",
      header: "Image",
      sortable: false,
      render: (brand) => (
        <div className="flex items-center justify-center">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 group">
            <Image
              src={brand.imageUrl}
              alt={brand.name}
              fill
              className="object-cover"
              sizes="64px"
            />
            {/* Copy URL button */}
            <button
              onClick={() => handleCopyImageUrl(brand.imageUrl, brand.id)}
              className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
              title="Copy image URL"
            >
              {copiedId === brand.id ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <Copy className="h-4 w-4 text-white" />
              )}
            </button>
          </div>
        </div>
      ),
    },
    {
      key: "name",
      header: "Brand Name",
      sortable: true,
      render: (brand) => (
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {brand.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Order: {brand.order || "Not set"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (brand) => (
        <Select
          value={brand.status}
          onValueChange={(value) => handleStatusUpdate(brand.id, value)}
        >
          <SelectTrigger
            className={`w-24 h-7 text-xs font-semibold rounded-full border ${getStatusColor(brand.status)}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (brand) => (
        <div className="whitespace-nowrap text-sm text-gray-900">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span>{new Date(brand.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (brand) => (
        <div className="flex items-center justify-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            title="Copy image URL"
            onClick={() => handleCopyImageUrl(brand.imageUrl, brand.id)}
          >
            {copiedId === brand.id ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete Brand"
            onClick={() => handleDelete(brand.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
        status: status === "all" ? "" : status,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/client-brand?${params}`);
      const data = await response.json();

      if (data.success) {
        setBrands(data.data.clientBrands);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, status, sortBy, sortOrder]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;

    try {
      const response = await fetch(`/api/client-brand/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchBrands(); // Refresh the list
      } else {
        alert("Failed to delete brand");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
      alert("Failed to delete brand");
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/client-brand/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();

      if (data.success) {
        fetchBrands(); // Refresh the list
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleCopyImageUrl = async (imageUrl: string, id: string) => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy URL:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = imageUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleUpload = async () => {
    if (!uploadData.name.trim() || !uploadData.image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Create client brand record
      const createResponse = await fetch("/api/client-brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: uploadData.name,
          imageUrl: uploadData.image.url,
        }),
      });

      const createData = await createResponse.json();
      if (createData.success) {
        setUploadData({ name: "", image: undefined });
        setShowUploadForm(false);
        fetchBrands(); // Refresh the list
      } else {
        throw new Error(createData.error);
      }
    } catch (error) {
      console.error("Error uploading brand:", error);
      alert("Failed to upload brand");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search brands by name..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-white text-black"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <Select value={status} onValueChange={handleStatusChange}>
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

          {/* Upload Button */}
          <div>
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Add Brand
            </Button>
          </div>

          {/* Results count */}
          <div className="flex items-center text-sm text-gray-600">
            {pagination.total} brands found
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setShowUploadForm(false);
              setUploadData({ name: "", image: undefined });
            }}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Upload New Brand
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowUploadForm(false);
                  setUploadData({ name: "", image: undefined });
                }}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter brand name"
                    value={uploadData.name}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Brand Image *"
                    value={uploadData.image}
                    onChange={(image) =>
                      setUploadData((prev) => ({
                        ...prev,
                        image: image || undefined,
                      }))
                    }
                    height={120}
                    hint="Upload the brand logo or image"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUploadForm(false);
                  setUploadData({ name: "", image: undefined });
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!uploadData.name.trim() || !uploadData.image}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Upload Brand
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      <DataTable
        data={brands}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyState={
          <div>
            <div className="text-gray-400 text-4xl mb-4">🏢</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No brands found
            </h3>
            <p className="text-gray-500">
              {search || (status && status !== "all")
                ? "Try adjusting your search or filter criteria."
                : "Start uploading your first client brand."}
            </p>
          </div>
        }
      />
    </div>
  );
}
