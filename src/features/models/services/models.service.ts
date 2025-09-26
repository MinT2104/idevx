import { CreateModelInput, UpdateModelInput } from "../schemas/model.schema";
import {
  getCachedModels,
  getCachedModelBySlug,
  setCachedData,
  getCachedData,
  invalidateModelCache,
} from "@/core/utils/cache";
import { performanceMonitor } from "@/core/utils/performance";

// Dynamic import for Prisma to avoid build-time issues
const getPrisma = async () => {
  const { prisma } = await import("@/core/database/db");
  return prisma;
};

// Interface cho model trong database (full record)
export interface ModelRecord {
  id: string;
  name: string | null;
  logo: string | null;
  type: string | null;
  slug: string | null;
  description: string | null;
  detailedInfo: any;
  content: any;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Interface tối ưu cho ModelView - chỉ những fields cần thiết
export interface ModelViewRecord {
  id: string;
  name: string | null;
  logo: string | null;
  type: string | null;
  slug: string | null;
  description: string | null;
}

// Tạo model mới
export const createModel = async (
  data: CreateModelInput
): Promise<ModelRecord> => {
  try {
    const prisma = await getPrisma();
    const model = await prisma.model.create({
      data: {
        name: data.model.name,
        logo: data.model.logo,
        type: data.model.type,
        slug: data.model.slug || "",
        description: data.model.description,
        detailedInfo: data.detailedInfo,
        content: (data as any).content,
      },
    });

    // Helper function to safely parse JSON
    const safeParseJson = (value: any) => {
      if (!value) return null;
      if (typeof value === "object") return value; // Already parsed
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }
      }
      return null;
    };

    const result = {
      ...model,
      detailedInfo: safeParseJson(model.detailedInfo),
      content: safeParseJson((model as any).content),
    };

    // Invalidate cache after creating model
    invalidateModelCache();

    return result;
  } catch (error) {
    console.error("Error creating model:", error);
    throw new Error("Failed to create model");
  }
};

// Lấy tất cả models với pagination và filtering
export const getAllModels = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  type?: string
): Promise<{
  models: ModelRecord[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  const cacheKey = `models_${page}_${limit}_${search || ""}_${type || ""}`;

  // Try to get from cache first
  const cached = getCachedData<{
    models: ModelRecord[];
    total: number;
    page: number;
    totalPages: number;
  }>(cacheKey);
  if (cached) {
    return cached;
  }

  return performanceMonitor.measureDbQuery(async () => {
    try {
      const prisma = await getPrisma();
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ];
      }

      if (type) {
        where.type = { equals: type, mode: "insensitive" };
      }

      const [models, total] = await Promise.all([
        prisma.model.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            logo: true,
            type: true,
            slug: true,
            description: true,
            detailedInfo: true,
            content: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        prisma.model.count({ where }),
      ]);

      const processedModels = models.map((model) => {
        // Helper function to safely parse JSON
        const safeParseJson = (value: any) => {
          if (!value) return null;
          if (typeof value === "object") return value; // Already parsed
          if (typeof value === "string") {
            try {
              return JSON.parse(value);
            } catch {
              return null;
            }
          }
          return null;
        };

        return {
          ...model,
          detailedInfo: safeParseJson(model.detailedInfo),
          content: safeParseJson((model as any).content),
        };
      });

      const result = {
        models: processedModels,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };

      // Cache for 5 minutes
      setCachedData(cacheKey, result, 5 * 60 * 1000);

      return result;
    } catch (error) {
      console.error("Error fetching models:", error);
      throw new Error("Failed to fetch models");
    }
  }, "getAllModels");
};

// Tối ưu hóa hàm cho ModelView - chỉ fetch những fields cần thiết
export const getModelsForView = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  type?: string
): Promise<{
  models: ModelViewRecord[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  try {
    const prisma = await getPrisma();
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { brand: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type) {
      where.type = { equals: type, mode: "insensitive" };
    }

    const [models, total] = await Promise.all([
      prisma.model.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          logo: true,
          type: true,
          description: true,
          slug: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.model.count({ where }),
    ]);

    return {
      models: models as ModelViewRecord[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching models for view:", error);
    throw new Error("Failed to fetch models for view");
  }
};

// Lấy model theo ID
export const getModelById = async (id: string): Promise<ModelRecord | null> => {
  try {
    const prisma = await getPrisma();
    const model = await prisma.model.findUnique({
      where: { id },
    });

    if (!model) {
      return null;
    }

    // Helper function to safely parse JSON
    const safeParseJson = (value: any) => {
      if (!value) return null;
      if (typeof value === "object") return value; // Already parsed
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }
      }
      return null;
    };

    return {
      ...model,
      detailedInfo: safeParseJson(model.detailedInfo),
      content: safeParseJson((model as any).content),
    };
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    throw new Error("Failed to fetch model");
  }
};

// Lấy model theo link
// getModelByLink removed: schema no longer includes link

// Lấy model theo slug
export const getModelBySlug = async (
  slug: string
): Promise<ModelRecord | null> => {
  try {
    const prisma = await getPrisma();
    const model = await prisma.model.findUnique({
      where: { slug },
    });

    console.log(model);

    if (!model) {
      return null;
    }

    // Helper function to safely parse JSON
    const safeParseJson = (value: any) => {
      if (!value) return null;
      if (typeof value === "object") return value; // Already parsed
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }
      }
      return null;
    };

    return {
      ...model,
      detailedInfo: safeParseJson(model.detailedInfo),
      content: safeParseJson((model as any).content),
    };
  } catch (error) {
    console.error("Error fetching model by slug:", error);
    throw new Error("Failed to fetch model");
  }
};

// Cập nhật model
export const updateModel = async (
  id: string,
  data: UpdateModelInput
): Promise<ModelRecord> => {
  try {
    const prisma = await getPrisma();
    const updateData: any = {};

    // Chỉ cập nhật các field được cung cấp
    if (data.model) {
      if (data.model.name) updateData.name = data.model.name;
      if (data.model.brand) updateData.brand = data.model.brand;
      if (data.model.logo !== undefined) updateData.logo = data.model.logo;
      if (data.model.type) updateData.type = data.model.type;
      if (data.model.description !== undefined)
        updateData.description = data.model.description;
    }

    if (data.hero) updateData.hero = data.hero;
    if (data.pageInfo) updateData.pageInfo = data.pageInfo;
    if (data.detailedInfo) updateData.detailedInfo = data.detailedInfo;
    if ((data as any).content) updateData.content = (data as any).content;

    const model = await prisma.model.update({
      where: { id },
      data: updateData,
    });

    // Helper function to safely parse JSON
    const safeParseJson = (value: any) => {
      if (!value) return null;
      if (typeof value === "object") return value; // Already parsed
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }
      }
      return null;
    };

    const result = {
      ...model,
      detailedInfo: safeParseJson(model.detailedInfo),
      content: safeParseJson((model as any).content),
    };

    // Invalidate cache after updating model
    invalidateModelCache();

    return result;
  } catch (error) {
    console.error("Error updating model:", error);
    throw new Error("Failed to update model");
  }
};

// Xóa model
export const deleteModel = async (id: string): Promise<{ count: number }> => {
  try {
    const prisma = await getPrisma();
    const result = await prisma.model.delete({
      where: { id },
    });

    // Invalidate cache after deleting model
    invalidateModelCache();

    return { count: 1 };
  } catch (error) {
    console.error("Error deleting model:", error);
    throw new Error("Failed to delete model");
  }
};

// Lấy danh sách brands

// Lấy danh sách types
export const getTypes = async (): Promise<string[]> => {
  try {
    const prisma = await getPrisma();
    const types = await prisma.model.findMany({
      select: { type: true },
      distinct: ["type"],
      orderBy: { type: "asc" },
    });

    return types.map((t: any) => t.type);
  } catch (error) {
    console.error("Error fetching types:", error);
    throw new Error("Failed to fetch types");
  }
};

// Kiểm tra model có tồn tại không
export const modelExists = async (id: string): Promise<boolean> => {
  try {
    const prisma = await getPrisma();
    const count = await prisma.model.count({
      where: { id },
    });

    return count > 0;
  } catch (error) {
    console.error("Error checking model existence:", error);
    throw new Error("Failed to check model existence");
  }
};
