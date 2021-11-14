import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { useNavigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../context/app/app-context';
import en from '../../i18n/en.json';
import Layout from './Layout';

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: jest.fn(),
}));

const Wrapper: FC<any> = (props) => (
  <BrowserRouter>
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <SnackbarProvider>{props.children}</SnackbarProvider>
    </IntlProvider>
  </BrowserRouter>
);

describe('Layout page', () => {
  test('Layout is rendered', () => {
    render(<Layout />, { wrapper: Wrapper });
    expect(screen.getByText('Breacting Bad App Demo')).toBeInTheDocument();
  });
  test('Layout go to home click button', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    render(<Layout />, { wrapper: Wrapper });
    screen.getByTestId('home-button').click();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  test('Layout change locale click button', () => {
    const mockChangeLocale = jest.fn();
    render(
      <AppContext.Provider
        value={{
          changeLocale: mockChangeLocale,
          availableLangs: ['es', 'en'],
          currentLocale: 'en',
          messages: en,
        }}
      >
        <Layout />
      </AppContext.Provider>,
      { wrapper: Wrapper }
    );
    expect(screen.getByTestId('change-locale-button-es')).toBeInTheDocument();
    screen.getByTestId('change-locale-button-es').click();
    expect(mockChangeLocale).toHaveBeenCalledWith('es');
  });
});
