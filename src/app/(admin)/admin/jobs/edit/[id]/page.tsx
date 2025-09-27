import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import JobForm from "@/features/admin/components/JobForm";
import { prisma } from "@/core/database/db";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default async function EditJobPage({ params }: Props) {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") redirect("/admin/login");

  const job = await prisma.jobPosting.findUnique({ where: { id: params.id } });
  if (!job) redirect("/admin/jobs");

  const initial = {
    title: job.title,
    slug: job.slug,
    department: job.department,
    location: job.location,
    type: job.type,
    level: job.level,
    salaryRange: job.salaryRange as any,
    postedAt: job.postedAt.toISOString().slice(0, 10),
    applicationDeadline: job.applicationDeadline.toISOString().slice(0, 10),
    description: job.description,
    responsibilities: job.responsibilities as any,
    requirements: job.requirements as any,
    niceToHave: (job.niceToHave as any) || [],
    benefits: (job.benefits as any) || [],
    howToApply: job.howToApply,
    status: job.status as any,
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <JobForm mode="edit" id={params.id} initialData={initial} />
    </div>
  );
}
