export interface FeedbackAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  website: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
