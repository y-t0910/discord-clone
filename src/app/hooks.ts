import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// 型付きの useDispatch フック
export const useAppDispatch: () => AppDispatch = useDispatch;

// 型付きの useSelector フック
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
