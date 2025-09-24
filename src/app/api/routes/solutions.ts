import { Hono } from "hono";
import {
  getAllSolutionsHandler,
  getSolutionByKeyHandler,
} from "@/features/solutions/controllers/solutions.controller";

const app = new Hono()
  .get("/", getAllSolutionsHandler as any)
  .get("/:key", getSolutionByKeyHandler as any);

export default app;
