export interface NewsletterSubscriptionAdmin {
  id: string;
  email: string;
  status: "active" | "unsubscribed" | "bounced";
  source: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
