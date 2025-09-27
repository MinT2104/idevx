import { prisma } from "@/core/database/db";
import { getServerSessionUser } from "@/features/auth/auth-server";
import Link from "next/link";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { revalidatePath } from "next/cache";
import ConfirmSubmitButton from "@/features/shared/components/ConfirmSubmitButton";
import { RefreshCw } from "lucide-react";

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

export default async function SolutionsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  const solutions = await getSolutions();

  const activeTab =
    (typeof searchParams?.tab === "string" && searchParams.tab) || "solutions";

  const isProducts = activeTab === "products";
  const isAgentic = activeTab === "agentic";

  const filtered = solutions.filter((s) => {
    if (isProducts) return s.kind === "product";
    if (isAgentic) return s.kind === "agentic";
    return s.kind !== "product" && s.kind !== "agentic";
  });

  const solutionsCount = solutions.filter(
    (s) => s.kind !== "product" && s.kind !== "agentic"
  ).length;
  const productsCount = solutions.filter((s) => s.kind === "product").length;
  const agenticCount = solutions.filter((s) => s.kind === "agentic").length;

  async function deleteSolution(id: string) {
    "use server";
    try {
      await prisma.solution.delete({ where: { id } });
    } catch (error) {
      console.error("Failed to delete solution:", error);
    }
    revalidatePath("/admin/solutions");
  }

  async function refreshData() {
    "use server";
    revalidatePath("/admin/solutions");
  }

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
            {isProducts ? (
              <>Total: {productsCount} products</>
            ) : isAgentic ? (
              <>Total: {agenticCount} agentic solutions</>
            ) : (
              <>Total: {solutionsCount} solutions</>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <form action={refreshData} className="inline-block">
              <button
                type="submit"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </form>
            <Link
              href="/admin/solutions/create"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              {isProducts
                ? "Add Product"
                : isAgentic
                  ? "Add Agentic Solution"
                  : "Add Solution"}
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <a
          href="/admin/solutions?tab=solutions"
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            !isProducts && !isAgentic
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Solutions ({solutionsCount})
        </a>
        <a
          href="/admin/solutions?tab=products"
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            isProducts
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Products ({productsCount})
        </a>
        <a
          href="/admin/solutions?tab=agentic"
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            isAgentic
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Agentic ({agenticCount})
        </a>
      </div>

      {/* List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((solution) => {
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

          const viewLink = isProducts
            ? `/product/${solution.key}`
            : isAgentic
              ? `/agentic/${solution.key}`
              : `/solution/${solution.key}`;

          return (
            <div key={solution.id} className="group relative">
              <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 group-hover:shadow-md">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                      </h3>
                      <span className="mt-1 inline-flex items-center gap-2 text-xs font-mono text-gray-600">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-gray-700 border border-gray-200">
                          {solution.key}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          solution.kind === "product"
                            ? "bg-amber-100 text-amber-800"
                            : solution.kind === "agentic"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {solution.kind === "product"
                          ? "product"
                          : solution.kind === "agentic"
                            ? "agentic"
                            : "solution"}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white px-3 py-2">
                      <div className="text-[10px] uppercase tracking-wide text-gray-500">
                        Sections
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {sectionsCount}
                      </div>
                    </div>
                    <div className="bg-white px-3 py-2">
                      <div className="text-[10px] uppercase tracking-wide text-gray-500">
                        Created
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(solution.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="bg-white px-3 py-2">
                      <div className="text-[10px] uppercase tracking-wide text-gray-500">
                        Updated
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {new Date(solution.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <Link
                      href={viewLink}
                      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      View Details
                    </Link>
                    <div className="space-x-2">
                      <Link
                        href={`/admin/solutions/edit/${solution.id}`}
                        className="bg-teal-500 text-white inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <form
                        action={deleteSolution.bind(null, solution.id)}
                        className="inline-block"
                      >
                        <ConfirmSubmitButton
                          className="text-white inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium"
                          message={`Are you sure you want to delete "${title}"?`}
                        >
                          Delete
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-gray-400 text-6xl mb-4">
            {isProducts ? "📦" : isAgentic ? "🤖" : "💡"}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isProducts
              ? "No products yet"
              : isAgentic
                ? "No agentic solutions yet"
                : "No solutions yet"}
          </h3>
          <p className="text-gray-500 mb-4">
            {isProducts
              ? "Create your first product."
              : isAgentic
                ? "Create your first AI agentic solution."
                : "Create your first AI solution."}
          </p>
          <Link
            href="/admin/solutions/create"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {isProducts
              ? "Add First Product"
              : isAgentic
                ? "Add First Agentic Solution"
                : "Add First Solution"}
          </Link>
        </div>
      )}
    </div>
  );
}
