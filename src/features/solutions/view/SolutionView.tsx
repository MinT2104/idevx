import SectionRenderer from "../components/SectionRenderer";
import solutionsData from "../data/solutions";
import { Section, SolutionViewProps } from "../types";

const SolutionView = ({ solutionKey }: SolutionViewProps) => {
  const solution = solutionsData[solutionKey];

  if (!solution) {
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
      {solution.sections.map((section: Section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
};

export default SolutionView;
