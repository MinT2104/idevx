export async function listSolutionKeys(): Promise<string[]> {
  const { prisma } = await import("@/core/database/db");
  const rows = await prisma.solution.findMany({ select: { key: true } });
  return rows.map((r) => r.key);
}

export async function getSolutionByKey(key: string) {
  const { prisma } = await import("@/core/database/db");
  const row = await prisma.solution.findUnique({ where: { key } });
  return row ? { sections: row.sections } : null;
}
