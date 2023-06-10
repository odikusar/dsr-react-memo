import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const selectMemoRow = (state: RootState) => state.memoRow;

export const selectMemoRows = createSelector(
  selectMemoRow,
  (selectMemoRow) => selectMemoRow.memoRows
);

export const selectAllFreshInSelection = createSelector(
  selectMemoRows,
  (memoRows) =>
    memoRows &&
    memoRows.filter((memoRow) => memoRow.isSelected && !memoRow.isShown)
);

export const selectMemoRowsLeftCount = createSelector(
  selectAllFreshInSelection,
  (memoRows) => memoRows && (memoRows?.length > 0 ? memoRows?.length - 1 : 0)
);
