import React from 'react';
import './SidebarChannel.scss';
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
      <div className="SidebarChannel">
        <h4>
          <span className='SidebarChannelHash'>#</span> 
          {channel}
        </h4>
      </div>
    );
  };
  
  export default SidebarChannel;
