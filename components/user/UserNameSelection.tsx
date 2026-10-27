"use client";

import { useChat } from "@/hook/ChatProvider";
import { useRouter } from "next/navigation";

export const UserNameSelection = () => {
  const route = useRouter();
  const { connect } = useChat();
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = e.currentTarget;

    const user = formData.username.value;

    const ws = new WebSocket(
      `ws://localhost:8080/ws?user=${encodeURIComponent(user)}`,
    );

    try {
      connect(user);
      cookieStore.set("user", user);
      route.push("/chat");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 rounded-xl shadow-md w-1/2 mx-auto p-6">
      <div className="p-5">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Choice your username
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-2/3">
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Give your chat name:
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end m-2 w-full">
          <button
            className=" bg-blue-500 p-2 rounded text-white font-bold text-sm w-full "
            type="submit"
          >
            Choice
          </button>
        </div>
      </form>
    </div>
  );
};
