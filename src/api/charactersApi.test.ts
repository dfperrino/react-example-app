import axios from 'axios';
import { getAllCharacters, getCharacterById } from './charactersApi';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

describe('Api Quotes', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementation((endpoint: string) => {
      if (
        endpoint === 'baseurl/characters' ||
        endpoint === 'baseurl/characters/'
      ) {
        return 'all';
      } else {
        return 'single';
      }
    });
  });
  test('If we call getAllCharacters', () => {
    expect(getAllCharacters()).toBe('all');
  });
  test('If we call getCharacterById without id it returns all', () => {
    expect((getCharacterById as any)()).toBe('all');
  });
  test('If we call getCharacterById with id it returns single', () => {
    expect(getCharacterById(2)).toBe('single');
  });
});
