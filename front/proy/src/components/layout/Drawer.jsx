import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Drawer, 
  Toolbar, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import {
  People as PeopleIcon,
  FitnessCenter as FitnessCenterIcon,
  Payment as PaymentIcon,
  EventNote as EventNoteIcon,
  CreditCard as CreditCardIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDrawer } from '../../context/DrawerContext';

// Definir el ancho del drawer como constante
const drawerWidth = 240;

const navItems = [
  { text: 'Usuarios', icon: <PeopleIcon />, path: '/users' },
  { text: 'Planes', icon: <FitnessCenterIcon />, path: '/plans' },
  { text: 'Opciones de Pago', icon: <PaymentIcon />, path: '/payment-options' },
  { text: 'Subscripciones', icon: <EventNoteIcon />, path: '/subscriptions' },
  { text: 'Pagos Programados', icon: <CreditCardIcon />, path: '/scheduled-payments' },
  { text: 'Entrenadores', icon: <AccountCircleIcon />, path: '/trainers' }
];

const CustomDrawer = () => {
  const navigate = useNavigate();
  const { drawerOpen, toggleDrawer } = useDrawer();

  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={toggleDrawer}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box' 
        }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item, index) => (
            <ListItem 
              button 
              key={index} 
              component={Link} 
              to={item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;