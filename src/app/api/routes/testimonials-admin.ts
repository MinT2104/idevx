import { Hono } from "hono";
import { prisma } from "@/core/database/db";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { getServerSessionUser } from "@/features/auth/auth-server";

const app = new Hono();

const createSchema = z.object({
  type: z.enum(["statistic", "quote"]),
  statistic: z
    .object({ value: z.string(), description: z.string() })
    .optional()
    .nullable()
    .transform((v) => (v == null ? undefined : v)),
  quote: z
    .object({
      text: z.string(),
      person: z.string().optional(),
      position: z.string().optional(),
      image: z
        .string()
        .optional()
        .refine(
          (v) => v == null || /^https?:\/\//.test(v) || v.startsWith("/"),
          { message: "Invalid url or path" }
        ),
    })
    .optional()
    .nullable()
    .transform((v) => (v == null ? undefined : v)),
  client: z
    .object({
      name: z.string(),
      logo: z
        .string()
        .refine((v) => /^https?:\/\//.test(v) || v.startsWith("/"), {
          message: "Invalid url or path",
        }),
    })
    .optional()
    .nullable()
    .transform((v) => (v == null ? undefined : v)),
  company: z.object({
    name: z.string(),
    logo: z
      .string()
      .refine((v) => /^https?:\/\//.test(v) || v.startsWith("/"), {
        message: "Invalid url or path",
      }),
    imageClass: z.string(),
  }),
  order: z.number().int().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

const updateSchema = createSchema.partial();

app.use("*", async (c, next) => {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});

// List with filters/pagination
app.get("/", async (c) => {
  const { status, page = "1", limit = "20", search } = c.req.query();
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const where: any = {};
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      {
        company: {
          path: ["name"],
          string_contains: search,
          mode: "insensitive",
        },
      },
      {
        quote: { path: ["text"], string_contains: search, mode: "insensitive" },
      },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: [{ order: "asc" }],
      skip,
      take: limitNum,
    }),
    prisma.testimonial.count({ where }),
  ]);

  return c.json({
    success: true,
    data: items,
    pagination: { page: pageNum, limit: limitNum, total },
  });
});

// Create
app.post("/", zValidator("json", createSchema), async (c) => {
  const data = c.req.valid("json");
  const created = await prisma.testimonial.create({ data });
  return c.json({ success: true, data: created }, 201);
});

// Get by id
app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) return c.json({ success: false, error: "Not found" }, 404);
  return c.json({ success: true, data: item });
});

// Update
app.patch("/:id", zValidator("json", updateSchema), async (c) => {
  const id = c.req.param("id");
  const payload = c.req.valid("json");
  const updated = await prisma.testimonial.update({
    where: { id },
    data: payload,
  });
  return c.json({ success: true, data: updated });
});

// Delete
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.testimonial.delete({ where: { id } });
  return c.json({ success: true });
});

export default app;
