"use client";

import { useState } from "react";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { useToast } from "@/ui/components/toast-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/select";

import { Bot, Play, Save, Loader2 } from "lucide-react";
import { Textarea } from "@/ui/components/textarea";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/ui/components/card";

interface AutomationPromptProps {
  onTestPrompt?: (prompt: string, category: string) => void;
}

export default function AutomationPrompt({
  onTestPrompt,
}: AutomationPromptProps) {
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [customTags, setCustomTags] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { success, error } = useToast();

  const categories = [
    "Model Performance",
    "AI Engineering",
    "Infrastructure",
    "News",
    "Community",
    "AI Models",
    "Foundation",
  ];

  const handleTestPrompt = async () => {
    if (!prompt.trim()) {
      error("Please enter a prompt", "Prompt cannot be empty");
      return;
    }

    if (!category) {
      error("Please select a category", "Category is required");
      return;
    }

    setIsTesting(true);
    try {
      if (onTestPrompt) {
        await onTestPrompt(prompt, category);
      } else {
        // Default test functionality
        const response = await fetch("/api/automation/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, category }),
        });

        const result = await response.json();

        if (result.success) {
          success("Test Successful!", "AI generated content successfully");
        } else {
          error("Test Failed", result.error || "Failed to generate content");
        }
      }
    } catch (err) {
      error("Test Failed", "Network error occurred");
      console.error("Test error:", err);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSavePrompt = async () => {
    if (!prompt.trim()) {
      error("Please enter a prompt", "Prompt cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/automation/save-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, category }),
      });

      const result = await response.json();

      if (result.success) {
        success("Prompt Saved!", "Automation prompt saved successfully");
      } else {
        error("Save Failed", result.error || "Failed to save prompt");
      }
    } catch (err) {
      error("Save Failed", "Network error occurred");
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleGenerateBlogPost = async () => {
    if (!prompt.trim()) {
      error("Please enter a prompt", "Prompt cannot be empty");
      return;
    }

    if (!category) {
      error("Please select a category", "Category is required");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/automation/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, category, customTags }),
      });

      const result = await response.json();

      if (result.success) {
        success(
          "Blog Post Generated!",
          "AI has created and saved a new blog post"
        );
        // Clear the form
        setPrompt("");
        setCategory("");
        setCustomTags("");
      } else {
        error(
          "Generation Failed",
          result.error || "Failed to generate blog post"
        );
      }
    } catch (err) {
      error("Generation Failed", "Network error occurred");
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Automation Prompt
          </CardTitle>
          <CardDescription>
            Write prompts for AI to automatically generate blog content using
            DeepSeek
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Prompt
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt here... 

Example:
Write a comprehensive blog post about the latest developments in AI model performance optimization. Include:
- Recent breakthroughs in model efficiency
- Practical tips for developers
- Case studies from leading companies
- Future trends and predictions

Make it engaging and informative for developers and AI enthusiasts."
              className="min-h-[200px] resize-none"
            />
          </div>

          {/* Custom Tags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Tags (Optional)
            </label>
            <Input
              value={customTags}
              onChange={(e) => setCustomTags(e.target.value)}
              placeholder="Enter tags separated by commas (e.g., ai, machine-learning, optimization)"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to let AI generate tags automatically
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleTestPrompt}
              disabled={isTesting || isSaving || isGenerating}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isTesting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Test Prompt
                </>
              )}
            </Button>

            <Button
              onClick={handleGenerateBlogPost}
              disabled={isTesting || isSaving || isGenerating}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4 mr-2" />
                  Generate Blog Post
                </>
              )}
            </Button>

            <Button
              onClick={handleSavePrompt}
              disabled={isTesting || isSaving || isGenerating}
              variant="outline"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Prompt
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
