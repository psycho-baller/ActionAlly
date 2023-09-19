// Chat.tsx

import {type FC, FormEvent, ChangeEvent } from "react";
import Messages from "./Messages";
import { Message } from "ai/react";

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
}

const Chat: FC<Chat> = ({
  input,
  handleInputChange,
  handleMessageSubmit,
  messages,
}) => {
  return (
    <div
      id="chat"
      className="flex flex-col w-full mx-5 lg:mx-0"
    >
      <Messages messages={messages} />
      <>
        <form
          onSubmit={handleMessageSubmit}
          className="relative mt-5 mb-5 bg-gray-700 rounded-lg"
        >
          <input
            type="text"
            placeholder="Talk to your journal..."
            className="w-full px-3 py-2 pl-3 pr-10 leading-tight text-gray-200 transition-shadow duration-200 bg-gray-600 border border-gray-600 rounded appearance-none input-glow focus:outline-none focus:shadow-outline"
            value={input}
            onChange={handleInputChange}
          />
        </form>
      </>
    </div>
  );
};

export default Chat;
