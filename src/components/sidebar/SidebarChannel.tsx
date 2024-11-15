import React from 'react';
import './SidebarChannel.scss';
import { DocumentData } from 'firebase/firestore';
import { channel } from 'diagnostics_channel';
import { useAppDispatch } from '../../app/hooks';
import { setChannelInfo } from '../../features/channelSlice';

type Props = {
   id: string;
   channel:DocumentData;
  };

const SidebarChannel = (props: Props) => {
  const { id, channel } = props;
  const dispatch = useAppDispatch()


  return (
    <div className="sidebarChannel" 
      onClick={() =>
        dispatch(
          setChannelInfo({
           channelaid: id,
           channeName: channel.channel.channel
      })
        )
      }>
      <h4>
        <span className="sidebarChannelHash">#</span>
        
        </h4>
        
    </div>
  );
};

export default SidebarChannel;
