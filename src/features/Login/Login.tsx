import { DEMO_USER } from 'constants/index';
import './Login.scss';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { signInUser } from 'store/auth/auth.middleware';
import { selectAuth } from 'store/auth/auth.selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';

type SignInFormData = {
  email: string;
  password: string;
};

export function LoginFeature() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>();

  const { isLoading, error, isAuthorized } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    reset({
      email: DEMO_USER.EMAIL,
      password: DEMO_USER.PASSWORD,
    });
  }, [reset]);

  const onSubmit = handleSubmit(async (prop: SignInFormData) => {
    const { email, password } = prop;
    await dispatch(signInUser({ email, password }));
  });

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dsr-login-page" data-testid="loginPage">
      <Box sx={{ minWidth: 400, maxWidth: '80%' }}>
        <Card>
          <form onSubmit={onSubmit}>
            <CardContent>
              <Typography sx={{ mb: 3 }} component="h1" variant="h5">
                Sign in
              </Typography>
              <TextField
                data-testid="loginPageEmail"
                label="Email"
                type="email"
                required
                fullWidth
                {...register('email', { required: true })}
              />
              {errors.email && <span>This field is required</span>}
              <Box sx={{ mt: 3 }}>
                <TextField
                  data-testid="loginPagePassword"
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  {...register('password', { required: true })}
                />
                {error && <div className="dsr-login-error">{error}</div>}
              </Box>
            </CardContent>
            <CardActions sx={{ m: 1 }}>
              <Button
                fullWidth
                type="submit"
                variant="outlined"
                disabled={isLoading}
              >
                Sign in
              </Button>
            </CardActions>
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default LoginFeature;
