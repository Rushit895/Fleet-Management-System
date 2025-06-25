// src/pages/Drivers.jsx
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
  fetchAllDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../api/drivers";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    license_no: "",
    license_expiry: "",
    phone_number: "",
    status: "",
    assigned_vehicle_id: "",
  });
  const [editingDriverId, setEditingDriverId] = useState(null);

  const loadDrivers = async () => {
    setLoading(true);
    try {
      const data = await fetchAllDrivers();
      setDrivers(data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleAddClick = () => {
    setIsEditMode(false);
    setEditingDriverId(null);
    setFormValues({
      name: "",
      license_no: "",
      license_expiry: "",
      phone_number: "",
      status: "",
      assigned_vehicle_id: "",
    });
    setDialogOpen(true);
  };

  const handleEditClick = (driver) => {
    setIsEditMode(true);
    setEditingDriverId(driver.driver_id);
    setFormValues({
      name: driver.name,
      license_no: driver.license_no,
      license_expiry: driver.license_expiry,
      phone_number: driver.phone_number,
      status: driver.status,
      assigned_vehicle_id: driver.assigned_vehicle_id ?? "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this driver?")) return;
    try {
      await deleteDriver(id);
      setDrivers((prev) => prev.filter((d) => d.driver_id !== id));
    } catch (err) {
      console.error("Failed to delete driver:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    const payload = {
      name: formValues.name,
      license_no: formValues.license_no,
      license_expiry: formValues.license_expiry,
      phone_number: formValues.phone_number,
      status: formValues.status,
      assigned_vehicle_id:
        formValues.assigned_vehicle_id === ""
          ? null
          : Number(formValues.assigned_vehicle_id),
    };

    try {
      if (isEditMode && editingDriverId) {
        await updateDriver(editingDriverId, payload);
      } else {
        await createDriver(payload);
      }
      setDialogOpen(false);
      await loadDrivers();
    } catch (err) {
      console.error("Error saving driver:", err);
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Driver Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Add Driver
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>License No.</TableCell>
              <TableCell>License Expiry</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned Vehicle ID</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((d) => (
              <TableRow key={d.driver_id} hover>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.license_no}</TableCell>
                <TableCell>{d.license_expiry}</TableCell>
                <TableCell>{d.phone_number}</TableCell>
                <TableCell>{d.status}</TableCell>
                <TableCell>{d.assigned_vehicle_id ?? "-"}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(d)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(d.driver_id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {drivers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No drivers found.
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
        <DialogTitle>{isEditMode ? "Edit Driver" : "Add Driver"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="License No."
            name="license_no"
            fullWidth
            value={formValues.license_no}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="License Expiry"
            name="license_expiry"
            type="date"
            fullWidth
            value={formValues.license_expiry}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phone_number"
            fullWidth
            value={formValues.phone_number}
            onChange={handleInputChange}
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formValues.status}
              label="Status"
              onChange={handleInputChange}
            >
              <MenuItem value="on-duty">On Duty</MenuItem>
              <MenuItem value="off-duty">Off Duty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Assigned Vehicle ID"
            name="assigned_vehicle_id"
            type="number"
            fullWidth
            value={formValues.assigned_vehicle_id}
            onChange={handleInputChange}
            placeholder="(optional)"
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
