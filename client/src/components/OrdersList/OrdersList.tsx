import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import { storeSelectors } from "@/store/storeSlice";
import OrderItem from "./OrderItem";
import { fetchOrdersList } from "./ordersSlice";
import type { IOrder } from "./ordersSlice";

const { getLogin } = storeSelectors;
const OrdersList = () => {
  const login = useAppSelector(getLogin);
  const list = useAppSelector((store) =>
    Object.values(store.orders.entities)
  ) as IOrder[];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrdersList());
  }, []);
  const ordersList = list.map((v) => <OrderItem key={v.time} order={v} />);
  return (
    <>
      <Stack flexWrap={"wrap"} spacing={2} useFlexGap direction={"row"}>
        {ordersList}
      </Stack>
    </>
  );
};

export default OrdersList;
