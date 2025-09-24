import { Hono } from "hono";
import { handle } from "hono/vercel";

import todos from "../routes/todos";
import models from "../routes/models";
import seed from "../routes/seed";
import blog from "../routes/blog";
import testDb from "../routes/test-db";
import solutions from "../routes/solutions";

// Force dynamic rendering to avoid build-time issues
export const dynamic = "force-dynamic";
// Revert to "edge" if planning on running on the edge
export const runtime = "nodejs";

const app = new Hono().basePath("/api");

// Add debug middleware
app.use("*", async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
});

app.route("/todos", todos);
app.route("/models", models);
app.route("/seed", seed);
app.route("/test-db", testDb);
app.route("/blog", blog);
app.route("/solutions", solutions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
