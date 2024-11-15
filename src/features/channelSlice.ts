import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  InitialChannelState } from "../Types"


// ユーザーの型定義
interface User {
  uid: string;
  email: string;
  name: string | null;
  photoURL: string | null;
  displayName: string | null; // Firebase User から取得
}

// Reduxの初期状態
interface UserState {
  user: User | null;
}


const initialState: InitialChannelState = {
  channelId: null, // 初期状態はnull
  channelName: null,
};

export const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setChannelInfo :(state,action) => {
         state.channelId = action.payload.channelId;
         state.channelName = action.payload.channelName;
    },
 },
});

export const { setChannelInfo } = channelSlice.actions;
export default channelSlice.reducer;
