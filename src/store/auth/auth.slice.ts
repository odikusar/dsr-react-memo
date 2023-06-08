import { createSlice } from '@reduxjs/toolkit';
import { UserProfile } from 'models';
import { RootState } from 'store/store';
import { initializeAuth, signInUser, signOutUser } from './auth.middleware';

interface AuthState {
  user: UserProfile | null;
  isInitialized: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
  isLoading: false,
  error: null,
  isAuthorized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    appInitialized: (state) => {
      state.isInitialized = true;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
        state.isAuthorized = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { appInitialized, setUser, setIsLoading, setError } =
  authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
