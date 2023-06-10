import { createSlice } from '@reduxjs/toolkit';
import { MemoFile } from 'models';
import { createMemoFile, fetchMemoFiles } from './memo-file.middleware';

interface MemoFileState {
  memoFiles: MemoFile[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MemoFileState = {
  memoFiles: [],
  isLoading: false,
  error: null,
};

const memoFileSlice = createSlice({
  name: 'memoFile',
  initialState,
  reducers: {
    setActiveMemoFile: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemoFiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMemoFiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memoFiles = action.payload;
      })
      .addCase(fetchMemoFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching Memo Files';
      })
      .addCase(createMemoFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memoFiles.push(action.payload);
      });
  },
});

export const { setActiveMemoFile } = memoFileSlice.actions;

export default memoFileSlice.reducer;
