"use client";

import { useCallback, useEffect, useState } from "react";
import { todoApi } from "@/lib/api";
import type { Todo } from "@/types/todo";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    setError(null);
    try {
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load todos. Is the API running?"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  async function handleCreate(title: string, description: string) {
    const created = await todoApi.create({ title, description });
    setTodos((prev) => [created, ...prev]);
  }

  async function handleToggle(id: string, completed: boolean) {
    const updated = await todoApi.update(id, { completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleUpdate(id: string, title: string, description: string) {
    const updated = await todoApi.update(id, { title, description });
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await todoApi.delete(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Create, edit, complete, and delete your tasks.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold">Add a new todo</h2>
        <TodoForm onSubmit={handleCreate} />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your todos</h2>
          {todos.length > 0 && (
            <span className="text-sm text-zinc-500">
              {completedCount} of {todos.length} completed
            </span>
          )}
        </div>

        {loading && (
          <p className="text-center text-zinc-500">Loading todos...</p>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && todos.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
            No todos yet. Add one above!
          </p>
        )}

        {!loading && !error && todos.length > 0 && (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
