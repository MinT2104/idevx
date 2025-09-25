"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Star,
  ExternalLink,
  Cpu,
  Building,
  Tag,
} from "lucide-react";
import {
  ModelAdmin,
  ModelsParams,
} from "@/features/models/types/model-admin.types";
import DataTable, { Column } from "./DataTable";
import { useRouter } from "next/navigation";

interface ModelTableProps {
  initialModels?: ModelAdmin[];
  initialPagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ModelTable({
  initialModels = [],
  initialPagination,
}: ModelTableProps) {
  const router = useRouter();
  const [models, setModels] = useState<ModelAdmin[]>(initialModels);
  const [pagination, setPagination] = useState(
    initialPagination || {
      page: 1,
      limit: 5,
      total: 0,
      totalPages: 0,
    }
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  // "All",
  // "LLM",
  // "Transcription",
  // "Text to Speech",
  // "Image Generation",
  // "Embedding",
  // "Speech to Text",
  // "Image Processing",

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "llm", label: "LLM" },
    { value: "transcription", label: "Transcription" },
    { value: "text-to-speech", label: "Text to Speech" },
    { value: "image-generation", label: "Image Generation" },
    { value: "embedding", label: "Embedding" },
    { value: "speech-to-text", label: "Speech to Text" },
    { value: "image-processing", label: "Image Processing" },
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "llm":
        return "bg-blue-100 text-blue-800";
      case "transcription":
        return "bg-purple-100 text-purple-800";
      case "embedding":
        return "bg-green-100 text-green-800";
      case "speech-to-text":
        return "bg-orange-100 text-orange-800";
      case "image-processing":
        return "bg-pink-100 text-pink-800";
      case "image-generation":
        return "bg-red-100 text-red-800";
      case "text-to-speech":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const fetchModels = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
        status: status === "all" ? "" : status,
        type: type === "all" ? "" : type,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/model-admin?${params}`);
      const data = await response.json();

      if (data.success) {
        setModels(data.data.models);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoading(false);
    }
  }, [
    pagination.page,
    pagination.limit,
    search,
    status,
    type,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleTypeChange = (value: string) => {
    setType(value);
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
    if (!confirm("Are you sure you want to delete this model?")) return;

    try {
      const response = await fetch(`/api/model-admin/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchModels(); // Refresh the list
      } else {
        alert("Failed to delete model");
      }
    } catch (error) {
      console.error("Error deleting model:", error);
      alert("Failed to delete model");
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/model-admin/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();

      if (data.success) {
        fetchModels(); // Refresh the list
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleViewModel = (slug: string) => {
    // Open model in new tab
    window.open(`/models/${slug}`, "_blank");
  };

  const handleEditModel = (id: string) => {
    // Navigate to edit page
    router.push(`/admin/models/edit/${id}`);
  };

  // Define table columns
  const columns: Column<ModelAdmin>[] = [
    {
      key: "name",
      header: "Model",
      sortable: true,
      render: (model) => (
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {model.name}
              </h3>
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {model.description || "No description available"}
            </p>
            <p className="text-xs text-gray-400 font-mono mt-1">
              /{model.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      render: (model) => (
        <div className="flex items-center space-x-2">
          <Cpu className="h-4 w-4 text-gray-400" />
          <span
            className={`text-xs px-2 py-1 rounded-full ${getTypeColor(model.type || "unknown")}`}
          >
            {model.type || "Unknown"}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (model) => (
        <Select
          value={model.status}
          onValueChange={(value) => handleStatusUpdate(model.id, value)}
        >
          <SelectTrigger
            className={`w-24 h-7 text-xs font-semibold rounded-full border ${getStatusColor(model.status)}`}
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
      render: (model) => (
        <div className="whitespace-nowrap text-sm text-gray-900">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span>{new Date(model.createdAt || "").toLocaleDateString()}</span>
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (model) => (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="View Model"
            onClick={() => handleViewModel(model.slug)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Edit Model"
            onClick={() => handleEditModel(model.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            title="Delete Model"
            onClick={() => handleDelete(model.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search models by name, description, slug..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-white text-black"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
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

          {/* Type Filter */}
          <div>
            <Select value={type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-full bg-white text-black">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            {pagination.total} models found
          </div>
          <div className="text-sm text-gray-500">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} results
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={models}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyState={
          <div>
            <div className="text-gray-400 text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No models found
            </h3>
            <p className="text-gray-500">
              {search ||
              (status && status !== "all") ||
              (type && type !== "all")
                ? "Try adjusting your search or filter criteria."
                : "Start by adding your first AI model."}
            </p>
          </div>
        }
      />
    </div>
  );
}
