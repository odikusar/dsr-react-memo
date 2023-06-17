import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Switch } from '@mui/material';
import { NavLink, Navigate } from 'react-router-dom';
import { signOutUser } from 'store/auth/auth.middleware';
import { selectAuth } from 'store/auth/auth.selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { toggleTheme } from 'store/theme/theme.slice';
import './Header.scss';

export function Header() {
  const { user, isAuthorized } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((state) => state.theme.isDarkTheme);

  const handleSignOut = () => {
    dispatch(signOutUser());

    return <Navigate to="/login" />;
  };

  return (
    <div className="dsr-header-toolbar">
      <div className="dsr-header-toolbar__content">
        <div className="dsr-header-toolbar__title dsr-hide-for-small dsr-header-title">
          Dikusar React App.
        </div>

        <div className="dsr-header-toolbar__side-block">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'dsr-active-page-link' : 'dsr-link-btn'
            }
            to="/about"
          >
            <HelpOutlineIcon></HelpOutlineIcon>
            <span className="dsr-hide-for-small">How to use</span>
          </NavLink>

          {isAuthorized && (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'dsr-active-page-link' : 'dsr-link-btn'
              }
              to="/"
            >
              <HomeOutlinedIcon></HomeOutlinedIcon>
              <span className="dsr-hide-for-small dsr-link-btn">Home</span>
            </NavLink>
          )}
        </div>
        {!isAuthorized && (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'dsr-active-page-link' : 'dsr-link-btn'
            }
            to="/login"
          >
            <LoginOutlinedIcon></LoginOutlinedIcon>
            Sign in
          </NavLink>
        )}

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
              <PersonOutlinedIcon></PersonOutlinedIcon>
            </div>
            <div
              className="dsr-header-toolbar__logout dsr-link-btn"
              onClick={handleSignOut}
            >
              <span className="dsr-hide-for-small">Sign out</span>
              <LogoutIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
