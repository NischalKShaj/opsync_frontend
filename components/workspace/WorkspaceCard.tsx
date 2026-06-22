"use client";

import { Workspace } from "@/types";
import { Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkspaceCardProps {
  workspace: Workspace;
  onClick: () => void;
}

export function WorkspaceCard({ workspace, onClick }: WorkspaceCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {workspace.name}
            </h3>
            <p className="text-sm text-gray-500">
              {workspace.description || "No description"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>Members</span>
        </div>
        <Button variant="ghost" size="sm">
          Open
        </Button>
      </div>
    </div>
  );
}
