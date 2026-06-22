"use client";

import { Team } from "@/types";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamCardProps {
  team: Team;
  onClick: () => void;
}

export function TeamCard({ team, onClick }: TeamCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-900">{team.name}</h4>
            <p className="text-sm text-gray-500">
              {team.description || "No description"}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </div>
    </div>
  );
}
