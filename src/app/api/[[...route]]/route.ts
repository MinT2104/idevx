import { Hono } from "hono";
import { handle } from "hono/vercel";

import models from "../routes/models";
import seed from "../routes/seed";
import blog from "../routes/blog";
import testDb from "../routes/test-db";
import solutions from "../routes/solutions";
import solutionsAdmin from "../routes/solutions-admin";
import socialLinks from "../routes/social-links";
import blogAdmin from "../routes/blog-admin";
import blogForm from "../routes/blog-form";
import modelAdmin from "../routes/model-admin";
import feedback from "../routes/feedback";
import newsletter from "../routes/newsletter";

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

app.route("/models", models);
app.route("/seed", seed);
app.route("/test-db", testDb);
app.route("/blog", blog);
app.route("/solutions", solutions);
app.route("/solutions-admin", solutionsAdmin);
app.route("/social-links", socialLinks);
app.route("/blog-admin", blogAdmin);
app.route("/blog-form", blogForm);
app.route("/model-admin", modelAdmin);
app.route("/feedback", feedback);
app.route("/newsletter", newsletter);

export const GET = handle(app as any);
export const POST = handle(app as any);
export const PUT = handle(app as any);
export const PATCH = handle(app as any);
export const DELETE = handle(app as any);

export type AppType = typeof app;
