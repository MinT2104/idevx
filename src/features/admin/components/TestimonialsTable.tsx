"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/ui/components/button";
import { TestimonialItem } from "@/features/testimonials/types";
import TestimonialForm from "./TestimonialForm";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/ui/components/drawer";

export default function TestimonialsTable() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);

  const statusOptions = useMemo(() => [], []);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", "1");
      params.set("limit", "6");
      params.set("status", "active");
      const res = await fetch(`/api/testimonials-admin?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setItems(json.data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (_id: string) => {};

  const openCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (row: TestimonialItem) => {
    setEditing(row);
    setShowModal(true);
  };

  const renderStatisticCard = (item: TestimonialItem) => (
    <div className="bg-gray-100 col-span-1 w-full h-[220px] relative group border border-[#A9A9A9]">
      <div className="absolute top-2 right-2 z-10">
        <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
          Edit
        </Button>
      </div>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="text-3xl font-bold text-gray-900 mb-2 py-3 px-4 border-b border-[#A9A9A9]">
            {item.statistic?.value}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed p-3">
            {item.statistic?.description}
          </p>
        </div>
      </div>
    </div>
  );

  const renderQuoteCard = (item: TestimonialItem) => {
    const clientLogo = item.client?.logo || "";
    const companyLogo = item.company?.logo || "";
    return (
      <div className="bg-gray-100 w-full col-span-2 h-[220px] flex relative group border border-[#A9A9A9]">
        <div className="absolute top-2 right-2 z-10">
          <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
            Edit
          </Button>
        </div>
        <div className="h-full aspect-square p-4">
          {clientLogo ? (
            <Image
              src={clientLogo}
              alt={item.client?.name || "Client"}
              width={0}
              height={0}
              sizes="100%"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
        <div className="flex flex-col justify-between items-start mb-4 p-4">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            &ldquo;{item.quote?.text}&rdquo;
          </p>
          <div className="flex-1 flex items-end">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={item.company?.name || "Company"}
                width={0}
                height={0}
                sizes="100%"
                className={item.company.imageClass}
              />
            ) : (
              <div className="w-0 h-0" />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">
            Testimonials (edit inline)
          </h2>
          <div className="text-sm text-gray-500">
            Fixed 6 blocks • Edit only
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) =>
          item.type === "statistic" ? (
            <div key={item.id} className="col-span-1">
              {renderStatisticCard(item)}
            </div>
          ) : (
            <div key={item.id} className="md:col-span-2">
              {renderQuoteCard(item)}
            </div>
          )
        )}
        {!loading && items.length === 0 && (
          <div className="text-sm text-gray-500">No testimonials found.</div>
        )}
      </div>

      <Drawer open={showModal} onOpenChange={setShowModal}>
        <DrawerContent className="left-auto right-0 w-full max-w-[60%] bg-white">
          <DrawerHeader>
            <DrawerTitle>
              {editing ? "Edit Testimonial" : "New Testimonial"}
            </DrawerTitle>
            <DrawerDescription>
              Update content, logos and order. Changes save on submit.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto max-h-[75vh]">
            <TestimonialForm
              initial={editing || undefined}
              onCancel={() => setShowModal(false)}
              onSaved={() => {
                setShowModal(false);
                fetchItems();
              }}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
