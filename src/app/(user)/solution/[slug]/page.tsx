import SolutionView from "@/features/solutions/view/SolutionView";

interface PageProps {
  params: { slug: string };
}

// Dynamic solution page: maps /solution/[slug] -> solutionKey "[slug]"
export default function Page({ params }: PageProps) {
  return <SolutionView solutionKey={params.slug} />;
}
