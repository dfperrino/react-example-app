import { createTheme, ThemeProvider } from '@mui/material';
import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { useRoutes } from 'react-router';
import './App.css';
import { AppContext } from './context/app/app-context';
import { CharactersProvider } from './context/characters/characters-provider';
import { appRoutes } from './routes/routes';

function App() {
  const routerOutlet = useRoutes(appRoutes);
  const appContext = useContext(AppContext);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#29773E',
      },
    },
  });

  return (
    <IntlProvider
      messages={appContext.messages}
      locale={appContext.currentLocale}
      defaultLocale="es"
    >
      <ThemeProvider theme={theme}>
        <CharactersProvider>{routerOutlet}</CharactersProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
