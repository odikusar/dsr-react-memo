import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  it('should toggle theme value', () => {
    const prevValue = ThemeService.isDarkTheme();

    ThemeService.toggleTheme();
    const newValue = ThemeService.isDarkTheme();

    expect(prevValue === newValue).toBe(false);
  });
});
