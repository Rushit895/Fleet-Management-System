import React from "react";
import { Box, Toolbar } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const drawerWidth = 240;

export function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar at top */}
      <Header />

      {/* Persistent sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          mt: "64px", // push below the fixed AppBar
        }}
      >
        {/* Extra toolbar spacing so content isn’t hidden under the AppBar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
