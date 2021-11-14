import { appRoutes } from './routes';

describe('Routes object is exported', () => {
  test('Routes object', () => {
    expect(appRoutes).toBeDefined();
    expect(appRoutes).toHaveLength(1);
    expect(appRoutes[0].children).toHaveLength(3);
  });
});
