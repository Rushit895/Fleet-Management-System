// src/pages/Vehicles.jsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

import {
  fetchAllVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../api/vehicles";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // For Dialog (both add & edit):
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    registration_no: "",
    type: "",
    model: "",
    status: "",
    capacity: "",
    owner_id: "",
  });
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  // Load vehicles once on mount
  const loadVehicles = async () => {
    setLoading(true);
    try {
      const data = await fetchAllVehicles();
      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  // Open “Add Vehicle” dialog
  const handleAddClick = () => {
    setIsEditMode(false);
    setEditingVehicleId(null);
    setFormValues({
      registration_no: "",
      type: "",
      model: "",
      status: "",
      capacity: "",
      owner_id: "",
    });
    setDialogOpen(true);
  };

  // Open “Edit Vehicle” dialog, pre-fill form
  const handleEditClick = (vehicle) => {
    setIsEditMode(true);
    setEditingVehicleId(vehicle.vehicle_id);
    setFormValues({
      registration_no: vehicle.registration_no,
      type: vehicle.type,
      model: vehicle.model,
      status: vehicle.status,
      capacity: vehicle.capacity,
      owner_id: vehicle.owner_id || "",
    });
    setDialogOpen(true);
  };

  // Delete a vehicle
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    try {
      await deleteVehicle(id);
      setVehicles((prev) => prev.filter((v) => v.vehicle_id !== id));
    } catch (err) {
      console.error("Failed to delete vehicle:", err);
    }
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the form (either create or update)
  const handleFormSubmit = async () => {
    const payload = {
      registration_no: formValues.registration_no,
      type: formValues.type,
      model: formValues.model,
      status: formValues.status,
      capacity: Number(formValues.capacity),
      owner_id: formValues.owner_id === "" ? null : Number(formValues.owner_id),
    };

    try {
      if (isEditMode && editingVehicleId) {
        // UPDATE flow
        await updateVehicle(editingVehicleId, payload);
      } else {
        // CREATE flow
        await createVehicle(payload);
      }
      setDialogOpen(false);
      // Refresh list
      await loadVehicles();
    } catch (err) {
      console.error("Error saving vehicle:", err);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header + “Add Vehicle” Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Vehicle Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Add Vehicle
        </Button>
      </Box>

      {/* Vehicles Table */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registration No.</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((v) => (
              <TableRow key={v.vehicle_id} hover>
                <TableCell>{v.registration_no}</TableCell>
                <TableCell>{v.type}</TableCell>
                <TableCell>{v.model}</TableCell>
                <TableCell>{v.capacity}</TableCell>
                <TableCell>{v.status}</TableCell>
                <TableCell>{v.owner_id ?? "-"}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(v)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(v.vehicle_id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {vehicles.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No vehicles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? "Edit Vehicle" : "Add Vehicle"}
        </DialogTitle>
        <DialogContent dividers>
          {/* Registration No */}
          <TextField
            margin="dense"
            label="Registration No."
            name="registration_no"
            fullWidth
            value={formValues.registration_no}
            onChange={handleInputChange}
          />

          {/* Type */}
          <TextField
            margin="dense"
            label="Type"
            name="type"
            fullWidth
            value={formValues.type}
            onChange={handleInputChange}
            placeholder="e.g. Truck, Van, Trailer"
          />

          {/* Model */}
          <TextField
            margin="dense"
            label="Model"
            name="model"
            fullWidth
            value={formValues.model}
            onChange={handleInputChange}
            placeholder="Vehicle model"
          />

          {/* Capacity */}
          <TextField
            margin="dense"
            label="Capacity (tons)"
            name="capacity"
            type="number"
            fullWidth
            value={formValues.capacity}
            onChange={handleInputChange}
          />

          {/* Status (Dropdown) */}
          <FormControl margin="dense" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formValues.status}
              label="Status"
              onChange={handleInputChange}
            >
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="deployed">Deployed</MenuItem>
              <MenuItem value="maintenance">Under Maintenance</MenuItem>
            </Select>
          </FormControl>

          {/* Owner ID (optional) */}
          <TextField
            margin="dense"
            label="Owner ID"
            name="owner_id"
            type="number"
            fullWidth
            value={formValues.owner_id}
            onChange={handleInputChange}
            placeholder="(optional) integer owner_id"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            {isEditMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
