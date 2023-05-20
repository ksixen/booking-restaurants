import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import API from "@/api";
import type { RootState } from "@/store";
export interface IOrder {
  username: string;
  guests: number;
  day: string;
  time: string;
}
const ordersEntityAdapter = createEntityAdapter<IOrder>({
  selectId: (props) => props.time,
});

export const fetchOrdersList = createAsyncThunk<
  IOrder[],
  undefined,
  {
    state: RootState;
  }
>("orders/fetch", async (_, thunkApi) => {
  const login = thunkApi.getState().store.login;
  const initialized = thunkApi.getState().store.ordersInitialized;
  if (login && !initialized) {
    const req = await new API().booking().getList({
      username: login,
    });
    return req.response;
  } else return [];
});
export const addOrderAction = createAsyncThunk<IOrder, IOrder>(
  "orders/addOrder",
  async (payload) => {
    await new API().booking().order(payload);
    return payload;
  }
);
export const cancelOrderAction = createAsyncThunk<IOrder, IOrder>(
  "orders/cancelOrder",
  async (payload) => {
    await new API().booking().cancelOrder({
      username: payload.username,
      day: payload.day,
      time: payload.time,
    });
    return payload;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: ordersEntityAdapter.getInitialState(),
  reducers: {
    addManyOrders: ordersEntityAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersList.fulfilled, ordersEntityAdapter.addMany)
      .addCase(cancelOrderAction.fulfilled, (state, action) =>
        ordersEntityAdapter.removeOne(state, action.payload.time)
      )
      .addCase(addOrderAction.fulfilled, ordersEntityAdapter.addOne);
  },
});

const ordersReducer = ordersSlice.reducer;
export const { addManyOrders } = ordersSlice.actions;
export default ordersReducer;
