import React, { FC, useEffect, useState } from 'react';
import { AppContext } from './app-context';

export const AppProvider: FC = (props) => {
  const [currentLocale, setCurrentLocale] = useState<string>('es');
  const [messages, setMessages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    import(`../../i18n/${currentLocale}.json`)
      .then((msgs) => setMessages(msgs))
      .catch((error) => console.error(error));
  }, [currentLocale]);

  return (
    <AppContext.Provider
      value={{
        currentLocale,
        changeLocale: setCurrentLocale,
        messages,
        availableLangs: ['es', 'en'],
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
