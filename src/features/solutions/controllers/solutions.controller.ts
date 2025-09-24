import {
  listSolutionKeys,
  getSolutionByKey,
} from "@/features/solutions/services/solutions.service";

export const getAllSolutionsHandler = async (c: any) => {
  const keys = await listSolutionKeys();
  return c.json({ keys, count: keys.length });
};

export const getSolutionByKeyHandler = async (c: any) => {
  const key = c.req.param("key");
  const solution = await getSolutionByKey(key);
  if (!solution) {
    return c.json({ error: `Solution '${key}' not found` }, 404);
  }
  return c.json(solution);
};
