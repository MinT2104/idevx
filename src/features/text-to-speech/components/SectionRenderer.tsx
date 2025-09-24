import { Button } from "@/ui/components/button";
import HeroSection from "@/features/shared/common/HeroSection";
import ExporeDevxToday from "@/features/models/components/ExporeDevxToday";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/features/solutions/types";

// Helper function to get background class
const getBackgroundClass = (bg?: string) => {
  switch (bg) {
    case "gray":
      return "bg-gray-50";
    case "slate":
      return "bg-slate-50";
    default:
      return "bg-white";
  }
};

// Helper function to get grid class
const getGridClass = (cols?: string) => {
  switch (cols) {
    case "2":
      return "grid gap-6 md:grid-cols-2";
    default:
      return "grid gap-8 md:grid-cols-3";
  }
};

// Helper function to get card class
const getCardClass = (size?: string) => {
  switch (size) {
    case "small":
      return "bg-white p-4 rounded-none border border-gray-200 flex flex-col h-full";
    case "large":
      return "bg-gray-50 border border-gray-200 p-4 rounded-none flex flex-col h-full";
    default:
      return "bg-gray-50 p-4 rounded-none border border-gray-200 flex flex-col h-full";
  }
};

// Trusted By Section
const TrustedBySection = ({ section }: { section: Section }) => (
  <section className={section.className || "mx-auto w-full px-6 py-12 lg:px-8"}>
    <div className="text-center">
      {section.title && (
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
          {section.title}
        </p>
      )}
      {section.logos && (
        <div className="relative overflow-hidden border-t border-b border-gray-200 ">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {section.logos.map((logo, index: number) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center px-8 border-r border-gray-200 last:border-r-0 py-6"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={0}
                  height={0}
                  sizes="100%"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {section.logos.map((logo, index: number) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center px-8 border-r border-gray-200 last:border-r-0 py-6"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={0}
                  height={0}
                  sizes="100%"
                  className="h-6 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);

// Testimonial Section
const TestimonialSection = ({ section }: { section: Section }) => (
  <section className={getBackgroundClass(section.backgroundColor)}>
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        {section.author?.avatar && (
          <div className="flex justify-center mb-8">
            <div className={section.author.avatar.className}></div>
          </div>
        )}

        {section.quote && (
          <blockquote className="text-lg font-medium leading-8 text-slate-900 sm:text-xl mb-8">
            &ldquo;{section.quote}&rdquo;
          </blockquote>
        )}

        {section.author && (
          <div className="text-center">
            <div className="font-semibold text-orange-600 text-xl mb-1">
              {section.author.name}
            </div>
            <div className="text-sm text-slate-600">{section.author.title}</div>
          </div>
        )}
      </div>
    </div>
  </section>
);

// Grid Section (unified for features, models, use cases)
const GridSection = ({ section }: { section: Section }) => (
  <section
    className={`${getBackgroundClass(section.backgroundColor)} mx-auto w-full  px-6 py-16 md:py-24 lg:px-8`}
  >
    <div className="mx-auto max-w-6xl text-center">
      {section.tag && (
        <div className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 rounded text-sm font-medium text-gray-700 mb-6">
          {section.tag}
        </div>
      )}

      {section.title && (
        <h2 className="font-neuropolitical text-3xl font-semibold tracking-wider text-black sm:text-4xl">
          {section.title}
        </h2>
      )}

      {section.subtitle && (
        <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg">
          {section.subtitle}
        </p>
      )}

      {section.description && (
        <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg">
          {section.description}
        </p>
      )}
    </div>

    {section.items && (
      <div className="mx-auto mt-16 max-w-6xl">
        <div className={getGridClass(section.gridCols)}>
          {section.items.map((item, index: number) => (
            <div key={index} className={getCardClass(section.cardSize)}>
              {/* Content area */}
              <div className="flex-1">
                {item.icon && (
                  <div className="mb-4">
                    <Image
                      src={
                        typeof item.icon === "string"
                          ? item.icon
                          : "/images/logo_black.png"
                      }
                      alt="Icon"
                      width={24}
                      height={28}
                      className="h-6 w-6"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-slate-500">{item.description}</p>
                )}
              </div>

              {/* Button area - always at bottom */}
              {item.button && (
                <div className="mt-6">
                  {item.button.link ? (
                    <Link href={item.button.link}>
                      <Button
                        className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-white text-black border border-gray-500 hover:bg-gray-50 transition-colors hover:text-black rounded-none"
                        variant={(item.button.variant as any) || "outline"}
                        size={(item.button.size as any) || "sm"}
                      >
                        {item.button.text}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-white text-black border border-gray-500 hover:bg-gray-50 transition-colors hover:text-black rounded-none"
                      variant={(item.button.variant as any) || "outline"}
                      size={(item.button.size as any) || "sm"}
                    >
                      {item.button.text}
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </section>
);

// Main Section Renderer
const SectionRenderer = ({ section }: { section: Section }) => {
  switch (section.type) {
    case "hero":
      return section.props ? <HeroSection {...(section.props as any)} /> : null;

    case "trusted-by":
      return <TrustedBySection section={section} />;

    case "testimonial":
      return <TestimonialSection section={section} />;

    case "grid":
      return <GridSection section={section} />;

    case "component":
      if (section.component === "ExporeDevxToday") {
        return <ExporeDevxToday />;
      }
      return null;

    default:
      return null;
  }
};

export default SectionRenderer;
