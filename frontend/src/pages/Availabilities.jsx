// src/pages/Availabilities.jsx
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
import { fetchAllAvailabilities } from "../api/availabilities";

export default function Availabilities() {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAvailabilities = async () => {
      try {
        const data = await fetchAllAvailabilities();
        setAvailabilities(data);
      } catch (err) {
        console.error("Error fetching availabilities:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAvailabilities();
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
      <Typography variant="h4" mb={2}>Driver Availabilities</Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availabilities.map((a) => (
              <TableRow key={a.availability_id} hover>
                <TableCell>{a.availability_id}</TableCell>
                <TableCell>{a.driver_name}</TableCell>
                <TableCell>{new Date(a.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(a.end_date).toLocaleDateString()}</TableCell>
                <TableCell>{a.status}</TableCell>
              </TableRow>
            ))}
            {availabilities.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No availability records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
