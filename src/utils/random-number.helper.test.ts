import { getRandomNumber } from './random-number.helper';

describe('getRandomNumber function', () => {
  it('should return numeric value', () => {
    expect(typeof getRandomNumber(1, 10000) === 'number').toBe(true);
  });

  it('should return random value', () => {
    expect(getRandomNumber(1, 1000000) === getRandomNumber(1, 1000000)).toBe(
      false
    );
  });

  it('should return value within bounds', () => {
    expect(getRandomNumber(1, 100) >= 1).toBe(true);
    expect(getRandomNumber(1, 100) <= 100).toBe(true);
  });
});
