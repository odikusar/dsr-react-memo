import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApiService, FirebaseService } from 'utils';
import { appInitialized, setUser } from './auth.slice';

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const user = await AuthApiService.signIn(email, password);

      if (user) {
        const docSnap = await AuthApiService.fetchUser(user.uid);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          dispatch(setUser(userData));
        } else {
          dispatch(setUser(null));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(null);
      }
    }
  }
);

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    FirebaseService.init();

    const unsubscribe = FirebaseService.auth.onAuthStateChanged(
      async (user) => {
        if (user) {
          const docSnap = await AuthApiService.fetchUser(user.uid);
          dispatch(appInitialized());

          if (docSnap.exists()) {
            const userData = docSnap.data();
            dispatch(setUser(userData));
          } else {
            dispatch(setUser(null));
          }
        } else {
          dispatch(appInitialized());
        }
      }
    );

    unsubscribe();
  }
);

export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  await AuthApiService.signOut();
});
