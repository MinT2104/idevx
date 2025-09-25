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
} from "lucide-react";
import {
  BlogPostAdmin,
  BlogPostsParams,
} from "@/features/blog/types/blog-admin.types";
import DataTable, { Column } from "./DataTable";

interface BlogTableProps {
  initialPosts?: BlogPostAdmin[];
  initialPagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function BlogTable({
  initialPosts = [],
  initialPagination,
}: BlogTableProps) {
  const [posts, setPosts] = useState<BlogPostAdmin[]>(initialPosts);
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

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Define table columns
  const columns: Column<BlogPostAdmin>[] = [
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (post) => (
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {post.title}
              </h3>
              {post.featured && (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {post.excerpt || "No excerpt available"}
            </p>
            <p className="text-xs text-gray-400 font-mono mt-1">/{post.slug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (post) => (
        <Select
          value={post.status}
          onValueChange={(value) => handleStatusUpdate(post.id, value)}
        >
          <SelectTrigger
            className={`w-24 h-7 text-xs font-semibold rounded-full border ${getStatusColor(post.status)}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      key: "publishedAt",
      header: "Published",
      sortable: true,
      render: (post) => (
        <div className="whitespace-nowrap text-sm text-gray-900">
          {post.publishedAt ? (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3 text-gray-400" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
          ) : (
            <span className="text-gray-400">Not published</span>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      render: (post) => (
        <div className="whitespace-nowrap text-sm text-gray-900">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (post) => (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="View Post"
            onClick={() => handleViewPost(post.slug)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title="Edit Post"
            onClick={() => handleEditPost(post.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
            title="Delete Post"
            onClick={() => handleDelete(post.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const fetchPosts = useCallback(async () => {
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

      const response = await fetch(`/api/blog-admin?${params}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, status, sortBy, sortOrder]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/blog-admin/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        fetchPosts(); // Refresh the list
      } else {
        alert("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/blog-admin/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();

      if (data.success) {
        fetchPosts(); // Refresh the list
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleViewPost = (slug: string) => {
    // Open post in new tab
    window.open(`/blog/${slug}`, "_blank");
  };

  const handleEditPost = (id: string) => {
    // Navigate to edit page
    window.location.href = `/admin/blog/edit/${id}`;
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
                placeholder="Search posts by title, excerpt, or slug..."
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
            {pagination.total} posts found
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={posts}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyState={
          <div>
            <div className="text-gray-400 text-4xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500">
              {search || (status && status !== "all")
                ? "Try adjusting your search or filter criteria."
                : "Start creating your first blog post."}
            </p>
          </div>
        }
      />
    </div>
  );
}
