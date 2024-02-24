import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuth} from "../base/context/useAuth";

export default function ButtonAppBar() {
  const {isAuthenticated, username} = useAuth();
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
            News
          </Typography>
          {isAuthenticated ? (
              <Typography color="inherit">Welcome, {username}
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="logout"
                    sx={{mr: 2}}
                >
                  <LogoutIcon/>
                </IconButton>
              </Typography>
          ) : (
              <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}