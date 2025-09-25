import { Hono } from "hono";
import { requireAdmin } from "@/features/auth/hono-auth";
import { prisma } from "@/core/database/db";

const app = new Hono();

app.use(requireAdmin());

// Create solution
app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const { key, kind, sections } = body || {};
    if (!key) return c.json({ error: "key is required" }, 400);
    const created = await prisma.solution.create({
      data: { key, kind: kind ?? "solution", sections: sections ?? [] },
    });
    return c.json(created, 201);
  } catch (e: any) {
    if (e?.code === "P2002") {
      return c.json({ error: "key is already exists" }, 409);
    }
    return c.json({ error: e?.message || "Failed to create" }, 500);
  }
});

// Get by id
app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const row = await prisma.solution.findUnique({ where: { id } });
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json(row);
});

// Update by id
app.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { key, kind, sections } = body || {};
    const updated = await prisma.solution.update({
      where: { id },
      data: { key, kind, sections },
    });
    return c.json(updated);
  } catch (e: any) {
    if (e?.code === "P2002") {
      return c.json({ error: "Key đã tồn tại" }, 409);
    }
    return c.json({ error: e?.message || "Failed to update" }, 500);
  }
});

// Delete by id
app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await prisma.solution.delete({ where: { id } });
    return c.json({ ok: true });
  } catch (e: any) {
    return c.json({ error: e?.message || "Failed to delete" }, 500);
  }
});

export default app;
