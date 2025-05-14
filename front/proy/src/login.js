import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import { 
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const defaultTheme = createTheme();

function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const showSnackbar = (message, severity = 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    if (!email || !password) {
      showSnackbar('Por favor complete todos los campos');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('http://192.168.56.1:3001/api/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 segundos de timeout
      });
  
      console.log('Respuesta API:', response.data);
  
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        showSnackbar('Inicio de sesión exitoso', 'success');
        setTimeout(() => navigate('/users'), 1500);
      } else {
        throw new Error('Respuesta de API inválida');
      }
    } catch (err) {
      console.error('Error en login:', err);
      
      let errorMessage = 'Error al iniciar sesión';
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'El servidor no responde. Intente nuevamente más tarde';
      } else if (err.message === 'Network Error') {
        errorMessage = 'No se pudo conectar al servidor. Verifique su conexión';
      } else if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Credenciales incorrectas';
        } else if (err.response.status === 500) {
          errorMessage = 'Error del servidor';
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      showSnackbar(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ mt: 1, width: '100%' }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Acceder'}
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Login;