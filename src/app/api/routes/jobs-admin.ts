import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/core/database/db";

const app = new Hono();

const jobSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
  level: z.string().min(1),
  salaryRange: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string(),
  }),
  postedAt: z.string().or(z.date()),
  applicationDeadline: z.string().or(z.date()),
  description: z.string().min(1),
  responsibilities: z.array(z.string()),
  requirements: z.array(z.string()),
  niceToHave: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  howToApply: z.string().min(1),
  status: z.enum(["open", "closed"]).default("open"),
});

// List with pagination
app.get("/", async (c) => {
  const { page = "1", limit = "10", status, search } = c.req.query();
  const pageNum = parseInt(page);
  const limitNum = Math.min(100, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;
  const where: any = {};
  if (status && status !== "all") where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { department: { contains: search, mode: "insensitive" } },
      { location: { contains: search, mode: "insensitive" } },
    ];
  }
  const [items, total] = await Promise.all([
    prisma.jobPosting.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { postedAt: "desc" },
    }),
    prisma.jobPosting.count({ where }),
  ]);
  return c.json({
    success: true,
    data: items,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// Create
app.post("/", zValidator("json", jobSchema), async (c) => {
  const data = c.req.valid("json");
  const created = await prisma.jobPosting.create({
    data: {
      title: data.title,
      slug: data.slug,
      department: data.department,
      location: data.location,
      type: data.type,
      level: data.level,
      salaryRange: data.salaryRange,
      postedAt: new Date(data.postedAt as any),
      applicationDeadline: new Date(data.applicationDeadline as any),
      description: data.description,
      responsibilities: data.responsibilities,
      requirements: data.requirements,
      niceToHave: data.niceToHave,
      benefits: data.benefits,
      howToApply: data.howToApply,
      status: data.status,
    },
  });
  return c.json({ success: true, data: created }, 201);
});

// Get by id
app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const item = await prisma.jobPosting.findUnique({ where: { id } });
  if (!item) return c.json({ success: false, error: "Not found" }, 404);
  return c.json({ success: true, data: item });
});

// Update
app.patch("/:id", zValidator("json", jobSchema.partial()), async (c) => {
  const id = c.req.param("id");
  const data = c.req.valid("json");
  const updated = await prisma.jobPosting.update({
    where: { id },
    data: {
      ...data,
      postedAt: data.postedAt ? new Date(data.postedAt as any) : undefined,
      applicationDeadline: data.applicationDeadline
        ? new Date(data.applicationDeadline as any)
        : undefined,
    },
  });
  return c.json({ success: true, data: updated });
});

// Delete
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.jobPosting.delete({ where: { id } });
  return c.json({ success: true });
});

export default app;
