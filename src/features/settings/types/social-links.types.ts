export interface SocialLink {
  name: string;
  href: string;
}

export interface SocialLinksSettings {
  socialLinks: SocialLink[];
}

export interface SocialLinksResponse {
  success: boolean;
  data?: SocialLinksSettings;
  message?: string;
  error?: string;
}
