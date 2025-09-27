import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const prisma = new PrismaClient();
const clientBrand = new Hono();

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || "devx-uploads";

// Validation schemas
const createClientBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrl: z.string().url("Invalid image URL"),
  status: z.enum(["active", "inactive"]).default("active"),
  order: z.number().int().optional(),
});

const updateClientBrandSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  status: z.enum(["active", "inactive"]).optional(),
  order: z.number().int().optional(),
});

const clientBrandParamsSchema = z.object({
  page: z.string().transform(Number).default("1"),
  limit: z.string().transform(Number).default("10"),
  search: z.string().default(""),
  status: z.string().default(""),
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Generate presigned URL for upload
clientBrand.post("/upload-url", async (c) => {
  try {
    const body = await c.req.json();
    const { fileName, fileType } = z
      .object({
        fileName: z.string().min(1, "File name is required"),
        fileType: z.string().min(1, "File type is required"),
      })
      .parse(body);

    // Generate unique key for the file
    const key = `client-brands/${Date.now()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: fileType,
      ACL: "public-read",
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return c.json({
      success: true,
      data: {
        presignedUrl,
        key,
        imageUrl: `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors,
        },
        400
      );
    }

    console.error("Error generating upload URL:", error);
    return c.json(
      {
        success: false,
        error: "Failed to generate upload URL",
      },
      500
    );
  }
});

// Create client brand
clientBrand.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = createClientBrandSchema.parse(body);

    const clientBrandData = await prisma.clientBrand.create({
      data: validatedData,
    });

    return c.json({
      success: true,
      data: clientBrandData,
      message: "Client brand created successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors,
        },
        400
      );
    }

    console.error("Error creating client brand:", error);
    return c.json(
      {
        success: false,
        error: "Failed to create client brand",
      },
      500
    );
  }
});

// Get client brands (admin only)
clientBrand.get("/", async (c) => {
  try {
    const params = c.req.query();
    const { page, limit, search, status, sortBy, sortOrder } =
      clientBrandParamsSchema.parse(params);

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    if (status && status !== "all") {
      where.status = status;
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [clientBrands, total] = await Promise.all([
      prisma.clientBrand.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.clientBrand.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return c.json({
      success: true,
      data: {
        clientBrands,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching client brands:", error);
    return c.json(
      {
        success: false,
        error: "Failed to fetch client brands",
      },
      500
    );
  }
});

// Get single client brand (admin only)
clientBrand.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const clientBrandData = await prisma.clientBrand.findUnique({
      where: { id },
    });

    if (!clientBrandData) {
      return c.json(
        {
          success: false,
          error: "Client brand not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: clientBrandData,
    });
  } catch (error) {
    console.error("Error fetching client brand:", error);
    return c.json(
      {
        success: false,
        error: "Failed to fetch client brand",
      },
      500
    );
  }
});

// Update client brand (admin only)
clientBrand.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const validatedData = updateClientBrandSchema.parse(body);

    const clientBrandData = await prisma.clientBrand.update({
      where: { id },
      data: validatedData,
    });

    return c.json({
      success: true,
      data: clientBrandData,
      message: "Client brand updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors,
        },
        400
      );
    }

    console.error("Error updating client brand:", error);
    return c.json(
      {
        success: false,
        error: "Failed to update client brand",
      },
      500
    );
  }
});

// Delete client brand (admin only)
clientBrand.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    // Get the client brand to get the S3 key
    const clientBrandData = await prisma.clientBrand.findUnique({
      where: { id },
    });

    if (!clientBrandData) {
      return c.json(
        {
          success: false,
          error: "Client brand not found",
        },
        404
      );
    }

    // Delete from database
    await prisma.clientBrand.delete({
      where: { id },
    });

    // Delete from S3
    try {
      const key = clientBrandData.imageUrl.split("/").slice(-2).join("/"); // Extract key from URL
      const deleteCommand = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      });
      await s3Client.send(deleteCommand);
    } catch (s3Error) {
      console.error("Error deleting from S3:", s3Error);
      // Continue even if S3 deletion fails
    }

    return c.json({
      success: true,
      message: "Client brand deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting client brand:", error);
    return c.json(
      {
        success: false,
        error: "Failed to delete client brand",
      },
      500
    );
  }
});

// Update client brand status (admin only)
clientBrand.patch("/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = z
      .object({
        status: z.enum(["active", "inactive"]),
      })
      .parse(body);

    const clientBrandData = await prisma.clientBrand.update({
      where: { id },
      data: { status },
    });

    return c.json({
      success: true,
      data: clientBrandData,
      message: "Client brand status updated successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors,
        },
        400
      );
    }

    console.error("Error updating client brand status:", error);
    return c.json(
      {
        success: false,
        error: "Failed to update client brand status",
      },
      500
    );
  }
});

export default clientBrand;
