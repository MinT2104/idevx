"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Tag } from "@/features/blog/types/blog-form.types";

interface TagInputProps {
  availableTags: Tag[];
  selectedTags: string[]; // Now stores tag names directly
  onTagsChange: (tagNames: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  availableTags,
  selectedTags,
  onTagsChange,
  placeholder = "Type and press Enter to add tags...",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Since selectedTags now stores tag names directly, we can display them directly
  const filteredSuggestions = availableTags.filter(
    (tag) =>
      !selectedTags.includes(tag.name) &&
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      const tagName = inputValue.trim();

      // Add tag name directly if not already selected
      if (!selectedTags.includes(tagName)) {
        onTagsChange([...selectedTags, tagName]);
      }

      setInputValue("");
      setShowSuggestions(false);
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedTags.length > 0
    ) {
      // Remove last tag when backspace is pressed on empty input
      const newTags = selectedTags.slice(0, -1);
      onTagsChange(newTags);
    }
  };

  const handleTagRemove = (tagName: string) => {
    const newTags = selectedTags.filter((name) => name !== tagName);
    onTagsChange(newTags);
  };

  const handleSuggestionClick = (tag: Tag) => {
    if (!selectedTags.includes(tag.name)) {
      onTagsChange([...selectedTags, tag.name]);
    }
    setInputValue("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    if (inputValue.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative">
      <div className="min-h-[40px] p-2 border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tagName) => (
            <span
              key={tagName}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tagName}
              <button
                type="button"
                onClick={() => handleTagRemove(tagName)}
                className="ml-1 h-3 w-3 rounded-full hover:bg-blue-200 flex items-center justify-center"
              >
                <X className="h-2 w-2" />
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={selectedTags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] outline-none text-sm bg-transparent text-black"
          />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
          {filteredSuggestions.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleSuggestionClick(tag)}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
