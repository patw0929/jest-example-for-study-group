import sum from '../sum';

describe('sum', () => {
  it('should be add two numbers', () => {
    expect(sum(2, 2)).toBe(4);
  });

  it('should be match snapshot', () => {
    expect(sum(2, 2)).toMatchSnapshot();
  });
});
