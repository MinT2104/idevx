import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import {
  createFeedbackSchema,
  updateFeedbackStatusSchema,
} from "@/features/feedback/schemas/feedback.schema";

const prisma = new PrismaClient();

const app = new Hono();

// GET /api/feedback - Lấy danh sách feedback (cho admin)
app.get("/", async (c) => {
  try {
    const {
      status,
      page = "1",
      limit = "10",
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = c.req.query();

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (status && status !== "all") {
      where.status = status;
    }

    // Add search functionality
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.feedback.count({ where }),
    ]);

    return c.json({
      success: true,
      data: feedbacks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return c.json({ success: false, error: "Failed to fetch feedbacks" }, 500);
  }
});

// POST /api/feedback - Tạo feedback mới (từ contact form)
app.post("/", zValidator("json", createFeedbackSchema), async (c) => {
  try {
    const data = c.req.valid("json");

    // Clean website field - nếu empty string thì set null
    const cleanData = {
      ...data,
      website: data.website && data.website.trim() !== "" ? data.website : null,
    };

    const feedback = await prisma.feedback.create({
      data: cleanData,
    });

    return c.json(
      {
        success: true,
        data: feedback,
        message: "Feedback submitted successfully",
      },
      201
    );
  } catch (error) {
    console.error("Error creating feedback:", error);
    return c.json({ success: false, error: "Failed to submit feedback" }, 500);
  }
});

// GET /api/feedback/:id - Lấy chi tiết feedback
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      return c.json({ success: false, error: "Feedback not found" }, 404);
    }

    return c.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return c.json({ success: false, error: "Failed to fetch feedback" }, 500);
  }
});

// PATCH /api/feedback/:id - Cập nhật status của feedback
app.patch("/:id", zValidator("json", updateFeedbackStatusSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const { status } = c.req.valid("json");

    const feedback = await prisma.feedback.update({
      where: { id },
      data: { status },
    });

    return c.json({
      success: true,
      data: feedback,
      message: "Feedback status updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating feedback:", error);
    if (error.code === "P2025") {
      return c.json({ success: false, error: "Feedback not found" }, 404);
    }
    return c.json({ success: false, error: "Failed to update feedback" }, 500);
  }
});

// DELETE /api/feedback/:id - Xóa feedback
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    await prisma.feedback.delete({
      where: { id },
    });

    return c.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting feedback:", error);
    if (error.code === "P2025") {
      return c.json({ success: false, error: "Feedback not found" }, 404);
    }
    return c.json({ success: false, error: "Failed to delete feedback" }, 500);
  }
});

export default app;
