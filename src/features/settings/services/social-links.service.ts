import { prisma } from "@/core/database/db";
import { SocialLink, SocialLinksSettings } from "../types/social-links.types";

export class SocialLinksService {
  private static readonly DEFAULT_SOCIAL_LINKS: SocialLink[] = [
    { name: "Github", href: "" },
    { name: "Twitter", href: "" },
    { name: "Linkedin", href: "" },
    { name: "Youtube", href: "" },
  ];

  /**
   * Get social links settings from database
   */
  static async getSocialLinks(): Promise<SocialLinksSettings> {
    try {
      const settings = await prisma.setting.findUnique({
        where: { key: "social_links" },
      });

      const socialLinks = settings
        ? (settings.value as any)?.socialLinks || this.DEFAULT_SOCIAL_LINKS
        : this.DEFAULT_SOCIAL_LINKS;

      return { socialLinks };
    } catch (error) {
      console.error("Error fetching social links:", error);
      return { socialLinks: this.DEFAULT_SOCIAL_LINKS };
    }
  }

  /**
   * Save social links settings to database
   */
  static async saveSocialLinks(socialLinks: SocialLink[]): Promise<boolean> {
    try {
      // Validate social links structure
      const isValid = this.validateSocialLinks(socialLinks);
      if (!isValid) {
        throw new Error("Invalid social links format");
      }

      await prisma.setting.upsert({
        where: { key: "social_links" },
        update: {
          value: { socialLinks } as any,
          updatedAt: new Date(),
        },
        create: {
          key: "social_links",
          value: { socialLinks } as any,
        },
      });

      return true;
    } catch (error) {
      console.error("Error saving social links:", error);
      throw error;
    }
  }

  /**
   * Validate social links data structure
   */
  private static validateSocialLinks(socialLinks: any[]): boolean {
    if (!Array.isArray(socialLinks)) {
      return false;
    }

    return socialLinks.every(
      (link) =>
        typeof link === "object" &&
        typeof link.name === "string" &&
        typeof link.href === "string" &&
        link.name.trim().length > 0
    );
  }

  /**
   * Get default social links
   */
  static getDefaultSocialLinks(): SocialLink[] {
    return [...this.DEFAULT_SOCIAL_LINKS];
  }
}
