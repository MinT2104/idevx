import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `📊 [${new Date().toISOString()}] [${requestId}] Getting automation stats...`
  );

  try {
    const { prisma } = await import("@/core/database/db");

    // Get automation blog posts count
    const automationPosts = await prisma.blogPost.count({
      where: {
        blogType: "automation",
      },
    });

    // Get posts by status
    const postsByStatus = await prisma.blogPost.groupBy({
      by: ["status"],
      where: {
        blogType: "automation",
      },
      _count: {
        status: true,
      },
    });

    // Get recent automation posts
    const recentPosts = await prisma.blogPost.findMany({
      where: {
        blogType: "automation",
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    const stats = {
      totalAutomationPosts: automationPosts,
      postsByStatus: postsByStatus.map((item) => ({
        status: item.status,
        count: item._count.status,
      })),
      recentPosts,
    };

    console.log(
      `✅ [${new Date().toISOString()}] [${requestId}] Stats retrieved:`,
      { totalPosts: automationPosts, statusBreakdown: postsByStatus.length }
    );

    return NextResponse.json({
      success: true,
      data: stats,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Stats error:`,
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      }
    );

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get stats",
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
