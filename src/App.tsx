import { CssBaseline, ThemeProvider } from '@mui/material';
import { PageNotFoundFeature } from 'features/PageNotFound/PageNotFound';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { initializeAuth } from 'store/auth/auth.middleware';
import { selectAuth } from 'store/auth/auth.selectors';
import { selectIsDarkTheme } from 'store/theme/theme.selectors';
import { ThemeService } from 'utils';
import './App.scss';
import { Header } from './components/Header/Header';
import { AboutFeature } from './features/About/About';
import LoginFeature from './features/Login/Login';
import { WorkspaceFeature } from './features/Workspace/Workspace';
import { AuthOnly } from './hoc/AuthOnly';
import { GuestOnly } from './hoc/GuestOnly';
import { useAppDispatch, useAppSelector } from './store/hooks';

export function App() {
  const isDarkTheme = useAppSelector(selectIsDarkTheme);

  const selectedTheme = isDarkTheme
    ? ThemeService.darkTheme
    : ThemeService.lightTheme;

  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div
        data-testid="mainWrapper"
        className={
          'dsr-main-wrapper ' +
          (isDarkTheme ? 'dsr-dark-theme' : 'dsr-light-theme')
        }
      >
        <div className="dsr-main-spinner" data-testid="mainSpinner"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <div
          className={
            'dsr-main-wrapper ' +
            (isDarkTheme ? 'dsr-dark-theme' : 'dsr-light-theme')
          }
        >
          <Header />
          <div className="dsr-content-wrapper">
            <Routes>
              <Route path="/about" element={<AboutFeature />} />
              <Route element={<GuestOnly />}>
                <Route path="/login" element={<LoginFeature />} />
              </Route>
              <Route element={<AuthOnly />}>
                <Route path="/" element={<WorkspaceFeature />} />
              </Route>
              <Route path="*" element={<PageNotFoundFeature />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
