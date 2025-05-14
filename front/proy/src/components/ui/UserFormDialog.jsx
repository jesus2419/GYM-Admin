import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

const UserFormDialog = ({ open, onClose, formData, onChange, onSave, isEditing }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEditing ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          name="first_name"
          fullWidth
          required
          value={formData.first_name}
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Apellido Paterno"
          name="paternal_last_name"
          fullWidth
          required
          value={formData.paternal_last_name}
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Apellido Materno"
          name="maternal_last_name"
          fullWidth
          value={formData.maternal_last_name}
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          name="phone"
          fullWidth
          value={formData.phone}
          onChange={onChange}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          required
          type="email"
          value={formData.email}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;