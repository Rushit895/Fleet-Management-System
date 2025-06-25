// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    maintenanceVehicles: 0,
    deployedVehicles: 0,
    driversOnDuty: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We assume your backend exposes endpoints like:
    // GET /vehicles → list of vehicles
    // GET /drivers  → list of drivers
    // … you can adjust these URLs accordingly

    const fetchStats = async () => {
      try {
        // 1) Fetch all vehicles
        const vehRes = await axios.get("http://localhost:8000/vehicles");
        const vehicles = vehRes.data;

        // Compute counts
        const totalVehicles = vehicles.length;
        const availableVehicles = vehicles.filter(v => v.status === "available").length;
        const maintenanceVehicles = vehicles.filter(v => v.status === "maintenance").length;
        const deployedVehicles = vehicles.filter(v => v.status === "deployed").length;

        // 2) Fetch all drivers
        const drvRes = await axios.get("http://localhost:8000/drivers");
        const drivers = drvRes.data;
        const driversOnDuty = drivers.filter(d => d.assigned_vehicle_id !== null).length;

        setStats({
          totalVehicles,
          availableVehicles,
          maintenanceVehicles,
          deployedVehicles,
          driversOnDuty,
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const cardData = [
    {
      title: "Total Vehicles",
      value: stats.totalVehicles,
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
      title: "Available",
      value: stats.availableVehicles,
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
    },
    {
      title: "Under Maintenance",
      value: stats.maintenanceVehicles,
      icon: <BuildIcon sx={{ fontSize: 40, color: "#ed6c02" }} />,
    },
    {
      title: "Deployed",
      value: stats.deployedVehicles,
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: "#d32f2f" }} />,
    },
    {
      title: "Drivers On Duty",
      value: stats.driversOnDuty,
      icon: <PeopleIcon sx={{ fontSize: 40, color: "#0288d1" }} />,
    },
  ];

  return (
    <Box sx={{ p: 3, flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Fleet Overview
      </Typography>

      <Grid container spacing={3}>
        {cardData.map((card, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box sx={{ mr: 2 }}>{card.icon}</Box>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  {card.title}
                </Typography>
                <Typography variant="h5">{card.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 
         You can add more sections here—for example:
         - A chart showing vehicle utilization over time (using Recharts or Chart.js)
         - A table of “soon due maintenance”
         - A small map snapshot (e.g. using an embedded Google Map iframe)
      */}
    </Box>
  );
}
