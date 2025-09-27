import { Hono } from "hono";
import {
  getAllSolutionsHandler,
  getSolutionByKeyHandler,
  checkSolutionExistsHandler,
} from "@/features/solutions/controllers/solutions.controller";

const app = new Hono()
  .get("/", getAllSolutionsHandler as any)
  .get("/:key", getSolutionByKeyHandler as any)
  .get("/check/:key", checkSolutionExistsHandler as any);

export default app;
