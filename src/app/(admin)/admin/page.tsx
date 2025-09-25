import { prisma } from "@/core/database/db";
import Link from "next/link";

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
  const stats = await getStats();

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: "👥",
      theme: {
        card: "bg-gradient-to-br from-blue-500/10 via-blue-400/10 to-cyan-400/10 border border-blue-200/60",
        accent: "text-blue-600",
        hover:
          "hover:from-blue-500/20 hover:via-blue-400/20 hover:to-cyan-400/20",
      },
      href: "/admin/users",
    },
    {
      title: "AI Models",
      value: stats.models,
      icon: "🤖",
      theme: {
        card: "bg-gradient-to-br from-emerald-500/10 via-green-400/10 to-teal-400/10 border border-emerald-200/60",
        accent: "text-emerald-600",
        hover:
          "hover:from-emerald-500/20 hover:via-green-400/20 hover:to-teal-400/20",
      },
      href: "/admin/models",
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: "📝",
      theme: {
        card: "bg-gradient-to-br from-fuchsia-500/10 via-purple-400/10 to-pink-400/10 border border-fuchsia-200/60",
        accent: "text-fuchsia-600",
        hover:
          "hover:from-fuchsia-500/20 hover:via-purple-400/20 hover:to-pink-400/20",
      },
      href: "/admin/blog",
    },
    {
      title: "Solutions",
      value: stats.solutions,
      icon: "💡",
      theme: {
        card: "bg-gradient-to-br from-amber-500/10 via-orange-400/10 to-yellow-400/10 border border-amber-200/60",
        accent: "text-amber-600",
        hover:
          "hover:from-amber-500/20 hover:via-orange-400/20 hover:to-yellow-400/20",
      },
      href: "/admin/solutions",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with vibrant gradient and subtle grid */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        <div className="relative p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-600 to-rose-600">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Quick overview of users, models, posts, and solutions.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href} className="group">
            <div
              className={`rounded-xl p-6 shadow-sm transition-all duration-300 ${card.theme.card} ${card.theme.hover} hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
                    {card.title}
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className="text-4xl drop-shadow-sm">{card.icon}</div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${card.theme.accent}`}>
                  View all →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/solutions"
            className="group relative overflow-hidden rounded-xl border border-amber-200/60 bg-gradient-to-br from-amber-500/10 via-orange-400/10 to-yellow-400/10 p-4 transition-all hover:from-amber-500/20 hover:via-orange-400/20 hover:to-yellow-400/20"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Manage Solutions
                </h3>
                <p className="text-sm text-gray-600">
                  Browse and manage solutions
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/models"
            className="group relative overflow-hidden rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-500/10 via-green-400/10 to-teal-400/10 p-4 transition-all hover:from-emerald-500/20 hover:via-green-400/20 hover:to-teal-400/20"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="font-semibold text-gray-900">Manage Models</h3>
                <p className="text-sm text-gray-600">
                  Add and update AI models
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/blog"
            className="group relative overflow-hidden rounded-xl border border-fuchsia-200/60 bg-gradient-to-br from-fuchsia-500/10 via-purple-400/10 to-pink-400/10 p-4 transition-all hover:from-fuchsia-500/20 hover:via-purple-400/20 hover:to-pink-400/20"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="font-semibold text-gray-900">Create Post</h3>
                <p className="text-sm text-gray-600">
                  Write a new blog article
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
