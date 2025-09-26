export interface FeedbackAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  skype: string;
  website: string;
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
