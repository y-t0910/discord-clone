import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice';
import { typographyClasses } from "@mui/material";

export const store = configureStore({
    reducer: userReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;