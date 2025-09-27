import Agenda, { Job } from "agenda";
import { MongoClient } from "mongodb";

// Job Types
export interface BlogGenerationJob {
  category: string;
  prompt: string;
  customTags: string;
}

class AgendaService {
  private agenda: Agenda | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.init();
  }

  private async init() {
    try {
      console.log(
        `🔄 [${new Date().toISOString()}] Initializing Agenda service...`
      );

      // Get MongoDB connection string from environment or use default
      const mongoUrl =
        process.env.DATABASE_URL || "mongodb://localhost:27017/idevx";

      // Initialize Agenda with MongoDB connection
      this.agenda = new Agenda({
        db: { address: mongoUrl, collection: "agendaJobs" },
        processEvery: "30 seconds", // Check for jobs every 30 seconds
        maxConcurrency: 1, // Only run one job at a time globally
        defaultConcurrency: 1, // Default concurrency for all jobs
      });

      // Define job types
      this.defineJobs();

      // Setup event listeners
      this.setupEventListeners();

      // Start Agenda
      await this.agenda.start();

      this.isInitialized = true;
      console.log(
        `✅ [${new Date().toISOString()}] Agenda service initialized successfully`
      );
    } catch (error) {
      console.error(
        `❌ [${new Date().toISOString()}] Failed to initialize Agenda:`,
        error
      );
      throw error;
    }
  }

  private defineJobs() {
    if (!this.agenda) return;

    // Define ONLY the recurring blog automation job - generates blog directly
    this.agenda.define(
      "blog-automation-cycle",
      { concurrency: 1 },
      async (job: Job) => {
        const startTime = Date.now();
        const jobId = job.attrs._id;

        console.log(
          `🔄 [${new Date().toISOString()}] [${jobId}] Blog automation cycle starting...`
        );

        try {
          // Get next category in rotation
          const category = await this.getNextCategory();

          console.log(
            `📝 [${new Date().toISOString()}] [${jobId}] Generating blog post for category: ${category}`
          );

          // Generate blog post directly (without scheduling separate job)
          const response = await fetch(
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

          const result = await response.json();

          if (result.success) {
            console.log(
              `✅ [${new Date().toISOString()}] [${jobId}] Blog post generated successfully:`,
              {
                title: result.data.blogPost.title,
                category,
                duration: Date.now() - startTime,
                blogPostId: result.data.blogPost.id,
              }
            );
          } else {
            throw new Error(result.error || "Blog generation failed");
          }
        } catch (error) {
          console.error(
            `❌ [${new Date().toISOString()}] [${jobId}] Blog automation cycle failed:`,
            {
              error: error instanceof Error ? error.message : "Unknown error",
              category: await this.getNextCategory(),
              duration: Date.now() - startTime,
            }
          );
          throw error;
        }
      }
    );
  }

  private setupEventListeners() {
    if (!this.agenda) return;

    this.agenda.on("ready", () => {
      console.log(`📡 [${new Date().toISOString()}] Agenda is ready`);
    });

    this.agenda.on("start", (job) => {
      console.log(
        `🎬 [${new Date().toISOString()}] Job started: ${job.attrs.name} [${job.attrs._id}]`
      );
    });

    this.agenda.on("complete", (job) => {
      console.log(
        `🎉 [${new Date().toISOString()}] Job completed: ${job.attrs.name} [${job.attrs._id}]`
      );
    });

    this.agenda.on("fail", (err, job) => {
      console.error(
        `💥 [${new Date().toISOString()}] Job failed: ${job.attrs.name} [${job.attrs._id}]`,
        {
          error: err.message,
          stack: err.stack,
        }
      );
    });
  }

  private async getNextCategory(): Promise<string> {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/cronjob/rotation`
      );
      const data = await response.json();
      return data.success ? data.data.nextCategory : "model-performance";
    } catch (error) {
      console.error("Failed to get next category:", error);
      return "model-performance";
    }
  }

  // Public methods for job management

  async startBlogAutomation(intervalMinutes: number = 5): Promise<void> {
    // Wait for initialization to complete
    if (this.initPromise) {
      await this.initPromise;
    }

    if (!this.agenda || !this.isInitialized) {
      throw new Error("Agenda service not initialized");
    }

    console.log(
      `🚀 [${new Date().toISOString()}] Starting blog automation with ${intervalMinutes} minute interval`
    );

    // Cancel any existing automation jobs
    await this.agenda.cancel({ name: "blog-automation-cycle" });

    // Schedule recurring blog automation
    await this.agenda.every(
      `${intervalMinutes} minutes`,
      "blog-automation-cycle",
      {},
      {
        timezone: "UTC",
      }
    );

    console.log(
      `✅ [${new Date().toISOString()}] Blog automation started successfully`
    );
  }

  async stopBlogAutomation(): Promise<void> {
    // Wait for initialization to complete
    if (this.initPromise) {
      await this.initPromise;
    }

    if (!this.agenda || !this.isInitialized) {
      throw new Error("Agenda service not initialized");
    }

    console.log(`🛑 [${new Date().toISOString()}] Stopping blog automation...`);

    // Cancel automation jobs only
    const automationCanceled = await this.agenda.cancel({
      name: "blog-automation-cycle",
    });

    console.log(
      `✅ [${new Date().toISOString()}] Blog automation stopped. Canceled ${automationCanceled} jobs.`
    );
  }

  async clearAllBlogJobs(): Promise<void> {
    // Wait for initialization to complete
    if (this.initPromise) {
      await this.initPromise;
    }

    if (!this.agenda || !this.isInitialized) {
      throw new Error("Agenda service not initialized");
    }

    console.log(`🧹 [${new Date().toISOString()}] Clearing all blog jobs...`);

    // Cancel and remove all blog-related jobs
    const automationCanceled = await this.agenda.cancel({
      name: "blog-automation-cycle",
    });

    console.log(
      `✅ [${new Date().toISOString()}] Cleared ${automationCanceled} blog jobs.`
    );
  }

  async getJobStats(): Promise<{
    running: number;
    completed: number;
    failed: number;
    scheduled: number;
  }> {
    // Wait for initialization to complete
    if (this.initPromise) {
      await this.initPromise;
    }

    if (!this.agenda || !this.isInitialized) {
      throw new Error("Agenda service not initialized");
    }

    const [running, completed, failed, scheduled] = await Promise.all([
      this.agenda.jobs({
        name: "blog-automation-cycle",
        $or: [{ lockedAt: { $exists: true } }, { runAt: { $lte: new Date() } }],
      }),
      this.agenda.jobs({
        name: "blog-automation-cycle",
        lastFinishedAt: { $exists: true },
        failedAt: { $exists: false },
      }),
      this.agenda.jobs({
        name: "blog-automation-cycle",
        failedAt: { $exists: true },
      }),
      this.agenda.jobs({
        name: "blog-automation-cycle",
        nextRunAt: { $gt: new Date() },
      }),
    ]);

    return {
      running: running.length,
      completed: completed.length,
      failed: failed.length,
      scheduled: scheduled.length,
    };
  }

  async isAutomationRunning(): Promise<boolean> {
    // Wait for initialization to complete
    if (this.initPromise) {
      await this.initPromise;
    }

    if (!this.agenda || !this.isInitialized) {
      return false;
    }

    const runningJobs = await this.agenda.jobs({
      name: "blog-automation-cycle",
      nextRunAt: { $exists: true },
    });

    return runningJobs.length > 0;
  }

  async getNextRunTime(): Promise<Date | null> {
    // Wait for initialization to complete
    if (this.initPromise) {
      await this.initPromise;
    }

    if (!this.agenda || !this.isInitialized) {
      return null;
    }

    const nextJob = await this.agenda.jobs(
      { name: "blog-automation-cycle", nextRunAt: { $gt: new Date() } },
      { nextRunAt: 1 },
      1
    );

    return nextJob.length > 0 ? (nextJob[0].attrs.nextRunAt ?? null) : null;
  }

  async gracefulShutdown(): Promise<void> {
    if (this.agenda) {
      console.log(
        `🔄 [${new Date().toISOString()}] Shutting down Agenda service...`
      );
      await this.agenda.stop();
      console.log(
        `✅ [${new Date().toISOString()}] Agenda service shut down successfully`
      );
    }
  }
}

// Singleton instance
let agendaService: AgendaService | null = null;

export function getAgendaService(): AgendaService {
  if (!agendaService) {
    agendaService = new AgendaService();
  }
  return agendaService;
}

export default AgendaService;
