"use client";

import { useChat } from "@/hook/ChatProvider";
import { useEffect, useState } from "react";

type MessagesSended = {
  to: string;
  content: string;
};

type MessagesRecived = {
  from: string;
  content: string;
};

export const ChatContainer = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const { socket, connect, disconnect } = useChat();
  const [otherSide, setOtherSide] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = e.currentTarget;
    const message = formData.text_messages.value;

    const sended: MessagesSended = {
      to: otherSide,
      content: message,
    };

    try {
      socket?.send(JSON.stringify(sended));
      setMessages((prev) => [...prev, message]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const received: MessagesRecived = JSON.parse(event.data);
      setMessages((prev) => [...prev, received.content]);
    };

    return () => {
      socket.onmessage = null;
    };
  }, [socket]);

  const choicePerson = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = e.currentTarget;

    const person = formData.other_side.value;

    setOtherSide(person);
  };

  return (
    <div className="m-10 flex justify-center">
      <p>{otherSide}</p>
      <div className="mx-4 my-10">
        <form onSubmit={choicePerson}>
          <div className="flex flex-col">
            <label htmlFor="other_side">Com que você quer conversar</label>
            <input type="text" className="border rounded-2xl" id="other_side" />
          </div>

          <button className="bg-blue-400 p-2 rounded ml-2" type="submit">
            Choice
          </button>
        </form>
      </div>
      <div>
        <div className="flex flex-col items-center">
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
    </div>
  );
};
