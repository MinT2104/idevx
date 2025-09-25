import { Context } from "hono";
import { ModelAdminService } from "../services/model-admin.service";
import {
  ModelsResponse,
  ModelResponse,
  StatusUpdateResponse,
  DeleteModelResponse,
} from "../types/model-admin.types";

export class ModelAdminController {
  static async getModels(c: Context): Promise<Response> {
    try {
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

      const page = parseInt(c.req.query("page") || "1");
      const limit = parseInt(c.req.query("limit") || "5");
      const search = c.req.query("search") || "";
      const status = c.req.query("status") || "";
      const type = c.req.query("type") || "";
      const sortBy = c.req.query("sortBy") || "createdAt";
      const sortOrder = (c.req.query("sortOrder") as "asc" | "desc") || "desc";

      const result = await ModelAdminService.getModels({
        page,
        limit,
        search,
        status,
        type,
        sortBy,
        sortOrder,
      });

      const response: ModelsResponse = {
        success: true,
        data: result,
        message: "Models retrieved successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in getModels:", error);

      return c.json(
        {
          success: false,
          data: {
            models: [],
            pagination: {
              page: 1,
              limit: 5,
              total: 0,
              totalPages: 0,
            },
          },
          error: "Failed to retrieve models",
        },
        500
      );
    }
  }

  static async getModelById(c: Context): Promise<Response> {
    try {
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

      const id = c.req.param("id");
      if (!id) {
        return c.json({ success: false, error: "Model ID is required" }, 400);
      }

      const model = await ModelAdminService.getModelById(id);

      const response: ModelResponse = {
        success: true,
        data: model as any,
        message: "Model retrieved successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in getModelById:", error);
      const response: ModelResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to retrieve model",
      };
      return c.json(response, 500);
    }
  }

  static async deleteModel(c: Context): Promise<Response> {
    try {
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

      const id = c.req.param("id");
      if (!id) {
        return c.json({ success: false, error: "Model ID is required" }, 400);
      }

      await ModelAdminService.deleteModel(id);

      const response: DeleteModelResponse = {
        success: true,
        message: "Model deleted successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in deleteModel:", error);
      const response: DeleteModelResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete model",
      };
      return c.json(response, 500);
    }
  }

  static async updateModelStatus(c: Context): Promise<Response> {
    try {
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

      const id = c.req.param("id");
      const body = await c.req.json();
      const { status } = body;

      if (!id) {
        return c.json({ success: false, error: "Model ID is required" }, 400);
      }

      if (!status) {
        return c.json({ success: false, error: "Status is required" }, 400);
      }

      await ModelAdminService.updateModelStatus(id, status);

      const response: StatusUpdateResponse = {
        success: true,
        message: "Model status updated successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in updateModelStatus:", error);
      const response: StatusUpdateResponse = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update model status",
      };
      return c.json(response, 500);
    }
  }

  static async getAvailableStatuses(c: Context): Promise<Response> {
    try {
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

      const statuses = ModelAdminService.getAvailableStatuses();
      return c.json({
        success: true,
        data: statuses,
      });
    } catch (error) {
      console.error("Error in getAvailableStatuses:", error);
      return c.json(
        {
          success: false,
          error: "Failed to retrieve statuses",
        },
        500
      );
    }
  }

  static async getAvailableTypes(c: Context): Promise<Response> {
    try {
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

      const types = ModelAdminService.getAvailableTypes();
      return c.json({
        success: true,
        data: types,
      });
    } catch (error) {
      console.error("Error in getAvailableTypes:", error);
      return c.json(
        {
          success: false,
          error: "Failed to retrieve types",
        },
        500
      );
    }
  }

  static async getAvailableBrands(c: Context): Promise<Response> {
    try {
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

      const brands = ModelAdminService.getAvailableBrands();
      return c.json({
        success: true,
        data: brands,
      });
    } catch (error) {
      console.error("Error in getAvailableBrands:", error);
      return c.json(
        {
          success: false,
          error: "Failed to retrieve brands",
        },
        500
      );
    }
  }

  static async createModel(c: Context): Promise<Response> {
    try {
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

      const body = await c.req.json();
      const newModel = await ModelAdminService.createModel(body);

      const response: ModelResponse = {
        success: true,
        data: newModel as any,
        message: "Model created successfully",
      };
      return c.json(response, 201);
    } catch (error) {
      console.error("Error in createModel:", error);
      const response: ModelResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create model",
      };
      return c.json(response, 500);
    }
  }

  static async updateModel(c: Context): Promise<Response> {
    try {
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

      const id = c.req.param("id");
      const body = await c.req.json();

      if (!id) {
        return c.json({ success: false, error: "Model ID is required" }, 400);
      }

      const updatedModel = await ModelAdminService.updateModel(id, body);
      const response: ModelResponse = {
        success: true,
        data: updatedModel as any,
        message: "Model updated successfully",
      };
      return c.json(response);
    } catch (error) {
      console.error("Error in updateModel:", error);
      const response: ModelResponse = {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update model",
      };
      return c.json(response, 500);
    }
  }
}
