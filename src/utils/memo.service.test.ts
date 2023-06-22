import { MemoService } from './memo.service';

describe('MemoService', () => {
  it('should generate first and last indexes by pages', () => {
    expect(MemoService.getBoundaryRowsIndexes([0, 1, 2], 400, 53)).toEqual({
      firstRowIndex: 0,
      lastRowIndex: 158,
    });
  });

  it('should return selected rows indexes', () => {
    expect(MemoService.getSelectedRowsIndexes([0, 2, 4, 5], 4, 15, 5)).toEqual([
      4, 10, 11, 12, 13, 14,
    ]);
  });

  it('should return pages numbers with selected rows indexes', () => {
    expect(
      MemoService.getPagesWithRows([0, 1, 3, 5], [0, 1, 6, 26], 5)
    ).toEqual([0, 1, 5]);
  });
});
