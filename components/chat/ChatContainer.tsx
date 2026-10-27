"use client";

import { useChat } from "@/hook/ChatProvider";
import { useEffect, useState } from "react";

export const ChatContainer = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const { socket, connect, disconnect } = useChat();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = e.currentTarget;
    const message = formData.text_messages.value;

    try {
      socket?.send(`{
          "to": "serginho",
          "content": "${message}"
        }`);
      setMessages((prev) => [...prev, message]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  return (
    <div className="flex flex-col items-center m-10">
      <div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          chat
        </h1>
        <p>Estado da conexão: {socket?.readyState ?? "Desconectado"}</p>
      </div>

      <div className="my-10">
        {messages.map((msg, index) => {
          return <p key={index}>{msg}</p>;
        })}
      </div>

      <form onSubmit={handleSubmit} className="flex my-10">
        <input
          type="text"
          name="text_messages"
          id="tx_msg"
          className="border rounded-2xl"
        />
        <button type="submit" className="bg-blue-400 p-2 rounded ml-2">
          Send
        </button>
      </form>
    </div>
  );
};
