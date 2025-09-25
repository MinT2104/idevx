export interface BlogFormData {
  title: string;
  subtitle?: string;
  excerpt?: string;
  slug: string;
  locale: string;

  // Images
  heroImage?: {
    url: string;
    alt: string;
  };
  cardImage?: {
    url: string;
    alt: string;
  };

  // Content
  content: {
    type: "markdown";
    body: string;
  };

  // Taxonomy
  taxonomy: {
    categories: string[];
    tags?: string[];
  };

  // Authors
  authors: Array<{
    id: string;
    name: string;
    roleOrTitle?: string;
  }>;

  // Status & Publishing
  status: "draft" | "published";
  publishedAt?: string;
  featured: boolean;

  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface BlogFormResponse {
  success: boolean;
  data?: {
    id: string;
    slug: string;
  };
  message?: string;
  error?: string;
}

export interface Author {
  id: string;
  name: string;
  roleOrTitle?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}
