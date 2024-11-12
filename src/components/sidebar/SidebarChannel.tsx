import React from 'react';
import './SidebarChannel.scss';
import { DocumentData } from 'firebase/firestore';
import { channel } from 'diagnostics_channel';

type Props = {
   id: string;
   channel:DocumentData;
  };

const SidebarChannel = (props: Props) => {
  return (
    <div className="sidebarChannel">
      <h4>
        <span className="sidebarChannelHash">#</span>
        
        </h4>
        
    </div>
  );
};

export default SidebarChannel;
