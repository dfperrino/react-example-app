import { act, render, screen } from '@testing-library/react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter as Router } from 'react-router-dom';
import { getAllCharacters } from '../../api/charactersApi';
import { CharactersContext } from '../../context/characters/characters-context';
import en from '../../i18n/en.json';
import Home from './Home';
jest.mock('../../api/charactersApi', () => ({
  getAllCharacters: jest.fn(),
}));
jest.mock('notistack', () => ({
  ...(jest.requireActual('notistack') as any),
  useSnackbar: jest.fn(),
}));
const Wrapper: FC<any> = (props) => (
  <Router>
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <CharactersContext.Provider
        value={{ characters: [], setCharacters: jest.fn() }}
      >
        <SnackbarProvider>{props.children}</SnackbarProvider>
      </CharactersContext.Provider>
    </IntlProvider>
  </Router>
);

const mockCharacters = [
  {
    char_id: 1,
    name: 'mock',
    birthday: '01-01-1999',
    occupation: [''],
    img: 'https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441',
    status: '',
    appearance: [1],
    nickname: 'mock1',
    portrayed: '',
  },
  {
    char_id: 2,
    name: 'mock2',
    birthday: '01-01-1999',
    occupation: [''],
    img: 'https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441',
    status: '',
    appearance: [1],
    nickname: 'mock2',
    portrayed: '',
  },
];

describe('home page', () => {
  const promiseCharacters = Promise.resolve({
    data: mockCharacters,
  });
  const getAllCharactersPromise = () => promiseCharacters;
  const enqueueSnackbar = jest.fn();
  beforeEach(() => {
    (getAllCharacters as jest.Mock).mockImplementation(getAllCharactersPromise);
    (useSnackbar as jest.Mock).mockImplementation(() => ({
      enqueueSnackbar,
    }));
  });
  test('renders home page with spinner (default loading)', async () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await act(() => promiseCharacters as any);
  });
  test('renders home page with content', async () => {
    render(
      <CharactersContext.Provider
        value={{
          characters: mockCharacters,
          setCharacters: jest.fn(),
        }}
      >
        <Home />
      </CharactersContext.Provider>,
      { wrapper: Wrapper }
    );
    expect(screen.getAllByTestId('home-character')).toHaveLength(2);
  });
  test('renders home page with promise reject in characters call', async () => {
    (getAllCharacters as jest.Mock).mockImplementation(() => Promise.reject());
    jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await act(() => promiseCharacters as any);
  });
  test('renders home page with promise reject in data', async () => {
    (getAllCharacters as jest.Mock).mockImplementation(() =>
      Promise.resolve({ noData: true })
    );
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await act(() => promiseCharacters as any);
  });
  test('renders home page and click reset filter', async () => {
    render(<Home />, { wrapper: Wrapper });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    screen.getByTestId('input-remove-button').click();
    await act(() => promiseCharacters as any);
  });
});
