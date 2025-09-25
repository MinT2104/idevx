import { Hono } from "hono";
import { SocialLinksController } from "@/features/settings/controllers/social-links.controller";
import { requireAdmin } from "@/features/auth/hono-auth";

const socialLinksRoutes = new Hono();

// Public route - Get social links (no auth required)
socialLinksRoutes.get("/", SocialLinksController.getPublicSocialLinks);

// Admin routes - require admin authentication
socialLinksRoutes.get(
  "/admin",
  requireAdmin(),
  SocialLinksController.getAdminSocialLinks
);
socialLinksRoutes.post(
  "/admin",
  requireAdmin(),
  SocialLinksController.saveSocialLinks
);

export default socialLinksRoutes;
