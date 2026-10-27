"use client";

import { useRouter } from "next/navigation";

export const UserNameSelection = () => {
  const route = useRouter();
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = e.currentTarget;

    const user = formData.user.value;

    console.log(user);

    const requsitionSucessful = true;

    if (requsitionSucessful) {
      cookieStore.set("user", user);
      route.push("/chat");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Give your chat name</label>
          <input type="text" id="user" className="border" />
        </div>

        <button type="submit">Choice</button>
      </form>
    </div>
  );
};
