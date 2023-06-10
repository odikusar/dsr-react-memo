import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile } from 'models';
import { AuthApiService, FirebaseService } from 'utils';
import { appInitialized, setError, setUser } from './auth.slice';

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

export const signOutUser = createAsyncThunk('auth/signOutUser', async () => {
  await AuthApiService.signOut();
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: UserProfile, { dispatch }) => {
    try {
      await AuthApiService.updateUser(user.id, user);

      return user;
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError('Error updating  User'));
      }

      return;
    }
  }
);
