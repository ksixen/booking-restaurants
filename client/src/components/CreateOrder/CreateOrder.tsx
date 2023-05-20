import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import API from "@/api";
import { useAppDispatch, useAppSelector } from "@/store";
import { setActiveTab, storeSelectors } from "@/store/storeSlice";
import { addOrderAction } from "../OrdersList/ordersSlice";
import StepElements from "./StepElements";
import type { IOrder } from "../OrdersList/ordersSlice";

const { getLogin } = storeSelectors;
const steps = [
  "booking.select.date",
  "booking.select.time",
  "booking.select.guests",
];

const CreateOrder = () => {
  const [disabledNext, setDisabledNext] = useState(true);
  const [values, setValues] = useState({
    day: "",
    time: "",
    guests: 0,
  });
  const [activeStep, setActiveStep] = useState(0);
  const [dayOrders, setDayOrders] = useState<IOrder[]>([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const login = useAppSelector(getLogin);
  const handleNext = () => {
    if (activeStep === 0) {
      new API()
        .booking()
        .getDayOrders({ day: values.day })
        .then((res) => {
          setDayOrders(res.response);
          setActiveStep((prev) => ++prev);
          setDisabledNext(true);
        });
    } else {
      if (activeStep === 2 && login) {
        dispatch(
          addOrderAction({
            ...values,
            username: login,
          })
        );
        dispatch(setActiveTab(0));
      }
      setActiveStep((prev) => ++prev);
      setDisabledNext(true);
    }
  };
  const handleBack = () => {
    setActiveStep((prev) => --prev);
    setDisabledNext(true);
  };
  return (
    <>
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{t(label)}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {t(`${steps[activeStep]}_desc`)}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StepElements
              day={values.day}
              dayOrders={dayOrders}
              onChange={(val) => {
                setValues((prev) => Object.assign({}, prev, val));
                setDisabledNext(false);
              }}
              active={activeStep}
            />
          </LocalizationProvider>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {t("button.back")}
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button disabled={disabledNext} onClick={handleNext}>
              {activeStep === steps.length - 1
                ? t("app.header.title_text")
                : t("button.next")}
            </Button>
          </Box>
        </React.Fragment>
      </Box>
    </>
  );
};

export default CreateOrder;
