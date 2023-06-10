import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import { memoFileMiddleware } from './memo-file/memo-file.middleware';
import memoFileSlice from './memo-file/memo-file.slice';
import { memoRowMiddleware } from './memo-row/memo-row.middleware';
import memoRowSlice from './memo-row/memo-row.slice';
import { themeMiddleware } from './theme/theme.middleware';
import themeSlice from './theme/theme.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    memoFile: memoFileSlice,
    memoRow: memoRowSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      themeMiddleware,
      memoRowMiddleware,
      memoFileMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
