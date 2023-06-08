import { createAsyncThunk } from '@reduxjs/toolkit';
import { MemoFileApiService } from 'utils';

export const fetchMemoFiles = createAsyncThunk(
  'memoFile/fetchMemoFiles',
  async () => {
    const response = await MemoFileApiService.fetchAll();

    return response;
  }
);
