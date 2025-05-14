import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Typography
} from '@mui/material';
import { CheckCircle, Cancel, Edit, Delete } from '@mui/icons-material';

const PlansTable = ({ plans, loading, onEdit, onDelete, onToggleStatus }) => {
    const formatPrice = (price) => {
  const num = Number(price);
  return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
  };
  if (loading) {
    return <Typography>Cargando planes...</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell>Duración (días)</TableCell>
          <TableCell>Precio</TableCell>
          <TableCell>Estado</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {plans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell>{plan.id}</TableCell>
            <TableCell>{plan.name}</TableCell>
            <TableCell>{plan.description}</TableCell>
            <TableCell>{plan.duration_days}</TableCell>
            <TableCell>{formatPrice(plan.price)}</TableCell>
            <TableCell>
              <Chip
                label={plan.is_active ? 'Activo' : 'Inactivo'}
                color={plan.is_active ? 'success' : 'error'}
                icon={plan.is_active ? <CheckCircle /> : <Cancel />}
              />
            </TableCell>
            <TableCell>
              <Button 
                size="small" 
                startIcon={<Edit />}
                onClick={() => onEdit(plan)}
                sx={{ mr: 1 }}
              >
                Editar
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => onToggleStatus(plan.id)}
                sx={{ mr: 1 }}
              >
                {plan.is_active ? 'Desactivar' : 'Activar'}
              </Button>
              <Button
                size="small"
                color="error"
                startIcon={<Delete />}
                onClick={() => onDelete(plan.id)}
              >
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PlansTable;