import React from 'react';
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import  "./ChatHeader.scss";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RedeemIcon from '@mui/icons-material/Redeem';
import { CardGiftcard, Message } from '@mui/icons-material';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from"./ChatMessage";

const Chat = () =>{
  return (
  <div className='chat'>
    {/* chatheader */}
    <ChatHeader />
    {/* chatMessage */}
    <div className ="chatMessage">
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
      <ChatMessage />
    </div>
    {/* chatInput */}
    <div className="chatInput">
    <AddCircleOutlineIcon />
    <form>
      <input type="text" placeholder="メッセージを送信"/>
      <button type="submit" className="chatInputbutton"></button>
    </form>

    <div className="chatInputIcons">
      <CardGiftcard />
      <GifIcon />
      <EmojiEmotionsIcon />

    </div>
    </div>
  </div>
  );
};

export default Chat;
