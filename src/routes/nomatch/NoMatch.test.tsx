import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { useNavigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import en from '../../i18n/en.json';
import NoMatch from './NoMatch';

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

describe('NoMatch page', () => {
  test('NoMatch is rendered', () => {
    render(<NoMatch />, { wrapper: Wrapper });
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });
  test('NoMatch click button', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    render(<NoMatch />, { wrapper: Wrapper });
    screen.getByText('Back to Home').click();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
