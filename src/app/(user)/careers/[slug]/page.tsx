import { Button } from "@/ui/components/button";
import Link from "next/link";
import { prisma } from "@/core/database/db";
import { notFound } from "next/navigation";

type SalaryRange = { min: number; max: number; currency: string };

function formatSalary(range: SalaryRange) {
  const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
  return `${fmt.format(range.min)}–${fmt.format(range.max)} ${range.currency}`;
}

function getApplyHref(job: any): string {
  const params = new URLSearchParams({
    position: job.title,
    slug: job.slug,
    type: job.type,
    level: job.level,
  });
  return `/apply-career?${params.toString()}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface CareerDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const job = await prisma.jobPosting.findUnique({
    where: {
      slug: params.slug,
      status: "open",
    },
  });

  if (!job) {
    notFound();
  }

  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : [];
  const requirements = Array.isArray(job.requirements) ? job.requirements : [];
  const niceToHave = Array.isArray(job.niceToHave) ? job.niceToHave : [];
  const benefits = Array.isArray(job.benefits) ? job.benefits : [];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/careers">
            <Button variant="outline" className="border-gray-300 text-gray-700">
              ← Back to Careers
            </Button>
          </Link>
        </div>

        {/* Job Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              {job.level}
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                job.type.toLowerCase().includes("full")
                  ? "bg-green-100 text-green-700"
                  : job.type.toLowerCase().includes("part")
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {job.type}
            </span>
            <span className="text-xs text-gray-500">
              Posted {formatDate(job.postedAt.toISOString())}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <span className="flex items-center">
              <span className="mr-2">📍</span>
              {job.location}
            </span>
            <span className="flex items-center">
              <span className="mr-2">🏢</span>
              {job.department}
            </span>
            {"salaryRange" in job && (
              <span className="flex items-center">
                <span className="mr-2">💰</span>
                {formatSalary((job as any).salaryRange)}
              </span>
            )}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-800 font-medium">
                  Application Deadline: {formatDate(job.applicationDeadline.toISOString())}
                </p>
                <p className="text-orange-600 text-sm">
                  Don&apos;t miss this opportunity to join our team!
                </p>
              </div>
              <Link href={getApplyHref(job)}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">
            About This Role
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>
        </div>

        {/* Responsibilities */}
        {responsibilities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              What You&apos;ll Do
            </h2>
            <ul className="space-y-3">
              {responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{String(responsibility)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {requirements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              What We&apos;re Looking For
            </h2>
            <ul className="space-y-3">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">•</span>
                  <span className="text-gray-700">{String(requirement)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Nice to Have */}
        {niceToHave.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">Nice to Have</h2>
            <ul className="space-y-3">
              {niceToHave.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-400 mr-3 mt-1">•</span>
                  <span className="text-gray-600">{String(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              What We Offer
            </h2>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">{String(benefit)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* How to Apply */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">How to Apply</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              {job.howToApply ||
                "Ready to join our team? Click the apply button below to get started!"}
            </p>
            <Link href={getApplyHref(job)}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Apply for this Position
              </Button>
            </Link>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-black text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">About DevX</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            We&apos;re building the future of AI, making advanced technology
            accessible to businesses worldwide. Join our team of innovators,
            engineers, and visionaries working to democratize AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🚀 Innovation First</h3>
              <p className="text-gray-300 text-sm">
                We encourage experimentation and bold ideas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🤝 Collaborative Spirit</h3>
              <p className="text-gray-300 text-sm">
                Cross-functional collaboration is at our heart.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📈 Growth Mindset</h3>
              <p className="text-gray-300 text-sm">
                We invest in your growth and career advancement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
