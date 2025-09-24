import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const models = await prisma.model.findMany({
    select: { id: true, link: true },
  });
  const seen = new Map<string, string>();
  const deletions: string[] = [];

  for (const m of models) {
    const key = (m.link || "").trim();
    if (!key) continue;
    if (seen.has(key)) deletions.push(m.id);
    else seen.set(key, m.id);
  }

  if (deletions.length) {
    await prisma.model.deleteMany({ where: { id: { in: deletions } } });
    console.log(`Deleted ${deletions.length} duplicates`);
  } else {
    console.log("No duplicates found");
  }
}

main().finally(() => prisma.$disconnect());
