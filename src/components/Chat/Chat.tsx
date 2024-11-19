import React, { useEffect, useState } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CardGiftcard, Gif, EmojiEmotions } from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { db } from '../../firebase';
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, onSnapshot, QueryDocumentSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';

const Chat = () => {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<{ timestamp: any, message: string, user: string }[]>([]);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!channelId) return; // channelIdがない場合は早期リターン

    const collectionRef = collection(db, "channels", String(channelId), "messages");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const results = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          timestamp: data.timestamp,
          message: data.message,
          user: data.user,
        };
      });
      setMessages(results);
    });

    return () => {
      unsubscribe(); // クリーンアップでリスナーを解除
    };
  }, [channelId]); // channelIdが変更された場合に再実行

  return (
    <div>
      {/* メッセージリストを表示するUIなど */}
            {/* メッセージをリスト表示 */}
      {messages.map((msg, index) => (
        <div key={index}>
          <p><strong>{msg.user}</strong>: {msg.message}</p>
          <small>{msg.timestamp && new Date(msg.timestamp.toDate()).toLocaleString()}</small>
        </div>
      ))}

          {/* チャット入力エリア */}
            {/* メッセージ送信用のフォーム */}
            <form onSubmit={setMessages}>
                <input
          type="text"
          placeholder="メッセージを送信"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>

        <div className="chatInputIcons">
          <CardGiftcard />
          <Gif />
          <EmojiEmotions />
        </div>
      </div>
  );
};

export default Chat;
function doc(value: QueryDocumentSnapshot<DocumentData, DocumentData>, index: number, array: QueryDocumentSnapshot<DocumentData, DocumentData>[]): void {
  throw new Error('Function not implemented.');
}

