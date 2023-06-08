import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import { themeMiddleware } from './theme/theme.middleware';
import themeSlice from './theme/theme.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(themeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;