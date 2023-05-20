import { DrawerHeader } from "@components/Sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { drawerWidth } from "@/constants";
import { useAppSelector } from "@/store";
import { storeSelectors } from "@/store/storeSlice";
import CreateOrder from "../CreateOrder/CreateOrder";
import LoginForm from "../LoginForm/LoginForm";
import OrdersList from "../OrdersList/OrdersList";

const { getLogin, getActiveTab } = storeSelectors;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  height: "100%",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
const Center = (props: { open: boolean }) => {
  const { open } = props;
  const login = Boolean(useAppSelector(getLogin));
  const activeTab = useAppSelector(getActiveTab);
  const content = useMemo(() => {
    if (!login) return <LoginForm />;
    if (activeTab === 0) return <OrdersList />;
    if (activeTab === 1) return <CreateOrder />;
  }, [activeTab, login]);

  return (
    <>
      <Main open={open}>
        <DrawerHeader />
        {content}
      </Main>
    </>
  );
};

export default Center;
