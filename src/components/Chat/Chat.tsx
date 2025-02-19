import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import ChatMessage from "./ChatMessage";

type Message = {
  id: string;
  channelId: string;
  content: string;
  user: {
    displayName: string;
    photoURL: string;
  };
  timestamp: string;
};

const Chat = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const currentChannelId = useAppSelector((state) => state.channel.currentChannelId);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!currentChannelId) return;
    fetch(`http://localhost:3001/api/messages/${currentChannelId}`)
      .then((res) => res.json())
      .then((data: Message[]) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [currentChannelId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentChannelId) return;

    try {
      const response = await fetch("http://localhost:3001/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channelId: currentChannelId,
          content: inputText,
          user: {
            displayName: user?.displayName,
            photoURL: user?.photoURL
          }
        }),
      });
      const newMessage: Message = await response.json();
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat">
      <div className="chatMessages">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            user={msg.user.displayName}
            message={msg.content}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
      <form onSubmit={sendMessage} className="chatInput">
        <input
          type="text"
          placeholder="メッセージを送信"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          className="chatInputButton"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default Chat;
