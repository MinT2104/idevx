"use client";
import ExporeDevxToday from "@/features/models/components/ExporeDevxToday";
import HeroSection from "@/features/shared/common/HeroSection";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { useToast } from "@/ui/components/toast-provider";
import { useEffect, useMemo, useState } from "react";
import BlogCard from "../components/BlogCard";
import { getPostBySlug } from "../services/blog.service";
import Image from "next/image";
import MarkdownRenderer from "../components/MarkdownRenderer";

interface BlogCard {
  id: number;
  title: string;
  description: string;
  category: string[];
  author: string;
  authorCount: number;
  image: string;
  subtitle?: string;
  slug?: string;
}

type BlogDetailViewProps = { post: any; related?: any[] };

const BlogDetailView = ({
  post: serverPost,
  related = [],
}: BlogDetailViewProps) => {
  const [email, setEmail] = useState("");
  const [post] = useState(serverPost);
  const [relatedPosts, setRelatedPosts] = useState<any[]>(related);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");
  const { success } = useToast();

  const handleSubscribe = async () => {
    if (!email) {
      setSubscribeError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscribeError("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);
    setSubscribeError("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "blog",
          // You can add IP address and user agent if needed
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.alreadySubscribed) {
          success(
            "Already Subscribed!",
            "You are already subscribed to our newsletter."
          );
        } else {
          success(
            "Subscribed Successfully!",
            "Thank you for subscribing to our newsletter."
          );
        }
        setEmail(""); // Clear the form
      } else {
        setSubscribeError(
          result.error || "Failed to subscribe. Please try again."
        );
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubscribeError("Network error. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  // Share functions
  const handleShare = (platform: string) => {
    const postUrl = typeof window !== "undefined" ? window.location.href : "";
    const postTitle = currentPost?.title || "";
    const postDescription = currentPost?.excerpt || "";

    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case "copy":
        // Copy to clipboard
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(postUrl)
            .then(() => {
              success(
                "Link copied to clipboard!",
                "You can now paste it anywhere"
              );
            })
            .catch(() => {
              // Fallback for older browsers
              const textArea = document.createElement("textarea");
              textArea.value = postUrl;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand("copy");
              document.body.removeChild(textArea);
              success(
                "Link copied to clipboard!",
                "You can now paste it anywhere"
              );
            });
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = postUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          success("Link copied to clipboard!", "You can now paste it anywhere");
        }
        return;
      default:
        return;
    }

    // Open share window
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const currentPost = post;
  const primaryAuthor = currentPost?.authors?.[0];
  const formattedUpdated = useMemo(() => {
    if (!currentPost?.updatedAt) return "";
    const d = new Date(currentPost.updatedAt);
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  }, [currentPost?.updatedAt]);

  useEffect(() => {
    let mounted = true;
    const slug = currentPost?.slug;
    if (!slug) return;
    fetch(`/api/blog/${encodeURIComponent(slug)}/related?limit=6`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) setRelatedPosts(data);
      })
      .catch(() => {})
      .finally(() => {
        mounted = false;
      });
  }, [currentPost?.slug]);

  const blogCards: BlogCard[] = useMemo(
    () =>
      (relatedPosts || []).slice(0, 3).map((p, idx) => ({
        id: idx + 1,
        title: p.title,
        description: p.excerpt || p.subtitle || p.seo?.metaDescription || "",
        category: p.taxonomy.categories || [],
        author: p.authors[0]?.name || "DevX Editorial",
        authorCount: p.authors.length,
        image: p.cardImage?.url || p.heroImage?.url || "",
        subtitle: p.subtitle,
        slug: p.slug,
      })),
    [relatedPosts]
  );

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title={currentPost?.title || "Blog"}
        description={
          currentPost?.excerpt ||
          currentPost?.subtitle ||
          "Read our latest article."
        }
        buttons={[
          {
            text: "Get Started",
            variant: "outline",
            size: "lg",
            link: "/quotation",
          },
          {
            text: "Talk to an Expert",
            variant: "default",
            size: "lg",
            className: "bg-orange-600 hover:bg-orange-700 text-white",
            link: "/talk-to-us",
          },
        ]}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            {/* Mobile Horizontal Layout */}
            <div className="lg:hidden bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                {/* Authors Section */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Author</p>
                    <p className="text-sm font-medium text-black">
                      {primaryAuthor?.name || "Unknown"}
                    </p>
                  </div>
                </div>

                {/* Last Updated Section */}
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <g clipPath="url(#clip0_331_175)">
                      <path
                        d="M28.4583 6.25H4.54167C2.65469 6.25 1.125 7.77969 1.125 9.66667V28.4583C1.125 30.3453 2.65469 31.875 4.54167 31.875H28.4583C30.3453 31.875 31.875 30.3453 31.875 28.4583V9.66667C31.875 7.77969 30.3453 6.25 28.4583 6.25Z"
                        stroke="currentColor"
                        strokeWidth="1.70833"
                      />
                      <path
                        d="M1.125 13.0833C1.125 9.86142 1.125 8.25217 2.12608 7.25108C3.12717 6.25 4.73642 6.25 7.95833 6.25H25.0417C28.2636 6.25 29.8728 6.25 30.8739 7.25108C31.875 8.25217 31.875 9.86142 31.875 13.0833H1.125Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.95898 1.125V6.25M25.0423 1.125V6.25"
                        stroke="currentColor"
                        strokeWidth="1.70833"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13.9382 16.5H8.81315C8.34141 16.5 7.95898 16.8824 7.95898 17.3542V19.0625C7.95898 19.5342 8.34141 19.9167 8.81315 19.9167H13.9382C14.4099 19.9167 14.7923 19.5342 14.7923 19.0625V17.3542C14.7923 16.8824 14.4099 16.5 13.9382 16.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M13.9382 23.3333H8.81315C8.34141 23.3333 7.95898 23.7157 7.95898 24.1875V25.8958C7.95898 26.3676 8.34141 26.75 8.81315 26.75H13.9382C14.4099 26.75 14.7923 26.3676 14.7923 25.8958V24.1875C14.7923 23.7157 14.4099 23.3333 13.9382 23.3333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M24.1882 16.5H19.0632C18.5914 16.5 18.209 16.8824 18.209 17.3542V19.0625C18.209 19.5342 18.5914 19.9167 19.0632 19.9167H24.1882C24.6599 19.9167 25.0423 19.5342 25.0423 19.0625V17.3542C25.0423 16.8824 24.6599 16.5 24.1882 16.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M24.1882 23.3333H19.0632C18.5914 23.3333 18.209 23.7157 18.209 24.1875V25.8958C18.209 26.3676 18.5914 26.75 19.0632 26.75H24.1882C24.6599 26.75 25.0423 26.3676 25.0423 25.8958V24.1875C25.0423 23.7157 24.6599 23.3333 24.1882 23.3333Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_331_175">
                        <rect width="33" height="33" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Updated</p>
                    <p className="text-sm text-gray-500">
                      {formattedUpdated || ""}
                    </p>
                  </div>
                </div>

                {/* Share Section */}
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">Share</p>
                  <div className="flex gap-1">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_646_1235)">
                        <mask
                          id="mask0_646_1235"
                          style={{ maskType: "luminance" }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="34"
                          height="33"
                        >
                          <path d="M0.5 0H33.5V33H0.5V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_646_1235)">
                          <path
                            d="M26.4875 1.54639H31.5483L20.4933 14.2137L33.5 31.4538H23.3171L15.3359 20.9999L6.21371 31.4538H1.14821L12.9716 17.9002L0.5 1.54874H10.9421L18.1456 11.1022L26.4875 1.54639ZM24.7079 28.4178H27.5129L9.41 4.42446H6.40229L24.7079 28.4178Z"
                            fill="black"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_646_1235">
                          <rect
                            width="33"
                            height="33"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_646_1252)">
                        <path
                          d="M29.8333 0C30.8058 0 31.7384 0.386308 32.4261 1.07394C33.1137 1.76157 33.5 2.69421 33.5 3.66667V29.3333C33.5 30.3058 33.1137 31.2384 32.4261 31.9261C31.7384 32.6137 30.8058 33 29.8333 33H4.16667C3.19421 33 2.26157 32.6137 1.57394 31.9261C0.886308 31.2384 0.5 30.3058 0.5 29.3333V3.66667C0.5 2.69421 0.886308 1.76157 1.57394 1.07394C2.26157 0.386308 3.19421 0 4.16667 0H29.8333ZM28.9167 28.4167V18.7C28.9167 17.1149 28.287 15.5947 27.1661 14.4739C26.0453 13.353 24.5251 12.7233 22.94 12.7233C21.3817 12.7233 19.5667 13.6767 18.6867 15.1067V13.0717H13.5717V28.4167H18.6867V19.3783C18.6867 17.9667 19.8233 16.8117 21.235 16.8117C21.9157 16.8117 22.5686 17.0821 23.0499 17.5634C23.5313 18.0448 23.8017 18.6976 23.8017 19.3783V28.4167H28.9167ZM7.61333 10.1933C8.4302 10.1933 9.21361 9.86884 9.79122 9.29122C10.3688 8.71361 10.6933 7.9302 10.6933 7.11333C10.6933 5.40833 9.31833 4.015 7.61333 4.015C6.7916 4.015 6.00353 4.34143 5.42248 4.92248C4.84143 5.50353 4.515 6.2916 4.515 7.11333C4.515 8.81833 5.90833 10.1933 7.61333 10.1933ZM10.1617 28.4167V13.0717H5.08333V28.4167H10.1617Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_646_1252">
                          <rect
                            width="33"
                            height="33"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_646_1259)">
                        <path
                          d="M33.5 16.5414C33.5 7.41053 26.108 0 17 0C7.892 0 0.5 7.41053 0.5 16.5414C0.5 24.5474 6.176 31.2135 13.7 32.7519V21.5038H10.4V16.5414H13.7V12.406C13.7 9.21353 16.2905 6.61654 19.475 6.61654H23.6V11.5789H20.3C19.3925 11.5789 18.65 12.3233 18.65 13.2331V16.5414H23.6V21.5038H18.65V33C26.9825 32.1729 33.5 25.1263 33.5 16.5414Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_646_1259">
                          <rect
                            width="33"
                            height="33"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Vertical Layout */}
            <div className="hidden lg:block lg:sticky lg:top-8 space-y-8">
              {/* Authors Section */}
              <div>
                <h2 className="text-xl font-bold text-black mb-2">Authors</h2>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    <Image
                      width={100}
                      height={100}
                      src={primaryAuthor?.avatar?.url || "/images/client_2.png"}
                      alt={primaryAuthor?.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="text-lg font-medium text-black">
                    {primaryAuthor?.name || "Unknown"}
                  </span>
                </div>
              </div>

              {/* Last Updated Section */}
              <div>
                <h2 className="text-xl font-bold text-black mb-2">
                  Last updated
                </h2>
                <div className="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500"
                  >
                    <g clipPath="url(#clip0_331_175)">
                      <path
                        d="M28.4583 6.25H4.54167C2.65469 6.25 1.125 7.77969 1.125 9.66667V28.4583C1.125 30.3453 2.65469 31.875 4.54167 31.875H28.4583C30.3453 31.875 31.875 30.3453 31.875 28.4583V9.66667C31.875 7.77969 30.3453 6.25 28.4583 6.25Z"
                        stroke="currentColor"
                        strokeWidth="1.70833"
                      />
                      <path
                        d="M1.125 13.0833C1.125 9.86142 1.125 8.25217 2.12608 7.25108C3.12717 6.25 4.73642 6.25 7.95833 6.25H25.0417C28.2636 6.25 29.8728 6.25 30.8739 7.25108C31.875 8.25217 31.875 9.86142 31.875 13.0833H1.125Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.95898 1.125V6.25M25.0423 1.125V6.25"
                        stroke="currentColor"
                        strokeWidth="1.70833"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13.9382 16.5H8.81315C8.34141 16.5 7.95898 16.8824 7.95898 17.3542V19.0625C7.95898 19.5342 8.34141 19.9167 8.81315 19.9167H13.9382C14.4099 19.9167 14.7923 19.5342 14.7923 19.0625V17.3542C14.7923 16.8824 14.4099 16.5 13.9382 16.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M13.9382 23.3333H8.81315C8.34141 23.3333 7.95898 23.7157 7.95898 24.1875V25.8958C7.95898 26.3676 8.34141 26.75 8.81315 26.75H13.9382C14.4099 26.75 14.7923 26.3676 14.7923 25.8958V24.1875C14.7923 23.7157 14.4099 23.3333 13.9382 23.3333Z"
                        fill="currentColor"
                      />
                      <path
                        d="M24.1882 16.5H19.0632C18.5914 16.5 18.209 16.8824 18.209 17.3542V19.0625C18.209 19.5342 18.5914 19.9167 19.0632 19.9167H24.1882C24.6599 19.9167 25.0423 19.5342 25.0423 19.0625V17.3542C25.0423 16.8824 24.6599 16.5 24.1882 16.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M24.1882 23.3333H19.0632C18.5914 23.3333 18.209 23.7157 18.209 24.1875V25.8958C18.209 26.3676 18.5914 26.75 19.0632 26.75H24.1882C24.6599 26.75 25.0423 26.3676 25.0423 25.8958V24.1875C25.0423 23.7157 24.6599 23.3333 24.1882 23.3333Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_331_175">
                        <rect width="33" height="33" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="text-base text-gray-500">
                    {formattedUpdated || ""}
                  </span>
                </div>
              </div>

              {/* Share Section */}
              <div>
                <h2 className="text-xl font-bold text-black mb-2">Share</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                    title="Share on Twitter"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_646_1235)">
                        <mask
                          id="mask0_646_1235"
                          style={{ maskType: "luminance" }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="34"
                          height="33"
                        >
                          <path d="M0.5 0H33.5V33H0.5V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_646_1235)">
                          <path
                            d="M26.4875 1.54639H31.5483L20.4933 14.2137L33.5 31.4538H23.3171L15.3359 20.9999L6.21371 31.4538H1.14821L12.9716 17.9002L0.5 1.54874H10.9421L18.1456 11.1022L26.4875 1.54639ZM24.7079 28.4178H27.5129L9.41 4.42446H6.40229L24.7079 28.4178Z"
                            fill="black"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_646_1235">
                          <rect
                            width="33"
                            height="33"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleShare("linkedin")}
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                    title="Share on LinkedIn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_646_1252)">
                        <path
                          d="M29.8333 0C30.8058 0 31.7384 0.386308 32.4261 1.07394C33.1137 1.76157 33.5 2.69421 33.5 3.66667V29.3333C33.5 30.3058 33.1137 31.2384 32.4261 31.9261C31.7384 32.6137 30.8058 33 29.8333 33H4.16667C3.19421 33 2.26157 32.6137 1.57394 31.9261C0.886308 31.2384 0.5 30.3058 0.5 29.3333V3.66667C0.5 2.69421 0.886308 1.76157 1.57394 1.07394C2.26157 0.386308 3.19421 0 4.16667 0H29.8333ZM28.9167 28.4167V18.7C28.9167 17.1149 28.287 15.5947 27.1661 14.4739C26.0453 13.353 24.5251 12.7233 22.94 12.7233C21.3817 12.7233 19.5667 13.6767 18.6867 15.1067V13.0717H13.5717V28.4167H18.6867V19.3783C18.6867 17.9667 19.8233 16.8117 21.235 16.8117C21.9157 16.8117 22.5686 17.0821 23.0499 17.5634C23.5313 18.0448 23.8017 18.6976 23.8017 19.3783V28.4167H28.9167ZM7.61333 10.1933C8.4302 10.1933 9.21361 9.86884 9.79122 9.29122C10.3688 8.71361 10.6933 7.9302 10.6933 7.11333C10.6933 5.40833 9.31833 4.015 7.61333 4.015C6.7916 4.015 6.00353 4.34143 5.42248 4.92248C4.84143 5.50353 4.515 6.2916 4.515 7.11333C4.515 8.81833 5.90833 10.1933 7.61333 10.1933ZM10.1617 28.4167V13.0717H5.08333V28.4167H10.1617Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_646_1252">
                          <rect
                            width="33"
                            height="33"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleShare("facebook")}
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                    title="Share on Facebook"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 34 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_646_1259)">
                        <path
                          d="M33.5 16.5414C33.5 7.41053 26.108 0 17 0C7.892 0 0.5 7.41053 0.5 16.5414C0.5 24.5474 6.176 31.2135 13.7 32.7519V21.5038H10.4V16.5414H13.7V12.406C13.7 9.21353 16.2905 6.61654 19.475 6.61654H23.6V11.5789H20.3C19.3925 11.5789 18.65 12.3233 18.65 13.2331V16.5414H23.6V21.5038H18.65V33C26.9825 32.1729 33.5 25.1263 33.5 16.5414Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_646_1259">
                          <rect
                            width="33"
                            height="33"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                  <button
                    onClick={() => handleShare("copy")}
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                    title="Copy link"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Hero Image */}
            <div className="relative mb-6 lg:mb-8">
              <div className="w-full h-64 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  src={currentPost?.heroImage?.url}
                  alt={currentPost?.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8">
              {currentPost?.title}
            </h1>

            {/* Tags */}
            {currentPost?.taxonomy?.tags &&
              currentPost.taxonomy.tags.length > 0 && (
                <div className="mb-6 lg:mb-8">
                  <div className="flex flex-wrap gap-2">
                    {currentPost.taxonomy.tags.map(
                      (tag: string, index: number) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200"
                        >
                          #{tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Article Content */}
            <div className="mb-8 lg:mb-12">
              <MarkdownRenderer content={currentPost?.content?.body || ""} />
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-[#F4F4F4] p-4 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                Subscribe to our newsletter
              </h2>
              <p className="text-base lg:text-lg text-gray-600 mb-4 lg:mb-6">
                Stay up to date on model performance, GPUs, and more.
              </p>

              <div className="space-y-3 lg:space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm lg:text-md font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (subscribeError) setSubscribeError(""); // Clear error when typing
                    }}
                    className={`w-full text-base lg:text-lg h-10 lg:h-11 bg-white border-none rounded-none ${
                      subscribeError ? "border border-red-500" : ""
                    }`}
                    disabled={isSubscribing}
                  />
                  {subscribeError && (
                    <p className="mt-1 text-sm text-red-600">
                      {subscribeError}
                    </p>
                  )}
                </div>

                <Button
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="w-full bg-black h-10 lg:h-11 text-white text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isSubscribing ? "SUBSCRIBING..." : "SUBSCRIBE NOW"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {blogCards.length > 0 && (
        <div className="w-full bg-white py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Related posts
              </h2>
              <Button
                variant="outline"
                className="border-gray-400 text-gray-700 hover:bg-gray-50"
              >
                View All News
              </Button>
            </div>

            {/* Related Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogCards.map((card) => (
                <BlogCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        </div>
      )}

      <ExporeDevxToday />
    </div>
  );
};

export default BlogDetailView;
