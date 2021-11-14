import { getApiEndpoint } from './utils';

describe('Api utils', () => {
  test('If we call getApiEndpoint without parameter, it throws an exception', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => (getApiEndpoint as any)()).toThrowError();
  });
  test('If we call getApiEndpoint with a parameter, and the env variable doesnt exist, it returns empty', () => {
    expect(() => getApiEndpoint('hola')).not.toThrowError();
    expect(getApiEndpoint('hola')).toBe('');
  });
  test('If we call getApiEndpoint with a parameter, and the env variable exists, it returns the endpoint (base + end)', () => {
    expect(() => getApiEndpoint('get_all_characters')).not.toThrowError();
    expect(getApiEndpoint('get_all_characters')).toBe('baseurl/characters');
  });
});
