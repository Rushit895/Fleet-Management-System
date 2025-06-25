// src/pages/Owners.jsx
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
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  fetchAllOwners,
  createOwner,
  updateOwner,
  deleteOwner,
} from "../api/owners";

export default function Owners() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    phone_number: "",
    email: "",
  });
  const [editingOwnerId, setEditingOwnerId] = useState(null);

  const loadOwners = async () => {
    setLoading(true);
    try {
      const data = await fetchAllOwners();
      setOwners(data);
    } catch (err) {
      console.error("Error fetching owners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOwners();
  }, []);

  const handleAddClick = () => {
    setIsEditMode(false);
    setEditingOwnerId(null);
    setFormValues({ name: "", phone_number: "", email: "" });
    setDialogOpen(true);
  };

  const handleEditClick = (owner) => {
    setIsEditMode(true);
    setEditingOwnerId(owner.owner_id);
    setFormValues({
      name: owner.name,
      phone_number: owner.phone_number,
      email: owner.email,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this owner?")) return;
    try {
      await deleteOwner(id);
      setOwners((prev) => prev.filter((o) => o.owner_id !== id));
    } catch (err) {
      console.error("Failed to delete owner:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      if (isEditMode && editingOwnerId) {
        await updateOwner(editingOwnerId, formValues);
      } else {
        await createOwner(formValues);
      }
      setDialogOpen(false);
      await loadOwners();
    } catch (err) {
      console.error("Error saving owner:", err);
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Owner Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddClick}
        >
          Add Owner
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {owners.map((o) => (
              <TableRow key={o.owner_id} hover>
                <TableCell>{o.name}</TableCell>
                <TableCell>{o.phone_number}</TableCell>
                <TableCell>{o.email}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton size="small" onClick={() => handleEditClick(o)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(o.owner_id)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {owners.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No owners found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? "Edit Owner" : "Add Owner"}</DialogTitle>
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
            label="Phone Number"
            name="phone_number"
            fullWidth
            value={formValues.phone_number}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formValues.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>
            {isEditMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
