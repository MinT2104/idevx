import { getServerSessionUser } from "@/features/auth/auth-server";
import { redirect } from "next/navigation";
import BlogPageClient from "./BlogPageClient";

export default async function BlogPage() {
  const user = await getServerSessionUser();
  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return <BlogPageClient />;
}