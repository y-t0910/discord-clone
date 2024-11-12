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
import { onSnapshot, collection, query, doc, DocumentData } from 'firebase/firestore';

interface Channel {
  id: string;
  channel: DocumentData;
}

const Sidebar = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  const user = useAppSelector((state) => state.user);
  const q = query(collection(db, "channels"));

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const channelsResults: Channel[] = [];
      querySnapshot.docs.forEach((doc) => {
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
        });
      });
      setChannels(channelsResults);
    });
  }, []);

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
            <h4>プログラミングチャンネル</h4>
            <ExpandMoreIcon />
          </div>
          <div className="sidebarChannelList">
            {channels.map((channel) => (
              <SidebarChannel key={channel.id} channel={channel} id={''} />
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

