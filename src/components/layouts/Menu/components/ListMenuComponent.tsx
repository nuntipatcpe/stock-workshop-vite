import { BarChart, Layers, Mail } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  name: string;
  path: string;
  icons: string;
};

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

const Icon = (name: string) => {
  if (name === "Layers") return <Layers />;
  if (name === "Mail") return <Mail />;
  if (name === "BarChart") return <BarChart />;
};

export default function ListMenuComponent({ name, path, icons }: Props) {
  return (
    <ListItemButton
      disablePadding
      component={MyNavLink}
      to={path}
      activeClassName="Mui-selected"
      exact
    >
      <ListItemIcon>{Icon(icons)}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  );
}
