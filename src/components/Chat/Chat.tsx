import { addDoc, collection, CollectionReference, DocumentData, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { db } from "../../firebase";
import ChatMessage from "./ChatMessage";

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<{ timestamp: any, message: string, user: string }[]>([]);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const sendMessage = async () => {
    if (!inputText.trim()) return; // Prevent sending empty messages

    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user,
    });

    setInputText(""); // Clear input after sending
  };

  useEffect(() => {
    if (!channelId) return;

    const collectionRef = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      let result: { timestamp: any, message: string, user: string }[] = [];
      snapshot.docs.forEach((doc) => {
        result.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setMessages(result);
    });

    return () => {
      unsubscribe(); // Proper cleanup
    };
  }, [channelId]);

  return (
    <div>
      {/* Message List */}
      <div>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            user={msg.user}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission
          sendMessage(); // Call sendMessage without passing 'e'
        }}
      >
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
