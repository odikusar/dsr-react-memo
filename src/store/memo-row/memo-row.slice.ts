import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MemoFile, MemoRow } from 'models';

export interface MemoRowState {
  lastShownId: number;
  isLoading: boolean;
  memoRows: MemoRow[];
}

const initialState: MemoRowState = {
  lastShownId: null,
  isLoading: false,
  memoRows: null,
};

export const themeSlice = createSlice({
  name: 'memoRow',
  initialState,
  reducers: {
    fetchMemoRows: (currentSlice, action: PayloadAction<MemoFile>) => {
      currentSlice.memoRows = [];
    },
    fetchMemoRowsFulfilled: (
      currentSlice,
      action: PayloadAction<MemoRow[]>
    ) => {
      const { payload } = action;
      currentSlice.memoRows = payload;
    },
    setMemoRowsSelection: (
      currentSlice,
      action: PayloadAction<{
        selectedRowsIndexes: number[];
        withFlag: boolean;
      }>
    ) => {
      const { selectedRowsIndexes, withFlag } = action.payload;

      currentSlice.memoRows = currentSlice.memoRows.map((memoRow) => ({
        ...memoRow,
        isShown: false,
        isSelected:
          selectedRowsIndexes.indexOf(Number(memoRow.id)) !== -1 &&
          (!withFlag || !!memoRow.flag),
      }));
    },
    setShownMemoRowId: (currentSlice, action: PayloadAction<number>) => {
      const { payload } = action;

      currentSlice.memoRows[payload] = {
        ...currentSlice.memoRows[payload],
        isShown: true,
      };
    },
    resetMemoRows: (currentSlice) => {
      currentSlice.memoRows = currentSlice.memoRows.map((memoRow) => ({
        ...memoRow,
        isShown: false,
      }));
    },
  },
});

export const {
  fetchMemoRows,
  fetchMemoRowsFulfilled,
  setMemoRowsSelection,
  setShownMemoRowId,
  resetMemoRows,
} = themeSlice.actions;

export default themeSlice.reducer;
