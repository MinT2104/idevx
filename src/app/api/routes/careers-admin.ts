import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "@/core/database/db";
import { getServerSessionUser } from "@/features/auth/auth-server";

const app = new Hono();

app.use("*", async (c, next) => {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin")
    return c.json({ error: "Unauthorized" }, 401);
  await next();
});

app.get("/", async (c) => {
  const { page = "1", limit = "10", status, search } = c.req.query();
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;
  const where: any = {};
  if (status && status !== "all") where.status = status;
  if (search)
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { position: { contains: search, mode: "insensitive" } },
    ];
  const [items, total] = await Promise.all([
    prisma.careerApplication.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { createdAt: "desc" },
    }),
    prisma.careerApplication.count({ where }),
  ]);
  return c.json({
    success: true,
    data: items,
    pagination: { page: pageNum, limit: limitNum, total },
  });
});

const updateSchema = z.object({
  status: z.enum(["applied", "reviewed", "shortlisted", "rejected", "hired"]),
});
app.patch("/:id", zValidator("json", updateSchema), async (c) => {
  const id = c.req.param("id");
  const { status } = c.req.valid("json");
  const updated = await prisma.careerApplication.update({
    where: { id },
    data: { status },
  });
  return c.json({ success: true, data: updated });
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await prisma.careerApplication.delete({ where: { id } });
  return c.json({ success: true });
});

export default app;
