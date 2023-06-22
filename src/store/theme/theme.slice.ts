import { createSlice } from '@reduxjs/toolkit';
import { ThemeService } from 'utils';

export interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: ThemeService.isDarkTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (currentSlice) => {
      currentSlice.isDarkTheme = !currentSlice.isDarkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
