"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Search, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  level: string;
  status: string;
  postedAt: string;
};

export default function JobsTable() {
  const [items, setItems] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
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
      const res = await fetch(`/api/jobs-admin?${params.toString()}`);
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

  const remove = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    await fetch(`/api/jobs-admin/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const columns: Column<Job>[] = [
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.title}</div>
          <div className="text-xs text-gray-500">
            {row.department} • {row.location}
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => <span className="text-sm text-black">{row.type}</span>,
    },
    {
      key: "level",
      header: "Level",
      render: (row) => <span className="text-sm text-black">{row.level}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          className={`text-xs px-2 py-1 rounded-full border ${row.status === "open" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-700 border-gray-200"}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "postedAt",
      header: "Posted",
      render: (row) => (
        <span className="text-sm text-gray-700">
          {new Date(row.postedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link href={`/admin/jobs/edit/${row.id}`}>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="sm" variant="outline" onClick={() => remove(row.id)}>
            {" "}
            <Trash2 className="w-4 h-4" />{" "}
          </Button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page: number) =>
    setPagination((p) => ({ ...p, page }));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs"
            className="pl-9 w-64"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <Link href="/admin/jobs/create">
            <Button className="bg-blue-600 text-white">New Job</Button>
          </Link>
        </div>
      </div>
      <DataTable
        data={items}
        columns={columns}
        pagination={pagination}
        loading={loading}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
