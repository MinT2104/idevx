import { prisma } from "@/core/database/db";
import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";

async function getStats() {
  try {
    const [usersCount, modelsCount, blogPostsCount, solutionsCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.model.count(),
        prisma.blogPost.count(),
        prisma.solution.count(),
      ]);

    return {
      users: usersCount,
      models: modelsCount,
      blogPosts: blogPostsCount,
      solutions: solutionsCount,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      users: 0,
      models: 0,
      blogPosts: 0,
      solutions: 0,
    };
  }
}

export default async function AdminDashboard() {
  const user = await getServerSessionUser();

  const stats = await getStats();

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: "👥",
      color: "blue",
      href: "/admin/users",
    },
    {
      title: "AI Models",
      value: stats.models,
      icon: "🤖",
      color: "green",
      href: "/admin/models",
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: "📝",
      color: "purple",
      href: "/admin/blog",
    },
    {
      title: "Solutions",
      value: stats.solutions,
      icon: "💡",
      color: "orange",
      href: "/admin/solutions",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className="text-4xl">{card.icon}</div>
            </div>
            <div className="mt-4">
              <a
                href={card.href}
                className={`text-sm font-medium text-${card.color}-600 hover:text-${card.color}-800`}
              >
                View all →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/users"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👥</span>
              <div>
                <h3 className="font-medium text-gray-900">Manage Users</h3>
                <p className="text-sm text-gray-600">
                  View and edit user accounts
                </p>
              </div>
            </div>
          </a>

          <a
            href="/admin/models"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-medium text-gray-900">AI Models</h3>
                <p className="text-sm text-gray-600">
                  Add and manage AI models
                </p>
              </div>
            </div>
          </a>

          <a
            href="/admin/blog"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-medium text-gray-900">Create Post</h3>
                <p className="text-sm text-gray-600">Write new blog articles</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-green-600 text-sm">●</span>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Admin dashboard initialized
              </p>
              <p className="text-xs text-gray-600">
                Welcome to your new admin panel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
