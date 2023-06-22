import { Navigate, useOutlet } from 'react-router-dom';
import { useAppSelector } from 'store';
import { selectAuth } from 'store/auth/auth.selectors';

export const GuestOnly = () => {
  const outlet = useOutlet();
  const { isAuthorized } = useAppSelector(selectAuth);

  if (isAuthorized) {
    return <Navigate to="/" />;
  } else {
    return outlet;
  }
};
