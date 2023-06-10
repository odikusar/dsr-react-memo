import { MemoRow } from 'models';
import { RandomNumberService } from './random-number.service';

interface BoundaryIndexes {
  firstRowIndex: number;
  lastRowIndex: number;
}

export class MemoService {
  static getBoundaryRowsIndexes(
    pages: number[],
    rowsTotalCount: number,
    rowsPerPage: number
  ): BoundaryIndexes {
    const firstPage = pages[0];
    const lastPage = pages[pages.length - 1];

    const lastTotalRowIndex = rowsTotalCount - 1 || 0;

    const firstRowIndex = firstPage * rowsPerPage;

    let lastRowIndex = (lastPage + 1) * rowsPerPage - 1;

    lastRowIndex =
      lastRowIndex > lastTotalRowIndex ? lastTotalRowIndex : lastRowIndex;

    return { firstRowIndex, lastRowIndex };
  }

  static getSelectedRowsIndexes(
    pages: number[],
    fromRowIndex: number,
    toRowIndex: number,
    rowsPerPage: number
  ): number[] {
    let selectedRowsIndexes: number[] = [];

    pages.forEach((pageIndex) => {
      let firstRowIndex = pageIndex * rowsPerPage;
      firstRowIndex =
        fromRowIndex > firstRowIndex ? fromRowIndex : firstRowIndex;

      let lastRowIndex = (pageIndex + 1) * rowsPerPage - 1;
      lastRowIndex = lastRowIndex > toRowIndex ? toRowIndex : lastRowIndex;

      for (let i = firstRowIndex; i <= lastRowIndex; i++) {
        selectedRowsIndexes.push(i);
      }
    });

    return selectedRowsIndexes;
  }

  static getRandomMemoRow(memoRows: MemoRow[]): MemoRow {
    let randomMemoRowId: number = null;
    let randomMemoRow: MemoRow = null;

    do {
      randomMemoRowId = RandomNumberService.get(
        memoRows[0].id,
        memoRows[memoRows.length - 1].id
      );

      randomMemoRow = memoRows.find(
        (memoRow) => memoRow.id === randomMemoRowId
      );
    } while (!randomMemoRow);

    return randomMemoRow;
  }

  static getSelectedPages(checkedPages: boolean[]): number[] {
    return checkedPages.reduce(
      (out, value, index) => (!!value ? out.concat(index) : out),
      []
    );
  }
}
