import { Context } from "hono";
import { BlogAdminService } from "../services/blog-admin.service";
import { BlogPostsResponse, BlogPostsParams } from "../types/blog-admin.types";

export class BlogAdminController {
  /**
   * Get blog posts with pagination, search and filtering
   */
  static async getBlogPosts(c: Context): Promise<Response> {
    try {
      // Check if user is authenticated and is admin
      const user = c.get("user");
      if (!user || user.role !== "admin") {
        return c.json(
          {
            success: false,
            error: "Unauthorized access",
          },
          401
        );
      }

      // Get query parameters
      const page = parseInt(c.req.query("page") || "1");
      const limit = parseInt(c.req.query("limit") || "5");
      const search = c.req.query("search") || "";
      const status = c.req.query("status") || "";
      const sortBy = c.req.query("sortBy") || "createdAt";
      const sortOrder = (c.req.query("sortOrder") as "asc" | "desc") || "desc";

      const params: BlogPostsParams = {
        page,
        limit,
        search,
        status,
        sortBy,
        sortOrder,
      };

      const result = await BlogAdminService.getBlogPosts(params);

      const response: BlogPostsResponse = {
        success: true,
        data: result,
        message: "Blog posts retrieved successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in getBlogPosts:", error);

      return c.json(
        {
          success: false,
          error: "Failed to retrieve blog posts",
        },
        500
      );
    }
  }

  /**
   * Delete blog post
   */
  static async deleteBlogPost(c: Context): Promise<Response> {
    try {
      // Check if user is authenticated and is admin
      const user = c.get("user");
      if (!user || user.role !== "admin") {
        return c.json({ success: false, error: "Unauthorized access" }, 401);
      }

      const id = c.req.param("id");
      if (!id) {
        return c.json({ success: false, error: "Post ID is required" }, 400);
      }

      const success = await BlogAdminService.deleteBlogPost(id);

      if (success) {
        return c.json({
          success: true,
          message: "Blog post deleted successfully",
        });
      } else {
        return c.json(
          {
            success: false,
            error: "Failed to delete blog post",
          },
          500
        );
      }
    } catch (error) {
      console.error("Error in deleteBlogPost:", error);

      return c.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to delete blog post",
        },
        500
      );
    }
  }

  /**
   * Update blog post status
   */
  static async updateBlogPostStatus(c: Context): Promise<Response> {
    try {
      // Check if user is authenticated and is admin
      const user = c.get("user");
      if (!user || user.role !== "admin") {
        return c.json({ success: false, error: "Unauthorized access" }, 401);
      }

      const id = c.req.param("id");
      const body = await c.req.json();
      const { status } = body;

      if (!id) {
        return c.json({ success: false, error: "Post ID is required" }, 400);
      }

      if (!status) {
        return c.json({ success: false, error: "Status is required" }, 400);
      }

      const validStatuses = ["draft", "published", "scheduled", "archived"];
      if (!validStatuses.includes(status)) {
        return c.json({ success: false, error: "Invalid status" }, 400);
      }

      const success = await BlogAdminService.updateBlogPostStatus(id, status);

      if (success) {
        return c.json({
          success: true,
          message: "Blog post status updated successfully",
        });
      } else {
        return c.json(
          {
            success: false,
            error: "Failed to update blog post status",
          },
          500
        );
      }
    } catch (error) {
      console.error("Error in updateBlogPostStatus:", error);

      return c.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to update blog post status",
        },
        500
      );
    }
  }

  /**
   * Get available statuses
   */
  static async getStatuses(c: Context): Promise<Response> {
    try {
      // Check if user is authenticated and is admin
      const user = c.get("user");
      if (!user || user.role !== "admin") {
        return c.json({ success: false, error: "Unauthorized access" }, 401);
      }

      const statuses = BlogAdminService.getAvailableStatuses();

      return c.json({
        success: true,
        data: statuses,
        message: "Statuses retrieved successfully",
      });
    } catch (error) {
      console.error("Error in getStatuses:", error);

      return c.json(
        {
          success: false,
          error: "Failed to retrieve statuses",
        },
        500
      );
    }
  }
}
