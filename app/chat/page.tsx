"use client";

import { useState, useEffect } from "react";
import { Chat, Message } from "@/types";
import { chatApi } from "@/lib/api";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChatList } from "@/components/chat/ChatList";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const DUMMY_CHATS: Chat[] = [
    {
      id: "1",
      name: "John Doe",
      type: "direct",
      workspaceId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Alice",
      type: "direct",
      workspaceId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const DUMMY_MESSAGES: Record<string, Message[]> = {
    "1": [
      {
        id: "1",
        chatId: "1",
        content: "Hello",
        senderId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        chatId: "1",
        content: "Hi there",
        senderId: "2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    "2": [
      {
        id: "3",
        chatId: "2",
        content: "How are you?",
        senderId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
  };

  // const fetchChats = async () => {
  //   try {
  //     const data = await chatApi.get<Chat[]>("/chats");
  //     setChats(data);
  //   } catch {
  //     console.error("Failed to fetch chats");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const fetchChats = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    setChats(DUMMY_CHATS);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadChats = async () => {
      await fetchChats();
    };

    loadChats();
  }, []);

  // const fetchMessages = async (chatId: string) => {
  //   try {
  //     const data = await chatApi.get<Message[]>(`/chats/${chatId}/messages`);
  //     setMessages(data);
  //   } catch {
  //     console.error("Failed to fetch messages");
  //   }
  // };
  const fetchMessages = async (chatId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    setMessages(DUMMY_MESSAGES[chatId] || []);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    fetchMessages(chatId);
  };

  // const handleSendMessage = async (content: string) => {
  //   if (!selectedChatId) return;
  //   try {
  //     await chatApi.post<Message>("/chats/messages", {
  //       chatId: selectedChatId,
  //       content,
  //     });
  //     fetchMessages(selectedChatId);
  //   } catch {
  //     console.error("Failed to send message");
  //   }
  // };

  const handleSendMessage = async (content: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      chatId: selectedChatId,
      content,
      senderId: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AppLayout title="Chat">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00f0ff]"></div>
          </div>
        </AppLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AppLayout title="Chat">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white neon-text">
              Messages
            </h1>
            <Button className="bg-gradient-to-r from-[#00f0ff] to-[#00ff88] text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold text-white mb-4">Chats</h2>
              <ChatList
                chats={chats}
                selectedChatId={selectedChatId}
                onChatSelect={handleChatSelect}
              />
            </div>
            <div className="lg:col-span-2">
              <ChatWindow
                chatId={selectedChatId}
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
