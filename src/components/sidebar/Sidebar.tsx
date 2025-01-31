import React, { useState } from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { useModal } from "../../app/use-modal-store";

type Channel = {
  id: string;
  channelName: string;
};

const Sidebar = () => {
  const { onOpen } = useModal();
  const user = useAppSelector((state) => state.user.user);
  const channels: Channel[] = useCollection("channels");

  const handleCreateChannel = () => {
    console.log("Opening channel modal"); // デバッグ用
    onOpen("createChannel");
  };

  return (
    <div className="Sidebar">
      {/* Sidebar left */}
      <div className="sidebarLeft">
        <img className="serverIcon" src="/logo192.png" alt="React Icon Small" />
        <img className="serverIcon" src="/logo512.png" alt="React Icon Large" />
      </div>

      {/* Discord部分 */}
      <div className="sidebarRight">
        <div className="sidebarTop">
          <h3>Discord</h3>
          <ExpandMoreIcon />
        </div>

        {/* プログラミングチャンネルリスト */}
        <div className="sidebarChannels">
          <div className="customPosition">
            <div className="sidebarHeader">
              <button 
                className="addChannelButton"
                onClick={handleCreateChannel}
              >
                <AddIcon />
              </button>
              <ExpandMoreIcon />
              <h3 className="channelTitle">プログラミングチャンネル</h3>
            </div>
          </div>
          <div className="sidebarChannelList">
            {channels.map((channel) => (
              <SidebarChannel
                key={channel.id}
                channel={channel.channelName}
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
