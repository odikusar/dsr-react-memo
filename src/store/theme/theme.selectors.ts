import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const selectTheme = (state: RootState) => state.theme;

export const selectIsDarkTheme = createSelector(
  selectTheme,
  (selectTheme) => selectTheme.isDarkTheme
);
