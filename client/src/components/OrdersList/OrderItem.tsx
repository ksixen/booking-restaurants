import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import CancelOrder from "./CancelOrder";
import { cancelOrderAction } from "./ordersSlice";
import type { IOrder } from "./ordersSlice";

const OrderItem = (props: { order: IOrder }) => {
  const { order } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [cancelOrder, setCancelOrder] = useState<string | undefined>(undefined);
  const cancelBtn = useMemo(() => {
    const date = new Date(`${order.day} ${order.time}`);
    const difference = dayjs(date).diff(new Date(), "hours");
    return (
      <Button
        disabled={difference <= 1}
        onClick={() => {
          setCancelOrder(order.time);
        }}
        size="small"
      >
        {t("button.cancel_your_reservation")}
      </Button>
    );
  }, []);

  const handleCloseModal = () => setCancelOrder(undefined);

  return (
    <>
      <Dialog onClose={handleCloseModal} open={Boolean(cancelOrder)}>
        <CancelOrder
          onCancel={() => {
            dispatch(cancelOrderAction(order));
            handleCloseModal();
          }}
          onClose={handleCloseModal}
        />
      </Dialog>

      <Card sx={{ maxWidth: 250, height: "fit-content" }}>
        <CardContent>
          <Typography variant="body2" color="text.primary" component="span">
            {t("booking.select.time")}
            {": "}
          </Typography>
          <Typography variant="body2" color="text.primary" component="span">
            {order?.day} {order?.time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("booking.count_guests", {
              count: order?.guests,
            })}
          </Typography>
        </CardContent>
        <CardActions>{cancelBtn}</CardActions>
      </Card>
    </>
  );
};

export default OrderItem;
