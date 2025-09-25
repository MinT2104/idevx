import { Hono } from "hono";
import { BlogAdminController } from "@/features/blog/controllers/blog-admin.controller";
import { requireAdmin } from "@/features/auth/hono-auth";

const blogAdminRoutes = new Hono();

// Get blog posts with pagination and filtering
blogAdminRoutes.get("/", requireAdmin(), BlogAdminController.getBlogPosts);

// Get available statuses
blogAdminRoutes.get(
  "/statuses",
  requireAdmin(),
  BlogAdminController.getStatuses
);

// Update blog post status
blogAdminRoutes.patch(
  "/:id/status",
  requireAdmin(),
  BlogAdminController.updateBlogPostStatus
);

// Delete blog post
blogAdminRoutes.delete(
  "/:id",
  requireAdmin(),
  BlogAdminController.deleteBlogPost
);

export default blogAdminRoutes;
