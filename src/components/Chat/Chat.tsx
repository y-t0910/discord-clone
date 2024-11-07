import React from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CardGiftcard, Gif, EmojiEmotions } from '@mui/icons-material';
import ChatMessage from './ChatMessage';

const Chat = () => {
  return (
    <div className="chat">
      {/* ヘッダー */}
      <ChatHeader />

      {/* メッセージ表示エリア */}
      <div className="chatMessage">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
      </div>

      {/* チャット入力エリア */}
      <div className="chatInput">
        <AddCircleOutlineIcon />

        <form>
          <input type="text" placeholder="メッセージを送信" />
          <button type="submit" className="chatInputButton"></button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcard />
          <Gif />
          <EmojiEmotions />
        </div>
      </div>
    </div>
  );
};

export default Chat;
