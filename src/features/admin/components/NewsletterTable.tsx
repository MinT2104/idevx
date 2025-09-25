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
  Mail,
  Calendar,
  Globe,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import {
  NewsletterSubscriptionAdmin,
  NewsletterParams,
} from "@/features/newsletter/types/newsletter-admin.types";
import DataTable, { Column } from "./DataTable";
import { formatDistanceToNow } from "date-fns";

interface NewsletterTableProps {
  initialSubscriptions?: NewsletterSubscriptionAdmin[];
  initialPagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function NewsletterTable({
  initialSubscriptions = [],
  initialPagination,
}: NewsletterTableProps) {
  const [subscriptions, setSubscriptions] =
    useState<NewsletterSubscriptionAdmin[]>(initialSubscriptions);
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
  const [selectedSubscription, setSelectedSubscription] =
    useState<NewsletterSubscriptionAdmin | null>(null);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "unsubscribed", label: "Unsubscribed" },
    { value: "bounced", label: "Bounced" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "unsubscribed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "bounced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Fetch subscriptions
  const fetchSubscriptions = useCallback(async (params: NewsletterParams) => {
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

      const response = await fetch(`/api/newsletter?${searchParams}`);
      const result = await response.json();

      if (result.success) {
        setSubscriptions(result.data);
        setPagination(result.pagination);
      } else {
        console.error(
          "Failed to fetch newsletter subscriptions:",
          result.error
        );
      }
    } catch (error) {
      console.error("Error fetching newsletter subscriptions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load subscriptions on mount and when filters change
  useEffect(() => {
    fetchSubscriptions({
      page: pagination.page,
      limit: pagination.limit,
      search: search || undefined,
      status: status !== "all" ? status : undefined,
      sortBy,
      sortOrder,
    });
  }, [
    fetchSubscriptions,
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
      const response = await fetch(`/api/newsletter/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (result.success) {
        // Update the subscription in the list
        setSubscriptions((prev) =>
          prev.map((subscription) =>
            subscription.id === id
              ? {
                  ...subscription,
                  status: newStatus as any,
                  updatedAt: new Date().toISOString(),
                }
              : subscription
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
    if (!confirm("Are you sure you want to delete this subscription?")) {
      return;
    }

    try {
      const response = await fetch(`/api/newsletter/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        // Remove from list
        setSubscriptions((prev) =>
          prev.filter((subscription) => subscription.id !== id)
        );
        setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
      } else {
        alert("Failed to delete subscription");
      }
    } catch (error) {
      alert("Error deleting subscription");
      console.error(error);
    }
  };

  // Define table columns
  const columns: Column<NewsletterSubscriptionAdmin>[] = [
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (subscription) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {subscription.email}
            </div>
            {subscription.source && (
              <div className="text-sm text-gray-500">
                Source: {subscription.source}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (subscription) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            subscription.status
          )}`}
        >
          {subscription.status === "active" && (
            <UserCheck className="w-3 h-3 mr-1" />
          )}
          {subscription.status === "unsubscribed" && (
            <UserX className="w-3 h-3 mr-1" />
          )}
          {subscription.status.toUpperCase()}
        </span>
      ),
    },
    {
      key: "source",
      header: "Source",
      render: (subscription) => (
        <div>
          {subscription.source ? (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
              <Globe className="w-3 h-3 mr-1" />
              {subscription.source}
            </span>
          ) : (
            <span className="text-gray-400 text-sm">—</span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Subscribed",
      sortable: true,
      render: (subscription) => (
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDistanceToNow(new Date(subscription.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (subscription) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedSubscription(subscription)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Select
            value={subscription.status}
            onValueChange={(value) =>
              handleStatusUpdate(subscription.id, value)
            }
          >
            <SelectTrigger className="h-8 w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
              <SelectItem value="bounced">Bounced</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(subscription.id)}
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
                placeholder="Search by email..."
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
            {pagination.total} subscription{pagination.total !== 1 ? "s" : ""}{" "}
            found
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={subscriptions}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyState={
          <div>
            <div className="text-gray-400 text-4xl mb-4">📧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No subscriptions found
            </h3>
            <p className="text-gray-500">
              {search || (status && status !== "all")
                ? "Try adjusting your search or filter criteria."
                : "No newsletter subscriptions yet."}
            </p>
          </div>
        }
      />

      {/* Subscription Detail Modal */}
      {selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Subscription Details
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubscription(null)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-sm text-gray-900">
                    <a
                      href={`mailto:${selectedSubscription.email}`}
                      className="text-blue-600 hover:text-blue-500 flex items-center space-x-1"
                    >
                      <span>{selectedSubscription.email}</span>
                      <Mail className="w-3 h-3" />
                    </a>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                      selectedSubscription.status
                    )}`}
                  >
                    {selectedSubscription.status === "active" && (
                      <UserCheck className="w-3 h-3 mr-1" />
                    )}
                    {selectedSubscription.status === "unsubscribed" && (
                      <UserX className="w-3 h-3 mr-1" />
                    )}
                    {selectedSubscription.status.toUpperCase()}
                  </span>
                </div>

                {selectedSubscription.source && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Source
                    </label>
                    <p className="text-sm text-gray-900">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        <Globe className="w-3 h-3 mr-1" />
                        {selectedSubscription.source}
                      </span>
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subscribed
                  </label>
                  <p className="text-sm text-gray-900">
                    {formatDistanceToNow(
                      new Date(selectedSubscription.createdAt),
                      {
                        addSuffix: true,
                      }
                    )}
                  </p>
                </div>

                {selectedSubscription.ipAddress && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IP Address
                    </label>
                    <p className="text-sm text-gray-900 font-mono">
                      {selectedSubscription.ipAddress}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <Select
                    value={selectedSubscription.status}
                    onValueChange={(value) =>
                      handleStatusUpdate(selectedSubscription.id, value)
                    }
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                      <SelectItem value="bounced">Bounced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedSubscription.id)}
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
