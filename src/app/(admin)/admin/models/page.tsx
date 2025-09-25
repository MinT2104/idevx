import { prisma } from "@/core/database/db";
import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";

async function getModels() {
  try {
    const models = await prisma.model.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        brand: true,
        type: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return models;
  } catch (error) {
    console.error("Error fetching models:", error);
    return [];
  }
}

export default async function ModelsPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  const models = await getModels();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Models</h1>
          <p className="text-gray-600">
            Manage AI models and their information
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Total: {models.length} models
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Model
          </button>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div
            key={model.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {model.name || "Unnamed Model"}
                  </h3>
                  <p className="text-sm text-gray-600">{model.brand}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {model.type || "Unknown"}
                </span>
              </div>

              {/* Description */}
              <div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {model.description || "No description available"}
                </p>
              </div>

              {/* Metadata */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Slug:</span>
                  <span className="font-mono">{model.slug}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Created:</span>
                  <span>
                    {model.createdAt
                      ? new Date(model.createdAt).toLocaleDateString()
                      : "N/A"}
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
        ))}
      </div>

      {models.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-gray-400 text-6xl mb-4">🤖</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No AI models yet
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first AI model.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add First Model
          </button>
        </div>
      )}
    </div>
  );
}
