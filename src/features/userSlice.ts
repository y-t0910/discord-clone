import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: UserState = {
  user: null, // 初期状態はnull
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
