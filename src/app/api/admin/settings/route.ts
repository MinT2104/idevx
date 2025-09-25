import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/core/database/db";
import { getServerSessionUser } from "@/features/auth/auth-server";

// GET - Fetch settings
export async function GET() {
  try {
    const user = await getServerSessionUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const socialLinksSettings = await prisma.setting.findUnique({
      where: { key: "social_links" },
    });

    const defaultSocialLinks = [
      { name: "Github", href: "", icon: "Github" },
      { name: "Twitter", href: "", icon: "Twitter" },
      { name: "Linkedin", href: "", icon: "Linkedin" },
      { name: "Youtube", href: "", icon: "Youtube" },
    ];

    const socialLinks = socialLinksSettings
      ? (socialLinksSettings.value as any).socialLinks || defaultSocialLinks
      : defaultSocialLinks;

    return NextResponse.json({
      socialLinks,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Unauthorized or error fetching settings" },
      { status: 401 }
    );
  }
}

// POST - Save settings
export async function POST(request: NextRequest) {
  try {
    const user = await getServerSessionUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { socialLinks } = body;

    if (!socialLinks || !Array.isArray(socialLinks)) {
      return NextResponse.json(
        { error: "Invalid social links data" },
        { status: 400 }
      );
    }

    // Validate social links structure
    const isValidSocialLinks = socialLinks.every(
      (link) =>
        typeof link === "object" &&
        typeof link.name === "string" &&
        typeof link.href === "string" &&
        typeof link.icon === "string"
    );

    if (!isValidSocialLinks) {
      return NextResponse.json(
        { error: "Invalid social links format" },
        { status: 400 }
      );
    }

    // Save or update settings
    await prisma.setting.upsert({
      where: { key: "social_links" },
      update: {
        value: { socialLinks },
        updatedAt: new Date(),
      },
      create: {
        key: "social_links",
        value: { socialLinks },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
    });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { error: "Unauthorized or error saving settings" },
      { status: 401 }
    );
  }
}
