"use client";
import { Filter, ChevronDown, Package } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/ui/components/button";
import ModelSection from "./ModelSection";
import ExporeDevxToday from "./ExporeDevxToday";
import { ModelViewRecord } from "../services/models.service";

interface ModelListingProps {
  initialModels: ModelViewRecord[];
  totalModels: number;
  currentPage: number;
  totalPages: number;
  brands: string[];
}

const ModelListing: React.FC<ModelListingProps> = ({ initialModels }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [models] = useState<ModelViewRecord[]>(initialModels);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState<string | null>(
    null
  );
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(
    null
  );

  // Chính xác categories theo yêu cầu
  const filterCategories = [
    "All",
    "LLM",
    "Transcription",
    "Text to Speech",
    "Image Generation",
    "Embedding",
    "Speech to Text",
    "Image Processing",
  ];

  // Lấy unique brands và types từ models
  const availableBrands = useMemo(() => {
    return Array.from(
      new Set(models.map((model) => model.brand).filter(Boolean))
    ).sort();
  }, [models]);

  const availableTypes = useMemo(() => {
    return Array.from(
      new Set(models.map((model) => model.type).filter(Boolean))
    ).sort();
  }, [models]);

  // Tạo modelSections từ data thực
  const createModelSections = () => {
    const sections: Array<{
      title: string;
      models: Array<{
        id: string;
        logo: string;
        name: string;
        description: string;
        tags: string[];
        link: string;
        slug: string;
      }>;
      showSeeAll?: boolean;
      seeAllFilter?: string;
    }> = [];

    // Trending models (6 models đầu tiên)
    if (models.length > 0) {
      sections.push({
        title: "Trending models",
        models: models.slice(0, 6).map((model) => ({
          id: model.id,
          logo:
            model.logo ||
            (model.brand ? model.brand.charAt(0).toUpperCase() : "?"),
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
          link: model.link || "#",
          slug: model.slug || "#",
        })),
      });
    }

    // Group models by type
    const modelsByType = models.reduce(
      (acc, model) => {
        const modelType = model.type || "Unknown";
        if (!acc[modelType]) {
          acc[modelType] = [];
        }
        acc[modelType].push({
          id: model.id,
          logo:
            model.logo ||
            (model.brand ? model.brand.charAt(0).toUpperCase() : "?"),
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
          link: model.link || "#",
          slug: model.slug || "#",
        });
        return acc;
      },
      {} as Record<
        string,
        Array<{
          id: string;
          logo: string;
          name: string;
          description: string;
          tags: string[];
          link: string;
          slug: string;
        }>
      >
    );

    // Tạo sections cho từng type
    Object.entries(modelsByType).forEach(([type, typeModels]) => {
      if (typeModels.length > 0) {
        sections.push({
          title: `${type} models`,
          models: typeModels.slice(0, 6), // Giới hạn 6 models mỗi section
          showSeeAll: typeModels.length > 6,
          seeAllFilter: type,
        });
      }
    });

    return sections;
  };

  // Helper function để check model có match với category không
  const isModelInCategory = (
    model: ModelViewRecord,
    category: string
  ): boolean => {
    if (category === "All") return true;

    const modelType = model.type || "Unknown";

    // Strict match: only show exact type equal to the selected category
    return modelType === category;
  };

  // Helper function để check model có match với dropdown filter không
  const isModelInDropdownFilter = (model: ModelViewRecord): boolean => {
    if (!selectedFilterType || !selectedFilterValue) return true;

    if (selectedFilterType === "brand") {
      return model.brand === selectedFilterValue;
    } else if (selectedFilterType === "type") {
      return model.type === selectedFilterValue;
    }

    return true;
  };

  // Memoize filtered sections để tránh re-compute không cần thiết
  const filteredSections = useMemo(() => {
    const sections: Array<{
      title: string;
      models: Array<{
        id: string;
        logo: string;
        name: string;
        description: string;
        tags: string[];
        link: string;
        slug: string;
      }>;
      showSeeAll?: boolean;
      seeAllFilter?: string;
    }> = [];

    // Nếu có dropdown filter active, sử dụng dropdown filter
    if (selectedFilterType && selectedFilterValue) {
      const filteredModels = models.filter((model) =>
        isModelInDropdownFilter(model)
      );

      if (filteredModels.length > 0) {
        sections.push({
          title: `${selectedFilterValue} models`,
          models: filteredModels.map((model) => ({
            id: model.id,
            logo:
              model.logo ||
              (model.brand ? model.brand.charAt(0).toUpperCase() : "?"),
            name: model.name || "Unknown Model",
            description: model.description || model.type || "No description",
            tags: [model.type || "Unknown"],
            link: model.link || "#",
            slug: model.slug || "#",
          })),
          showSeeAll: false,
        });
      }
      return sections;
    }

    // Nếu filter là "All", hiển thị tất cả sections như bình thường
    if (activeFilter === "All") {
      return createModelSections();
    }

    // Lấy models thuộc category được chọn
    const filteredModels = models.filter((model) =>
      isModelInCategory(model, activeFilter)
    );

    // Hiển thị TẤT CẢ models của category được chọn (không giới hạn)
    if (filteredModels.length > 0) {
      sections.push({
        title: `${activeFilter} models`,
        models: filteredModels.map((model) => ({
          id: model.id,
          logo:
            model.logo ||
            (model.brand ? model.brand.charAt(0).toUpperCase() : "?"),
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
          link: model.link || "#",
          slug: model.slug || "#",
        })),
        showSeeAll: false, // Không cần "See All" vì đã hiển thị tất cả
      });
    } else {
      sections.push({
        title: `${activeFilter} models`,
        models: [],
        showSeeAll: false,
      });
    }

    // Kèm theo Trending models bên dưới (lấy 6 model đầu tiên)
    if (models.length > 0) {
      sections.push({
        title: "Trending models",
        models: models.slice(0, 6).map((model) => ({
          id: model.id,
          logo:
            model.logo ||
            (model.brand ? model.brand.charAt(0).toUpperCase() : "?"),
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
          link: model.link || "#",
          slug: model.slug || "#",
        })),
        showSeeAll: false,
      });
    }

    return sections;
  }, [activeFilter, models, selectedFilterType, selectedFilterValue]); // Re-compute khi filters thay đổi

  useEffect(() => {
    setMounted(true);

    // Đóng dropdown khi click outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".filter-dropdown")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  useEffect(() => {
    // Đọc filter từ URL params chỉ một lần khi component mount
    const filterFromUrl = searchParams.get("filter");
    const filterTypeFromUrl = searchParams.get("filterType");
    const filterValueFromUrl = searchParams.get("filterValue");

    // Decode URL parameters
    const decodedFilter = filterFromUrl
      ? decodeURIComponent(filterFromUrl)
      : null;
    const decodedFilterValue = filterValueFromUrl
      ? decodeURIComponent(filterValueFromUrl)
      : null;

    if (filterTypeFromUrl && decodedFilterValue) {
      // Có dropdown filter
      setSelectedFilterType(filterTypeFromUrl);
      setSelectedFilterValue(decodedFilterValue);
      setActiveFilter("All");
    } else if (decodedFilter && filterCategories.includes(decodedFilter)) {
      // Có category filter
      setActiveFilter(decodedFilter);
    } else {
      setActiveFilter("All");
    }
  }, []); // Chỉ chạy một lần khi mount

  // Function để update URL khi filter thay đổi
  const handleFilterChange = (filter: string) => {
    // Reset dropdown filters khi chọn category filter
    setSelectedFilterType(null);
    setSelectedFilterValue(null);

    // Chỉ update state nếu filter thực sự thay đổi
    if (activeFilter !== filter) {
      setActiveFilter(filter);
    }

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "All") {
      params.delete("filter");
    } else {
      // Encode the filter value to handle spaces and special characters
      params.set("filter", encodeURIComponent(filter));
    }

    const newUrl = params.toString() ? `?${params.toString()}` : "";

    // Sử dụng replace thay vì push để tránh history stack
    router.replace(`/models${newUrl}`, { scroll: false });
  };

  // Handle dropdown filter selection
  const handleDropdownFilter = (filterType: string, filterValue: string) => {
    setSelectedFilterType(filterType);
    setSelectedFilterValue(filterValue);
    setShowDropdown(false);

    // Reset category filter
    setActiveFilter("All");

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filter");
    params.set("filterType", filterType);
    params.set("filterValue", encodeURIComponent(filterValue));

    router.replace(`/models?${params.toString()}`, { scroll: false });
  };

  // Clear dropdown filter
  const clearDropdownFilter = () => {
    setSelectedFilterType(null);
    setSelectedFilterValue(null);
    setShowDropdown(false);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filterType");
    params.delete("filterValue");

    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/models${newUrl}`, { scroll: false });
  };

  if (!mounted) return null;

  return (
    <div className="relative bg-white">
      <div className="">
        {/* Filter Categories */}
        <div className="max-w-7xl mx-auto flex justify-start gap-2 px-4 sm:px-6 lg:px-8 py-12 flex-wrap">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-3 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeFilter === category
                  ? "bg-[#E15929] text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}

          {/* Filter Button with Dropdown */}
          <div className="relative filter-dropdown">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-sm whitespace-nowrap font-medium ${
                selectedFilterType
                  ? "bg-gray-50 border-gray-300 text-gray-800"
                  : "hover:bg-gray-50"
              } ${showDropdown ? "ring-1 ring-gray-200" : ""}`}
            >
              <Filter
                className={`h-4 w-4 ${selectedFilterType ? "text-gray-600" : "text-gray-500"}`}
              />
              <span
                className={
                  selectedFilterType ? "text-gray-800" : "text-gray-700"
                }
              >
                {selectedFilterType
                  ? `${selectedFilterType}: ${selectedFilterValue}`
                  : "Filter by"}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""} ${
                  selectedFilterType ? "text-gray-600" : "text-gray-500"
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200/60 rounded-xl shadow-2xl backdrop-blur-sm z-[9999] min-w-64 max-w-80 animate-in slide-in-from-top-2 duration-200">
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Filter Models
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Choose a brand or type to filter
                  </p>
                </div>

                <div className="p-3 space-y-4">
                  {/* Brand Filter */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Brand
                      </h4>
                    </div>
                    <div className="max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800  ">
                      {availableBrands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => handleDropdownFilter("brand", brand!)}
                          className={`w-full text-left px-3 py-2 text-sm rounded transition-all duration-200 group ${
                            selectedFilterType === "brand" &&
                            selectedFilterValue === brand
                              ? "bg-gray-100 text-gray-900 font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{brand}</span>
                            {selectedFilterType === "brand" &&
                              selectedFilterValue === brand && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Type
                      </h4>
                    </div>
                    <div className="max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {availableTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleDropdownFilter("type", type!)}
                          className={`w-full text-left px-3 py-2 text-sm rounded transition-all duration-200 group ${
                            selectedFilterType === "type" &&
                            selectedFilterValue === type
                              ? "bg-gray-100 text-gray-900 font-medium"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{type}</span>
                            {selectedFilterType === "type" &&
                              selectedFilterValue === type && (
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filter */}
                  {selectedFilterType && (
                    <div className="border-t border-gray-200 pt-3">
                      <button
                        onClick={clearDropdownFilter}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-all duration-200 font-medium flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Clear Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {filteredSections.length > 0 &&
          filteredSections.map((section, sectionIndex) =>
            section.models.length > 0 ? (
              <ModelSection
                key={sectionIndex}
                title={section.title}
                models={section.models}
                showSeeAll={section.showSeeAll || false}
                sectionIndex={sectionIndex}
                onSeeAll={
                  section.seeAllFilter
                    ? () => handleFilterChange(section.seeAllFilter!)
                    : undefined
                }
              />
            ) : (
              <div
                key={sectionIndex}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-10"
              >
                <Package className="w-32 h-32 mx-auto text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-400">
                  No models available yet
                </h3>
              </div>
            )
          )}

        <ExporeDevxToday />
      </div>
    </div>
  );
};

export default ModelListing;
