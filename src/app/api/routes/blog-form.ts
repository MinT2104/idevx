import { Hono } from "hono";
import { BlogFormController } from "@/features/blog/controllers/blog-form.controller";
import { requireAdmin } from "@/features/auth/hono-auth";

const blogFormRoutes = new Hono();

// Apply admin middleware to all routes
blogFormRoutes.use(requireAdmin());

// Get form metadata (authors, categories, tags)
blogFormRoutes.get("/metadata", BlogFormController.getFormMetadata);

// Get blog post for editing
blogFormRoutes.get("/:id", BlogFormController.getBlogPostForEdit);

// Create new blog post
blogFormRoutes.post("/", BlogFormController.createBlogPost);

// Update existing blog post
blogFormRoutes.put("/:id", BlogFormController.updateBlogPost);

export default blogFormRoutes;
