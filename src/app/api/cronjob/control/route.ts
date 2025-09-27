import { NextRequest, NextResponse } from "next/server";
import { getAgendaService } from "@/core/services/agenda.service";

// Start cronjob with Agenda
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `🚀 [${new Date().toISOString()}] [${requestId}] Starting cronjob with Agenda...`
  );

  try {
    const agendaService = getAgendaService();

    // Check if automation is already running
    const isRunning = await agendaService.isAutomationRunning();
    if (isRunning) {
      console.log(
        `⚠️ [${new Date().toISOString()}] [${requestId}] Blog automation is already running`
      );
      return NextResponse.json({
        success: false,
        error: "Blog automation is already running",
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
        },
      });
    }

    // Start blog automation with 5-minute interval
    await agendaService.startBlogAutomation(5);

    const totalDuration = Date.now() - startTime;

    console.log(
      `🎉 [${new Date().toISOString()}] [${requestId}] Cronjob started successfully with Agenda in ${totalDuration}ms`
    );

    return NextResponse.json({
      success: true,
      message: "Blog automation started successfully",
      data: {
        isRunning: true,
        interval: "5 minutes",
        scheduler: "agenda",
      },
      metadata: {
        requestId,
        totalDuration,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    const totalDuration = Date.now() - startTime;

    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Start cronjob error:`,
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        totalDuration,
      }
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to start cronjob",
        metadata: {
          requestId,
          totalDuration,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

// Stop cronjob
export async function DELETE(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `🛑 [${new Date().toISOString()}] [${requestId}] Stopping cronjob with Agenda...`
  );

  try {
    const agendaService = getAgendaService();

    // Stop blog automation
    await agendaService.stopBlogAutomation();

    console.log(
      `✅ [${new Date().toISOString()}] [${requestId}] Cronjob stopped successfully`
    );

    return NextResponse.json({
      success: true,
      message: "Blog automation stopped successfully",
      data: {
        isRunning: false,
        scheduler: "agenda",
      },
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Stop cronjob error:`,
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      }
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to stop cronjob",
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

// Get cronjob status
export async function GET(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `📊 [${new Date().toISOString()}] [${requestId}] Getting cronjob status with Agenda...`
  );

  try {
    const agendaService = getAgendaService();

    // Get automation status and stats
    const [isRunning, nextRunTime, jobStats] = await Promise.all([
      agendaService.isAutomationRunning(),
      agendaService.getNextRunTime(),
      agendaService.getJobStats(),
    ]);

    const status = {
      isRunning,
      interval: isRunning ? "5 minutes" : null,
      nextRunTime: nextRunTime?.toISOString() || null,
      scheduler: "agenda",
      jobStats,
    };

    console.log(
      `✅ [${new Date().toISOString()}] [${requestId}] Status retrieved:`,
      status
    );

    return NextResponse.json({
      success: true,
      data: status,
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Get status error:`,
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      }
    );

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get status",
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

// Manual trigger for testing
export async function PUT(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `🧪 [${new Date().toISOString()}] [${requestId}] Manual trigger blog generation...`
  );

  try {
    const agendaService = getAgendaService();

    // Get next category
    const rotationResponse = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/cronjob/rotation`
    );
    const rotationData = await rotationResponse.json();
    const category = rotationData.success
      ? rotationData.data.nextCategory
      : "model-performance";

    // Trigger immediate blog generation via direct API call
    const generationResponse = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/automation/generate-blog-cronjob`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Write a compelling, concise blog post about ${category} for AI developers and engineers. Focus on the most impactful developments and actionable insights.

          Requirements:
          - Title: Short, punchy, and SEO-friendly (max 60 characters)
          - Slug: URL-friendly, concise (max 40 characters)
          - Content: 800-1200 words, technical but accessible
          - Tone: Professional yet engaging, like a tech newsletter
          
          Structure:
          1. Hook opening with recent breakthrough or trend
          2. 2-3 key developments with technical depth
          3. Practical implementation examples or code snippets
          4. Actionable takeaways for developers
          5. Future outlook and implications
          
          Make it the kind of content developers actually want to read and share.`,
          category: category,
          customTags: `${category}, ai-development, technical-insights, automation`,
        }),
      }
    );

    const result = await generationResponse.json();
    if (!result.success) {
      throw new Error(result.error || "Failed to generate blog post");
    }

    console.log(
      `✅ [${new Date().toISOString()}] [${requestId}] Manual blog generation triggered for category: ${category}`
    );

    return NextResponse.json({
      success: true,
      message: "Blog generation triggered successfully",
      data: {
        category,
        scheduler: "agenda",
      },
      metadata: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Manual trigger error:`,
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
            : "Failed to trigger blog generation",
        metadata: {
          requestId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}
