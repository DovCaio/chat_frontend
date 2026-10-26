"use client";
export const ChatContainer = () => {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = e.currentTarget;
    const message = formData.text_messages.value;
    console.log(message);
  };

  return (
    <div>
      <div>
        <h1>chat</h1>
      </div>

      <div>{/** messages */}</div>

      <form onSubmit={handleSubmit}>
        <input type="text" name="text_messages" id="tx_msg" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
