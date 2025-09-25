import { Context } from "hono";
import { SocialLinksService } from "../services/social-links.service";
import { SocialLinksResponse } from "../types/social-links.types";

export class SocialLinksController {
  /**
   * Get social links for public use (no auth required)
   */
  static async getPublicSocialLinks(c: Context): Promise<Response> {
    try {
      const settings = await SocialLinksService.getSocialLinks();

      const response: SocialLinksResponse = {
        success: true,
        data: settings,
        message: "Social links retrieved successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in getPublicSocialLinks:", error);

      const response: SocialLinksResponse = {
        success: false,
        error: "Failed to retrieve social links",
      };

      return c.json(response, 500);
    }
  }

  /**
   * Get social links for admin (requires auth)
   */
  static async getAdminSocialLinks(c: Context): Promise<Response> {
    try {
      const settings = await SocialLinksService.getSocialLinks();

      const response: SocialLinksResponse = {
        success: true,
        data: settings,
        message: "Social links retrieved successfully",
      };

      return c.json(response);
    } catch (error) {
      console.error("Error in getAdminSocialLinks:", error);

      const response: SocialLinksResponse = {
        success: false,
        error: "Failed to retrieve social links",
      };

      return c.json(response, 500);
    }
  }

  /**
   * Save social links (admin only)
   */
  static async saveSocialLinks(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();
      const { socialLinks } = body;

      if (!socialLinks || !Array.isArray(socialLinks)) {
        const response: SocialLinksResponse = {
          success: false,
          error: "Invalid social links data",
        };
        return c.json(response, 400);
      }

      const success = await SocialLinksService.saveSocialLinks(socialLinks);

      if (success) {
        const response: SocialLinksResponse = {
          success: true,
          message: "Social links saved successfully",
        };
        return c.json(response);
      } else {
        const response: SocialLinksResponse = {
          success: false,
          error: "Failed to save social links",
        };
        return c.json(response, 500);
      }
    } catch (error) {
      console.error("Error in saveSocialLinks:", error);

      const response: SocialLinksResponse = {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to save social links",
      };

      return c.json(response, 500);
    }
  }
}
