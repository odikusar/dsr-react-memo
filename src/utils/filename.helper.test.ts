import { getFileName } from './filename.helper';

describe('getFileName function', () => {
  it('returns short file name', () => {
    expect(getFileName('LongTestFileName.csv')).toBe('LongTestFile');
  });

  it('returns empty string for empty file name', () => {
    expect(getFileName('')).toBe('');
  });
});
