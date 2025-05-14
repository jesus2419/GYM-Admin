import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import {
  People,
  FitnessCenter,
  Payment,
  EventNote,
  CreditCard,
  AccountCircle,
  Menu
} from '@mui/icons-material';

const drawerWidth = 240;

const navItems = [
  { text: 'Usuarios', icon: <People /> },
  { text: 'Planes', icon: <FitnessCenter /> },
  { text: 'Opciones de Pago', icon: <Payment /> },
  { text: 'Subscripciones', icon: <EventNote /> },
  { text: 'Pagos Programados', icon: <CreditCard /> },
  { text: 'Entrenadores', icon: <AccountCircle /> }
];

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [formData, setFormData] = useState({
    first_name: '',
    paternal_last_name: '',
    maternal_last_name: '',
    phone: '',
    email: ''
  });

  const navigate = useNavigate();

  // Configurar axios para incluir el token en las peticiones
  const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Ajusta según tu configuración
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        first_name: '',
        paternal_last_name: '',
        maternal_last_name: '',
        phone: '',
        email: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    
    if (error.response) {
      if (error.response.status === 401) {
        message = 'No autorizado - Por favor inicie sesión nuevamente';
        handleLogout();
      } else if (error.response.data && error.response.data.error) {
        message = error.response.data.error;
      }
    }
    
    setSnackbar({
      open: true,
      message,
      severity: 'error'
    });
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={toggleDrawer}>
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Panel de Administración
            </Typography>
          </Box>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios
        </Typography>

        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()} sx={{ mb: 2 }}>
          Agregar Usuario
        </Button>

        <Container>
          <Paper elevation={3} sx={{ p: 2 }}>
            {loading ? (
              <Typography>Cargando usuarios...</Typography>
            ) : (
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
                        <Button size="small" onClick={() => handleOpenDialog(user)}>Editar</Button>
                        <Button size="small" color="error" onClick={() => handleDelete(user.id)}>Eliminar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Container>

        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth>
          <DialogTitle>{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nombre"
              name="first_name"
              fullWidth
              required
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Apellido Paterno"
              name="paternal_last_name"
              fullWidth
              required
              value={formData.paternal_last_name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Apellido Materno"
              name="maternal_last_name"
              fullWidth
              value={formData.maternal_last_name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Teléfono"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSave} variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}