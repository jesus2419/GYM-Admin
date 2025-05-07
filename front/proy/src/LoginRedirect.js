import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './login';

function LoginRedirect() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setChecking(false);
      return;
    }

    axios.get('http://localhost:3001/api/authenticate', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setIsValid(true);
      navigate('/dashboard');
    })
    .catch(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setChecking(false);
    });
  }, [navigate]);

  // Mostrar nada mientras se verifica el token
  if (checking) return null;

  // Si no hay token o es inválido, mostrar Login
  return <Login />;
}

export default LoginRedirect;
