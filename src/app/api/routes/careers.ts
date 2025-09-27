import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/core/database/db";

const app = new Hono();

// Public jobs listing
app.get("/jobs", async (c) => {
  const {
    page = "1",
    limit = "10",
    status = "open",
    search,
    department,
    type,
    level,
  } = c.req.query();
  const pageNum = parseInt(page);
  const limitNum = Math.min(50, parseInt(limit));
  const skip = (pageNum - 1) * limitNum;
  const where: any = {};
  if (status) where.status = status;
  if (department) where.department = department;
  if (type) where.type = type;
  if (level) where.level = level;
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

const createSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  position: z.string().min(1),
  linkedin: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  cvUrl: z.string().min(1),
});

app.post("/", zValidator("json", createSchema), async (c) => {
  const data = c.req.valid("json");
  const created = await prisma.careerApplication.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      linkedin: data.linkedin || undefined,
      website: data.website || undefined,
      message: data.message || undefined,
      cvUrl: data.cvUrl,
    },
  });
  return c.json({ success: true, data: created }, 201);
});

export default app;
