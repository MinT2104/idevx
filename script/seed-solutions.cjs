/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const path = require("path");

// Import TypeScript data via transpiled require using ts-node/register if available
// Fallback to dynamic import error if not present
let solutionsData;
try {
  // Resolve the TS module path
  const dataPath = path.resolve(
    __dirname,
    "../src/features/solutions/data/solutions.ts"
  );
  // Register ts-node on the fly if present
  try {
    require("ts-node/register/transpile-only");
  } catch (e) {
    // ignore; next import may still work if compiled to JS
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  solutionsData = require(dataPath).default || require(dataPath);
} catch (e) {
  // Try requiring the built JS if any (after a separate build step)
  try {
    const jsPath = path.resolve(
      __dirname,
      "../dist/src/features/solutions/data/solutions.js"
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    solutionsData = require(jsPath).default || require(jsPath);
  } catch (e2) {
    console.error(
      "Failed to load solutions data. Install dev dep 'ts-node' or build to dist first."
    );
    console.error(e2);
    process.exit(1);
  }
}

const prisma = new PrismaClient();

async function main() {
  const entries = Object.entries(solutionsData || {});
  if (!entries.length) {
    console.log("No solutions found in data file.");
    return;
  }

  let upserts = 0;
  for (const [key, value] of entries) {
    const sections = Array.isArray(value?.sections) ? value.sections : [];
    const kind = key.startsWith("product-") ? "product" : "solution";
    await prisma.solution.upsert({
      where: { key },
      create: { key, sections, kind },
      update: { sections, kind },
    });
    upserts += 1;
  }
  console.log(`Upserted ${upserts} solutions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
