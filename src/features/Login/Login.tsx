import { DEMO_USER } from 'constants/index';

import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { signInUser, signOutUser } from 'store/auth/auth.middleware';
import { selectAuth } from 'store/auth/auth.selectors';
import { useAppDispatch, useAppSelector } from 'store/hooks';

type SignInFormData = {
  email: string;
  password: string;
};

const LoginFeature = () => {
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

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <br /> <br />
        <TextField
          label="Email"
          type="email"
          {...register('email', { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <br />
        <br />
        <br />
        <TextField
          label="Password"
          type="password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <br />
        <br />
        <br />
        {error && <span>{error}</span>}
        <br />
        <Button type="submit" disabled={isLoading}>
          Sign In
        </Button>
      </form>
      {isAuthorized && (
        <div>
          <br />
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      )}
    </div>
  );
};

export default LoginFeature;
