import { Context } from "hono";
import { BlogFormService } from "../services/blog-form.service";
import { BlogFormResponse, BlogFormData } from "../types/blog-form.types";

export class BlogFormController {
  /**
   * Create new blog post
   */
  static async createBlogPost(c: Context): Promise<Response> {
    try {
      // Check if user is authenticated and is admin
      const user = c.get("user");
      if (!user || user.role !== "admin") {
        return c.json({ success: false, error: "Unauthorized access" }, 401);
      }

      const body = await c.req.json();

      // Validate data
      const errors = BlogFormService.validateBlogPost(body);
      if (errors.length > 0) {
        return c.json(
          {
            success: false,
            error: errors.join(", "),
          },
          400
        );
      }

      const blogPost = await BlogFormService.createBlogPost(body);

      const response: BlogFormResponse = {
        success: true,
        data: {
          id: blogPost.id,
          slug: blogPost.slug,
        },
        message: "Blog post created successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in createBlogPost:", error);

      return c.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to create blog post",
        },
        500
      );
    }
  }

  /**
   * Update existing blog post
   */
  static async updateBlogPost(c: Context): Promise<Response> {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      if (!id) {
        return c.json({ success: false, error: "Post ID is required" }, 400);
      }

      // Validate data
      const errors = BlogFormService.validateBlogPost(body);
      if (errors.length > 0) {
        return c.json(
          {
            success: false,
            error: errors.join(", "),
          },
          400
        );
      }

      const blogPost = await BlogFormService.updateBlogPost(id, body);

      const response: BlogFormResponse = {
        success: true,
        data: {
          id: blogPost.id,
          slug: blogPost.slug,
        },
        message: "Blog post updated successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in updateBlogPost:", error);

      return c.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to update blog post",
        },
        500
      );
    }
  }

  /**
   * Get blog post for editing
   */
  static async getBlogPostForEdit(c: Context): Promise<Response> {
    try {
      const id = c.req.param("id");
      if (!id) {
        return c.json({ success: false, error: "Post ID is required" }, 400);
      }

      const blogPost = await BlogFormService.getBlogPostForEdit(id);

      return c.json({
        success: true,
        data: blogPost,
        message: "Blog post retrieved successfully",
      });
    } catch (error) {
      console.error("Error in getBlogPostForEdit:", error);

      return c.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to retrieve blog post",
        },
        500
      );
    }
  }

  /**
   * Get form metadata (authors, categories, tags)
   */
  static async getFormMetadata(c: Context): Promise<Response> {
    try {
      const [authors, categories, tags] = await Promise.all([
        BlogFormService.getAuthors(),
        BlogFormService.getCategories(),
        BlogFormService.getTags(),
      ]);

      return c.json({
        success: true,
        data: {
          authors,
          categories,
          tags,
        },
        message: "Form metadata retrieved successfully",
      });
    } catch (error) {
      console.error("Error in getFormMetadata:", error);

      return c.json(
        {
          success: false,
          error: "Failed to retrieve form metadata",
        },
        500
      );
    }
  }
}
