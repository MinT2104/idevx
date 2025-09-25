"use client";

import { useState, useEffect } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
}

interface Settings {
  socialLinks: SocialLink[];
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    socialLinks: [
      { name: "Github", href: "" },
      { name: "Twitter", href: "" },
      { name: "Linkedin", href: "" },
      { name: "Youtube", href: "" },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/social-links/admin");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.socialLinks) {
          setSettings(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLinkChange = (
    index: number,
    field: "name" | "href",
    value: string
  ) => {
    const updatedLinks = [...settings.socialLinks];
    updatedLinks[index][field] = value;
    setSettings({ ...settings, socialLinks: updatedLinks });
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = settings.socialLinks.filter((_, i) => i !== index);
    setSettings({ ...settings, socialLinks: updatedLinks });
  };

  const saveSettings = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/social-links/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessage("✅ Settings saved successfully!");
          setTimeout(() => setMessage(""), 3000);
        } else {
          throw new Error(data.error || "Failed to save settings");
        }
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage("❌ Error saving settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-600">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <Button
            onClick={saveSettings}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </header>

        {/* Notification */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              message.startsWith("✅")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* Social Links */}
        <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Social Media Links
            </h2>
            <p className="text-sm text-gray-500">
              Configure the social media links displayed in your footer
            </p>
          </div>

          <div className="space-y-5">
            {settings.socialLinks.map((link, index) => {
              // Icon mapping for social platforms
              const iconMap = {
                Github: Github,
                Twitter: Twitter,
                Linkedin: Linkedin,
                Youtube: Youtube,
              };

              const IconComponent =
                iconMap[link.name as keyof typeof iconMap] || Github;

              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4"
                >
                  {/* Platform Icon */}
                  <div className="flex items-center space-x-3 min-w-[120px]">
                    <IconComponent className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {link.name}
                    </span>
                  </div>

                  {/* URL Input */}
                  <div className="flex-1">
                    <Input
                      type="url"
                      value={link.href}
                      onChange={(e) =>
                        handleSocialLinkChange(index, "href", e.target.value)
                      }
                      placeholder="https://github.com/yourusername"
                      className="w-full bg-white text-black"
                    />
                  </div>

                  {/* Remove Button - only for custom links */}
                  {!["Github", "Twitter", "Linkedin", "Youtube"].includes(
                    link.name
                  ) && (
                    <Button
                      onClick={() => removeSocialLink(index)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 rounded-lg px-4 py-2"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          {settings.socialLinks.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No social links configured.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
