import { Hono } from "hono";
import { z } from "zod";

const automationRoutes = new Hono();

// Schema for cronjob automation request
const cronjobRequestSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  category: z.string().min(1, "Category is required"),
  customTags: z.string().optional(),
});

// Generate blog post endpoint for cronjob (no auth required)
automationRoutes.post("/generate-blog-cronjob", async (c) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);

  console.log(
    `🤖 [${new Date().toISOString()}] [${requestId}] Starting blog generation for cronjob`
  );

  try {
    const body = await c.req.json();
    const { prompt, category, customTags } = cronjobRequestSchema.parse(body);

    console.log(
      `📝 [${new Date().toISOString()}] [${requestId}] Generating blog post:`,
      {
        category,
        promptLength: prompt.length,
        hasCustomTags: !!customTags,
        promptPreview: prompt.substring(0, 100) + "...",
      }
    );

    // Call DeepSeek API
    let content;
    const apiStartTime = Date.now();

    try {
      console.log(
        `🔗 [${new Date().toISOString()}] [${requestId}] Calling DeepSeek API...`
      );

      const deepSeekResponse = await fetch(
        "https://api.deepseek.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: `You are a senior technical writer for DevX, creating high-quality AI content for developers and engineers.

                     Writing Style:
                     - Concise, impactful titles (max 60 characters)
                     - Short, memorable slugs (max 40 characters) 
                     - Professional yet engaging tone
                     - Technical depth with practical examples
                     - 800-1200 words of valuable content

                     Content Focus:
                     - Recent breakthroughs and trends
                     - Practical implementation examples
                     - Code snippets and technical insights
                     - Actionable takeaways for developers
                     - Future implications and outlook`,
              },
              {
                role: "user",
                content: `Category: ${category}\n\nPrompt: ${prompt}\n\nWrite a comprehensive blog post following this exact format:

                     IMPORTANT: Return ONLY a valid JSON object without any markdown code blocks or extra formatting. The response must be pure JSON.

                     JSON structure:
                     {
                       "title": "Short, punchy title (max 60 chars)",
                       "excerpt": "Compelling 1-2 sentence summary",
                       "content": "Well-structured markdown with headings, technical insights, and code examples",
                       "tags": ["relevant", "technical", "tags"],
                       "slug": "short-memorable-slug"
                     }

                     Title Guidelines:
                     - Maximum 60 characters
                     - Use action words and numbers when possible
                     - Avoid filler words like "A Guide to" or "Everything About"
                     - Examples: "GPT-4 Turbo: 10x Faster Inference", "RAG Revolution: Beyond Vector Search"

                     Slug Guidelines:
                     - Maximum 40 characters
                     - Use hyphens, lowercase, no special characters
                     - Examples: "gpt-4-turbo-inference", "rag-beyond-vectors"

                     Content Structure:
                     - Hook opening (recent breakthrough/trend)
                     - 2-3 key developments with technical depth
                     - Practical examples with code snippets
                     - Actionable takeaways
                     - Future outlook
                     
                     Return ONLY the JSON object, no markdown code blocks or explanations`,
              },
            ],
            temperature: 0.7,
            max_tokens: 4000,
          }),
        }
      );

      const apiDuration = Date.now() - apiStartTime;
      console.log(
        `⏱️ [${new Date().toISOString()}] [${requestId}] DeepSeek API call completed in ${apiDuration}ms`
      );

      if (!deepSeekResponse.ok) {
        const errorText = await deepSeekResponse.text();
        console.error(
          `❌ [${new Date().toISOString()}] [${requestId}] DeepSeek API Error:`,
          {
            status: deepSeekResponse.status,
            statusText: deepSeekResponse.statusText,
            body: errorText,
            duration: apiDuration,
          }
        );

        if (deepSeekResponse.status === 402) {
          throw new Error(
            "DeepSeek API billing error: Please check your account credits or subscription status"
          );
        } else if (deepSeekResponse.status === 401) {
          throw new Error(
            "DeepSeek API authentication error: Please check your API key"
          );
        } else {
          throw new Error(
            `DeepSeek API error (${deepSeekResponse.status}): ${errorText}`
          );
        }
      }

      const deepSeekData = await deepSeekResponse.json();
      content = deepSeekData.choices?.[0]?.message?.content;

      console.log(
        `✅ [${new Date().toISOString()}] [${requestId}] DeepSeek API success:`,
        {
          contentLength: content?.length || 0,
          tokensUsed: deepSeekData.usage?.total_tokens || "unknown",
        }
      );
    } catch (apiError) {
      console.error(
        `💥 [${new Date().toISOString()}] [${requestId}] DeepSeek API failed:`,
        {
          error: apiError instanceof Error ? apiError.message : "Unknown error",
          duration: Date.now() - apiStartTime,
        }
      );
      throw new Error(
        `DeepSeek API failed: ${apiError instanceof Error ? apiError.message : "Unknown error"}`
      );
    }

    if (!content) {
      console.error(
        `❌ [${new Date().toISOString()}] [${requestId}] No content generated by DeepSeek`
      );
      throw new Error("No content generated by DeepSeek");
    }

    // Parse JSON response
    let parsedContent;
    const parseStartTime = Date.now();

    try {
      console.log(
        `🔍 [${new Date().toISOString()}] [${requestId}] Parsing JSON response...`
      );

      // Clean the content - remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith("```json")) {
        cleanContent = cleanContent
          .replace(/^```json\s*/, "")
          .replace(/\s*```$/, "");
      } else if (cleanContent.startsWith("```")) {
        cleanContent = cleanContent
          .replace(/^```\s*/, "")
          .replace(/\s*```$/, "");
      }

      parsedContent = JSON.parse(cleanContent);

      // Validate required fields
      if (!parsedContent.title || !parsedContent.content) {
        throw new Error("Invalid content structure - missing title or content");
      }

      console.log(
        `✅ [${new Date().toISOString()}] [${requestId}] JSON parsing successful:`,
        {
          title: parsedContent.title,
          contentLength: parsedContent.content.length,
          excerptLength: parsedContent.excerpt?.length || 0,
          tagsCount: parsedContent.tags?.length || 0,
          parseDuration: Date.now() - parseStartTime,
        }
      );
    } catch (parseError) {
      console.error(
        `💥 [${new Date().toISOString()}] [${requestId}] JSON parsing failed:`,
        {
          error:
            parseError instanceof Error ? parseError.message : "Unknown error",
          rawContentPreview: content.substring(0, 200) + "...",
          parseDuration: Date.now() - parseStartTime,
        }
      );

      throw new Error(
        `JSON parsing failed: ${parseError instanceof Error ? parseError.message : "Unknown error"}`
      );
    }

    // Generate slug if not provided
    if (!parsedContent.slug) {
      parsedContent.slug = parsedContent.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50);
    }

    // Create the blog post in database
    const dbStartTime = Date.now();
    console.log(
      `💾 [${new Date().toISOString()}] [${requestId}] Saving blog post to database...`
    );

    const { prisma } = await import("@/core/database/db");

    const blogPost = await prisma.blogPost.create({
      data: {
        slug: parsedContent.slug,
        locale: "en",
        title: parsedContent.title,
        excerpt: parsedContent.excerpt,
        content: {
          type: "markdown",
          body: parsedContent.content,
        },
        taxonomy: {
          categories: [category],
          tags: customTags
            ? customTags.split(",").map((tag) => tag.trim())
            : parsedContent.tags || [],
        },
        authors: [
          {
            id: "devx-editor",
            name: "DevX Editorial",
            avatar: {
              url: "/images/logo_black.png",
              alt: "DevX Editorial",
            },
          },
        ],
        status: "draft",
        blogType: "automation",
        publishedAt: null,
      },
    });

    const dbDuration = Date.now() - dbStartTime;
    const totalDuration = Date.now() - startTime;

    console.log(
      `🎉 [${new Date().toISOString()}] [${requestId}] Blog post created successfully:`,
      {
        blogPostId: blogPost.id,
        title: blogPost.title,
        slug: blogPost.slug,
        category,
        dbDuration,
        totalDuration,
        status: "draft",
      }
    );

    return c.json({
      success: true,
      message: "Blog post generated and saved successfully",
      data: {
        blogPost: {
          id: blogPost.id,
          title: blogPost.title,
          slug: blogPost.slug,
          status: blogPost.status,
          category,
        },
        metadata: {
          requestId,
          totalDuration,
          apiDuration: Date.now() - apiStartTime - dbDuration,
          dbDuration,
          timestamp: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    const totalDuration = Date.now() - startTime;

    console.error(
      `💥 [${new Date().toISOString()}] [${requestId}] Blog generation failed:`,
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        totalDuration,
      }
    );

    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
        metadata: {
          requestId,
          totalDuration,
          timestamp: new Date().toISOString(),
        },
      },
      500
    );
  }
});

export default automationRoutes;
