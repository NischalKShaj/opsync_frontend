"use client";

import { Project } from "@/types";
import { FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    archived: "bg-gray-100 text-gray-800",
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FolderKanban className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-900">
              {project.name}
            </h4>
            <p className="text-sm text-gray-500">
              {project.description || "No description"}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}
        >
          {project.status}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {project.startDate && (
            <span>
              Start: {new Date(project.startDate).toLocaleDateString()}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  );
}
