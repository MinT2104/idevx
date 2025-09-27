import { prisma } from "@/core/database/db";
import { BlogFormData, Author, Category, Tag } from "../types/blog-form.types";

export class BlogFormService {
  /**
   * Create a new blog post
   */
  static async createBlogPost(data: BlogFormData) {
    try {
      // Generate slug from title if not provided
      const slug = data.slug || this.generateSlug(data.title);

      // Check if slug already exists
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (existingPost) {
        throw new Error("A post with this slug already exists");
      }

      const blogPost = await prisma.blogPost.create({
        data: {
          slug,
          locale: data.locale,
          title: data.title,
          subtitle: data.subtitle,
          excerpt: data.excerpt,
          heroImage: data.heroImage,
          cardImage: data.cardImage,
          taxonomy: data.taxonomy,
          authors: data.authors,
          content: data.content,
          status: data.status,
          blogType: data.blogType || "manual",
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
          featured: data.featured,
          seo: data.seo,
          source: "markdown",
        },
      });

      return blogPost;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  }

  /**
   * Update an existing blog post
   */
  static async updateBlogPost(id: string, data: BlogFormData) {
    try {
      const blogPost = await prisma.blogPost.update({
        where: { id },
        data: {
          slug: data.slug,
          locale: data.locale,
          title: data.title,
          subtitle: data.subtitle,
          excerpt: data.excerpt,
          heroImage: data.heroImage,
          cardImage: data.cardImage,
          taxonomy: data.taxonomy,
          authors: data.authors,
          content: data.content,
          status: data.status,
          blogType: data.blogType || "manual",
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
          featured: data.featured,
          seo: data.seo,
          updatedAt: new Date(),
        },
      });

      return blogPost;
    } catch (error) {
      console.error("Error updating blog post:", error);
      throw error;
    }
  }

  /**
   * Get blog post by ID for editing
   */
  static async getBlogPostForEdit(id: string) {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { id },
      });

      if (!post) {
        throw new Error("Blog post not found");
      }

      // Return post as-is since Prisma handles JSON fields automatically
      return post;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }
  }

  /**
   * Get available authors
   */
  static async getAuthors(): Promise<Author[]> {
    return [{ id: "devx-editorial", name: "DevX Editorial" }];
  }

  /**
   * Get available categories
   */
  static async getCategories(): Promise<Category[]> {
    return [
      { id: "model-performance", name: "Model Performance" },
      { id: "community", name: "Community" },
      { id: "news", name: "News" },
      { id: "ai-engineering", name: "AI Engineering" },
      { id: "ai-models", name: "AI Models" },
      { id: "infrastructure", name: "Infrastructure" },
      { id: "foundation", name: "Foundation" },
    ];
  }

  /**
   * Get available tags
   */
  static async getTags(): Promise<Tag[]> {
    return [
      { id: "llms", name: "LLMs" },
      { id: "gpu", name: "GPU" },
      { id: "throughput", name: "throughput" },
      { id: "culture", name: "culture" },
      { id: "hiring", name: "hiring" },
      { id: "deepseek", name: "DeepSeek" },
      { id: "model", name: "model" },
      { id: "gemini", name: "Gemini" },
      { id: "voice", name: "voice" },
      { id: "smart-home", name: "smart-home" },
      { id: "explainability", name: "explainability" },
    ];
  }

  /**
   * Generate URL-friendly slug from title
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * Validate blog post data
   */
  static validateBlogPost(data: BlogFormData): string[] {
    const errors: string[] = [];

    if (!data.title.trim()) {
      errors.push("Title is required");
    }

    if (!data.slug.trim()) {
      errors.push("Slug is required");
    } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
      errors.push(
        "Slug must contain only lowercase letters, numbers, and hyphens"
      );
    }

    if (!data.content.body.trim()) {
      errors.push("Content is required");
    }

    if (!data.authors.length) {
      errors.push("At least one author is required");
    }

    if (!data.taxonomy.categories.length) {
      errors.push("At least one category is required");
    }

    return errors;
  }
}
