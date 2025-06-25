// src/pages/Consignments.jsx
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
import { fetchAllConsignments } from "../api/consignments";

export default function Consignments() {
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConsignments = async () => {
      try {
        const data = await fetchAllConsignments();
        setConsignments(data);
      } catch (err) {
        console.error("Error fetching consignments:", err);
      } finally {
        setLoading(false);
      }
    };
    loadConsignments();
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
      <Typography variant="h4" mb={2}>Consignment Records</Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consignments.map((c) => (
              <TableRow key={c.consignment_id} hover>
                <TableCell>{c.consignment_id}</TableCell>
                <TableCell>{c.driver_name}</TableCell>
                <TableCell>{c.customer_name}</TableCell>
                <TableCell>{c.destination}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>{new Date(c.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {consignments.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No consignments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
