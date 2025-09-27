import {
  listSolutionKeys,
  getSolutionByKey,
  checkSolutionExists,
  listSolutionsByKind,
} from "@/features/solutions/services/solutions.service";

export const getAllSolutionsHandler = async (c: any) => {
  const kind = c.req.query("kind");
  const solutions = await listSolutionsByKind(kind);
  return c.json({ solutions, count: solutions.length });
};

export const getSolutionByKeyHandler = async (c: any) => {
  const key = c.req.param("key");
  const solution = await getSolutionByKey(key);
  if (!solution) {
    return c.json({ error: `Solution '${key}' not found` }, 404);
  }
  return c.json(solution);
};

export const checkSolutionExistsHandler = async (c: any) => {
  const key = c.req.param("key");
  const exists = await checkSolutionExists(key);
  return c.json({
    key,
    exists,
    message: exists
      ? `Solution '${key}' exists and has content`
      : `Solution '${key}' does not exist or has no content`,
  });
};
