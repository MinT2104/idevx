import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const quotation = new Hono();

// Validation schemas
const createQuotationSchema = z.object({
  projectModel: z.string().min(1, "Project model is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().min(1, "Company name is required"),
  skype: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().min(1, "Project description is required"),
  budget: z.object({
    min: z.number().min(0, "Minimum budget must be positive"),
    max: z.number().min(0, "Maximum budget must be positive"),
  }),
  agreeToPrivacy: z
    .boolean()
    .refine((val) => val === true, "You must agree to privacy policy"),
});

const updateQuotationSchema = z.object({
  status: z
    .enum(["new", "reviewed", "quoted", "accepted", "rejected", "archived"])
    .optional(),
  notes: z.string().optional(),
  quotedPrice: z.number().positive().optional(),
});

const quotationParamsSchema = z.object({
  page: z.string().transform(Number).default("1"),
  limit: z.string().transform(Number).default("10"),
  search: z.string().default(""),
  status: z.string().default(""),
  sortBy: z.string().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Create quotation (public endpoint)
quotation.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = createQuotationSchema.parse(body);

    const quotationData: any = {
      name: validatedData.name,
      email: validatedData.email,
      description: validatedData.description,
      phone: validatedData.phone,
      company: validatedData.company,
      projectModel: validatedData.projectModel,
      agreeToPrivacy: validatedData.agreeToPrivacy,
      budget: validatedData.budget,
    };

    if (validatedData.skype) {
      quotationData.skype = validatedData.skype;
    }
    if (validatedData.website) {
      quotationData.website = validatedData.website;
    }

    const quotation = await prisma.quotation.create({
      data: quotationData,
    });

    return c.json({
      success: true,
      data: quotation,
      message: "Quotation submitted successfully",
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

    console.error("Error creating quotation:", error);
    return c.json(
      {
        success: false,
        error: "Failed to create quotation",
      },
      500
    );
  }
});

// Get quotations (admin only)
quotation.get("/", async (c) => {
  try {
    const params = c.req.query();
    const { page, limit, search, status, sortBy, sortOrder } =
      quotationParamsSchema.parse(params);

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status && status !== "all") {
      where.status = status;
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [quotations, total] = await Promise.all([
      prisma.quotation.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.quotation.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return c.json({
      success: true,
      data: {
        quotations,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching quotations:", error);
    return c.json(
      {
        success: false,
        error: "Failed to fetch quotations",
      },
      500
    );
  }
});

// Get single quotation (admin only)
quotation.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const quotation = await prisma.quotation.findUnique({
      where: { id },
    });

    if (!quotation) {
      return c.json(
        {
          success: false,
          error: "Quotation not found",
        },
        404
      );
    }

    return c.json({
      success: true,
      data: quotation,
    });
  } catch (error) {
    console.error("Error fetching quotation:", error);
    return c.json(
      {
        success: false,
        error: "Failed to fetch quotation",
      },
      500
    );
  }
});

// Update quotation (admin only)
quotation.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const validatedData = updateQuotationSchema.parse(body);

    const quotation = await prisma.quotation.update({
      where: { id },
      data: validatedData,
    });

    return c.json({
      success: true,
      data: quotation,
      message: "Quotation updated successfully",
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

    console.error("Error updating quotation:", error);
    return c.json(
      {
        success: false,
        error: "Failed to update quotation",
      },
      500
    );
  }
});

// Delete quotation (admin only)
quotation.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    await prisma.quotation.delete({
      where: { id },
    });

    return c.json({
      success: true,
      message: "Quotation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting quotation:", error);
    return c.json(
      {
        success: false,
        error: "Failed to delete quotation",
      },
      500
    );
  }
});

// Update quotation status (admin only)
quotation.patch("/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = z
      .object({
        status: z.enum([
          "new",
          "reviewed",
          "quoted",
          "accepted",
          "rejected",
          "archived",
        ]),
      })
      .parse(body);

    const quotation = await prisma.quotation.update({
      where: { id },
      data: { status },
    });

    return c.json({
      success: true,
      data: quotation,
      message: "Quotation status updated successfully",
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

    console.error("Error updating quotation status:", error);
    return c.json(
      {
        success: false,
        error: "Failed to update quotation status",
      },
      500
    );
  }
});

export default quotation;
