import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuth} from "../context/useAuth";
import {Link as RouterLink} from 'react-router-dom'
import ROUTES from "../config/route";

export default function ButtonAppBar() {
  const {isAuthenticated, logout, username} = useAuth();

  console.log('ButtonAppBar isAuthenticated', isAuthenticated)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React
          </Typography>
          {isAuthenticated ? (
              <Typography color="inherit">Welcome, {username}
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="logout"
                    sx={{mr: 2}}
                    onClick={logout}
                >
                  <LogoutIcon/>
                </IconButton>
              </Typography>
          ) : (
              <Button component={RouterLink} to={ROUTES.auth.loginPage} color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}