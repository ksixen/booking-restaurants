import { Box, Button, TextField } from "@mui/material";
import { DateCalendar, TimeClock } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { IOrder } from "../OrdersList/ordersSlice";
import type { TimeView } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";

const StepElements = (props: {
  dayOrders: IOrder[];
  active: number;
  day: string;
  onChange: (e: { day?: string; time?: string; guests?: number }) => void;
}) => {
  const { t } = useTranslation();
  const { day, active, dayOrders, onChange } = props;
  const [currentView, setCurrentView] = useState<TimeView>("hours");
  switch (active) {
    case 1:
      return (
        <>
          <TimeClock
            ampmInClock={true}
            disablePast={dayjs(day).isSame(dayjs().format("YYYY-MM-DD"))}
            minTime={dayjs().set("hour", 6)}
            maxTime={dayjs().set("hour", 23)}
            shouldDisableTime={(time) =>
              dayOrders.map((v) => v.time).includes(time.format("HH:mm"))
            }
            views={["hours", "minutes"]}
            view={currentView}
            onViewChange={(view) => setCurrentView(view)}
            onChange={(e) => {
              onChange({
                time: (e as Dayjs).format("HH:MM"),
              });
            }}
          />
          <Button
            disabled={currentView === "hours"}
            onClick={() => setCurrentView("hours")}
          >
            {t("time.cancel")}
          </Button>
        </>
      );
    case 2:
      return (
        <Box component="form">
          <TextField
            label={t("booking.select.guests")}
            onChange={({ target }) => {
              onChange({
                guests: parseFloat(target.value),
              });
            }}
          />
        </Box>
      );
    default:
      return (
        <DateCalendar
          views={["day"]}
          maxDate={dayjs().set("month", dayjs().get("month") + 2)}
          disablePast
          onChange={(e) => {
            onChange({
              day: (e as Dayjs).format("YYYY-MM-DD"),
            });
          }}
        />
      );
  }
};

export default StepElements;
