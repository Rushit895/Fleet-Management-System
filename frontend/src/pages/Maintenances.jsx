// src/pages/Maintenances.jsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchAllMaintenances } from "../api/maintenances";

export default function Maintenances() {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaintenances = async () => {
      try {
        const data = await fetchAllMaintenances();
        setMaintenances(data);
      } catch (err) {
        console.error("Error fetching maintenances:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMaintenances();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" mb={2}>Maintenance Records</Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenances.map((m) => (
              <TableRow key={m.maintenance_id} hover>
                <TableCell>{m.maintenance_id}</TableCell>
                <TableCell>{m.driver_name}</TableCell>
                <TableCell>{m.description}</TableCell>
                <TableCell>{new Date(m.date).toLocaleDateString()}</TableCell>
                <TableCell>{m.status}</TableCell>
              </TableRow>
            ))}
            {maintenances.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No maintenance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
