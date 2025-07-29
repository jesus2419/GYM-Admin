import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import UsersTable from '../components/users/UsersTable';
import UserFormDialog from '../components/ui/UserFormDialog';
import CustomSnackbar from '../components/ui/CustomSnackbar';
import api from '../services/api';
import Layout from '../components/layout/Layout';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    paternal_last_name: '',
    maternal_last_name: '',
    phone: '',
    email: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    setFormData(user || {
      first_name: '',
      paternal_last_name: '',
      maternal_last_name: '',
      phone: '',
      email: ''
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
        setSnackbar({
          open: true,
          message: 'Usuario actualizado correctamente',
          severity: 'success'
        });
      } else {
        await api.post('/users', formData);
        setSnackbar({
          open: true,
          message: 'Usuario creado correctamente',
          severity: 'success'
        });
      }
      fetchUsers();
      setDialogOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setSnackbar({
        open: true,
        message: 'Usuario eliminado correctamente',
        severity: 'success'
      });
      fetchUsers();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    console.error('API Error:', error);
    let message = 'Ocurrió un error';
    
    if (error.response?.data?.error) {
      message = error.response.data.error;
    }
    
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
    setLoading(false);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleOpenDialog()} 
        sx={{ mb: 2 }}
      >
        Agregar Usuario
      </Button>

      <Container>
        <Paper elevation={3} sx={{ p: 2 }}>
          <UsersTable 
            users={users} 
            loading={loading} 
            onEdit={handleOpenDialog} 
            onDelete={handleDelete} 
          />
        </Paper>
      </Container>

      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        formData={formData}
        onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
        onSave={handleSave}
        isEditing={!!editingUser}
      />

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({...snackbar, open: false})}
      />
    </Layout>
  );
};

export default UsersPage;