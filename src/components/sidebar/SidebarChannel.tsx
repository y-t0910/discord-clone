import React from 'react';
import './SidebarChannel.scss';
import { channel } from 'diagnostics_channel';
import { useAppDispatch } from '../../app/hooks';

type Props = {
   id: string;
  };

  type SidebarChannelProps = {
    channel: string;
    id: string;
  };
  
  const SidebarChannel = ({ channel, id }: SidebarChannelProps) => {
    return (
      <div className="channel">
        <h4>
          <span>#</span> {channel}
        </h4>
      </div>
    );
  };
  
  export default SidebarChannel;
  