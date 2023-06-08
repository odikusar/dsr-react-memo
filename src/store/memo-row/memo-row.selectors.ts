import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const selectMemoRow = (state: RootState) => state.memoRow;

export const selectMemoRows = createSelector(
  selectMemoRow,
  (selectMemoRow) => selectMemoRow.memoRows
);
