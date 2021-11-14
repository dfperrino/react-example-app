import { act, render, screen } from '@testing-library/react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { useNavigate, useParams } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { getCharacterById } from '../../api/charactersApi';
import { getRandomQuoteByAuthor } from '../../api/quotesApi';
import { CharactersContext } from '../../context/characters/characters-context';
import en from '../../i18n/en.json';
import Detail from './Detail';
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../../api/charactersApi', () => ({
  getCharacterById: jest.fn(),
}));
jest.mock('../../api/quotesApi', () => ({
  getRandomQuoteByAuthor: jest.fn(),
}));
jest.mock('notistack', () => ({
  ...(jest.requireActual('notistack') as any),
  useSnackbar: jest.fn(),
}));

const Wrapper: FC<any> = (props) => (
  <Router>
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <SnackbarProvider>{props.children}</SnackbarProvider>
    </IntlProvider>
  </Router>
);

const mockCharacter = {
  char_id: 1,
  name: 'mock',
  birthday: '01-01-1999',
  occupation: [''],
  img: 'https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441',
  status: '',
  appearance: [1],
  nickname: '',
  portrayed: '',
};

describe('detail page', () => {
  const promiseCharacter = Promise.resolve({
    data: [mockCharacter],
  });
  const getCharacterByIdPromise = () => promiseCharacter;
  const enqueueSnackbar = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useSnackbar as jest.Mock).mockImplementation(() => ({
      enqueueSnackbar,
    }));
    (useParams as jest.Mock).mockImplementation(() => {
      return { id: 1 };
    });
  });
  test('renders detail page with spinner (default loading)', async () => {
    const promiseQuote = Promise.resolve({
      data: [{ quote: 'random quote mock' }],
    });
    const getRandomQuoteByAuthorPromise = () => promiseQuote;
    (getCharacterById as jest.Mock).mockImplementation(getCharacterByIdPromise);
    (getRandomQuoteByAuthor as jest.Mock).mockImplementation(
      getRandomQuoteByAuthorPromise
    );
    render(<Detail />, { wrapper: Wrapper });
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
    await act(() => promiseCharacter as any);
  });
  test('renders detail page with content', async () => {
    const promiseQuote = Promise.resolve({
      data: [{ quote: 'random quote mock' }],
    });
    const getRandomQuoteByAuthorPromise = () => promiseQuote;
    (getCharacterById as jest.Mock).mockImplementation(getCharacterByIdPromise);
    (getRandomQuoteByAuthor as jest.Mock).mockImplementation(
      getRandomQuoteByAuthorPromise
    );
    render(
      <CharactersContext.Provider
        value={{
          characters: [mockCharacter],
          setCharacters: jest.fn(),
        }}
      >
        <Detail />
      </CharactersContext.Provider>,
      { wrapper: Wrapper }
    );
    expect(screen.getByTestId('card-media-image')).toBeInTheDocument();
    await act(() => promiseQuote as any);
  });
  test('renders detail page with catch on random quote', async () => {
    const promiseQuote = Promise.resolve({});
    const getRandomQuoteByAuthorPromise = () => promiseQuote;
    (getCharacterById as jest.Mock).mockImplementation(getCharacterByIdPromise);
    (getRandomQuoteByAuthor as jest.Mock).mockImplementation(
      getRandomQuoteByAuthorPromise
    );
    render(
      <CharactersContext.Provider
        value={{
          characters: [mockCharacter],
          setCharacters: jest.fn(),
        }}
      >
        <Detail />
      </CharactersContext.Provider>,
      { wrapper: Wrapper }
    );
    await act(() => promiseQuote as any);
    expect(
      screen.getByText('- Quote not available or non existent')
    ).toBeInTheDocument();
  });
  test('renders detail page with catch on promise', async () => {
    const promiseQuote = Promise.reject('error');
    const getRandomQuoteByAuthorPromise = () => promiseQuote;
    (getCharacterById as jest.Mock).mockImplementation(getCharacterByIdPromise);
    (getRandomQuoteByAuthor as jest.Mock).mockImplementation(
      getRandomQuoteByAuthorPromise
    );
    jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Detail />, { wrapper: Wrapper });
    await act(() => promiseCharacter as any);
    expect(enqueueSnackbar).toHaveBeenCalled();
  });
  test('renders detail page with catch error on character', async () => {
    const promiseChar = Promise.resolve('not_valid');
    const getCharacterPromise = () => promiseChar;
    jest.spyOn(console, 'error').mockImplementation(() => {});
    (getCharacterById as jest.Mock).mockImplementation(getCharacterPromise);
    render(<Detail />, { wrapper: Wrapper });
    await act(() => promiseChar as any);
    expect(enqueueSnackbar).toHaveBeenCalled();
  });
  test('renders detail page with catch error on promise getting character', async () => {
    const promiseChar = Promise.reject('not_valid');
    const getCharacterPromise = () => promiseChar;
    jest.spyOn(console, 'error').mockImplementation(() => {});
    (getCharacterById as jest.Mock).mockImplementation(getCharacterPromise);
    render(<Detail />, { wrapper: Wrapper });
    await act(() => promiseCharacter as any);
    expect(enqueueSnackbar).toHaveBeenCalled();
  });
  test('renders detail page and buttons', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    const promiseQuote = Promise.reject('error');
    const getRandomQuoteByAuthorPromise = () => promiseQuote;
    (getRandomQuoteByAuthor as jest.Mock).mockImplementation(
      getRandomQuoteByAuthorPromise
    );
    render(
      <CharactersContext.Provider
        value={{
          characters: [mockCharacter],
          setCharacters: jest.fn(),
        }}
      >
        <Detail />
      </CharactersContext.Provider>,
      { wrapper: Wrapper }
    );
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(screen.getByTestId('detail-go-home-button')).toBeInTheDocument();
    expect(screen.getByTestId('detail-new-quote-button')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
    screen.getByTestId('detail-go-home-button').click();
    screen.getByTestId('detail-new-quote-button').click();
    await act(() => promiseCharacter as any);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
