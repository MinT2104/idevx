"use client";
import { Filter, ChevronDown, Package } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { Button } from "@/ui/components/button";
import ModelSection from "./ModelSection";
import ExporeDevxToday from "./ExporeDevxToday";
import { ModelViewRecord } from "../services/models.service";
import { Button } from "@/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/ui/components/dropdown-menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/ui/components/drawer";

interface ModelListingProps {
  initialModels: ModelViewRecord[];
  totalModels: number;
  currentPage: number;
  totalPages: number;
}

const ModelListing: React.FC<ModelListingProps> = ({ initialModels }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [models] = useState<ModelViewRecord[]>(initialModels);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState<string | null>(
    null
  );
  const [selectedFilterValue, setSelectedFilterValue] = useState<string | null>(
    null
  );
  const [typeQuery, setTypeQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

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

  const availableTypes = useMemo(() => {
    const typesFromData = Array.from(
      new Set(
        models.map((model) => model.type).filter((t): t is string => Boolean(t))
      )
    );
    const canonicalTypes = filterCategories.filter((c) => c !== "All");
    return Array.from(new Set([...typesFromData, ...canonicalTypes])).sort();
  }, [models]);

  const filteredTypes = useMemo(() => {
    if (!typeQuery.trim()) return availableTypes;
    const q = typeQuery.toLowerCase();
    return availableTypes.filter((t) => t.toLowerCase().includes(q));
  }, [availableTypes, typeQuery]);

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
          logo: model.logo || "/logo.png",
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
          link: model.slug ? `/models/${model.slug}` : "#",
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
          logo: model.logo || "/logo.png",
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
          link: model.slug ? `/models/${model.slug}` : "#",
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

    if (selectedFilterType === "type") {
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
              (model.type ? model.type.charAt(0).toUpperCase() : "?"),
            name: model.name || "Unknown Model",
            description: model.description || model.type || "No description",
            tags: [model.type || "Unknown"],
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
            (model.type ? model.type.charAt(0).toUpperCase() : "?"),
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
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
            (model.type ? model.type.charAt(0).toUpperCase() : "?"),
          name: model.name || "Unknown Model",
          description: model.description || model.type || "No description",
          tags: [model.type || "Unknown"],
          slug: model.slug || "#",
        })),
        showSeeAll: false,
      });
    }

    return sections;
  }, [activeFilter, models, selectedFilterType, selectedFilterValue]); // Re-compute khi filters thay đổi

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    setMenuOpen(false);

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
    setMenuOpen(false);

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
          {!isMobile &&
            filterCategories.map((category) => (
              <Button
                variant="outline"
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === category
                    ? "bg-[#E15929] text-white before:bg-transparent after:bg-transparent"
                    : "bg-white rounded-none text-gray-700 border border-gray-400"
                }`}
              >
                {category}
              </Button>
            ))}

          {/* Filter Button with Dropdown or Drawer (mobile) */}
          {isMobile ? (
            <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
              <DrawerTrigger asChild>
                <Button
                  style={{ borderColor: "black" }}
                  variant="outline"
                  aria-haspopup="dialog"
                  aria-expanded={menuOpen}
                  className={`flex items-center w-full justify-between gap-3 px-4 py-3 bg-white text-gray-800 border border-gray-400 hover:shadow-sm transition-all duration-200 text-base font-medium rounded-none ${
                    menuOpen ? "ring-1 ring-gray-200" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <span className="leading-none">Filters</span>
                  </span>
                  <span className="flex items-center gap-2">
                    {selectedFilterType && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-800 px-2 py-1 text-xs">
                        <span className="capitalize">{selectedFilterType}</span>
                        :
                        <span className="font-semibold">
                          {selectedFilterValue}
                        </span>
                      </span>
                    )}
                    <ChevronDown
                      className={`md:block hidden h-5 w-5 self-center transition-transform duration-200 ${menuOpen ? "rotate-180" : ""} text-gray-600`}
                    />
                  </span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="w-full bg-white">
                <DrawerHeader className="border-b border-gray-100 relative">
                  <DrawerTitle>Filter Models</DrawerTitle>
                  <DrawerClose asChild>
                    <button
                      aria-label="Close"
                      className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </DrawerClose>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  {/* Collapsible Brand */}
                  {/* Removed Brand filter: schema no longer includes brand */}

                  {/* Collapsible Type */}
                  <details className="bg-gray-50 rounded-lg border border-gray-200">
                    <summary className="list-none cursor-pointer select-none px-3 py-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                        Type
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div className="p-3 pt-0">
                      <div className="mb-2">
                        <input
                          value={typeQuery}
                          onChange={(e) => setTypeQuery(e.target.value)}
                          placeholder="Search type..."
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white placeholder:text-gray-400"
                          aria-label="Search type"
                        />
                      </div>
                      <div className="max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {filteredTypes.map((type) => (
                          <DrawerClose asChild key={type}>
                            <button
                              onClick={() =>
                                handleDropdownFilter("type", type!)
                              }
                              className={`w-full text-left px-3 py-3 text-base rounded transition-all duration-200 group ${
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
                          </DrawerClose>
                        ))}
                        {filteredTypes.length === 0 && (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            No types found
                          </div>
                        )}
                      </div>
                    </div>
                  </details>

                  {selectedFilterType && (
                    <div className="border-t border-gray-200 pt-3">
                      <DrawerClose asChild>
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
                      </DrawerClose>
                    </div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className={`flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-sm whitespace-nowrap font-medium ${
                    selectedFilterType
                      ? "bg-gray-50 border-gray-300 text-gray-800"
                      : "hover:bg-gray-50"
                  } ${menuOpen ? "ring-1 ring-gray-200" : ""}`}
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
                    className={`h-4 w-4 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""} ${
                      selectedFilterType ? "text-gray-600" : "text-gray-500"
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={8}
                className="p-0 border border-gray-200/60 rounded-xl shadow-2xl bg-white min-w-64 max-w-80"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Filter Models
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Choose a type to filter
                  </p>
                </div>
                <div className="p-3 space-y-4">
                  {/* Removed Brand filter block */}

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
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
