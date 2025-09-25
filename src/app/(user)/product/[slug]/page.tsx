import SolutionView from "@/features/solutions/view/SolutionView";

interface PageProps {
  params: { slug: string };
}

// Dynamic product page: maps /product/[slug] -> solutionKey "product-[slug]"
export default function Page({ params }: PageProps) {
  return <SolutionView solutionKey={params.slug} />;
}
