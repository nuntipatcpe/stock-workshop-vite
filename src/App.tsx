import * as React from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import Header from "./components/layouts/Header";
import Menu from "./components/layouts/Menu";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import StockPage from "./components/pages/StockPage";
import StockCreatePage from "./components/pages/StockCreatePage";
import StockEditPage from "./components/pages/StockEditPage";
import ReportPage from "./components/pages/ReportPage";
import AboutUs from "./components/pages/AboutUs";
import { blue, blueGrey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { RootReducers } from "./Redux/reducers";

import * as loginAction from "./Redux/actions/login.action";
import { useAppDispatch } from "./Redux/reducers";
import PublicRoutes from "./routers/public.routes";
import ProtectedRoutes from "./routers/protected.routes";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
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

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {},
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontWeightLight: 500,
    fontWeightRegular: 600,
    fontWeightMedium: 700,
    fontWeightBold: 800,
  },
  palette: {
    primary: import.meta.env.VITE_IS_PRODUCTION == "1" ? blue : blueGrey,
    background: {
      default: "#CFD2D6",
    },
  },
});

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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function App() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const dispatch = useAppDispatch();
  const loginReducer = useSelector((state: RootReducers) => state.loginReducer);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(loginAction.restoreLogin());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {loginReducer.result && (
          <Header open={open} onDrawerOpen={handleDrawerOpen} />
        )}
        {loginReducer.result && (
          <Menu open={open} onDrawerClose={handleDrawerClose} />
        )}
        {/* <Header open={open} onDrawerOpen={handleDrawerOpen} />
        <Menu open={open} onDrawerClose={handleDrawerClose} /> */}
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicRoutes />}>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoutes />}>
              {/* <Route path="/" element={<Navigate to="/login" />} /> */}
              <Route path="/stock" element={<StockPage />} />
              <Route path="/stock/create" element={<StockCreatePage />} />
              <Route path="/stock/edit/:id" element={<StockEditPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Main>
      </Box>
    </ThemeProvider>
  );
}

const NotFound = () => (
  <div>
    <h1>404| Not Found!</h1>
    <Link to="/">Home</Link>
  </div>
);
