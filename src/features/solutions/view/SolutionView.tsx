import SectionRenderer from "../components/SectionRenderer";
import { Section, SolutionViewProps } from "../types";
import { headers } from "next/headers";

const SolutionView = async ({ solutionKey }: SolutionViewProps) => {
  const hdrs = headers();
  const host = hdrs.get("host");
  const protocol = process.env.VERCEL ? "https" : "http";
  const url = `${protocol}://${host}/api/solutions/${solutionKey}`;

  let sections: Section[] | null = null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      sections = data?.sections ?? null;
    }
  } catch (_) {
    // Ignore fetch errors
  }

  if (!sections) {
    return (
      <main className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Solution not found
          </h1>
          <p className="text-gray-600">
            The solution &quot;{solutionKey}&quot; does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden bg-white">
      {sections.map((section: Section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
};

export default SolutionView;
