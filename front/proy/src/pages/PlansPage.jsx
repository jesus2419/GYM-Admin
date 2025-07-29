import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import PlansTable from '../components/plans/PlansTable';
import PlanFormDialog from '../components/plans/PlanFormDialog';
import CustomSnackbar from '../components/ui/CustomSnackbar';
import Layout from '../components/layout/Layout';
import api from '../services/api';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration_days: 30,
    price: 0,
    is_active: true
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await api.get('/plans');
      setPlans(response.data);
      setLoading(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleOpenDialog = (plan = null) => {
    setEditingPlan(plan);
    setFormData(plan || {
      name: '',
      description: '',
      duration_days: 30,
      price: 0,
      is_active: true
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingPlan) {
        await api.put(`/plans/${editingPlan.id}`, formData);
        setSnackbar({
          open: true,
          message: 'Plan actualizado correctamente',
          severity: 'success'
        });
      } else {
        await api.post('/plans', formData);
        setSnackbar({
          open: true,
          message: 'Plan creado correctamente',
          severity: 'success'
        });
      }
      fetchPlans();
      setDialogOpen(false);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/plans/${id}`);
      setSnackbar({
        open: true,
        message: 'Plan eliminado correctamente',
        severity: 'success'
      });
      fetchPlans();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await api.patch(`/plans/${id}/toggle-status`);
      setSnackbar({
        open: true,
        message: 'Estado del plan actualizado',
        severity: 'success'
      });
      fetchPlans();
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
        Gestión de Planes
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => handleOpenDialog()} 
        sx={{ mb: 2 }}
      >
        Crear Nuevo Plan
      </Button>

      <Container>
        <Paper elevation={3} sx={{ p: 2 }}>
          <PlansTable 
            plans={plans} 
            loading={loading} 
            onEdit={handleOpenDialog}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </Paper>
      </Container>

      <PlanFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        plan={formData}
        onChange={(e) => setFormData({
          ...formData,
          [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        })}
        onSave={handleSave}
        isEditing={!!editingPlan}
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

export default PlansPage;