export type LocaleCode = "en";

export interface ImageAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
  blurDataURL?: string;
  caption?: string;
  focalPoint?: { x: number; y: number };
}

export interface Author {
  id: string;
  name: string;
  avatar?: ImageAsset;
  roleOrTitle?: string;
  bio?: string;
  url?: string;
  socials?: Partial<{
    twitter: string;
    linkedin: string;
    github: string;
    website: string;
  }>;
}

export interface Taxonomy {
  categories: string[];
  tags?: string[];
}

export type PublishStatus = "draft" | "scheduled" | "published" | "archived";

export interface ReadingMeta {
  readingTimeMinutes?: number;
  wordCount?: number;
}

export interface CanonicalLinking {
  canonicalUrl?: string;
  hreflang?: Array<{ lang: LocaleCode; url: string }>;
}

export interface OpenGraphMeta {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: ImageAsset;
  ogType?: "article" | "website";
}

export interface TwitterMeta {
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: ImageAsset;
  twitterSite?: string;
  twitterCreator?: string;
}

export interface RobotsMeta {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  nocache?: boolean;
}

export interface StructuredData {
  jsonLd?: Record<string, unknown>[];
}

export interface SitemapMeta {
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastmod?: string;
  excludeFromSitemap?: boolean;
}

export interface SeoMeta
  extends CanonicalLinking,
    OpenGraphMeta,
    TwitterMeta,
    RobotsMeta,
    StructuredData {
  metaTitle?: string;
  metaDescription?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export interface SeriesInfo {
  seriesSlug?: string;
  order?: number;
  totalInSeries?: number;
  previousSlug?: string;
  nextSlug?: string;
}

export interface RelatedContent {
  relatedSlugs?: string[];
  relatedManual?: string[];
}

export interface ContentBlock {
  type: "markdown";
  body: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  locale?: LocaleCode;
  version?: number;

  title: string;
  subtitle?: string;
  excerpt?: string;
  heroImage?: ImageAsset;
  cardImage?: ImageAsset;
  gallery?: ImageAsset[];

  taxonomy: Taxonomy;
  authors: Author[];
  authorCount?: number;

  content: ContentBlock;
  richMeta?: Record<string, unknown>;

  status: PublishStatus;
  publishedAt?: string;
  updatedAt?: string;
  scheduledFor?: string;
  reading?: ReadingMeta;

  featured?: boolean;
  pinned?: boolean;
  experimental?: boolean;

  series?: SeriesInfo;
  relations?: RelatedContent;

  seo?: SeoMeta;

  createdBy?: string;
  updatedBy?: string;
  source?: "markdown";
}
