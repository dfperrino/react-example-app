import { createContext } from 'react';

export interface IAppContext {
  currentLocale: string;
  changeLocale: (newLocale: string) => void;
  messages: { [key: string]: string };
  availableLangs: string[];
}

export const AppContext = createContext<IAppContext>({
  currentLocale: 'es',
  changeLocale: () => {},
  messages: {},
  availableLangs: ['es', 'en'],
});
