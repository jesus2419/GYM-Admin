import React from 'react';
import { 
  Box,
  Typography,
  AppBar,
  Button,

  Toolbar,
  IconButton,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el token de autenticación
    localStorage.removeItem('token');
    // Redirigir al login
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Panel de Control
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Toolbar>
        </AppBar>
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            minHeight: '100vh',
            backgroundColor: (theme) => 
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
          }}
        >
          <Toolbar /> {/* Espacio para el AppBar */}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h2" gutterBottom>
              Bienvenido al Dashboard
            </Typography>
            <Typography variant="body1">
              Esta es la pantalla principal de tu aplicación. Aquí puedes agregar gráficos, 
              estadísticas o cualquier otro contenido relevante.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;