import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialUserState } from "../Types"; // 型をインポート

interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null, // 初期状態はnull
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ログイン時にユーザー情報を設定
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // ログアウト時にユーザー情報をnullに設定
    logout: (state) => {
      state.user = null;
    },
  },
});

// アクションをエクスポート
export const { login, logout } = userSlice.actions;

// リデューサーをエクスポート
export default userSlice.reducer;
