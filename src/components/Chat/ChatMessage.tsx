import React from 'react';
import './ChatMessage.scss';
import { Avatar } from '@mui/material';

type ChatMessageProps = {
  user: string;
  message: string;
  timestamp: any; // Adjust the type accordingly if needed
};

const ChatMessage = ({ user, message, timestamp }: ChatMessageProps) => {
  return (
    <div className="message">
      <Avatar />
      <div className="messageInfo">
        <h4>
          {user} <span className="messageTimestamp">{timestamp?.toDate().toLocaleString()}</span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
