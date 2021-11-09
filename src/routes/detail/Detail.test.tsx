import { act, render, screen } from '@testing-library/react';
import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import { useParams } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { getCharacterById } from '../../api/charactersApi';
import { getRandomQuoteByAuthor } from '../../api/quotesApi';
import { CharactersContext } from '../../context/characters/characters-context';
import en from '../../i18n/en.json';
import Detail from './Detail';
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useParams: jest.fn(),
}));
jest.mock('../../api/charactersApi', () => ({
  getCharacterById: jest.fn(),
}));
jest.mock('../../api/quotesApi', () => ({
  getRandomQuoteByAuthor: jest.fn(),
}));

const Wrapper: FC<any> = (props) => (
  <Router>
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <CharactersContext.Provider
        value={{ characters: [], setCharacters: jest.fn() }}
      >
        {props.children}
      </CharactersContext.Provider>
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
  const promiseQuote = Promise.resolve({
    data: [{ quote: 'random quote mock' }],
  });
  const getCharacterByIdPromise = () => promiseCharacter;
  const getRandomQuoteByAuthorPromise = () => promiseQuote;
  beforeEach(() => {
    (useParams as jest.Mock).mockImplementation(() => {
      return { id: 1 };
    });
    (getCharacterById as jest.Mock).mockImplementation(getCharacterByIdPromise);
    (getRandomQuoteByAuthor as jest.Mock).mockImplementation(
      getRandomQuoteByAuthorPromise
    );
  });
  test('renders detail page with spinner (default loading)', async () => {
    render(<Detail />, { wrapper: Wrapper });
    expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
    await act(() => promiseCharacter as any);
  });
  test('renders detail page with content', async () => {
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
});
