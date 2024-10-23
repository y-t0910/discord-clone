import React from 'react';
import './ChatHeader.scss';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PushPinIcon from '@mui/icons-material/PushPin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';

function ChatHeader() {
  return (
    <div className="ChatHeader">
      <div className="ChatHeaderLeft">
        <h3># general</h3>
      </div>

      <div className="ChatHeaderRight">
        <NotificationsIcon />
        <PushPinIcon />
        <PeopleAltIcon />

        <div className="ChatHeaderSearch">
          <input type="text" placeholder="検索" />
          <SearchIcon />
        </div>

        <SendIcon />
        <HelpIcon />
      </div>
    </div>
  );
}

export default ChatHeader;
