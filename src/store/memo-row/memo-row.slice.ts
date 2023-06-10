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
    fetchMemoRows: (state, action: PayloadAction<MemoFile>) => {
      state.memoRows = [];
    },
    fetchMemoRowsFulfilled: (state, action: PayloadAction<MemoRow[]>) => {
      const { payload } = action;
      state.memoRows = payload;
    },
    setMemoRowsSelection: (
      state,
      action: PayloadAction<{
        selectedRowsIndexes: number[];
        withFlag: boolean;
      }>
    ) => {
      const { selectedRowsIndexes, withFlag } = action.payload;

      state.memoRows = state.memoRows.map((memoRow) => ({
        ...memoRow,
        isShown: false,
        isSelected:
          selectedRowsIndexes.indexOf(Number(memoRow.id)) !== -1 &&
          (!withFlag || !!memoRow.flag),
      }));
    },
    setShownMemoRowId: (state, action: PayloadAction<number>) => {
      const { payload } = action;

      state.memoRows[payload] = {
        ...state.memoRows[payload],
        isShown: true,
      };
    },
  },
});

export const {
  fetchMemoRows,
  fetchMemoRowsFulfilled,
  setMemoRowsSelection,
  setShownMemoRowId,
} = themeSlice.actions;

export default themeSlice.reducer;
