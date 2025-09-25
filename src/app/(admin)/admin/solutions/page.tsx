import { prisma } from "@/core/database/db";
import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";

async function getSolutions() {
  try {
    const solutions = await prisma.solution.findMany({
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
    return solutions;
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return [];
  }
}

export default async function SolutionsPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  const solutions = await getSolutions();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solutions</h1>
          <p className="text-gray-600">Manage AI solutions and products</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Total: {solutions.length} solutions
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Solution
          </button>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution) => {
          // Try to extract title from sections if it's JSON
          let title = solution.key;
          let sectionsCount = 0;

          try {
            if (typeof solution.sections === "object" && solution.sections) {
              const sections = Array.isArray(solution.sections)
                ? solution.sections
                : [solution.sections];
              sectionsCount = sections.length;

              // Try to find a title in the first section
              if (sections[0] && typeof sections[0] === "object") {
                const firstSection = sections[0] as any;
                title =
                  firstSection.title || firstSection.heading || solution.key;
              }
            }
          } catch (error) {
            // Fallback to key if JSON parsing fails
            title = solution.key;
          }

          return (
            <div
              key={solution.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 font-mono">
                      {solution.key}
                    </p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    {solution.kind || "solution"}
                  </span>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Sections:</span>
                    <span>{sectionsCount}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Created:</span>
                    <span>
                      {new Date(solution.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Updated:</span>
                    <span>
                      {new Date(solution.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                  <div className="space-x-2">
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {solutions.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-gray-400 text-6xl mb-4">💡</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No solutions yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first AI solution or product.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add First Solution
          </button>
        </div>
      )}
    </div>
  );
}
