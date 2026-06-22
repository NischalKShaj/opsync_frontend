"use client";

import { useState } from "react";
import { Task, CreateTaskRequest } from "@/types";
import { workspaceApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onSuccess: (task: Task) => void;
}

export function CreateTaskDialog({
  isOpen,
  onClose,
  projectId,
  onSuccess,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in_progress" | "completed">(
    "todo",
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data: CreateTaskRequest = {
        projectId,
        title,
        description,
        status,
        priority,
        assigneeId: assigneeId || undefined,
        dueDate: dueDate || undefined,
      };
      const task = await workspaceApi.post<Task>("/tasks", data);
      onSuccess(task);
      onClose();
      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setAssigneeId("");
      setDueDate("");
    } catch {
      setError("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium mb-2"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as "todo" | "in_progress" | "completed",
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="assigneeId"
              className="block text-sm font-medium mb-2"
            >
              Assignee ID
            </label>
            <input
              id="assigneeId"
              type="text"
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
