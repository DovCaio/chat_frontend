"use client";

import { useEffect, useState } from "react";

export const ChatContainer = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = e.currentTarget;
    const message = formData.text_messages.value;

    const sucessful = true;

    if (sucessful) {
      setMessages((prev) => [...prev, message]);
    }

    console.log(message);
  };

  return (
    <div className="flex flex-col items-center m-10">
      <div>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          chat
        </h1>
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
