import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  DirectionsCar,
  Person,
  PersonAdd,
  People,
  Inventory,
  Build,
  CalendarToday,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

export function Sidebar() {
  const location = useLocation();
  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Vehicles", icon: <DirectionsCar />, path: "/vehicles" },
    { text: "Drivers", icon: <Person />, path: "/drivers" },
    { text: "Owners", icon: <PersonAdd />, path: "/owners" },
    { text: "Customers", icon: <People />, path: "/customers" },
    { text: "Consignments", icon: <Inventory />, path: "/consignments" },
    { text: "Maintenances", icon: <Build />, path: "/maintenances" },
    { text: "Availabilities", icon: <CalendarToday />, path: "/availabilities" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {/* Spacer below the AppBar height */}
      <Toolbar />
      <List>
        {navItems.map(item => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? "primary.main" : "inherit" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
