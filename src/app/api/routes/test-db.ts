import { Hono } from "hono";
import { prisma } from "@/core/database/db";

const app = new Hono();

// Test endpoint để kiểm tra database connection
app.get("/test-db", async (c) => {
  try {
    // Test connection bằng cách đếm số lượng models
    const count = await prisma.model.count();

    return c.json({
      success: true,
      message: "Database connection successful",
      modelCount: count,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return c.json(
      {
        success: false,
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export default app;
