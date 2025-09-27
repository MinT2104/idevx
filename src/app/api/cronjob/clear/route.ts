import { NextRequest, NextResponse } from "next/server";
import { getAgendaService } from "@/core/services/agenda.service";

// Clear all blog jobs
export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `🧹 [${new Date().toISOString()}] [${requestId}] Clearing all blog jobs...`
  );

  try {
    const agendaService = getAgendaService();
    await agendaService.clearAllBlogJobs();

    console.log(
      `✅ [${new Date().toISOString()}] [${requestId}] All blog jobs cleared successfully`
    );

    return NextResponse.json({
      success: true,
      message: "All blog jobs cleared successfully",
      data: {
        scheduler: "agenda",
      },
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Clear jobs error:`,
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      }
    );

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to clear jobs",
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
