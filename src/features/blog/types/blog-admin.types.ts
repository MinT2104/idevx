export interface BlogPostAdmin {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  status: string;
  blogType: string; // "automation" | "manual"
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
}

export interface BlogPostsResponse {
  success: boolean;
  data: {
    posts: BlogPostAdmin[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message?: string;
  error?: string;
}

export interface BlogPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  blogType?: "all" | "automation" | "manual";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
