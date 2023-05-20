import MenuIcon from "@mui/icons-material/Menu";
import { CssBaseline, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";

import { useTranslation } from "react-i18next";
import { drawerWidth } from "@/constants";
import { useAppSelector } from "@/store";
import { storeSelectors } from "@/store/storeSlice";
import { MenuTabsList } from "../Sidebar/Sidebar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

const { getLogin, getActiveTab } = storeSelectors;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props: { open: boolean; onDrawerOpen: () => void }) => {
  const { open, onDrawerOpen } = props;
  const { t } = useTranslation();
  const login = Boolean(useAppSelector(getLogin));
  const activeTab = useAppSelector(getActiveTab);

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {login && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            {t(MenuTabsList[activeTab])}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
