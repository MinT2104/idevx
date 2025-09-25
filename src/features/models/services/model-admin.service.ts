import { prisma } from "@/core/database/db";
import { ModelsParams } from "../types/model-admin.types";

export class ModelAdminService {
  static async getModels(params: ModelsParams = {}) {
    try {
      const {
        page = 1,
        limit = 5,
        search = "",
        status = "",
        type = "",
        sortBy = "createdAt",
        sortOrder = "desc",
      } = params;

      const skip = (page - 1) * limit;

      const where: any = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } },
        ];
      }

      if (status && status !== "all") {
        where.status = status;
      }

      if (type && type !== "all") {
        where.type = type;
      }

      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      const [models, total] = await prisma.$transaction([
        prisma.model.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            slug: true,
            type: true,
            description: true,
            logo: true,
            createdAt: true,
            updatedAt: true,
            status: true,
          },
        }),
        prisma.model.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return { models, pagination: { page, limit, total, totalPages } };
    } catch (error) {
      console.error("Error fetching models:", error);
      throw new Error("Failed to fetch models");
    }
  }

  static async getModelById(id: string) {
    try {
      const model = await prisma.model.findUnique({
        where: { id },
      });

      if (!model) {
        throw new Error("Model not found");
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
      console.error("Error fetching model:", error);
      throw error;
    }
  }

  static async deleteModel(id: string) {
    try {
      await prisma.model.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error("Error deleting model:", error);
      throw new Error("Failed to delete model");
    }
  }

  static async updateModelStatus(id: string, status: string) {
    try {
      await prisma.model.update({
        where: { id },
        data: {
          status: status as "active" | "inactive",
          updatedAt: new Date(),
        },
      });
      return true;
    } catch (error) {
      console.error("Error updating model status:", error);
      throw new Error("Failed to update model status");
    }
  }

  static getAvailableStatuses() {
    return [
      { value: "all", label: "All Statuses" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ];
  }

  static getAvailableTypes() {
    return [
      { value: "all", label: "All Types" },
      { value: "llm", label: "LLM" },
      { value: "transcription", label: "Transcription" },
      { value: "text-to-speech", label: "Text to Speech" },
      { value: "image-generation", label: "Image Generation" },
      { value: "embedding", label: "Embedding" },
      { value: "speech-to-text", label: "Speech to Text" },
      { value: "image-processing", label: "Image Processing" },
    ];
  }

  static getAvailableBrands() {
    return [
      { value: "all", label: "All Brands" },
      { value: "OpenAI", label: "OpenAI" },
      { value: "Anthropic", label: "Anthropic" },
      { value: "Google", label: "Google" },
      { value: "Meta", label: "Meta" },
      { value: "DeepSeek", label: "DeepSeek" },
      { value: "Claude", label: "Claude" },
      { value: "Other", label: "Other" },
    ];
  }

  static async createModel(data: any) {
    try {
      console.log("Creating model with data:", {
        name: data.name,
        slug: data.slug,
        type: data.type,
        status: data.status,
      });

      // Validate required fields
      if (!data.name || !data.slug || !data.type) {
        throw new Error("Name, slug, and type are required");
      }

      // Check if slug already exists
      const existingModel = await prisma.model.findUnique({
        where: { slug: data.slug },
      });

      if (existingModel) {
        throw new Error("A model with this slug already exists");
      }

      const model = await prisma.model.create({
        data: {
          name: data.name,
          slug: data.slug,
          type: data.type,
          description: data.description,
          logo: data.logo,
          status: data.status || "active",
          // Store additional fields in structured JSON
          detailedInfo: {
            readme: data.readme,
            github: data.github,
            developedBy: data.developedBy,
            modelFamily: data.modelFamily,
            useCase: data.useCase,
            variant: data.variant,
            size: data.size,
            license: data.license,
          },
          content: data.content,
        },
      });

      return model;
    } catch (error) {
      console.error("Error creating model:", error);
      throw error;
    }
  }

  static async updateModel(id: string, data: any) {
    try {
      console.log("Updating model with data:", {
        id,
        name: data.name,
        slug: data.slug,
        type: data.type,
        status: data.status,
      });

      // Validate required fields
      if (!data.name || !data.slug || !data.type) {
        throw new Error("Name, slug, and type are required");
      }

      const model = await prisma.model.update({
        where: { id },
        data: {
          name: data.name,
          slug: data.slug,
          type: data.type,
          description: data.description,
          logo: data.logo,
          status: data.status || "active",
          // Store additional fields in structured JSON
          detailedInfo: {
            readme: data.readme,
            github: data.github,
            developedBy: data.developedBy,
            modelFamily: data.modelFamily,
            useCase: data.useCase,
            variant: data.variant,
            size: data.size,
            license: data.license,
          },
          content: data.content,
          updatedAt: new Date(),
        },
      });

      return model;
    } catch (error) {
      console.error("Error updating model:", error);
      throw error;
    }
  }
}
