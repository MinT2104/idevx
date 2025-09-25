"use client";

import { ReactNode } from "react";
import { Button } from "@/ui/components/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render: (item: T) => ReactNode;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination: PaginationInfo;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onSort?: (field: string) => void;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  emptyState?: ReactNode;
  loadingRows?: number;
}

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  pagination,
  loading = false,
  onPageChange,
  onSort,
  sortBy,
  sortOrder,
  emptyState,
  loadingRows = 5,
}: DataTableProps<T>) {
  const handleSort = (field: string) => {
    if (onSort) {
      onSort(field);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && sortBy === column.key && (
                      <span className="text-blue-500">
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              // Loading skeleton
              Array.from({ length: loadingRows }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  {emptyState || (
                    <div>
                      <div className="text-gray-400 text-4xl mb-4">📝</div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No data found
                      </h3>
                      <p className="text-gray-500">
                        No items to display at the moment.
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4">
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-medium">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>
              <span className="text-gray-500">
                {" "}
                of {pagination.total} results
              </span>
            </div>

            <div className="flex items-center space-x-1">
              {/* First Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(1)}
                disabled={pagination.page === 1}
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                title="First page"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              {/* Previous Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                title="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1 mx-2">
                {(() => {
                  const pages = [];
                  const totalPages = pagination.totalPages;
                  const currentPage = pagination.page;

                  // Calculate start and end page numbers
                  let startPage = Math.max(1, currentPage - 2);
                  let endPage = Math.min(totalPages, currentPage + 2);

                  // Adjust if we're near the beginning or end
                  if (endPage - startPage < 4) {
                    if (startPage === 1) {
                      endPage = Math.min(totalPages, startPage + 4);
                    } else {
                      startPage = Math.max(1, endPage - 4);
                    }
                  }

                  // Add ellipsis if needed
                  if (startPage > 1) {
                    pages.push(
                      <Button
                        key={1}
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(1)}
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                      >
                        1
                      </Button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span
                          key="ellipsis-start"
                          className="px-2 text-gray-400"
                        >
                          ...
                        </span>
                      );
                    }
                  }

                  // Add page numbers
                  for (let i = startPage; i <= endPage; i++) {
                    const isActive = i === currentPage;
                    pages.push(
                      <Button
                        key={i}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(i)}
                        className={`h-8 w-8 p-0 ${
                          isActive
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "hover:bg-blue-50 hover:border-blue-300"
                        }`}
                      >
                        {i}
                      </Button>
                    );
                  }

                  // Add ellipsis if needed
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="ellipsis-end" className="px-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <Button
                        key={totalPages}
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(totalPages)}
                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                      >
                        {totalPages}
                      </Button>
                    );
                  }

                  return pages;
                })()}
              </div>

              {/* Next Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                title="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Last Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(pagination.totalPages)}
                disabled={pagination.page === pagination.totalPages}
                className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                title="Last page"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
