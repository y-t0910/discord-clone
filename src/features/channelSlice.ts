import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  user: {
    displayName: string;
    photoURL: string;
  };
}

interface Channel {
  id: string;
  name: string;
  messages: Message[];
}

interface ChannelState {
  channels: Channel[];
  currentChannelId: string | null;
}

const initialState: ChannelState = {
  channels: [],
  currentChannelId: null
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addChannel: (state, action: PayloadAction<{ name: string }>) => {
      try {
        const newChannel: Channel = {
          id: Date.now().toString(),
          name: action.payload.name,
          messages: []
        };
        state.channels.push(newChannel);
        state.currentChannelId = newChannel.id;
        
        // LocalStorageにデータを保存
        localStorage.setItem('channels', JSON.stringify(state.channels));
      } catch (error) {
        console.error('Error in addChannel:', error);
      }
    },
    setCurrentChannel: (state, action: PayloadAction<string>) => {
      state.currentChannelId = action.payload;
    },
    addMessage: (state, action: PayloadAction<{
      channelId: string;
      content: string;
      user: {
        displayName: string;
        photoURL: string;
      };
    }>) => {
      const channel = state.channels.find(ch => ch.id === action.payload.channelId);
      if (channel) {
        channel.messages.push({
          id: Date.now().toString(),
          content: action.payload.content,
          timestamp: new Date(),
          user: action.payload.user
        });
      }
    }
  }
});

// データの初期読み込み用のアクション
export const loadChannels = () => {
  return (dispatch: any) => {
    try {
      const savedChannels = localStorage.getItem('channels');
      if (savedChannels) {
        const channels = JSON.parse(savedChannels);
        channels.forEach((channel: any) => {
          dispatch(addChannel({ name: channel.name }));
        });
      }
    } catch (error) {
      console.error('Error loading channels:', error);
    }
  };
};

export const { addChannel, setCurrentChannel, addMessage } = channelSlice.actions;
export default channelSlice.reducer;

export const selectChannels = (state: RootState) => state.channel.channels;
export const selectCurrentChannel = (state: RootState) => 
  state.channel.channels.find((channel: Channel) => channel.id === state.channel.currentChannelId);
