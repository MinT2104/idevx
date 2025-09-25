import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SolutionForm from "@/features/solutions/components/SolutionForm";

export default async function CreateSolutionPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") redirect("/admin/login");

  async function createSolution(formData: any) {
    "use server";
    const hdrs = headers();
    const origin =
      hdrs.get("origin") ||
      (process.env.NEXT_PUBLIC_BASE_URL as string) ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
    const apiUrl = `${origin}/api/solutions-admin`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: headers().get("cookie") || "",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });
    if (!res.ok) {
      let msg = "Failed to create solution";
      try {
        const data = await res.json();
        if (data?.error) msg = data.error;
      } catch {
        msg = "Failed to create solution";
      }
      throw new Error(msg);
    }
    redirect("/admin/solutions");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Create Solution/Product
        </h1>
        <p className="text-gray-600">Add key, kind and sections JSON blocks.</p>
      </div>
      <SolutionForm onSubmit={createSolution} />
    </div>
  );
}
