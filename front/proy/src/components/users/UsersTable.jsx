import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography
} from '@mui/material';

const UsersTable = ({ users, loading, onEdit, onDelete }) => {
  if (loading) {
    return <Typography>Cargando usuarios...</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellido Paterno</TableCell>
          <TableCell>Apellido Materno</TableCell>
          <TableCell>Teléfono</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.paternal_last_name}</TableCell>
            <TableCell>{user.maternal_last_name}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Button size="small" onClick={() => onEdit(user)}>
                Editar
              </Button>
              <Button size="small" color="error" onClick={() => onDelete(user.id)}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;