import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import { ThemeService } from 'utils';

export const themeMiddleware: Middleware =
  (store) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    if (action.type === 'theme/toggleTheme') {
      ThemeService.toggleTheme();
    }

    return next(action);
  };
