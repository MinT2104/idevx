import { Hono } from "hono";
import {
  seedModelData,
  seedMultipleModels,
} from "@/features/models/services/seed.service";
import { seedBlogPosts } from "@/features/blog/services/seed.service";

const app = new Hono();

// POST /api/seed/models - Seed model data
app.post("/models", async (c) => {
  try {
    const models = await seedMultipleModels();
    return c.json({
      success: true,
      message: "Models seeded successfully",
      data: models.map((m) => ({ id: m.id, name: m.name })),
    });
  } catch (error) {
    console.error("Error seeding models:", error);
    return c.json({ error: "Failed to seed models" }, 500);
  }
});

// POST /api/seed/single - Seed single model from JSON
app.post("/single", async (c) => {
  try {
    const model = await seedModelData();
    return c.json({
      success: true,
      message: "Model seeded successfully",
      data: { id: model.id, name: model.name },
    });
  } catch (error) {
    console.error("Error seeding single model:", error);
    return c.json({ error: "Failed to seed model" }, 500);
  }
});

export default app;

// POST /api/seed/blog - Seed blog posts
app.post("/blog", async (c) => {
  try {
    const result = await seedBlogPosts();
    return c.json({ success: true, message: "Blog posts seeded", ...result });
  } catch (error) {
    console.error("Error seeding blog posts:", error);
    return c.json({ error: "Failed to seed blog posts" }, 500);
  }
});
