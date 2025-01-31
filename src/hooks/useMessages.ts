import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

type Message = {
  id: string;
  message: string;
  timestamp: Date;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
};

export const useMessages = (channelId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!channelId) return;

    const messagesRef = collection(db, 'channels', channelId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      })) as Message[];
      
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [channelId]);

  return messages;
};
