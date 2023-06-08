import PersonIcon from '@mui/icons-material/Person';
import './Header.scss';
// {/* <Link to="/">Workspace</Link> |<Link to="/about">About</Link> | */}
// {/* <Link to="/login">Login</Link> | */}
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import LogoutIcon from '@mui/icons-material/Logout';
import { Switch } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { signOutUser } from 'store/auth/auth.middleware';
import { selectAuth } from 'store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../store/theme/theme.slice';

export function Header() {
  const { user, isAuthorized } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  const handleSignOut = () => {
    dispatch(signOutUser());

    return <Navigate to="/login" />;
  };

  return (
    <div className="dsr-header-toolbar mat-toolbar">
      <div className="dsr-header-toolbar__content">
        <div className="dsr-header-toolbar__title dsr-hide-for-small dsr-header-title">
          Dikusar Angular App.
        </div>

        <div className="dsr-header-toolbar__side-block"></div>
        {!isAuthorized && <div></div>}

        <div className="dsr-header-toolbar__theme">
          <Switch
            checked={isDarkTheme}
            name="theme"
            onChange={() => dispatch(toggleTheme())}
          />
          {isDarkTheme ? <Brightness5Icon /> : <Brightness4Icon />}
        </div>

        {isAuthorized && (
          <>
            <div className="dsr-header-toolbar__user dsr-header-title">
              <span>{user?.name}</span>
              <PersonIcon></PersonIcon>
            </div>
            <div
              className="dsr-header-toolbar__logout dsr-link-btn" /*(click)="onSignOut()"*/
            >
              <span className="dsr-hide-for-small" onClick={handleSignOut}>
                Sign out
              </span>
              <LogoutIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
