import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { addDoc, collection, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './Chat.scss';

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const user = useAppSelector((state) => state.user.user);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const channelName = useAppSelector((state) => state.channel.channelName);

  useEffect(() => {
    if (channelId) {
      const q = query(
        collection(db, 'channels', channelId, 'messages'),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        setMessages(newMessages);
      });

      return () => unsubscribe();
    }
  }, [channelId]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputMessage.trim() === '' || !channelId) return;

    try {
      const messageRef = collection(db, 'channels', channelId, 'messages');
      await addDoc(messageRef, {
        message: inputMessage,
        timestamp: serverTimestamp(),
        user: {
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        }
      });
      setInputMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat">
      <div className="chatHeader">
        <h3>#{channelName || 'チャンネルを選択してください'}</h3>
      </div>

      <div className="chatMessages">
        {messages.map(({ id, data }) => (
          <div key={id} className="message">
            <img src={data.user.photoURL || "/default-avatar.png"} alt="" />
            <div className="messageInfo">
              <h4>
                {data.user.displayName}
                <span className="timestamp">
                  {data.timestamp?.toDate().toLocaleString()}
                </span>
              </h4>
              <p>{data.message}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="chatInput">
        <input
          type="text"
          disabled={!channelId}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={channelId ? `#${channelName}へメッセージを送信` : 'チャンネルを選択してください'}
        />
        <button type="submit" disabled={!channelId || !inputMessage.trim()}>
          送信
        </button>
      </form>
    </div>
  );
};

export default Chat;
