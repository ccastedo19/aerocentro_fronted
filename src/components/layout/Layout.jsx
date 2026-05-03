// components/layout/Layout.jsx
import React, { useState } from 'react';
import { styled, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useThemeMode } from '../../context/ThemeContext';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const Layout = () => {
  const [open, setOpen] = useState(true);
  const { theme: themeMode } = useThemeMode();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const muiTheme = createTheme({
    palette: {
      primary: themeMode.palette.primary,
      secondary: themeMode.palette.secondary,
      background: {
        default: themeMode.palette.background.default,
        paper: themeMode.palette.background.paper,
      },
      text: themeMode.palette.text,
      divider: themeMode.palette.divider,
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            backgroundColor: themeMode.palette.background.paper, // 👈 Cambiado a paper
            minHeight: '100vh'
          }}
        >
          <DrawerHeader />
          <Box sx={{ 
            bgcolor: themeMode.palette.background.paper, // 👈 Cambiado a paper
            borderRadius: 2,
            p: 3,
            minHeight: 'calc(100vh - 120px)'
          }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};