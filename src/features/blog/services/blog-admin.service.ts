import { prisma } from "@/core/database/db";
import { BlogPostAdmin, BlogPostsParams } from "../types/blog-admin.types";

export class BlogAdminService {
  /**
   * Get blog posts with pagination, search and filtering
   */
  static async getBlogPosts(params: BlogPostsParams = {}) {
    try {
      const {
        page = 1,
        limit = 5,
        search = "",
        status = "",
        blogType = "",
        sortBy = "createdAt",
        sortOrder = "desc",
      } = params;

      // Calculate skip value for pagination
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      // Search functionality
      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ];
      }

      // Status filter
      if (status && status !== "all") {
        where.status = status;
      }

      // Blog type filter
      if (blogType && blogType !== "all") {
        where.blogType = blogType;
      }

      // Build orderBy clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      // Execute queries in parallel
      const [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            status: true,
            blogType: true,
            publishedAt: true,
            createdAt: true,
            updatedAt: true,
            featured: true,
          },
        }),
        prisma.blogPost.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        posts: posts as BlogPostAdmin[],
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  }

  /**
   * Get blog post by ID
   */
  static async getBlogPostById(id: string): Promise<BlogPostAdmin | null> {
    try {
      const post = await prisma.blogPost.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          status: true,
          blogType: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
          featured: true,
        },
      });

      return post as BlogPostAdmin | null;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }
  }

  /**
   * Delete blog post
   */
  static async deleteBlogPost(id: string): Promise<boolean> {
    try {
      console.log(`Attempting to delete blog post with ID: ${id}`);

      // Validate ObjectId format for MongoDB
      if (!id || typeof id !== "string") {
        throw new Error(
          `Invalid blog post ID: must be a string, got ${typeof id}`
        );
      }

      // MongoDB ObjectId should be 24 hex characters
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      if (!objectIdRegex.test(id)) {
        console.error(`Invalid ObjectId format: ${id} (length: ${id.length})`);
        throw new Error(`Invalid ObjectId format: ${id}`);
      }

      // Check if blog post exists first
      console.log(`Checking if blog post exists with ID: ${id}`);
      const existingPost = await prisma.blogPost.findUnique({
        where: { id },
        select: { id: true, title: true, slug: true, status: true },
      });

      if (!existingPost) {
        console.error(`Blog post not found with ID: ${id}`);

        // Let's also check if there are any blog posts at all
        const allPosts = await prisma.blogPost.findMany({
          select: { id: true, title: true, slug: true },
          take: 5,
        });
        console.log(
          `Available blog posts:`,
          allPosts.map((p) => ({ id: p.id, title: p.title, slug: p.slug }))
        );

        throw new Error(`Blog post with ID ${id} not found`);
      }

      console.log(
        `Found blog post: ${existingPost.title} (ID: ${id}, Slug: ${existingPost.slug}, Status: ${existingPost.status})`
      );

      // Perform the delete operation
      const result = await prisma.blogPost.delete({
        where: { id },
      });

      console.log(`Successfully deleted blog post: ${id}`, result);
      return true;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      console.error("Blog post ID:", id);
      console.error("ID type:", typeof id);
      console.error("ID length:", id?.length);
      console.error(
        "Error message:",
        error instanceof Error ? error.message : String(error)
      );

      // Re-throw with more context
      if (error instanceof Error) {
        throw new Error(`Failed to delete blog post: ${error.message}`);
      } else {
        throw new Error(`Failed to delete blog post: ${String(error)}`);
      }
    }
  }

  /**
   * Update blog post status
   */
  static async updateBlogPostStatus(
    id: string,
    status: string
  ): Promise<boolean> {
    try {
      await prisma.blogPost.update({
        where: { id },
        data: { status },
      });
      return true;
    } catch (error) {
      console.error("Error updating blog post status:", error);
      throw error;
    }
  }

  /**
   * Get available statuses
   */
  static getAvailableStatuses() {
    return [
      { value: "all", label: "All Statuses" },
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ];
  }
}
