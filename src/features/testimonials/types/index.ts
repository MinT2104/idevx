export type TestimonialType = "statistic" | "quote";

export interface TestimonialStatistic {
  value: string;
  description: string;
}

export interface TestimonialQuote {
  text: string;
  person: string;
  position: string;
  image?: string;
}

export interface TestimonialCompany {
  name: string;
  logo: string;
  imageClass: string;
}

export interface TestimonialClient {
  name: string;
  logo: string;
}

export interface TestimonialItem {
  id: string;
  type: TestimonialType;
  statistic?: TestimonialStatistic | null;
  quote?: TestimonialQuote | null;
  company: TestimonialCompany;
  client?: TestimonialClient | null;
  order?: number | null;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface AdminListResponse<T> {
  success: boolean;
  data: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}
