import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { initializeAuth } from 'store/auth/auth.middleware';
import { selectAuth } from 'store/auth/auth.slice';
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
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  const selectedTheme = isDarkTheme
    ? ThemeService.darkTheme
    : ThemeService.lightTheme;

  const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector(selectAuth);

  // Remove to external hook???? !!!!!!!!!!!!!
  useEffect(() => {
    // FirebaseService.init();
    // getAuth().onAuthStateChanged((user: User | null) => {
    //   console.info(user);
    //   dispatch(init({ wew: 1 }));
    // });
    dispatch(initializeAuth());
  }, []);

  if (!isInitialized) {
    return (
      <div
        className={
          'dsr-main-wrapper ' +
          (isDarkTheme ? 'dsr-dark-theme' : 'dsr-light-theme')
        }
      >
        <div className="dsr-main-spinner"></div>
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
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
