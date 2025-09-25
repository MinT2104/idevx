export interface ModelAdmin {
  id: string;
  name: string | null;
  slug: string;
  type: string | null;
  description: string | null;
  logo: string | null;
  content?: any;
  detailedInfo?: any;
  createdAt: Date | null;
  updatedAt: Date | null;
  status: string;
}

export interface ModelsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ModelsResponse {
  success: boolean;
  data?: {
    models: ModelAdmin[];
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

export interface ModelResponse {
  success: boolean;
  data?: ModelAdmin;
  message?: string;
  error?: string;
}

export interface StatusUpdateResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface DeleteModelResponse {
  success: boolean;
  message?: string;
  error?: string;
}
