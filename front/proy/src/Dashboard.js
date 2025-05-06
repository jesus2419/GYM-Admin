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
  IconButton
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

const dummyUsers = [
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
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
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.paternal_last_name}</TableCell>
                    <TableCell>{user.maternal_last_name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
