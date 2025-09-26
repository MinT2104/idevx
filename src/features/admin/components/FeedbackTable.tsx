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
  MessageSquare,
  Calendar,
  Mail,
  ExternalLink,
  Trash2,
} from "lucide-react";
import {
  FeedbackAdmin,
  FeedbackParams,
} from "@/features/feedback/types/feedback-admin.types";
import DataTable, { Column } from "./DataTable";
import { formatDistanceToNow } from "date-fns";

interface FeedbackTableProps {
  initialFeedbacks?: FeedbackAdmin[];
  initialPagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function FeedbackTable({
  initialFeedbacks = [],
  initialPagination,
}: FeedbackTableProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackAdmin[]>(initialFeedbacks);
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
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackAdmin | null>(null);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "read", label: "Read" },
    { value: "replied", label: "Replied" },
    { value: "archived", label: "Archived" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "read":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "replied":
        return "bg-green-100 text-green-800 border-green-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Fetch feedbacks
  const fetchFeedbacks = useCallback(async (params: FeedbackParams) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams();

      if (params.page) searchParams.append("page", params.page.toString());
      if (params.limit) searchParams.append("limit", params.limit.toString());
      if (params.search) searchParams.append("search", params.search);
      if (params.status && params.status !== "all")
        searchParams.append("status", params.status);
      if (params.sortBy) searchParams.append("sortBy", params.sortBy);
      if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);

      const response = await fetch(`/api/feedback?${searchParams}`);
      const result = await response.json();

      if (result.success) {
        setFeedbacks(result.data);
        setPagination(result.pagination);
      } else {
        console.error("Failed to fetch feedbacks:", result.error);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load feedbacks on mount and when filters change
  useEffect(() => {
    fetchFeedbacks({
      page: pagination.page,
      limit: pagination.limit,
      search: search || undefined,
      status: status !== "all" ? status : undefined,
      sortBy,
      sortOrder,
    });
  }, [
    fetchFeedbacks,
    pagination.page,
    pagination.limit,
    search,
    status,
    sortBy,
    sortOrder,
  ]);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  // Handle status filter
  const handleStatusChange = useCallback((value: string) => {
    setStatus(value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  // Handle sort
  const handleSort = useCallback(
    (column: string) => {
      if (sortBy === column) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(column);
        setSortOrder("desc");
      }
    },
    [sortBy]
  );

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (result.success) {
        // Update the feedback in the list
        setFeedbacks((prev) =>
          prev.map((feedback) =>
            feedback.id === id
              ? {
                  ...feedback,
                  status: newStatus as any,
                  updatedAt: new Date().toISOString(),
                }
              : feedback
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Error updating status");
      console.error(error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    try {
      const response = await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        // Remove from list
        setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
        setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
      } else {
        alert("Failed to delete feedback");
      }
    } catch (error) {
      alert("Error deleting feedback");
      console.error(error);
    }
  };

  // Define table columns
  const columns: Column<FeedbackAdmin>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (feedback) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {feedback?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">{feedback.name}</div>
            <div className="text-sm text-gray-500">{feedback.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (feedback) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            feedback.status
          )}`}
        >
          {feedback.status.toUpperCase()}
        </span>
      ),
    },
    {
      key: "message",
      header: "Message",
      render: (feedback) => {
        const messageLength = feedback.message.length;
        const maxLength = 80;
        const isLongMessage = messageLength > maxLength;

        return (
          <div className="max-w-xs">
            {isLongMessage ? (
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-gray-900 line-clamp-2 flex-1">
                  {feedback.message.substring(0, maxLength)}...
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFeedback(feedback)}
                  className="h-6 w-6 p-0 flex-shrink-0"
                  title="View full message"
                >
                  <MessageSquare className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <p className="text-sm text-gray-900 line-clamp-2">
                {feedback.message}
              </p>
            )}
          </div>
        );
      },
    },
    {
      key: "phone",
      header: "Phone",
      render: (feedback) => (
        <div>
          <span className="text-sm text-gray-900">{feedback.phone}</span>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company",
      render: (feedback) => (
        <div>
          <span className="text-sm text-gray-900">{feedback.company}</span>
        </div>
      ),
    },
    {
      key: "skype",
      header: "Skype",
      render: (feedback) => (
        <div>
          <span className="text-sm text-gray-900">{feedback.skype}</span>
        </div>
      ),
    },
    {
      key: "website",
      header: "Website",
      render: (feedback) => (
        <div>
          <a
            href={feedback.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500 text-sm flex items-center space-x-1"
          >
            <span className="truncate max-w-32">{feedback.website}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Submitted",
      sortable: true,
      render: (feedback) => (
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDistanceToNow(new Date(feedback.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (feedback) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedFeedback(feedback)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Select
            value={feedback.status}
            onValueChange={(value) => handleStatusUpdate(feedback.id, value)}
          >
            <SelectTrigger className="h-8 w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(feedback.id)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, or message..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
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
        </div>

        {/* Results count */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {pagination.total} feedback{pagination.total !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={feedbacks}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyState={
          <div>
            <div className="text-gray-400 text-4xl mb-4">💬</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No feedback found
            </h3>
            <p className="text-gray-500">
              {search || (status && status !== "all")
                ? "Try adjusting your search or filter criteria."
                : "No feedback has been submitted yet."}
            </p>
          </div>
        }
      />

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Feedback Details
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFeedback(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedFeedback.name}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">
                    <a
                      href={`mailto:${selectedFeedback.email}`}
                      className="text-blue-600 hover:text-blue-500 flex items-center space-x-1"
                    >
                      <span>{selectedFeedback.email}</span>
                      <Mail className="w-3 h-3" />
                    </a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <p className="text-sm text-gray-900">
                    <a
                      href={selectedFeedback.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500 flex items-center space-x-1"
                    >
                      <span>{selectedFeedback.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedFeedback.status
                    )}`}
                  >
                    {selectedFeedback.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submitted
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDistanceToNow(new Date(selectedFeedback.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">
                      {selectedFeedback.message}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Select
                    value={selectedFeedback.status}
                    onValueChange={(value) =>
                      handleStatusUpdate(selectedFeedback.id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedFeedback.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
