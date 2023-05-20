import { Box } from "@mui/material";
import dayjs from "dayjs";
import en from "dayjs/locale/en";
import ru from "dayjs/locale/ru";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Center from "./components/Center/Center";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Title/Title";
import "./App.css";
export default function App() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (i18n?.language === "ru") {
      dayjs.locale(ru);
    } else if (i18n?.language === "en") {
      dayjs.locale(en);
    }
  }, [i18n.language]);
  

  const handleDrawerClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Header onDrawerOpen={handleDrawerClick} open={open} />
      <Sidebar open={open} onClose={handleDrawerClick} />
      <Center open={open} />
    </Box>
  );
}
