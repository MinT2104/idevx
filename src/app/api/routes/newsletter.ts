import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/core/database/db";
import {
  subscribeNewsletterSchema,
  updateNewsletterStatusSchema,
} from "@/features/newsletter/schemas/newsletter.schema";

const app = new Hono();

// GET /api/newsletter - Lấy danh sách newsletter subscriptions (cho admin)
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
      where.email = { contains: search, mode: "insensitive" };
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    const [subscriptions, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        where,
        orderBy,
        skip,
        take: limitNum,
      }),
      prisma.newsletterSubscription.count({ where }),
    ]);

    return c.json({
      success: true,
      data: subscriptions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Error fetching newsletter subscriptions:", error);
    return c.json(
      { success: false, error: "Failed to fetch newsletter subscriptions" },
      500
    );
  }
});

// POST /api/newsletter - Subscribe newsletter (từ form)
app.post("/", zValidator("json", subscribeNewsletterSchema), async (c) => {
  try {
    const data = c.req.valid("json");

    // Check if email already exists
    const existingSubscription = await prisma.newsletterSubscription.findUnique(
      {
        where: { email: data.email },
      }
    );

    if (existingSubscription) {
      // If already subscribed and active, return success
      if (existingSubscription.status === "active") {
        return c.json({
          success: true,
          message: "You are already subscribed to our newsletter!",
          alreadySubscribed: true,
        });
      } else {
        // If unsubscribed or bounced, reactivate
        const updatedSubscription = await prisma.newsletterSubscription.update({
          where: { email: data.email },
          data: {
            status: "active",
            source: data.source,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
            updatedAt: new Date(),
          },
        });

        return c.json({
          success: true,
          data: updatedSubscription,
          message:
            "Welcome back! You have been resubscribed to our newsletter.",
        });
      }
    }

    // Create new subscription
    const subscription = await prisma.newsletterSubscription.create({
      data: {
        email: data.email,
        source: data.source,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        status: "active",
      },
    });

    return c.json(
      {
        success: true,
        data: subscription,
        message: "Thank you for subscribing to our newsletter!",
      },
      201
    );
  } catch (error: any) {
    console.error("Error creating newsletter subscription:", error);

    // Handle unique constraint error
    if (error.code === "P2002") {
      return c.json({
        success: true,
        message: "You are already subscribed to our newsletter!",
        alreadySubscribed: true,
      });
    }

    return c.json(
      { success: false, error: "Failed to subscribe to newsletter" },
      500
    );
  }
});

// GET /api/newsletter/:id - Lấy chi tiết subscription
app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return c.json(
        { success: false, error: "Newsletter subscription not found" },
        404
      );
    }

    return c.json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    console.error("Error fetching newsletter subscription:", error);
    return c.json(
      { success: false, error: "Failed to fetch newsletter subscription" },
      500
    );
  }
});

// PATCH /api/newsletter/:id - Cập nhật status của subscription
app.patch(
  "/:id",
  zValidator("json", updateNewsletterStatusSchema),
  async (c) => {
    try {
      const id = c.req.param("id");
      const { status } = c.req.valid("json");

      const subscription = await prisma.newsletterSubscription.update({
        where: { id },
        data: { status },
      });

      return c.json({
        success: true,
        data: subscription,
        message: "Newsletter subscription status updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating newsletter subscription:", error);
      if (error.code === "P2025") {
        return c.json(
          { success: false, error: "Newsletter subscription not found" },
          404
        );
      }
      return c.json(
        { success: false, error: "Failed to update newsletter subscription" },
        500
      );
    }
  }
);

// DELETE /api/newsletter/:id - Xóa subscription
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    await prisma.newsletterSubscription.delete({
      where: { id },
    });

    return c.json({
      success: true,
      message: "Newsletter subscription deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting newsletter subscription:", error);
    if (error.code === "P2025") {
      return c.json(
        { success: false, error: "Newsletter subscription not found" },
        404
      );
    }
    return c.json(
      { success: false, error: "Failed to delete newsletter subscription" },
      500
    );
  }
});

// POST /api/newsletter/unsubscribe - Unsubscribe by email
app.post("/unsubscribe", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ success: false, error: "Email is required" }, 400);
    }

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!subscription) {
      return c.json(
        { success: false, error: "Email not found in our newsletter list" },
        404
      );
    }

    if (subscription.status === "unsubscribed") {
      return c.json({
        success: true,
        message: "You are already unsubscribed from our newsletter.",
      });
    }

    const updatedSubscription = await prisma.newsletterSubscription.update({
      where: { email: email.toLowerCase().trim() },
      data: { status: "unsubscribed" },
    });

    return c.json({
      success: true,
      data: updatedSubscription,
      message: "You have been successfully unsubscribed from our newsletter.",
    });
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    return c.json(
      { success: false, error: "Failed to unsubscribe from newsletter" },
      500
    );
  }
});

export default app;
