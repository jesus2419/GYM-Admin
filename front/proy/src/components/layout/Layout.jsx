import React from 'react';
import { Box } from '@mui/material';
import AppBar from './AppBar';
import Drawer from './Drawer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;