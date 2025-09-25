/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const TYPES = [
  { value: "llm", label: "LLM" },
  { value: "transcription", label: "Transcription" },
  { value: "text-to-speech", label: "Text to Speech" },
  { value: "image-generation", label: "Image Generation" },
  { value: "embedding", label: "Embedding" },
  { value: "speech-to-text", label: "Speech to Text" },
  { value: "image-processing", label: "Image Processing" },
];

function markdownForType(label) {
  const title = `${label} — Sample Model`;
  const safeLabelPath = label.replace(/\s+/g, "-").toLowerCase();
  return (
    "# " +
    title +
    "\n\n" +
    "> Đây là nội dung markdown mẫu cho loại " +
    label +
    ". Hãy cập nhật lại với nội dung thực tế sau khi seed.\n\n" +
    "## Tổng quan\n\n" +
    "Mục này dùng để trình bày khái quát về model thuộc nhóm " +
    label +
    ".\n\n" +
    "## Quickstart\n\n" +
    "### cURL\n" +
    "~~~bash\n" +
    'curl -X POST "$BASE_URL/v1/' +
    safeLabelPath +
    '" \\\n' +
    '  -H "Authorization: Bearer $API_KEY" \\\n' +
    '  -H "Content-Type: application/json" \\\n' +
    '  -d \'{"input":"Hello world"}\'\n' +
    "~~~\n\n" +
    "### JavaScript (fetch)\n" +
    "~~~javascript\n" +
    "const res = await fetch(process.env.BASE_URL + '/v1/" +
    safeLabelPath +
    "', {\n" +
    "  method: 'POST',\n" +
    "  headers: {\n" +
    "    Authorization: 'Bearer ' + process.env.API_KEY,\n" +
    "    'Content-Type': 'application/json',\n" +
    "  },\n" +
    "  body: JSON.stringify({ input: 'Hello world' }),\n" +
    "});\n" +
    "const data = await res.json();\n" +
    "console.log(data);\n" +
    "~~~\n\n" +
    "## Sử dụng\n\n" +
    "- Demo, prototype\n- Nội bộ\n- Hướng dẫn học tập\n\n" +
    "## Hạn chế\n\n" +
    "- Dữ liệu seed; cần thay thế bằng nội dung thực tế\n\n" +
    "## Changelog\n\n" +
    "- Seed tạo vào " +
    new Date().toISOString() +
    "\n"
  );
}

function pickLogoForType(value) {
  switch (value) {
    case "llm":
      return "/images/models/deepseek.png";
    case "image-generation":
      return "/images/models/meta.png";
    case "embedding":
      return "/images/models/idevx.png";
    default:
      return "/images/models/idevx.png";
  }
}

function makeModelForType(t) {
  const nowIso = new Date().toISOString();
  const name = `${t.label} Sample`;
  const slug = `${t.value}-sample`;
  const description = `Seeded example for the ${t.label} category.`;
  const logo = pickLogoForType(t.value);

  const detailedInfo = {
    readme: "https://github.com/idevx/README.md",
    github: "https://github.com/idevx",
    developedBy: "Idevx",
    modelFamily: t.label,
    useCase: t.value,
    variant: "sample",
    size: "Unknown",
    license: "Proprietary",
  };

  const content = { type: "markdown", body: markdownForType(t.label) };

  return {
    name,
    slug,
    type: t.value,
    description,
    logo,
    status: "active",
    detailedInfo,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function main() {
  let upserts = 0;
  for (const t of TYPES) {
    const data = makeModelForType(t);
    await prisma.model.upsert({
      where: { slug: data.slug },
      create: data,
      update: {
        name: data.name,
        type: data.type,
        description: data.description,
        logo: data.logo,
        status: data.status,
        detailedInfo: data.detailedInfo,
        content: data.content,
        updatedAt: new Date(),
      },
    });
    upserts += 1;
  }
  console.log(`Upserted ${upserts} models (one per type).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
