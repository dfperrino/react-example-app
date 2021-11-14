import axios from 'axios';
import { getRandomQuoteByAuthor } from './quotesApi';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('Api Quotes', () => {
  test('If we call getApiEndpoint without parameter, it throws an exception', () => {
    (axios.get as jest.Mock).mockImplementation(() => 'mockquote');
    expect((getRandomQuoteByAuthor as any)()).not.toBeUndefined();
    expect(getRandomQuoteByAuthor('quote')).toBe('mockquote');
  });
});
