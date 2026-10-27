"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

type ChatContextType = {
  socket: WebSocket | null;
  connect: (username: string) => void;
  disconnect: () => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat deve ser usado dentro de ChatProvider");
  }

  return context;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const disconnect = useCallback(() => {
    setSocket((current) => {
      current?.close();
      return null;
    });
  }, []);

  const connect = useCallback((username: string) => {
    setSocket((current) => {
      current?.close();

      return new WebSocket(
        `ws://localhost:8080/ws?username=${encodeURIComponent(username)}`,
      );
    });
  }, []);

  useEffect(() => {
    return () => {
      socket?.close();
    };
  }, [socket]);

  return (
    <ChatContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </ChatContext.Provider>
  );
}
