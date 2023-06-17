import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserProfile } from 'models';
import {
  initializeAuth,
  signInUser,
  signOutUser,
  updateUser,
} from './auth.middleware';

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
    setUser: (currentSlice, action: PayloadAction<UserProfile>) => {
      currentSlice.user = action.payload;
      currentSlice.isAuthorized = !!action.payload;
      currentSlice.isLoading = false;
      currentSlice.error = null;
    },
    appInitialized: (currentSlice) => {
      currentSlice.isInitialized = true;
    },
    setIsLoading: (currentSlice, action: PayloadAction<boolean>) => {
      currentSlice.isLoading = action.payload;
    },
    setError: (currentSlice, action) => {
      currentSlice.error = action.payload;
    },
    optimisticUserUpdate: (
      currentSlice,
      action: PayloadAction<UserProfile>
    ) => {
      currentSlice.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (currentSlice) => {
        currentSlice.isLoading = true;
        currentSlice.error = null;
      })
      .addCase(initializeAuth.rejected, (currentSlice, action) => {
        currentSlice.isLoading = false;
        currentSlice.error = action.error.message || null;
      })
      .addCase(initializeAuth.fulfilled, (currentSlice, action) => {
        currentSlice.isLoading = false;
      })
      .addCase(signInUser.pending, (currentSlice) => {
        currentSlice.isLoading = true;
        currentSlice.error = null;
      })
      .addCase(signInUser.fulfilled, (currentSlice) => {
        currentSlice.isLoading = false;
        currentSlice.error = null;
      })
      .addCase(signInUser.rejected, (currentSlice, action) => {
        currentSlice.isLoading = false;
        currentSlice.error = action.payload as string;
      })
      .addCase(updateUser.pending, (currentSlice, action) => {
        currentSlice.isLoading = true;
        currentSlice.error = null;
      })
      .addCase(updateUser.fulfilled, (currentSlice, action) => {
        currentSlice.isLoading = false;
        currentSlice.error = null;
        currentSlice.user = action.payload;
      })
      .addCase(signOutUser.pending, (currentSlice) => {
        currentSlice.isLoading = true;
        currentSlice.error = null;
      })
      .addCase(signOutUser.fulfilled, (currentSlice) => {
        currentSlice.user = null;
        currentSlice.isLoading = false;
        currentSlice.error = null;
        currentSlice.isAuthorized = false;
      })
      .addCase(signOutUser.rejected, (currentSlice, action) => {
        currentSlice.isLoading = false;
        currentSlice.error = action.payload as string;
      });
  },
});

export const {
  appInitialized,
  setUser,
  setIsLoading,
  setError,
  optimisticUserUpdate,
} = authSlice.actions;

export default authSlice.reducer;
