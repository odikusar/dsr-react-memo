import { createSelector } from 'reselect';
import { RootState } from 'store/store';

export const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUserId = createSelector(
  selectAuth,
  (selectAuth) => selectAuth.user.id
);

export const selectActiveMemoFileId = createSelector(
  selectAuth,
  (selectAuth) => selectAuth.user.activeMemoFileId
);
