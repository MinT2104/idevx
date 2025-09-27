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
  Trash2,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import DataTable, { Column } from "./DataTable";

interface QuotationAdmin {
  id: string;
  projectModel: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  skype: string;
  website?: string;
  description: string;
  budget: {
    min: number;
    max: number;
  };
  agreeToPrivacy: boolean;
  status: string;
  notes?: string;
  quotedPrice?: number;
  createdAt: string;
  updatedAt: string;
}

interface QuotationTableProps {
  initialQuotations?: QuotationAdmin[];
  initialPagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function QuotationTable({
  initialQuotations = [],
  initialPagination,
}: QuotationTableProps) {
  const [quotations, setQuotations] =
    useState<QuotationAdmin[]>(initialQuotations);
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

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "reviewed", label: "Reviewed" },
    { value: "quoted", label: "Quoted" },
    { value: "accepted", label: "Accepted" },
    { value: "rejected", label: "Rejected" },
    { value: "archived", label: "Archived" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "quoted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "accepted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Define table columns
  const columns: Column<QuotationAdmin>[] = [
    {
      key: "contact",
      header: "Contact Info",
      sortable: true,
      render: (quotation) => (
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {quotation.name}
              </h3>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
              <Mail className="h-3 w-3" />
              <span className="truncate">{quotation.email}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
              <Phone className="h-3 w-3" />
              <span>{quotation.phone}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
              <Building className="h-3 w-3" />
              <span className="truncate">{quotation.company}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "project",
      header: "Project Details",
      sortable: false,
      render: (quotation) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900">
            {quotation.projectModel}
          </div>
          <p className="text-xs text-gray-500 line-clamp-2">
            {quotation.description}
          </p>
          {quotation.website && (
            <p className="text-xs text-blue-600 truncate">
              {quotation.website}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "budget",
      header: "Budget Range",
      sortable: true,
      render: (quotation) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-sm text-gray-900">
            <DollarSign className="h-3 w-3" />
            <span>
              ${quotation.budget.min.toLocaleString()} - $
              {quotation.budget.max.toLocaleString()}
            </span>
          </div>
          {quotation.quotedPrice && (
            <div className="text-xs text-emerald-600 font-medium">
              Quoted: ${quotation.quotedPrice.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (quotation) => (
        <Select
          value={quotation.status}
          onValueChange={(value) => handleStatusUpdate(quotation.id, value)}
        >
          <SelectTrigger
            className={`w-24 h-7 text-xs font-semibold rounded-full border ${getStatusColor(quotation.status)}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="quoted">Quoted</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      sortable: true,
      render: (quotation) => (
        <div className="whitespace-nowrap text-sm text-gray-900">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span>{new Date(quotation.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (quotation) => (
        <div className="flex items-center justify-center">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete Quotation"
            onClick={() => handleDelete(quotation.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const fetchQuotations = useCallback(async () => {
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

      const response = await fetch(`/api/quotation?${params}`);
      const data = await response.json();

      if (data.success) {
        setQuotations(data.data.quotations);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching quotations:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, status, sortBy, sortOrder]);

  useEffect(() => {
    fetchQuotations();
  }, [fetchQuotations]);

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
    if (!confirm("Are you sure you want to delete this quotation?")) return;

    try {
      const response = await fetch(`/api/quotation/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchQuotations(); // Refresh the list
      } else {
        alert("Failed to delete quotation");
      }
    } catch (error) {
      console.error("Error deleting quotation:", error);
      alert("Failed to delete quotation");
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/quotation/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();

      if (data.success) {
        fetchQuotations(); // Refresh the list
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
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
                placeholder="Search quotations by name, email, company, or description..."
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

          {/* Results count */}
          <div className="flex items-center text-sm text-gray-600">
            {pagination.total} quotations found
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={quotations}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyState={
          <div>
            <div className="text-gray-400 text-4xl mb-4">💼</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quotations found
            </h3>
            <p className="text-gray-500">
              {search || (status && status !== "all")
                ? "Try adjusting your search or filter criteria."
                : "No quotation requests have been submitted yet."}
            </p>
          </div>
        }
      />
    </div>
  );
}
