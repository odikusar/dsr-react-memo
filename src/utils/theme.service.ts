import { createTheme } from '@mui/material';
import {
  COLOR_DARK_BG,
  COLOR_DARK_PRIMARY,
  COLOR_DARK_SECONDARY,
  COLOR_LIGHT_BG,
  COLOR_LIGHT_PRIMARY,
  COLOR_LIGHT_SECONDARY,
  IS_DARK_THEME_BY_DEFAULT,
  THEME_FLAG,
} from 'constants/index';

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
        default: COLOR_DARK_BG,
      },
      primary: {
        main: COLOR_DARK_PRIMARY,
      },
      secondary: {
        main: COLOR_DARK_SECONDARY,
      },
    },
  });

  static readonly lightTheme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: COLOR_LIGHT_BG,
      },
      primary: {
        main: COLOR_LIGHT_PRIMARY,
      },
      secondary: {
        main: COLOR_LIGHT_SECONDARY,
      },
    },
  });
}
