import React, { useState, useEffect } from 'react';
import "./Sidebar.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '../../firebase';
import { useAppSelector } from '../../app/hooks';
import useCollection from '../../hooks/useCollection';


const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const {documents: channels} = useCollection("channels")

  return (
    <div className="Sidebar">
      {/* sidebarLeft */}
      <div className="sidebarLeft">
        <div className="serverIcon">
          <img src="/logo192.png" alt="React Icon Small" />
        </div>
        <div className="serverIcon">
          <img src="/logo192.png" alt="React Icon Large" />
        </div>
      </div>

      {/* Discord部分 */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </div>

        {/* プログラミングチャンネルリスト */}
        <div className="sidebarChannels">
          <div className="sidebarHeader">
          <ExpandMoreIcon />
            <h4>プログラミングチャンネル</h4>
            </div>
            
          <div className="sidebarChannelList">
            {channels.map((channel) => (
              <SidebarChannel 
              key={channel.id} 
              channel={channel} 
              id={channel.id} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

function setChannels(channelsResults: { id: any; channel: any; }[]) {
  throw new Error('Function not implemented.');
}

