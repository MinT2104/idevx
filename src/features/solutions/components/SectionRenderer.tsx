import { Button } from "@/ui/components/button";
import ExporeDevxToday from "@/features/models/components/ExporeDevxToday";
import Link from "next/link";
import Image from "next/image";
import OptimizedImage from "@/features/shared/components/OptimizedImage";
import { Section } from "../types";
import HeroSection from "@/features/shared/common/HeroSection";
import {
  SlideUp,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/features/shared/components/ScrollAnimation";
import { CardHover } from "@/features/shared/components/HoverAnimation";

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
const getCardClass = (size?: string, backgroundColor?: string) => {
  // Invert card color based on section background
  const cardBg = backgroundColor === "gray" ? "bg-white" : "bg-gray-50";

  switch (size) {
    case "small":
      return `${cardBg} p-4 rounded-none border border-gray-200 flex flex-col h-full`;
    case "large":
      return `${cardBg} border border-gray-200 p-4 rounded-none flex flex-col h-full`;
    default:
      return `${cardBg} p-4 rounded-none border border-gray-200 flex flex-col h-full`;
  }
};

// Trusted By Section
const TrustedBySection = ({ section }: { section: Section }) => (
  <SlideUp delay={0.1}>
    <section
      className={section.className || "mx-auto w-full px-6 py-12 lg:px-8"}
    >
      <div className="text-center">
        {section.title && (
          <SlideUp delay={0.2}>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
              {section.title}
            </p>
          </SlideUp>
        )}
        {section.logos && (
          <SlideUp delay={0.3}>
            <div className="relative overflow-hidden border-t border-b border-gray-200 ">
              <div className="flex animate-scroll">
                {/* First set of logos */}
                {section.logos.map((logo, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 flex items-center px-8 border-r border-gray-200 last:border-r-0 py-2 w-40 justify-center hover-fill-slide"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={0}
                      height={0}
                      sizes="100%"
                      className={logo.className}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {section.logos.map((logo, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 flex items-center px-8 border-r border-gray-200 last:border-r-0 py-6 hover-fill-slide"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={0}
                      height={0}
                      sizes="100%"
                      className={logo.className}
                    />
                  </div>
                ))}
                {/* Third set for seamless loop */}
                {section.logos.map((logo, index) => (
                  <div
                    key={`third-${index}`}
                    className="flex-shrink-0 flex items-center px-8 border-r border-gray-200 last:border-r-0 py-6 hover-fill-slide"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={0}
                      height={0}
                      sizes="100%"
                      className={logo.className}
                    />
                  </div>
                ))}
              </div>
            </div>
          </SlideUp>
        )}
      </div>
    </section>
  </SlideUp>
);

// Testimonial Section
const TestimonialSection = ({ section }: { section: Section }) => (
  <SlideUp delay={0.1}>
    <section className={getBackgroundClass(section.backgroundColor)}>
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {section.author?.avatar && (
            <SlideUp delay={0.2}>
              <div className="flex justify-center mb-8">
                {section.author.avatar.src ? (
                  <Image
                    src={section.author.avatar.src}
                    alt={section.author.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className={section.author.avatar.className}></div>
                )}
              </div>
            </SlideUp>
          )}

          {section.quote && (
            <SlideUp delay={0.3}>
              <blockquote className="text-lg font-medium leading-8 text-slate-900 sm:text-xl mb-8">
                &ldquo;{section.quote}&rdquo;
              </blockquote>
            </SlideUp>
          )}

          {section.author && (
            <SlideUp delay={0.4}>
              <div className="text-center">
                <div className="font-semibold text-orange-600 text-xl mb-1">
                  {section.author.name}
                </div>
                <div className="text-sm text-slate-600">
                  {section.author.title}
                </div>
              </div>
            </SlideUp>
          )}
        </div>
      </div>
    </section>
  </SlideUp>
);

// Grid Section (unified for features, models, use cases)
const GridSection = ({ section }: { section: Section }) => (
  <SlideUp delay={0.1}>
    <section
      className={`${getBackgroundClass(section.backgroundColor)} mx-auto w-full  px-6 py-16 md:py-24 lg:px-8`}
    >
      <div className="mx-auto max-w-6xl text-center">
        {section.tag && (
          <SlideUp delay={0.2}>
            <div className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 rounded text-sm font-medium text-gray-700 mb-6">
              {section.tag}
            </div>
          </SlideUp>
        )}

        {section.title && (
          <SlideUp delay={0.3}>
            <h2 className="font-neuropolitical text-3xl font-semibold tracking-wider text-black sm:text-4xl">
              {section.title}
            </h2>
          </SlideUp>
        )}

        {section.subtitle && (
          <SlideUp delay={0.4}>
            <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg">
              {section.subtitle}
            </p>
          </SlideUp>
        )}

        {section.description && (
          <SlideUp delay={0.5}>
            <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg">
              {section.description}
            </p>
          </SlideUp>
        )}
      </div>

      {section.items && (
        <SlideUp delay={0.6}>
          <div className="mx-auto mt-16 max-w-6xl">
            <StaggerContainer>
              <div className={getGridClass(section.gridCols)}>
                {section.items.map((item, index) => (
                  <StaggerItem key={index}>
                    <CardHover className="h-full">
                      <div
                        className={getCardClass(
                          section.cardSize,
                          section.backgroundColor
                        )}
                      >
                        {/* Content area */}
                        <div className="flex-1 flex flex-col">
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
                            <p className="text-sm text-slate-500 flex-grow">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Button area - always at bottom */}
                        {item.button && (
                          <div className="mt-6 mt-auto">
                            {item.button.link ? (
                              <Link href={item.button.link}>
                                <Button
                                  className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-white text-black border border-gray-500 hover:bg-gray-50 transition-colors hover:text-black rounded-none"
                                  variant={
                                    (item.button.variant as any) || "outline"
                                  }
                                  size={(item.button.size as any) || "sm"}
                                >
                                  {item.button.text}
                                </Button>
                              </Link>
                            ) : (
                              <Button
                                className="w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base font-medium bg-white text-black border border-gray-500 hover:bg-gray-50 transition-colors hover:text-black rounded-none"
                                variant={
                                  (item.button.variant as any) || "outline"
                                }
                                size={(item.button.size as any) || "sm"}
                              >
                                {item.button.text}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </CardHover>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </SlideUp>
      )}
    </section>
  </SlideUp>
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

    case "product-feature":
      return (
        <SlideUp delay={0.1}>
          <section
            className={`${getBackgroundClass(section.backgroundColor)} mx-auto w-full px-6 py-16 md:py-24 lg:px-8`}
          >
            <div className="mx-auto max-w-6xl">
              {section.title && (
                <SlideUp delay={0.2}>
                  <h2 className="font-neuropolitical text-3xl font-semibold tracking-wider text-black sm:text-4xl text-center">
                    {section.title}
                  </h2>
                </SlideUp>
              )}
              {section.description && (
                <SlideUp delay={0.3}>
                  <p className="mt-6 max-w-4xl mx-auto text-base leading-7 text-slate-600 md:text-lg text-center">
                    {section.description}
                  </p>
                </SlideUp>
              )}

              {/* two column layout: left bullet lists, right image placeholder */}
              <div
                className={`mt-12 grid gap-10 md:grid-cols-2 items-start ${
                  section.imagePosition === "left"
                    ? "md:[&>div:first-child]:order-2 md:[&>div:last-child]:order-1"
                    : ""
                }`}
              >
                {/* Left column: split items into two groups by title keywords if provided, otherwise render sequentially */}
                <SlideUp delay={0.4}>
                  <div>
                    {section.items?.map((item, idx) => (
                      <div key={idx} className="mb-10">
                        <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                          {item.title}
                        </h3>
                        {item.points ? (
                          <ul className="space-y-4">
                            {item.points.map((pt, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-slate-700"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 30 31"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mt-1 flex-shrink-0"
                                >
                                  <path
                                    d="M22.3952 5.40774C22.5291 5.52795 22.6617 5.64916 22.792 5.77327C22.6038 5.97163 22.3968 6.13814 22.1805 6.30427C21.856 6.55573 21.54 6.81494 21.2306 7.08478C21.057 7.23458 20.883 7.36074 20.6827 7.47249C20.6574 7.45217 20.6321 7.43186 20.6061 7.41093C20.0153 6.93917 19.4236 6.52572 18.7491 6.18342C18.7092 6.16297 18.6693 6.14252 18.6283 6.12145C16.0676 4.82135 13.1631 4.68652 10.448 5.56773C9.04694 6.04315 7.80718 6.80744 6.73735 7.82405C6.65469 7.89526 6.57171 7.96609 6.48833 8.03645C4.61798 9.67678 3.56995 12.3637 3.39751 14.7967C3.25862 17.7739 4.25449 20.5278 6.25029 22.7325C7.03074 23.5858 8.00649 24.2734 9.02251 24.8162C9.05762 24.8351 9.09273 24.8539 9.12891 24.8733C11.5802 26.1618 14.4895 26.3092 17.1126 25.5166C17.5992 25.3614 18.0586 25.1622 18.5147 24.9334C18.5535 24.9143 18.5922 24.8952 18.6322 24.8755C21.0897 23.6556 22.9545 21.4825 23.8467 18.8983C24.5249 16.8245 24.6398 14.4849 23.9339 12.4015C23.8175 12.0533 23.8175 12.0533 23.9053 11.867C24.0017 11.732 24.0017 11.732 24.1287 11.5814C24.1762 11.5247 24.2237 11.4681 24.2727 11.4097C24.3259 11.3472 24.3793 11.2848 24.4327 11.2225C24.4608 11.1896 24.4889 11.1567 24.5179 11.1229C24.6364 10.9845 24.755 10.8462 24.8741 10.7083C25.1104 10.4343 25.3373 10.1541 25.5611 9.8698C25.5947 9.83279 25.6284 9.79577 25.6631 9.75764C25.7018 9.75764 25.7405 9.75764 25.7803 9.75764C27.3153 12.9174 27.4816 16.5741 26.3589 19.8944C25.8503 21.3187 25.1027 22.6543 24.1397 23.8201C24.1119 23.8539 24.0841 23.8876 24.0555 23.9224C23.4937 24.6002 22.8999 25.2086 22.2061 25.7537C22.1184 25.8243 22.1184 25.8243 22.0289 25.8963C20.1122 27.4239 17.7778 28.3419 15.3506 28.6248C15.287 28.6325 15.2234 28.6402 15.1579 28.6482C11.7254 28.9833 8.25539 27.9219 5.58745 25.7542C5.38536 25.5833 5.18926 25.4063 4.99396 25.2278C4.89005 25.1342 4.78519 25.0457 4.67559 24.9591C4.50274 24.8093 4.35932 24.6504 4.21164 24.4763C4.13774 24.3906 4.06187 24.3064 3.98413 24.2241C1.76945 21.8718 0.635317 18.477 0.691439 15.278C0.819285 12.0184 1.94215 8.96229 4.19379 6.57138C4.33565 6.42087 4.33565 6.42087 4.45746 6.2633C4.55897 6.13772 4.65871 6.0381 4.78179 5.9344C4.91104 5.82449 5.03837 5.71446 5.16173 5.59794C9.40932 1.59935 16.5295 1.22552 22.3952 5.40774Z"
                                    fill="#E15929"
                                  />
                                  <path
                                    d="M29.2966 4.07413C29.204 4.29973 29.0603 4.44012 28.8875 4.60971C28.8588 4.63818 28.83 4.66665 28.8003 4.69598C28.7085 4.78683 28.6162 4.87728 28.5238 4.96768C28.4032 5.08619 28.2827 5.20489 28.1624 5.32382C28.1188 5.36699 28.1188 5.36699 28.0742 5.41103C27.8763 5.60818 27.6899 5.81212 27.5087 6.0246C27.3794 6.17345 27.2404 6.30942 27.0993 6.44717C26.8849 6.65874 26.6801 6.87472 26.4845 7.10384C26.3223 7.28907 26.154 7.46841 25.986 7.64835C25.717 7.93699 25.4522 8.22801 25.195 8.52725C25.1081 8.62761 25.021 8.7279 24.934 8.82819C24.8349 8.94243 24.7359 9.05676 24.637 9.1711C24.5027 9.32621 24.3681 9.48107 24.2332 9.63573C23.9079 10.0091 23.5868 10.3846 23.2751 10.7696C23.1554 10.9159 23.0337 11.0601 22.911 11.2038C22.5748 11.5974 22.2526 12.0005 21.9349 12.4092C21.8313 12.5423 21.7269 12.6749 21.6224 12.8074C21.5143 12.9446 21.4065 13.0821 21.2987 13.2196C21.2377 13.2973 21.1767 13.3751 21.1156 13.4528C20.587 14.1256 20.0733 14.808 19.57 15.4999C19.5374 15.5446 19.5049 15.5894 19.4713 15.6355C18.8691 16.4638 18.2757 17.2979 17.6987 18.144C17.6449 18.2227 17.6449 18.2227 17.59 18.3031C17.3914 18.5947 17.1943 18.8872 16.9991 19.1811C16.8918 19.3426 16.784 19.5037 16.6762 19.6649C16.6239 19.7433 16.5719 19.8218 16.52 19.9005C15.8657 20.894 15.0603 21.9493 13.8534 22.2602C13.2961 22.3577 12.7316 22.3378 12.2346 22.0455C11.3179 21.3949 11.0062 20.2441 10.6235 19.2389C10.5505 19.0487 10.4774 18.8585 10.4042 18.6683C10.3536 18.5365 10.3029 18.4047 10.2524 18.2729C10.0712 17.8012 9.88754 17.3305 9.70244 16.8604C9.67644 16.7943 9.65043 16.7283 9.62365 16.6602C9.52255 16.4035 9.4214 16.1468 9.31998 15.8901C9.06982 15.257 8.82257 14.6229 8.58618 13.9845C8.5669 13.9333 8.54762 13.8821 8.52776 13.8293C8.22052 12.9895 8.13122 12.1799 8.49577 11.3398C8.82987 10.7694 9.32729 10.3909 9.95856 10.2066C10.5823 10.0709 11.1794 10.2035 11.7367 10.5085C11.7887 10.5508 11.8407 10.593 11.8942 10.6366C11.9293 10.6628 11.9643 10.6889 12.0004 10.7158C13.285 11.7345 13.9891 13.8969 14.2966 15.4413C14.2966 15.5187 14.2966 15.596 14.2966 15.6757C14.5096 15.5155 14.6739 15.3502 14.8385 15.141C15.0135 14.9226 15.1917 14.7104 15.3805 14.5038C15.564 14.3029 15.7378 14.0972 15.9079 13.8849C16.1163 13.6271 16.338 13.3935 16.5753 13.1623C16.6884 13.0494 16.793 12.9335 16.8967 12.8119C17.0658 12.6144 17.2463 12.4305 17.4313 12.248C17.609 12.0727 17.783 11.8969 17.944 11.706C18.3852 11.1899 18.8822 10.7033 19.4008 10.2656C19.5416 10.1412 19.6724 10.0085 19.8044 9.87491C20.0101 9.66695 20.2198 9.46946 20.442 9.27936C20.5899 9.15115 20.7334 9.01868 20.8774 8.88614C21.1393 8.64726 21.4084 8.42092 21.6844 8.19858C21.8038 8.10061 21.9209 8.00195 22.0369 7.90012C23.8024 6.3504 26.767 3.94441 29.2966 4.07413Z"
                                    fill="#E15929"
                                  />
                                </svg>
                                <span className="text-base md:text-lg leading-7">
                                  {pt}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          item.description && (
                            <p className="text-slate-600 text-sm leading-6">
                              {item.description}
                            </p>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </SlideUp>

                {/* Right column: illustration/image placeholder */}
                <SlideUp delay={0.5}>
                  <div className="flex justify-center items-center h-full">
                    <OptimizedImage
                      src={section.image || ""}
                      alt="Product Feature"
                      width={600}
                      height={400}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-[80%] h-auto"
                      quality={85}
                    />
                  </div>
                </SlideUp>
              </div>
            </div>
          </section>
        </SlideUp>
      );

    case "component":
      if (section.component === "ExporeDevxToday") {
        return (
          <SlideUp delay={0.1}>
            <ExporeDevxToday />
          </SlideUp>
        );
      }
      return null;

    default:
      return null;
  }
};

export default SectionRenderer;
