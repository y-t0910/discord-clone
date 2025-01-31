import React from 'react';
import { useModal } from '../../app/use-modal-store';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './create-channel-modal.scss';
import { useAppSelector } from '../../app/hooks';

export const CreateChannelModal = () => {
  const { isOpen, type, onClose } = useModal();
  const [channelName, setChannelName] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const user = useAppSelector((state) => state.user.user);

  const isModalOpen = isOpen && type === "createChannel";
  
  console.log("Modal state:", { isOpen, type, isModalOpen }); // デバッグ用

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with name:", channelName); // デバッグ用
    
    if (!channelName.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const docRef = await addDoc(collection(db, "channels"), {
        channelName: channelName,
        createdAt: serverTimestamp(),
        createdBy: {
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL
        }
      });
      console.log("Channel created with ID:", docRef.id); // デバッグ用

      setChannelName('');
      onClose();
    } catch (error) {
      console.error("Error adding channel:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <h2>新しいチャンネルを作成</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="チャンネル名"
            className="channel-input"
            required
            autoFocus
          />
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              キャンセル
            </button>
            <button 
              type="submit" 
              className="create-button" 
              disabled={isSubmitting || !channelName.trim()}
            >
              {isSubmitting ? '作成中...' : '作成'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
