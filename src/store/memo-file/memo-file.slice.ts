import { createSlice } from '@reduxjs/toolkit';
import { MemoFile } from 'models';
import { RootState } from 'store/store';
import { fetchMemoFiles } from './memo-file.middleware';

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
  reducers: {},
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
      });
  },
});

// export const { appInitialized, setUser, setIsLoading, setError } =
//   authSlice.actions;

export default memoFileSlice.reducer;

export const selectMemoFile = (state: RootState) => state.memoFile;