import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";

import {
  createModelSchema,
  updateModelSchema,
  modelIdParamSchema,
  modelQuerySchema,
} from "@/features/models/schemas/model.schema";
import {
  createModel,
  getAllModels,
  getModelById,
  getModelByLink,
  getModelBySlug,
  updateModel,
  deleteModel,
  getBrands,
  getTypes,
  modelExists,
} from "@/features/models/services/models.service";

// Define context type for type safety
type Variables = {
  user: { id: string };
  userId: string;
};

type ModelContext = Context<{ Variables: Variables }>;

// GET /api/models - Get all models with pagination and filtering
export const getAllModelsHandler = async (c: ModelContext) => {
  try {
    const query = c.req.query();
    const page = parseInt(query.page || "1");
    const limit = parseInt(query.limit || "10");
    const search = query.search;
    const brand = query.brand;
    const type = query.type;

    const result = await getAllModels(page, limit, search, brand, type);

    return c.json({
      success: true,
      data: result.models,
      pagination: {
        page: result.page,
        total: result.total,
        totalPages: result.totalPages,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching models:", error);
    return c.json({ error: "Failed to fetch models" }, 500);
  }
};

// POST /api/models - Create new model
export const createModelHandler = [
  zValidator("json", createModelSchema),
  async (c: any) => {
    try {
      const data = c.req.valid("json");

      // Kiểm tra xem model với link này đã tồn tại chưa
      const existingModel = await getModelByLink(data.model.link);
      if (existingModel) {
        return c.json({ error: "Model with this link already exists" }, 409);
      }

      const model = await createModel(data);

      return c.json({ success: true, data: model }, 201);
    } catch (error) {
      console.error("Error creating model:", error);
      return c.json({ error: "Failed to create model" }, 500);
    }
  },
];

// GET /api/models/:id - Get specific model
export const getModelByIdHandler = async (c: ModelContext) => {
  try {
    const id = c.req.param("id");

    const model = await getModelById(id);

    if (!model) {
      return c.json({ error: "Model not found" }, 404);
    }

    return c.json({ success: true, data: model });
  } catch (error) {
    console.error("Error fetching model:", error);
    return c.json({ error: "Failed to fetch model" }, 500);
  }
};

// GET /api/models/link/:link - Get model by link
export const getModelByLinkHandler = async (c: ModelContext) => {
  try {
    const link = c.req.param("link");

    const model = await getModelByLink(link);

    if (!model) {
      return c.json({ error: "Model not found" }, 404);
    }

    return c.json({ success: true, data: model });
  } catch (error) {
    console.error("Error fetching model by link:", error);
    return c.json({ error: "Failed to fetch model" }, 500);
  }
};

// GET /api/models/slug/:slug - Get model by slug
export const getModelBySlugHandler = async (c: ModelContext) => {
  try {
    const slug = c.req.param("slug");

    const model = await getModelBySlug(slug);

    if (!model) {
      return c.json({ error: "Model not found" }, 404);
    }

    return c.json({ success: true, data: model });
  } catch (error) {
    console.error("Error fetching model by slug:", error);
    return c.json({ error: "Failed to fetch model" }, 500);
  }
};

// PATCH /api/models/:id - Update model
export const updateModelHandler = [
  zValidator("json", updateModelSchema),
  async (c: any) => {
    try {
      const id = c.req.param("id");
      const data = c.req.valid("json");

      // Kiểm tra xem model có tồn tại không
      const exists = await modelExists(id);
      if (!exists) {
        return c.json({ error: "Model not found" }, 404);
      }

      // Nếu có cập nhật link, kiểm tra xem link mới có bị trùng không
      if (data.model?.link) {
        const existingModel = await getModelByLink(data.model.link);
        if (existingModel && existingModel.id !== id) {
          return c.json({ error: "Model with this link already exists" }, 409);
        }
      }

      const model = await updateModel(id, data);

      return c.json({ success: true, data: model });
    } catch (error) {
      console.error("Error updating model:", error);
      return c.json({ error: "Failed to update model" }, 500);
    }
  },
];

// DELETE /api/models/:id - Delete model
export const deleteModelHandler = async (c: ModelContext) => {
  try {
    const id = c.req.param("id");

    const result = await deleteModel(id);

    if (result.count === 0) {
      return c.json({ error: "Model not found" }, 404);
    }

    return c.json({ success: true, message: "Model deleted successfully" });
  } catch (error) {
    console.error("Error deleting model:", error);
    return c.json({ error: "Failed to delete model" }, 500);
  }
};

// GET /api/models/brands - Get all brands
export const getBrandsHandler = async (c: ModelContext) => {
  try {
    const brands = await getBrands();

    return c.json({ success: true, data: brands });
  } catch (error) {
    console.error("Error fetching brands:", error);
    return c.json({ error: "Failed to fetch brands" }, 500);
  }
};

// GET /api/models/types - Get all types
export const getTypesHandler = async (c: ModelContext) => {
  try {
    const types = await getTypes();

    return c.json({ success: true, data: types });
  } catch (error) {
    console.error("Error fetching types:", error);
    return c.json({ error: "Failed to fetch types" }, 500);
  }
};

// GET /api/models/:id/exists - Check if model exists
export const checkModelExistsHandler = async (c: ModelContext) => {
  try {
    const id = c.req.param("id");

    const exists = await modelExists(id);

    return c.json({ success: true, data: { exists } });
  } catch (error) {
    console.error("Error checking model existence:", error);
    return c.json({ error: "Failed to check model existence" }, 500);
  }
};

// POST /api/models/:id/duplicate - Duplicate model
export const duplicateModelHandler = async (c: ModelContext) => {
  try {
    const id = c.req.param("id");

    const originalModel = await getModelById(id);
    if (!originalModel) {
      return c.json({ error: "Model not found" }, 404);
    }

    // Tạo bản sao với tên mới và link mới
    const duplicatedData = {
      model: {
        name: `${originalModel.name} (Copy)`,
        brand: originalModel.brand || "Unknown",
        logo: originalModel.logo,
        type: originalModel.type || "Unknown",
        link: `${originalModel.link}-copy`,
        description: originalModel.description,
        extractedAt: originalModel.extractedAt,
        crawledAt: originalModel.crawledAt,
      },
      hero: originalModel.hero,
      pageInfo: originalModel.pageInfo,
      detailedInfo: originalModel.detailedInfo,
      whyModelMattersData: originalModel.whyModelMattersData,
      sidebarData: originalModel.sidebarData,
      modelListData: originalModel.modelListData,
      modelSections: originalModel.modelSections,
    };

    const duplicatedModel = await createModel(duplicatedData);

    return c.json({ success: true, data: duplicatedModel }, 201);
  } catch (error) {
    console.error("Error duplicating model:", error);
    return c.json({ error: "Failed to duplicate model" }, 500);
  }
};
