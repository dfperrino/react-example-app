import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { FC, useContext } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AppContext } from '../../context/app/app-context';

const Layout: FC<any> = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button onClick={() => navigate('/')}>
            <img
              data-testid="home-button"
              alt="App Logo"
              src={logo}
              width={50}
            />
          </Button>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Breacting Bad App Demo
          </Typography>
          {/**
           * We have here the available languages for the application from the context
           * if we click on one of them, we call the function from the context to change the current language (hot mode)
           */}
          {appContext.availableLangs.map((lang) => (
            <Button
              key={`language_${lang}`}
              disabled={lang === appContext.currentLocale}
              onClick={() => appContext.changeLocale(lang)}
              color="inherit"
            >
              {lang.toUpperCase()}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
