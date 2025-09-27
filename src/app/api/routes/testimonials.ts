import { Hono } from "hono";
import { prisma } from "@/core/database/db";

const app = new Hono();

// GET /api/testimonials - Public listing for homepage component
app.get("/", async (c) => {
  try {
    const { status = "active" } = c.req.query();

    const items = await prisma.testimonial.findMany({
      where: { status },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return c.json({ success: true, data: items });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return c.json(
      { success: false, error: "Failed to fetch testimonials" },
      500
    );
  }
});

export default app;
