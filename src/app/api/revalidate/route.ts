import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  invalidateAllCache,
  invalidateModelCache,
  invalidateBlogCache,
  invalidateSolutionCache,
} from "@/core/utils/cache";

export async function POST(request: NextRequest) {
  try {
    const { type, path, tag } = await request.json();

    // Invalidate server-side cache
    if (type === "model") {
      invalidateModelCache();
      revalidateTag("models");
      revalidatePath("/models");
    } else if (type === "blog") {
      invalidateBlogCache();
      revalidateTag("blog");
      revalidatePath("/blog");
    } else if (type === "solution") {
      invalidateSolutionCache();
      revalidateTag("solutions");
      revalidatePath("/solution");
    } else if (type === "all") {
      invalidateAllCache();
      revalidateTag("all");
      revalidatePath("/");
      revalidatePath("/models");
      revalidatePath("/blog");
      revalidatePath("/solution");
    }

    // Revalidate specific path if provided
    if (path) {
      revalidatePath(path);
    }

    // Revalidate specific tag if provided
    if (tag) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      success: true,
      message: `Cache invalidated for type: ${type}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cache invalidation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to invalidate cache" },
      { status: 500 }
    );
  }
}

// GET endpoint for manual cache clearing
export async function GET() {
  try {
    invalidateAllCache();
    revalidateTag("all");

    return NextResponse.json({
      success: true,
      message: "All cache cleared",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cache clearing error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear cache" },
      { status: 500 }
    );
  }
}
