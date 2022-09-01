import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import FormLoginComponent from "./components/FormLoginComponent";

type LoginPageProps = {
  //
};

const LoginPage: React.FC<any> = () => {
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
            <FormLoginComponent />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
