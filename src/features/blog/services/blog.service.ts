import { BlogPost } from "../types/blog";

const BASE = "/api/blog";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function listPosts(): Promise<BlogPost[]> {
  const res = await fetch(BASE);
  return handle<BlogPost[]>(res);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${BASE}/${encodeURIComponent(slug)}`, {
    next: { revalidate: 30 },
  });
  if (res.status === 404) return null;
  return handle<BlogPost>(res);
}

export async function createPost(payload: BlogPost): Promise<BlogPost> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle<BlogPost>(res);
}

export async function updatePost(
  slug: string,
  payload: Partial<BlogPost>
): Promise<BlogPost> {
  const res = await fetch(`${BASE}/${encodeURIComponent(slug)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handle<BlogPost>(res);
}

export async function deletePost(slug: string): Promise<{ ok: true }> {
  const res = await fetch(`${BASE}/${encodeURIComponent(slug)}`, {
    method: "DELETE",
  });
  return handle<{ ok: true }>(res);
}
