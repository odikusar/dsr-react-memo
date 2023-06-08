import { createTheme } from '@mui/material';
import { IS_DARK_THEME_BY_DEFAULT, THEME_FLAG } from 'constants/index';

export class ThemeService {
  static toggleTheme(): void {
    localStorage.setItem(THEME_FLAG, JSON.stringify(!this.isDarkTheme()));
  }

  static isDarkTheme(): boolean {
    const currentStorageValue: string | null = localStorage.getItem(THEME_FLAG);

    return !!currentStorageValue
      ? JSON.parse(currentStorageValue)
      : IS_DARK_THEME_BY_DEFAULT;
  }

  static readonly darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#424242',
      },
      primary: {
        main: '#fff',
      },
      secondary: {
        main: '#fff',
      },
    },
  });

  static readonly lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#eee8e8',
      },
      primary: {
        main: '#2d2b2bde',
      },
      secondary: {
        main: '#2d2b2bde',
      },
    },
  });
}
