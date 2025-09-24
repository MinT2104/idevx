export interface Section {
  id: string;
  type:
    | "hero"
    | "trusted-by"
    | "testimonial"
    | "grid"
    | "component"
    | "product-feature";
  className?: string;
  component?: string;
  props?: Record<string, any>;

  // Common properties
  title?: string;
  subtitle?: string;
  description?: string;
  tag?: string;

  // Layout properties
  backgroundColor?: "white" | "gray" | "slate";
  gridCols?: "2" | "3"; // Limited to 2 or 3 columns
  cardSize?: "small" | "medium" | "large";

  // Content arrays
  items?: Array<{
    title: string;
    description?: string;
    icon?: boolean | string; // boolean for default, string for custom path
    points?: string[]; // for product-feature lists
    button?: {
      text: string;
      link?: string;
      variant?: string;
      size?: string;
    };
  }>;

  // Product feature specific (optional)
  columns?: "1" | "2"; // for product-feature layout

  // Special content
  quote?: string;
  author?: {
    name: string;
    title: string;
    nameClassName?: string;
    titleClassName?: string;
    avatar?: {
      placeholder?: boolean;
      className?: string;
      src?: string;
    };
  };
  logos?: Array<{
    src: string;
    alt: string;
    className: string;
  }>;

  // Product feature image (optional)
  image?: string;
  imagePosition?: "left" | "right"; // for product-feature layout
}

export interface SolutionData {
  sections: Section[];
}

export interface SolutionsData {
  [key: string]: SolutionData;
}

export interface SectionRendererProps {
  section: Section;
}

export interface SolutionViewProps {
  solutionKey: string;
}
