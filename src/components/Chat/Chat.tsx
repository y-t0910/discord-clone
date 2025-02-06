import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addMessage } from '../../features/channelSlice';
import './Chat.scss';

interface MessageUser {
  displayName: string;
  photoURL: string;
}

interface Message {
  id: string;
  content: string;
  timestamp: number;
  user: MessageUser;
}

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const currentChannelId = useAppSelector((state) => state.channel?.currentChannelId);
  const channels = useAppSelector((state) => state.channel?.channels) || [];
  const currentChannel = channels?.find((ch: { id: any; }) => ch.id === currentChannelId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentChannelId) return;

    dispatch(addMessage({
      channelId: currentChannelId,
      content: inputText,
      user: {
        displayName: user?.displayName || 'Guest',
        photoURL: user?.photoURL || '/default-avatar.png'
      }
    }));

    setInputText('');
  };

  return (
    <div className="chat">
      <div className="chatHeader">
        <h3>#{currentChannel?.name || 'チャンネルを選択してください'}</h3>
      </div>

      <div className="chatMessages">
                {currentChannel?.messages?.map((message: Message) => (
                  <div key={message.id} className="message">
                    <img src={message.user.photoURL} alt="" />
                    <div className="messageInfo">
                      <h4>
                        {message.user.displayName}
                        <span className="timestamp">
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </h4>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
      </div>

      <form onSubmit={handleSubmit} className="chatInput">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={currentChannel ? `#${currentChannel.name}へメッセージを送信` : 'チャンネルを選択してください'}
          disabled={!currentChannelId}
        />
        <button type="submit" disabled={!currentChannelId || !inputText.trim()}>
          送信
        </button>
      </form>
    </div>
  );
};

export default Chat;
