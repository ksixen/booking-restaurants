import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { fetchOrdersList } from "@/components/OrdersList/ordersSlice";
import type { RootState } from ".";
interface IStoreInitialState {
  login?: string;
  activeTab: number;
  ordersInitialized: boolean;
}
const initialState: IStoreInitialState = {
  login: undefined,
  activeTab: 0,
  ordersInitialized: false,
};
export const setLogin = createAsyncThunk<string, string>(
  "store/setLogin",
  (payload) => payload
);
export const setActiveTab = createAsyncThunk<number, number>(
  "store/setActiveTab",
  (payload) => payload
);
const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLogin.fulfilled, (state, action) => {
        state.login = action.payload;
      })
      .addCase(setActiveTab.fulfilled, (state, action) => {
        state.activeTab = action.payload;
      })
      .addCase(fetchOrdersList.fulfilled, (state) => {
        state.ordersInitialized = true;
      });
  },
});
export const storeSelectors = {
  getActiveTab: createSelector(
    [(store: RootState) => store.store.activeTab],
    (store) => store
  ),
  getLogin: createSelector(
    [(store: RootState) => store.store.login],
    (store) => store
  ),
};
const storeReducer = storeSlice.reducer;
export default storeReducer;
