import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import { Badge } from "@mui/material";

import Notifications from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import * as loginAction from "../../../Redux/actions/login.action";
import { useAppDispatch } from "../../../Redux/reducers";

const drawerWidth = 240;

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

type HeaderProp = {
  open: boolean;
  notSent?: boolean; // ? sent or not sent
  onDrawerOpen: () => void;
};

export default function Header({ open, onDrawerOpen }: HeaderProp) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleDrawerOpen = () => {
    onDrawerOpen();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div" fontWeight="300">
          {import.meta.env.VITE_IS_PRODUCTION === "1"
            ? `PRODUCTION V.${import.meta.env.VITE_IS_VERSION}`
            : `DEVELOPMENT V.${import.meta.env.VITE_IS_VERSION}`}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => {
              dispatch(loginAction.logout(navigate));
            }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
