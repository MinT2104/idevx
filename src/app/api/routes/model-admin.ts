import { Hono } from "hono";
import { ModelAdminController } from "@/features/models/controllers/model-admin.controller";
import { requireAdmin } from "@/features/auth/hono-auth";

const modelAdminRoutes = new Hono();

modelAdminRoutes.use(requireAdmin()); // Apply admin middleware to all routes in this group

// Get all models with pagination, search, and filters
modelAdminRoutes.get("/", ModelAdminController.getModels);

// Get a single model by ID
modelAdminRoutes.get("/:id", ModelAdminController.getModelById);

// Get available statuses
modelAdminRoutes.get(
  "/meta/statuses",
  ModelAdminController.getAvailableStatuses
);

// Get available types
modelAdminRoutes.get("/meta/types", ModelAdminController.getAvailableTypes);

// Get available brands
modelAdminRoutes.get("/meta/brands", ModelAdminController.getAvailableBrands);

// Create new model
modelAdminRoutes.post("/", ModelAdminController.createModel);

// Update model
modelAdminRoutes.put("/:id", ModelAdminController.updateModel);

// Update model status
modelAdminRoutes.patch("/:id/status", ModelAdminController.updateModelStatus);

// Delete model
modelAdminRoutes.delete("/:id", ModelAdminController.deleteModel);

export default modelAdminRoutes;
