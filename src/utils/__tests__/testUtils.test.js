import testUtils from '../testUtils';

describe('testUtils', function() {
  let store;
  let state;

  beforeEach(() => {
    state = {
      foo: 'bar',
    };
    store = testUtils(state);
  });

  ['default', 'subscribe', 'dispatch', 'getState'].forEach(targetFunc => {
    it(`should have ${targetFunc} function`, () => {
      expect(typeof store[targetFunc]).toBe('function');
    });
  });

  it('getState should state', () => {
    expect(store.getState()).toEqual({ foo: 'bar' });
  });
});
