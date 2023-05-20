import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import API from "@/api";
import { useAppDispatch } from "@/store";
import { setLogin } from "@/store/storeSlice";
import type { ChangeEventHandler } from "react";

const LoginForm = () => {
  const { t } = useTranslation();
  const values = useRef({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const login = new API().user().login(values.current);
    login.then((res) => {
      if (res.response === true) {
        dispatch(setLogin(values.current.username));
      }
    });
  };
  const handleRegister = () => {
    const login = new API().user().register(values.current);
    login.then((res) => {
      if (res.response === true) {
        dispatch(setLogin(values.current.username));
      }
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as "username" | "password";
    values.current[name] = e.target.value;
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            name="username"
            onChange={handleChange}
            label={t("form.username")}
          />
          <TextField
            name="password"
            type="password"
            onChange={handleChange}
            label={t("form.password")}
          />
          <Button variant="contained" type="submit" color="primary">
            {t("form.sign_in")}
          </Button>
          <Button variant="text" onClick={handleRegister} color="info">
            {t("form.sign_up")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
