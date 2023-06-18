import {
  AnyAction,
  Dispatch,
  Middleware,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { MemoFile, UserProfile } from 'models';
import { updateUser } from 'store/auth/auth.middleware';
import { fetchMemoRows } from 'store/memo-row/memo-row.slice';
import { AppDispatch, RootState } from 'store/store';
import { MemoFileApiService } from 'utils';

export const fetchMemoFiles = createAsyncThunk(
  'memoFile/fetchAll',
  async (currentUserId: string, { getState, dispatch }) => {
    const memoFiles = await MemoFileApiService.fetchAll(currentUserId);
    const state = getState() as RootState;
    const activeMemoFileId = state.auth.user.activeMemoFileId;
    let activeMemoFile = memoFiles.find(
      (memoFile) => memoFile.id === activeMemoFileId
    );

    if (!activeMemoFile) {
      activeMemoFile = memoFiles[0];
    }

    dispatch(fetchMemoRows(activeMemoFile));

    return memoFiles;
  }
);

export const createMemoFile = createAsyncThunk(
  'memoFile/create',
  async (memoFile: MemoFile) => {
    const response = await MemoFileApiService.create(memoFile);

    return response;
  }
);

export const updateMemoFile = createAsyncThunk(
  'memoFile/update',
  async (memoFile: MemoFile) => {
    const response = await MemoFileApiService.update(memoFile);

    return response;
  }
);

export const deleteMemoFile = createAsyncThunk(
  'memoFile/delete',
  async (memoFile: MemoFile) => {
    await MemoFileApiService.delete(memoFile.id);

    return memoFile;
  }
);

export const memoFileMiddleware: Middleware =
  (store) =>
  (next: Dispatch<AnyAction>) =>
  (action: PayloadAction<MemoFile>) => {
    if (action.type === 'memoFile/setActiveMemoFile') {
      const user = store.getState().auth.user as UserProfile;
      const dispatch = store.dispatch as AppDispatch;

      dispatch(fetchMemoRows(action.payload));
      dispatch(updateUser({ ...user, activeMemoFileId: action.payload.id }));
    }

    return next(action);
  };
