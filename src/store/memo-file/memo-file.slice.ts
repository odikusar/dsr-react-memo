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
    setActiveMemoFile: (currentSlice, action) => {
      currentSlice.isLoading = false;
      currentSlice.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemoFiles.pending, (currentSlice) => {
        currentSlice.isLoading = true;
        currentSlice.error = null;
      })
      .addCase(fetchMemoFiles.fulfilled, (currentSlice, action) => {
        currentSlice.isLoading = false;
        currentSlice.memoFiles = action.payload;
      })
      .addCase(fetchMemoFiles.rejected, (currentSlice, action) => {
        currentSlice.isLoading = false;
        currentSlice.error =
          action.error.message || 'Error fetching Memo Files';
      })
      .addCase(createMemoFile.fulfilled, (currentSlice, action) => {
        currentSlice.isLoading = false;
        currentSlice.memoFiles.push(action.payload);
      });
  },
});

export const { setActiveMemoFile } = memoFileSlice.actions;

export default memoFileSlice.reducer;
