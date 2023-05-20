import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { drawerWidth } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store";
import { setActiveTab, storeSelectors } from "@/store/storeSlice";

const { getActiveTab } = storeSelectors;
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));
export const MenuTabsList = [
  "app.header.personal_cabinet",
  "app.header.title_text",
];
const UsersListItems = () => {
  const { t } = useTranslation();
  const activeTab = useAppSelector(getActiveTab);
  const dispatch = useAppDispatch();
  const handleTabClick = (val: number) => {
    dispatch(setActiveTab(val));
  };
  return (
    <List>
      {MenuTabsList.map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton
            selected={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <AccountBoxIcon /> : <CalendarMonthIcon />}
            </ListItemIcon>
            <ListItemText primary={t(text)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Sidebar = (props: { open: boolean; onClose: () => void }) => {
  const { open, onClose } = props;
  const theme = useTheme();

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
            }}
          >
            Booking App
          </Typography>
          <IconButton onClick={onClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <UsersListItems />
      </Drawer>
    </>
  );
};

export default Sidebar;
