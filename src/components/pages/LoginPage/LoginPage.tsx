import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { User } from "../../../types/user.type";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../main";
import { RootReducers } from "../../../reducers";
import * as loginAction from "../../../actions/login.action";
type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
  const navigate = useNavigate();
  // const [account, setAccount] = useState({ username: "", password: "" });

  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const dispatch = useAppDispatch();

  const showFromV1 = ({
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  }: FormikProps<any>) => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={values.username}
        />
        <br />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={values.password}
        />

        {/* <span>Debug: {JSON.stringify(account)}</span> */}
        <br />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <button onClick={() => navigate("/register")}>Register</button>
      </form>
    );
  };
  const showFromV2 = ({
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  }: FormikProps<User>) => {
    return (
      <form action="" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />

        {loginReducer.isError && (
          <Alert severity="success">Register successfully</Alert>
        )}
        <Stack spacing={2} direction="row">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loginReducer.isFetching}
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            disabled={isSubmitting}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Stack>

        {/* <button type="submit" disabled={isSubmitting}>
          Submit
        </button> */}
        {/* <button onClick={() => navigate(-1)}>Back</button> */}
      </form>
    );
  };
  const initialValues: User = { username: "admin", password: "1234" };

  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
  };
  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                dispatch(loginAction.login(values, navigate));
              }}
              initialValues={initialValues}
            >
              {(props) => showFromV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
