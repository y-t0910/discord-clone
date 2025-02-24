import React from 'react';
import './ChatMessage.scss';
import { Avatar } from '@mui/material';

interface ChatMessageProps {
  user: string;
  message: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ user, message, timestamp }) => {
  return (
    <div className="chatMessage">
      <div className="chatMessage-header">
        <span className="chatMessage-user">{user}</span>
        <span className="chatMessage-time">
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
      <p className="chatMessage-text">{message}</p>
    </div>
  );
};

export default ChatMessage;
