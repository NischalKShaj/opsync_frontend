"use client";

import { Task } from "@/types";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-orange-100 text-orange-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {task.status === "completed" ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 mt-0.5" />
          )}
          <div className="flex-1">
            <h4 className="text-md font-semibold text-gray-900">
              {task.title}
            </h4>
            <p className="text-sm text-gray-500">
              {task.description || "No description"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
          >
            {task.status.replace("_", " ")}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  );
}
