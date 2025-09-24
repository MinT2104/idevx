"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
type ModelSection = {
  id?: string;
  logo: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  slug?: string;
};

type ModelSectionProps = {
  title: string;
  models: ModelSection[];
  showSeeAll: boolean;
  sectionIndex: number;
  onSeeAll?: () => void;
};

const ModelSection = ({
  sectionIndex,
  title,
  models,
  showSeeAll,
  onSeeAll,
}: ModelSectionProps) => {
  const router = useRouter();
  return (
    <div
      key={sectionIndex}
      className={`py-16 ${sectionIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-neuropolitical text-center font-normal text-gray-900 mb-8 capitalize">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {models.map((model, modelIndex) => (
            <div
              key={modelIndex}
              className={`border cursor-pointer border-gray-300 p-6 hover:shadow-lg transition-shadow duration-200 ${
                sectionIndex % 2 === 1 ? "bg-white" : "bg-gray-50"
              }`}
              onClick={() => {
                if (model.slug) {
                  router.push(`/models/${model.slug}`);
                }
              }}
            >
              {/* Logo */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  {model.logo &&
                  (model.logo.startsWith("/") ||
                    model.logo.startsWith("https")) ? (
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={36}
                      height={36}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                      {model.logo || model.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {model.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Model Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {model.name}
                </h3>
                <p className="text-sm text-gray-600">{model.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* See All Button */}
        {showSeeAll && (
          <div className="text-center">
            <button
              onClick={onSeeAll}
              className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              See All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelSection;
