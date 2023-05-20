import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import ordersReducer from "@/components/OrdersList/ordersSlice";
import storeReducer from "./storeSlice";
import type { TypedUseSelectorHook } from "react-redux";

const reducers = combineReducers({
  orders: ordersReducer,
  store: storeReducer,
});
const createStore = () =>
  configureStore({
    reducer: reducers,
    devTools: false,
  });

export type RootState = ReturnType<typeof reducers>;
export type Store = ReturnType<typeof createStore>;
export type StoreDispatch = Store["dispatch"];

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<StoreDispatch>();

export default createStore;
