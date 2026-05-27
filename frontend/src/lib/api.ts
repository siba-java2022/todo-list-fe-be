import type { CreateTodoInput, Todo, UpdateTodoInput } from "@/types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export const todoApi = {
  getAll: () => request<Todo[]>("/api/todos"),

  getById: (id: string) => request<Todo>(`/api/todos/${id}`),

  create: (data: CreateTodoInput) =>
    request<Todo>("/api/todos", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateTodoInput) =>
    request<Todo>(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<void>(`/api/todos/${id}`, {
      method: "DELETE",
    }),
};
