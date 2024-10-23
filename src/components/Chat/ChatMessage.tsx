import React from 'react'
import "./ChatMessage.scss"
import { Avatar } from '@mui/material';
const ChatMessage = () => {
  return <div className="message">
       <Avatar />
       <div className="messageInfo"></div>
       <h4>
        Shin Code
        <span className="messageTimestamp">2024/10/19</span>
        </h4>

        <p>メッセージ本文</p>
  </div>
}

export default ChatMessage