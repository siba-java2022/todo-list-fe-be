"use client";

import { useState } from "react";
import type { Todo } from "@/types/todo";
import TodoForm from "./TodoForm";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (
    id: string,
    title: string,
    description: string
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await onToggle(todo.id, !todo.completed);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this todo?")) return;
    setLoading(true);
    try {
      await onDelete(todo.id);
    } finally {
      setLoading(false);
    }
  }

  if (editing) {
    return (
      <li className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
        <TodoForm
          submitLabel="Save changes"
          initialTitle={todo.title}
          initialDescription={todo.description || ""}
          onCancel={() => setEditing(false)}
          onSubmit={async (title, description) => {
            await onUpdate(todo.id, title, description);
            setEditing(false);
          }}
        />
      </li>
    );
  }

  return (
    <li
      className={`rounded-xl border p-4 transition ${
        todo.completed
          ? "border-zinc-200 bg-zinc-50 opacity-75 dark:border-zinc-800 dark:bg-zinc-900/50"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
      } ${loading ? "pointer-events-none opacity-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mt-1 h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
        />
        <div className="min-w-0 flex-1">
          <h3
            className={`font-medium ${
              todo.completed ? "line-through text-zinc-500" : ""
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {todo.description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setEditing(true)}
            className="rounded-md px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
