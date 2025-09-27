import { Button } from "@/ui/components/button";
import Link from "next/link";
import { prisma } from "@/core/database/db";

type SalaryRange = { min: number; max: number; currency: string };
type Job = {
  id: string | number;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  level: string;
  salaryRange: SalaryRange;
  postedAt: string;
  applicationDeadline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
  howToApply: string;
  status: "open" | "closed";
};

function formatSalary(range: SalaryRange) {
  const fmt = new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 });
  return `${fmt.format(range.min)}–${fmt.format(range.max)} ${range.currency}`;
}

function getApplyHref(job: Job): { href: string; external: boolean } {
  const params = new URLSearchParams({
    position: job.title,
    slug: job.slug,
    type: job.type,
    level: job.level,
  });
  return { href: `/apply-career?${params.toString()}`, external: false };
}

export default async function CareersPage() {
  const jobOpenings = await prisma.jobPosting.findMany({
    where: { status: "open" },
    orderBy: { postedAt: "desc" },
    take: 50,
  });

  const benefits = [
    {
      title: "Competitive Compensation",
      description: "Top-tier salary and equity packages",
    },
    {
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours",
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision coverage",
    },
    {
      title: "Learning & Development",
      description: "Annual learning budget and conference attendance",
    },
    {
      title: "Unlimited PTO",
      description: "Take time off when you need it",
    },
    {
      title: "Latest Technology",
      description: "Work with cutting-edge AI models and infrastructure",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black leading-tight mb-6">
            Build the Future of AI
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8">
            Join our team of innovators, engineers, and visionaries working to
            democratize AI and make advanced technology accessible to businesses
            worldwide.
          </p>
          <Link href="#open-positions">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              View Open Positions
            </Button>
          </Link>
        </div>

        {/* Company Culture */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Culture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation First</h3>
              <p className="text-gray-700">
                We encourage experimentation and bold ideas. Every team member
                has the freedom to propose and pursue innovative solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Collaborative Spirit
              </h3>
              <p className="text-gray-700">
                We believe in the power of teamwork. Cross-functional
                collaboration is at the heart of everything we build.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Mindset</h3>
              <p className="text-gray-700">
                Continuous learning and personal development are core to our
                culture. We invest in your growth and career advancement.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-black text-white p-12 rounded-lg mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Benefits & Perks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div id="open-positions" className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Open Positions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-black">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                      {job.level}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        job.type.toLowerCase().includes("full")
                          ? "bg-green-100 text-green-700"
                          : job.type.toLowerCase().includes("part")
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                      title={job.type}
                    >
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <span className="mr-4">{job.department}</span>
                  <span>{job.location}</span>
                </div>
                {"salaryRange" in job && (
                  <div className="text-xs text-gray-500 mb-3">
                    <span className="mr-3">
                      Salary: {formatSalary((job as any).salaryRange)}
                    </span>
                    {"postedAt" in job && (
                      <span className="mr-3">
                        Posted:{" "}
                        {new Date((job as any).postedAt).toLocaleDateString()}
                      </span>
                    )}
                    {"applicationDeadline" in job && (
                      <span>
                        Deadline:{" "}
                        {new Date(
                          (job as any).applicationDeadline
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {job.description}
                </p>
                <div className="flex gap-2">
                  <Link href={`/careers/${job.slug}`}>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      View Details
                    </Button>
                  </Link>
                  {(() => {
                    const { href, external } = getApplyHref(job as any);
                    return (
                      <Link href={href}>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          Apply Now
                        </Button>
                      </Link>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Team Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 mb-6 italic">
                &ldquo;Working at DevX has been incredible. The team is
                passionate about AI, and I get to work on cutting-edge
                technology that&apos;s shaping the future. The culture is
                collaborative and supportive.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  S
                </div>
                <div>
                  <div className="font-semibold text-black">Sarah Chen</div>
                  <div className="text-gray-600 text-sm">
                    Senior AI Engineer
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 mb-6 italic">
                &ldquo;The growth opportunities here are amazing. I&apos;ve
                learned so much about AI infrastructure and have been given the
                autonomy to lead important projects. It&apos;s a place where
                your ideas matter.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  M
                </div>
                <div>
                  <div className="font-semibold text-black">
                    Michael Rodriguez
                  </div>
                  <div className="text-gray-600 text-sm">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don&apos;t See Your Role?
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join our team.
            Send us your resume and let us know how you&apos;d like to
            contribute to our mission.
          </p>
          <Link href="/talk-to-us">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
