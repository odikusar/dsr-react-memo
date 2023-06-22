import { getFileName } from './filename.helper';

describe('getFileName function', () => {
  fit('returns short file name', () => {
    expect(getFileName('LongTestFileName.csv')).toBe('LongTestFile');
  });
});
