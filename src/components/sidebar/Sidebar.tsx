import React from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import HeadsetIcon from "@mui/icons-material/Headset";
import SettingsIcon from "@mui/icons-material/Settings";
import SidebarChannel from "./SidebarChannel";
import { useAppSelector } from "../../app/hooks";
import { useModal } from "../../app/use-modal-store";

const Sidebar = () => {
  const { onOpen } = useModal();
  const user = useAppSelector((state) => state.user.user);
  const channels = useAppSelector((state) => state.channel?.channels) || [];

  return (
    <div className="Sidebar">
      {/* Sidebar left */}
      <div className="sidebarLeft">
        <img className="serverIcon" src="/logo192.png" alt="React Icon Small" />
        <img className="serverIcon" src="/logo512.png" alt="React Icon Large" />
      </div>

      {/* SidebarRight*/}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon/>
          </div>
        {/* sidebarChannels */}
        < div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
          <div className="sidebarHeader">
          
          <ExpandMoreIcon/>
          <h4>プログラミングチャンネル</h4>
          <button 
                className="addChannelButton"
                onClick={() => onOpen("createChannel")}
              >
                <AddIcon />
              </button>
              </div>

           {/*SidebarChannel */}
          <div className="SidebarChannel">
            <div className="SidebarChannel">
            {Array.isArray(channels) && channels.map((channel) => (
              <SidebarChannel
                key={channel.id}
                channel={channel.name}
                id={channel.id}
              />
            ))}
            </div>
          </div>
        </div>

        {/* SidebarFooter */}
        <div className="sidebarFooter">
          <div>
            <img 
              src={user?.photoURL || "/default-avatar.png"} 
              alt="User Avatar" 
            />
            <span className="accountName">{user?.displayName || "ユーザー名"}</span>
          </div>
          <div className="sidebarVoice">
            <MicIcon />
            <HeadsetIcon />
            <SettingsIcon />
          </div>
        </div>
      </div>
      </div>
      </div>
  );
};

export default Sidebar;
