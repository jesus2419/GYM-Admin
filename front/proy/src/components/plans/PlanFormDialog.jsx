import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

const PlanFormDialog = ({ open, onClose, plan, onChange, onSave, isEditing }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{isEditing ? 'Editar Plan' : 'Crear Nuevo Plan'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              label="Nombre del Plan"
              name="name"
              fullWidth
              required
              value={plan.name}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              label="Precio"
              name="price"
              type="number"
              fullWidth
              required
              inputProps={{ step: "0.01", min: "0" }}
              value={plan.price}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              margin="dense"
              label="Duración (días)"
              name="duration_days"
              type="number"
              fullWidth
              required
              inputProps={{ min: "1" }}
              value={plan.duration_days}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Estado</InputLabel>
              <Select
                name="is_active"
                value={plan.is_active}
                onChange={onChange}
                label="Estado"
              >
                <MenuItem value={true}>Activo</MenuItem>
                <MenuItem value={false}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Descripción"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={plan.description}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanFormDialog;