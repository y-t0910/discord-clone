import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

interface Channels {
  id: string;
  channelName: string;
}

const useCollection = (collectionName: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);

  useEffect(() => {
    const collectionRef = query(collection(db, collectionName));

    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channels[] = [];
      querySnapshot.docs.forEach((doc) => {
        channelsResults.push({
          id: doc.id,
          channelName: doc.data().channelName,
        });
      });
      setDocuments(channelsResults);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return documents;
};

export default useCollection;
