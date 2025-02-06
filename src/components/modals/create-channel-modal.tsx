import React from 'react';
import { useModal } from '../../app/use-modal-store';
import { useAppDispatch } from '../../app/hooks';
import { addChannel } from '../../features/channelSlice';  
import './create-channel-modal.scss';

export const CreateChannelModal = () => {
  const { isOpen, type, onClose } = useModal();
  const [channelName, setChannelName] = React.useState('');
  const dispatch = useAppDispatch();

  const isModalOpen = isOpen && type === "createChannel";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    dispatch(addChannel({ name: channelName }));
    setChannelName('');
    onClose();
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
              disabled={!channelName.trim()}
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

