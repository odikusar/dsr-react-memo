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
  },
});

export const { fetchMemoRows, fetchMemoRowsFulfilled } = themeSlice.actions;

export default themeSlice.reducer;
