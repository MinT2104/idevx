import { Hono } from "hono";

import { requireAuth } from "@/features/auth/hono-auth";
import {
  getAllModelsHandler,
  createModelHandler,
  getModelByIdHandler,
  getModelByLinkHandler,
  updateModelHandler,
  deleteModelHandler,
  getBrandsHandler,
  getTypesHandler,
  checkModelExistsHandler,
  duplicateModelHandler,
} from "@/features/models/controllers";

// Define context type for type safety
type Variables = {
  user: { id: string };
  userId: string;
};

const app = new Hono<{ Variables: Variables }>()
  // GET /api/models - Get all models with pagination and filtering
  .get("/", getAllModelsHandler as any)

  // POST /api/models - Create new model
  .post("/", requireAuth(), ...(createModelHandler as any[]))

  // GET /api/models/brands - Get all brands
  .get("/brands", getBrandsHandler as any)

  // GET /api/models/types - Get all types
  .get("/types", getTypesHandler as any)

  // GET /api/models/:id - Get specific model
  .get("/:id", getModelByIdHandler as any)

  // PATCH /api/models/:id - Update model
  .patch("/:id", requireAuth(), ...(updateModelHandler as any[]))

  // DELETE /api/models/:id - Delete model
  .delete("/:id", requireAuth(), deleteModelHandler as any)

  // GET /api/models/:id/exists - Check if model exists
  .get("/:id/exists", checkModelExistsHandler as any)

  // POST /api/models/:id/duplicate - Duplicate model
  .post("/:id/duplicate", requireAuth(), duplicateModelHandler as any)

  // GET /api/models/link/:link - Get model by link
  .get("/link/:link", getModelByLinkHandler as any);

export default app;
