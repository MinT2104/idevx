"use client";

import { Input } from "@/ui/components/input";
import { Button } from "@/ui/components/button";
import { useState } from "react";

export default function TalkToUsPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to your backend/CRM endpoint
    console.log("Contact form submitted", form);
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left copy */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black leading-tight">
              We love AI, but
              <br /> it’s nice to talk to
              <br /> a human
            </h1>
            <p className="mt-6 text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
              Build your product with the most performant infrastructure
              available, powered by the DevX Inference Stack. Deploy and serve
              AI models performantly, scalably, and cost-efficiently, in our
              cloud or yours.
            </p>
            <p className="mt-6 text-gray-900 font-medium">
              Connect with our product experts to see how we can help.
            </p>
          </div>

          {/* Right form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-gray-700 mb-2"
                  >
                    First name
                  </label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder=""
                    className="h-10 bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-gray-700 mb-2"
                  >
                    Last name
                  </label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder=""
                    className="h-10 bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Business email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder=""
                  className="h-10 bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm text-gray-700 mb-2"
                >
                  Company website
                </label>
                <Input
                  id="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder=""
                  className="h-10 bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-700 mb-2"
                >
                  How do you want to use DevX?
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-300 bg-white text-black p-3 text-sm focus:outline-none focus:ring-0 focus:border-gray-400"
                />
              </div>

              <p className="text-xs text-gray-600">
                DevX will handle your data pursuant to our Privacy Policy
              </p>

              <Button
                type="submit"
                className="w-full h-11 bg-black text-white rounded-none"
              >
                GET IN TOUCH
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
