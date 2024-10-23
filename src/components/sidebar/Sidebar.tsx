import React from 'react'
import "./Sidebar.scss";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel'; 
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
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
      <SidebarChannel />
      <SidebarChannel />
      <SidebarChannel />
      <SidebarChannel />
    </div>
  </div>

  
  {/* アイコン部分 */}
  <div className="sidebarFooter">
    <img src="./icon.png" alt="User Icon" />
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
