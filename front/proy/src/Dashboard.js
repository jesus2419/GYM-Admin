import React, { useState } from 'react';
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
  TextField
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

const dummyUsersInitial = [
  {
    id: 1,
    first_name: 'Juan',
    paternal_last_name: 'Pérez',
    maternal_last_name: 'Gómez',
    phone: '555-1234',
    email: 'juan.perez@example.com'
  },
  {
    id: 2,
    first_name: 'María',
    paternal_last_name: 'López',
    maternal_last_name: 'Martínez',
    phone: '555-5678',
    email: 'maria.lopez@example.com'
  }
];

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
  const [users, setUsers] = useState(dummyUsersInitial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    paternal_last_name: '',
    maternal_last_name: '',
    phone: '',
    email: ''
  });

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

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...formData, id: editingUser.id } : u));
    } else {
      const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { ...formData, id: newId }]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Panel de Administración
          </Typography>
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
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Apellido Paterno"
              name="paternal_last_name"
              fullWidth
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
      </Box>
    </Box>
  );
}
