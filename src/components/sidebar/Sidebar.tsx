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

type Channel = {
  id: string;
  channelName: string;
};

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const channels: Channel[] = useCollection("channels");
  const [newChannelName, setNewChannelName] = useState("");

  const addChannel = async () => {
    if (!newChannelName.trim()) return;
    await addDoc(collection(db, "channels"), {
      channelName: newChannelName,
    });
    setNewChannelName(""); // Clear input after adding channel
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

        {/* チャンネル追加セクション */}
        <div className="addChannelSection">
          <input
            type="text"
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            placeholder="新しいチャンネル名を入力"
          />
          <button onClick={addChannel}>
            <AddIcon /> チャンネルを追加
          </button>
        </div>

    {/* プログラミングチャンネルリスト */}
    　
    <div className="sidebarChannels">
      <div className="customPosition">
        <div className="sidebarHeader">
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
