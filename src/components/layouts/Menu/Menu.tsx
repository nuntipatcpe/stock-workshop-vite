import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Mail from "@mui/icons-material/Mail";
import Layers from "@mui/icons-material/Layers";
import BarChart from "@mui/icons-material/BarChart";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProps = {
  open: boolean;
  onDrawerClose: () => void;
};

//customLink
const MyNavLink = React.forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) =>
      `${props.className} ${isActive ? props.activeClassName : ""}`
    }
  >
    {props.children}
  </NavLink>
));

export default function Menu({ open, onDrawerClose }: MenuProps) {
  const theme = useTheme();
  // console.log(import.meta.env.BASE_URL);
  const handleDrawerClose = () => {
    onDrawerClose();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Typography
              variant="h4"
              sx={{ width: "100%", textAlign: "center" }}
            >
              STOCK
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </Stack>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton
            disablePadding
            component={MyNavLink}
            to="/stock"
            activeClassName="Mui-selected"
            exact
          >
            <ListItemIcon>
              <Layers />
            </ListItemIcon>
            <ListItemText primary={"Stock"} />
          </ListItemButton>

          <ListItemButton
            disablePadding
            component={MyNavLink}
            to="/report"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary={"Report"} />
          </ListItemButton>

          <ListItemButton
            disablePadding
            component={MyNavLink}
            to="/aboutus"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary={"Aboutus"} />
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
