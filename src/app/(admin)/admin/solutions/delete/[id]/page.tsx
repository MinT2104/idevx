import { getServerSessionUser } from "@/features/auth/auth-server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function DeleteSolutionPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") redirect("/admin/login");

  try {
    const hdrs = headers();
    const origin =
      hdrs.get("origin") ||
      (process.env.NEXT_PUBLIC_BASE_URL as string) ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
    const apiUrl = `${origin}/api/solutions-admin/${params.id}`;

    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: headers().get("cookie") || "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      // Optional: could render an error state, but we fallback to list for now
      console.error("Failed to delete solution", await res.text());
    }
  } catch (e) {
    console.error("Error deleting solution", e);
  }

  // Ensure list page shows fresh data
  revalidatePath("/admin/solutions");
  redirect("/admin/solutions");
}
