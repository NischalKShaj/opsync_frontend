"use client";

import { Chat } from "@/types";
import { Users, MessageSquare } from "lucide-react";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
}

export function ChatList({
  chats,
  selectedChatId,
  onChatSelect,
}: ChatListProps) {
  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat.id)}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            selectedChatId === chat.id
              ? "bg-blue-50 border-2 border-blue-200"
              : "bg-white border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                chat.type === "group" ? "bg-purple-100" : "bg-green-100"
              }`}
            >
              {chat.type === "group" ? (
                <Users className="w-5 h-5 text-purple-600" />
              ) : (
                <MessageSquare className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{chat.name}</h4>
              <p className="text-sm text-gray-500">
                {chat.type === "group" ? "Group chat" : "Direct message"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
