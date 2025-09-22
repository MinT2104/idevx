import { prisma } from "@/core/database/db";
import { CreateModelInput, UpdateModelInput } from "../schemas/model.schema";

// Interface cho model trong database (full record)
export interface ModelRecord {
  id: string;
  name: string | null;
  brand: string | null;
  logo: string | null;
  type: string | null;
  link: string | null;
  description: string | null;
  extractedAt: string | null;
  crawledAt: string | null;
  hero: any;
  pageInfo: any;
  detailedInfo: any;
  whyModelMattersData: any;
  sidebarData: any;
  modelListData: any;
  modelSections: any;
  createdAt: Date | null;
  updatedAt: Date | null;
}

// Interface tối ưu cho ModelView - chỉ những fields cần thiết
export interface ModelViewRecord {
  id: string;
  name: string | null;
  brand: string | null;
  logo: string | null;
  type: string | null;
  description: string | null;
  link: string | null;
}

// Tạo model mới
export const createModel = async (
  data: CreateModelInput
): Promise<ModelRecord> => {
  try {
    const model = await prisma.model.create({
      data: {
        name: data.model.name,
        brand: data.model.brand,
        logo: data.model.logo,
        type: data.model.type,
        link: data.model.link,
        description: data.model.description,
        extractedAt: data.model.extractedAt,
        crawledAt: data.model.crawledAt,
        hero: data.hero,
        pageInfo: data.pageInfo,
        detailedInfo: data.detailedInfo,
        whyModelMattersData: data.whyModelMattersData,
        sidebarData: data.sidebarData,
        modelListData: data.modelListData,
        modelSections: data.modelSections,
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

    return {
      ...model,
      hero: safeParseJson(model.hero),
      pageInfo: safeParseJson(model.pageInfo),
      detailedInfo: safeParseJson(model.detailedInfo),
      whyModelMattersData: safeParseJson(model.whyModelMattersData),
      sidebarData: safeParseJson(model.sidebarData),
      modelListData: safeParseJson(model.modelListData),
      modelSections: safeParseJson(model.modelSections),
    };
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
  brand?: string,
  type?: string
): Promise<{
  models: ModelRecord[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  try {
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

    if (brand) {
      where.brand = { equals: brand, mode: "insensitive" };
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
        hero: safeParseJson(model.hero),
        pageInfo: safeParseJson(model.pageInfo),
        detailedInfo: safeParseJson(model.detailedInfo),
        whyModelMattersData: safeParseJson(model.whyModelMattersData),
        sidebarData: safeParseJson(model.sidebarData),
        modelListData: safeParseJson(model.modelListData),
        modelSections: safeParseJson(model.modelSections),
      };
    });

    return {
      models: processedModels,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching models:", error);
    throw new Error("Failed to fetch models");
  }
};

// Tối ưu hóa hàm cho ModelView - chỉ fetch những fields cần thiết
export const getModelsForView = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  brand?: string,
  type?: string
): Promise<{
  models: ModelViewRecord[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  try {
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

    if (brand) {
      where.brand = { equals: brand, mode: "insensitive" };
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
          brand: true,
          logo: true,
          type: true,
          description: true,
          link: true,
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
      hero: safeParseJson(model.hero),
      pageInfo: safeParseJson(model.pageInfo),
      detailedInfo: safeParseJson(model.detailedInfo),
      whyModelMattersData: safeParseJson(model.whyModelMattersData),
      sidebarData: safeParseJson(model.sidebarData),
      modelListData: safeParseJson(model.modelListData),
      modelSections: safeParseJson(model.modelSections),
    };
  } catch (error) {
    console.error("Error fetching model by ID:", error);
    throw new Error("Failed to fetch model");
  }
};

// Lấy model theo link
export const getModelByLink = async (
  link: string
): Promise<ModelRecord | null> => {
  try {
    const model = await prisma.model.findFirst({
      where: { link },
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
      hero: safeParseJson(model.hero),
      pageInfo: safeParseJson(model.pageInfo),
      detailedInfo: safeParseJson(model.detailedInfo),
      whyModelMattersData: safeParseJson(model.whyModelMattersData),
      sidebarData: safeParseJson(model.sidebarData),
      modelListData: safeParseJson(model.modelListData),
      modelSections: safeParseJson(model.modelSections),
    };
  } catch (error) {
    console.error("Error fetching model by link:", error);
    throw new Error("Failed to fetch model");
  }
};

// Cập nhật model
export const updateModel = async (
  id: string,
  data: UpdateModelInput
): Promise<ModelRecord> => {
  try {
    const updateData: any = {};

    // Chỉ cập nhật các field được cung cấp
    if (data.model) {
      if (data.model.name) updateData.name = data.model.name;
      if (data.model.brand) updateData.brand = data.model.brand;
      if (data.model.logo !== undefined) updateData.logo = data.model.logo;
      if (data.model.type) updateData.type = data.model.type;
      if (data.model.link) updateData.link = data.model.link;
      if (data.model.description !== undefined)
        updateData.description = data.model.description;
      if (data.model.extractedAt)
        updateData.extractedAt = data.model.extractedAt;
      if (data.model.crawledAt) updateData.crawledAt = data.model.crawledAt;
    }

    if (data.hero) updateData.hero = data.hero;
    if (data.pageInfo) updateData.pageInfo = data.pageInfo;
    if (data.detailedInfo) updateData.detailedInfo = data.detailedInfo;
    if (data.whyModelMattersData)
      updateData.whyModelMattersData = data.whyModelMattersData;
    if (data.sidebarData) updateData.sidebarData = data.sidebarData;
    if (data.modelListData) updateData.modelListData = data.modelListData;
    if (data.modelSections) updateData.modelSections = data.modelSections;

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

    return {
      ...model,
      hero: safeParseJson(model.hero),
      pageInfo: safeParseJson(model.pageInfo),
      detailedInfo: safeParseJson(model.detailedInfo),
      whyModelMattersData: safeParseJson(model.whyModelMattersData),
      sidebarData: safeParseJson(model.sidebarData),
      modelListData: safeParseJson(model.modelListData),
      modelSections: safeParseJson(model.modelSections),
    };
  } catch (error) {
    console.error("Error updating model:", error);
    throw new Error("Failed to update model");
  }
};

// Xóa model
export const deleteModel = async (id: string): Promise<{ count: number }> => {
  try {
    const result = await prisma.model.delete({
      where: { id },
    });

    return { count: 1 };
  } catch (error) {
    console.error("Error deleting model:", error);
    throw new Error("Failed to delete model");
  }
};

// Lấy danh sách brands
export const getBrands = async (): Promise<string[]> => {
  try {
    const brands = await prisma.model.findMany({
      select: { brand: true },
      distinct: ["brand"],
      orderBy: { brand: "asc" },
    });

    return brands.map((b: any) => b.brand);
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to fetch brands");
  }
};

// Lấy danh sách types
export const getTypes = async (): Promise<string[]> => {
  try {
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
    const count = await prisma.model.count({
      where: { id },
    });

    return count > 0;
  } catch (error) {
    console.error("Error checking model existence:", error);
    throw new Error("Failed to check model existence");
  }
};
