import { prisma } from "@/core/database/db";

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface SiteSettings {
  socialLinks: SocialLink[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const socialLinksSettings = await prisma.setting.findUnique({
      where: { key: "social_links" },
    });

    const defaultSocialLinks: SocialLink[] = [
      { name: "Github", href: "#", icon: "Github" },
      { name: "Twitter", href: "#", icon: "Twitter" },
      { name: "Linkedin", href: "#", icon: "Linkedin" },
      { name: "Youtube", href: "#", icon: "Youtube" },
    ];

    const socialLinks = socialLinksSettings 
      ? (socialLinksSettings.value as any).socialLinks || defaultSocialLinks
      : defaultSocialLinks;

    return {
      socialLinks,
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    // Return default settings on error
    return {
      socialLinks: [
        { name: "Github", href: "#", icon: "Github" },
        { name: "Twitter", href: "#", icon: "Twitter" },
        { name: "Linkedin", href: "#", icon: "Linkedin" },
        { name: "Youtube", href: "#", icon: "Youtube" },
      ],
    };
  }
}
