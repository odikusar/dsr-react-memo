import { Navigate, useOutlet } from 'react-router-dom';
import { useAppSelector } from 'store';
import { selectAuth } from 'store/auth/auth.slice';

export const AuthOnly = () => {
  const outlet = useOutlet();
  const { isAuthorized } = useAppSelector(selectAuth);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  } else {
    return outlet;
  }
};
