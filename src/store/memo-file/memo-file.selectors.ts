import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const selectMemoFile = (state: RootState) => state.memoFile;

export const selectMemoFiles = createSelector(
  selectMemoFile,
  (selectMemoFile) => selectMemoFile.memoFiles
);
