import React from 'react';
import Login from './login';
import LoginRedirect from './LoginRedirect';
import Dashboard from './Dashboard';
import { DrawerProvider } from './context/DrawerContext';
import UsersPage from './pages/UsersPage';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <DrawerProvider> {/* Mueve DrawerProvider aquí para que cubra todas las rutas */}
        <Routes>
          <Route path="/" element={<LoginRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard /> {/* Cambié UsersPage por Dashboard para mantener consistencia */}
              </PrivateRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <UsersPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </DrawerProvider>
    </Router>
  );
}

export default App;