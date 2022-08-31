import * as React from "react";
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

import * as registerActions from "../../../actions/register.action";
import { useSelector } from "react-redux";
import { RootReducers } from "../../../reducers";
import { useAppDispatch } from "../../../main";

type RegisterPageProps = {
  //
};

const RegisterPage: React.FC<any> = () => {
  const registerReducer = useSelector(
    (state: RootReducers) => state.registerReducer
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
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
        <br />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <button onClick={() => navigate(-1)}>Back</button>
      </form>
    );
  };
  const initialValues: User = { username: "admin", password: "1234" };
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
        {registerReducer.isError && (
          <Alert severity="error">Register failed</Alert>
        )}

        <Stack spacing={2} direction="row">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={registerReducer.isFetching}
          >
            Create
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            disabled={isSubmitting}
            onClick={() => navigate("/login")}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    );
  };
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
  };
  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Register
            </Typography>
            <Formik
              onSubmit={async (values, { setSubmitting }) => {
                dispatch(registerActions.register(values, navigate));
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

export default RegisterPage;
