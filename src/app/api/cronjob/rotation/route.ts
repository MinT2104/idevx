import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `🔄 [${new Date().toISOString()}] [${requestId}] Getting rotation state...`
  );

  try {
    const { prisma } = await import("@/core/database/db");

    // Get the last automation post to determine rotation state
    const lastPost = await prisma.blogPost.findFirst({
      where: {
        blogType: "automation",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        createdAt: true,
        taxonomy: true,
      },
    });

    // Categories for rotation (matching Agenda service)
    const categories = [
      "model-performance",
      "ai-engineering",
      "infrastructure",
      "news",
      "community",
      "ai-models",
      "foundation",
    ];

    let currentIndex = 0;
    let nextCategory = categories[0];

    if (lastPost) {
      // Extract category from taxonomy
      const taxonomy = lastPost.taxonomy as any;
      const lastCategory = taxonomy?.categories?.[0];

      if (lastCategory && categories.includes(lastCategory)) {
        const lastIndex = categories.indexOf(lastCategory);
        currentIndex = (lastIndex + 1) % categories.length;
        nextCategory = categories[currentIndex];
      }
    }

    const rotationState = {
      currentIndex,
      lastRun: lastPost?.createdAt || null,
      nextCategory,
      categories,
    };

    console.log(
      `✅ [${new Date().toISOString()}] [${requestId}] Rotation state:`,
      { nextCategory, currentIndex, lastCategory: lastPost ? "found" : "none" }
    );

    return NextResponse.json({
      success: true,
      data: rotationState,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Rotation error:`,
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      }
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get rotation state",
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
