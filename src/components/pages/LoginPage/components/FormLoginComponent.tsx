import { Alert, Button, Stack, TextField } from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../main";
import { RootReducers } from "../../../../reducers";
import { User } from "../../../../types/user.type";
import * as loginAction from "../../../../actions/login.action";
type Props = {};

export default function FormLoginComponent({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);

  const showFrom = ({
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
          <Alert severity="error">Register successfully</Alert>
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
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Stack>
      </form>
    );
  };
  const initialValues: User = { username: "admin", password: "1234" };

  return (
    <Formik
      onSubmit={(values, { setSubmitting }) => {
        dispatch(loginAction.login(values, navigate));
      }}
      initialValues={initialValues}
    >
      {(props) => showFrom(props)}
    </Formik>
  );
}
