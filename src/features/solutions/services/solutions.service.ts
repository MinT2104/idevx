export async function listSolutionKeys(): Promise<string[]> {
  const { prisma } = await import("@/core/database/db");
  const rows = await prisma.solution.findMany({ select: { key: true } });
  return rows.map((r) => r.key);
}

export async function listSolutionsByKind(kind?: string) {
  const { prisma } = await import("@/core/database/db");
  const where = kind ? { kind } : {};
  const rows = await prisma.solution.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      key: true,
      kind: true,
      createdAt: true,
      updatedAt: true,
      sections: true,
    },
  });
  return rows;
}

export async function getSolutionByKey(key: string) {
  const { prisma } = await import("@/core/database/db");
  const row = await prisma.solution.findUnique({ where: { key } });
  return row ? { sections: row.sections } : null;
}

export async function checkSolutionExists(key: string): Promise<boolean> {
  const { prisma } = await import("@/core/database/db");
  const solution = await prisma.solution.findUnique({
    where: { key },
    select: { id: true, sections: true },
  });

  if (!solution) {
    return false;
  }

  // Check if sections exist and are not empty
  try {
    const sections = solution.sections as any;

    // If sections is null, undefined, or empty array
    if (!sections || (Array.isArray(sections) && sections.length === 0)) {
      return false;
    }

    // If sections is an object but has no meaningful content
    if (typeof sections === "object" && !Array.isArray(sections)) {
      const keys = Object.keys(sections);
      if (keys.length === 0) {
        return false;
      }
    }

    return true;
  } catch (error) {
    // If there's any error parsing sections, consider it invalid
    return false;
  }
}
