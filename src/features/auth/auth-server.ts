import { getServerSession } from "next-auth/next";

import { authOptions } from "./auth";

export async function getServerSessionUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  return {
    id: (session.user as { id: string; role: string }).id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    role: (session.user as { id: string; role: string }).role,
  };
}

export async function requireServerAuth() {
  const user = await getServerSessionUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireAdminAuth() {
  const user = await getServerSessionUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.role !== "admin") {
    throw new Error("Admin access required");
  }

  return user;
}

export async function isAdmin() {
  const user = await getServerSessionUser();
  return user?.role === "admin";
}
