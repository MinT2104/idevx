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
      await prisma.blogPost.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error("Error deleting blog post:", error);
      throw error;
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
