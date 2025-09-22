import { z } from "zod";

// Schema cho model cơ bản
export const modelSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Model name cannot be empty"),
  brand: z.string().min(1, "Brand cannot be empty"),
  logo: z.string().url("Invalid logo URL").nullable().optional(),
  type: z.string().min(1, "Type cannot be empty"),
  link: z.string().min(1, "Link cannot be empty"),
  description: z.string().nullable().optional(),
  extractedAt: z.string().nullable().optional(),
  crawledAt: z.string().nullable().optional(),
});

// Schema cho model details
export const modelDetailsSchema = z.object({
  developedBy: z.string().min(1, "Developed by cannot be empty"),
  modelFamily: z.string().min(1, "Model family cannot be empty"),
  useCase: z.string().min(1, "Use case cannot be empty"),
  variant: z.string().optional(),
  size: z.string().optional(),
  license: z.string().min(1, "License cannot be empty"),
});

// Schema cho pricing
export const pricingSchema = z.object({
  variant: z.string().min(1, "Variant cannot be empty"),
  bestFor: z.string().min(1, "Best for cannot be empty"),
  input: z.string().min(1, "Input pricing cannot be empty"),
  output: z.string().min(1, "Output pricing cannot be empty"),
  provider: z.string().min(1, "Provider cannot be empty"),
});

// Schema cho API parameters
export const apiParameterSchema = z.object({
  parameter: z.string().min(1, "Parameter name cannot be empty"),
  value: z.string().min(1, "Parameter value cannot be empty"),
});

export const apiInfoSchema = z.object({
  parameters: z.array(apiParameterSchema).optional(),
});

// Schema cho why model matters
export const whyModelMattersPointSchema = z.object({
  id: z.string().min(1, "Point ID cannot be empty"),
  title: z.string().min(1, "Point title cannot be empty"),
  description: z.string().min(1, "Point description cannot be empty"),
});

export const whyModelMattersSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  points: z
    .array(whyModelMattersPointSchema)
    .min(1, "At least one point is required"),
  ctaButton: z.object({
    text: z.string().min(1, "CTA button text cannot be empty"),
    link: z.string().url("Invalid CTA button link"),
  }),
});

// Schema cho detailed info
export const detailedInfoSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  parameters: z.array(z.string()).optional(),
  capabilities: z
    .array(z.string())
    .min(1, "At least one capability is required"),
  pricing: z
    .array(pricingSchema)
    .min(1, "At least one pricing option is required"),
  tags: z.array(z.string()).optional(),
  modelDetails: modelDetailsSchema,
  codeExample: z
    .array(z.string())
    .min(1, "At least one code example is required"),
  apiInfo: apiInfoSchema.optional(),
  performance: z.record(z.any()).optional(),
  hardware: z.array(z.string()).optional(),
  benchmarks: z.array(z.string()).optional(),
  useCases: z.array(z.string()).optional(),
  limitations: z.array(z.string()).optional(),
});

// Schema cho sidebar data
export const sidebarDetailSchema = z.object({
  id: z.string().min(1, "Detail ID cannot be empty"),
  label: z.string().min(1, "Label cannot be empty"),
  value: z.string().min(1, "Value cannot be empty"),
  hasLink: z.boolean().optional(),
});

export const sidebarDataSchema = z.object({
  title: z.string().min(1, "Sidebar title cannot be empty"),
  details: z
    .array(sidebarDetailSchema)
    .min(1, "At least one detail is required"),
  button: z.object({
    text: z.string().min(1, "Button text cannot be empty"),
    link: z.string().url("Invalid button link"),
  }),
});

// Schema cho hero data
export const heroSchema = z.object({
  title: z.string().min(1, "Hero title cannot be empty"),
  description: z.string().min(1, "Hero description cannot be empty"),
  ctaButton: z.string().min(1, "CTA button text cannot be empty"),
  ctaButton2: z.string().min(1, "CTA button 2 text cannot be empty"),
  subtitle: z.string().min(1, "Subtitle cannot be empty"),
  link1: z.string().url("Invalid link 1"),
  link2: z.string().url("Invalid link 2"),
});

// Schema cho page info
export const pageInfoSchema = z.object({
  lastUpdated: z.string().min(1, "Last updated cannot be empty"),
  title: z.string().min(1, "Page title cannot be empty"),
  description: z.string().min(1, "Page description cannot be empty"),
});

// Schema cho model list item
export const modelListItemSchema = z.object({
  id: z.string().min(1, "Model list item ID cannot be empty"),
  name: z.string().min(1, "Model list item name cannot be empty"),
  isActive: z.boolean(),
});

// Schema cho model section
export const modelSectionItemSchema = z.object({
  logo: z.string().min(1, "Logo cannot be empty"),
  name: z.string().min(1, "Name cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const modelSectionSchema = z.object({
  title: z.string().min(1, "Section title cannot be empty"),
  models: z
    .array(modelSectionItemSchema)
    .min(1, "At least one model is required"),
  showSeeAll: z.boolean().optional(),
});

// Schema chính cho create model
export const createModelSchema = z.object({
  model: modelSchema,
  hero: heroSchema,
  pageInfo: pageInfoSchema,
  detailedInfo: detailedInfoSchema,
  whyModelMattersData: whyModelMattersSchema,
  sidebarData: sidebarDataSchema,
  modelListData: z
    .array(modelListItemSchema)
    .min(1, "At least one model list item is required"),
  modelSections: z
    .array(modelSectionSchema)
    .min(1, "At least one model section is required"),
});

// Schema cho update model (tất cả fields optional)
export const updateModelSchema = createModelSchema.partial();

// Schema cho model ID parameter
export const modelIdParamSchema = z.object({
  id: z.string().min(1, "Invalid model ID"),
});

// Schema cho query parameters
export const modelQuerySchema = z.object({
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  search: z.string().optional(),
  brand: z.string().optional(),
  type: z.string().optional(),
});

// Export types
export type Model = z.infer<typeof modelSchema>;
export type ModelDetails = z.infer<typeof modelDetailsSchema>;
export type Pricing = z.infer<typeof pricingSchema>;
export type ApiParameter = z.infer<typeof apiParameterSchema>;
export type ApiInfo = z.infer<typeof apiInfoSchema>;
export type WhyModelMattersPoint = z.infer<typeof whyModelMattersPointSchema>;
export type WhyModelMatters = z.infer<typeof whyModelMattersSchema>;
export type DetailedInfo = z.infer<typeof detailedInfoSchema>;
export type SidebarDetail = z.infer<typeof sidebarDetailSchema>;
export type SidebarData = z.infer<typeof sidebarDataSchema>;
export type Hero = z.infer<typeof heroSchema>;
export type PageInfo = z.infer<typeof pageInfoSchema>;
export type ModelListItem = z.infer<typeof modelListItemSchema>;
export type ModelSectionItem = z.infer<typeof modelSectionItemSchema>;
export type ModelSection = z.infer<typeof modelSectionSchema>;
export type CreateModelInput = z.infer<typeof createModelSchema>;
export type UpdateModelInput = z.infer<typeof updateModelSchema>;
export type ModelIdParam = z.infer<typeof modelIdParamSchema>;
export type ModelQuery = z.infer<typeof modelQuerySchema>;
