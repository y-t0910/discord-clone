import React, { useState } from 'react'
import "./Sidebar.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel'; 
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import { auth, db } from '../../firebase';
import { useAppSelector } from '../../app/hooks';
import {useEffect} from "react";
// import { collection,query } from 'firebase/firestore/lite';
import {onSnapshot, collection,QuerySnapshot, query, doc,DocumentData} from "firebase/firestore"
import { channel } from 'diagnostics_channel';

interface Channal {
  id: string;
  channel:DocumentData;
}
const Sidebar = () => {
 const [channels, setChannels] = useState<Channal[]>([]);

  const user = useAppSelector((state) => state.user);
  const q = query(collection(db,"channels"));

  useEffect(() => {
    onSnapshot(q,(QuerySnapshot) => {
      const channelsResults : Channal[] = [];
      QuerySnapshot.docs.forEach((doc) => 
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
      })
    );
    setChannels(channelsResults);
    });
  },[]);


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

      <div className="sidebarRight">
  {/* Discord部分 */}
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
      {channels.map((channels) => (
      <SidebarChannel channel={channel} id={channel.id} />
      ))}
      {/*SidebarChannel />
      <SidebarChannel />
      <SidebarChannel /> */}
    </div>
  </div>

  
  <div className="sidebarFooter">
    <img src="./icon.png" alt="User Icon" onClick={() => auth.signOut()}/>
    <div className="accountName">
      <h4>ShinCode</h4>
      <span>#8162</span>

     
    </div>

   <div className="sidebarVoice">
    <MicIcon />
    <HeadphonesIcon />
    <SettingsIcon />
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

