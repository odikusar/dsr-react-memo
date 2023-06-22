import { MemoRow } from 'models';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { updateUser } from 'store/auth/auth.middleware';
import {
  selectActiveMemoFileId,
  selectCurrentUserId,
  selectIsDemoUser,
  selectIsTranslationByDefault,
  selectUser,
} from 'store/auth/auth.selectors';
import { fetchMemoFiles } from 'store/memo-file/memo-file.middleware';
import { selectMemoFiles } from 'store/memo-file/memo-file.selectors';
import {
  selectAllFreshInSelection,
  selectMemoRows,
  selectMemoRowsLeftCount,
} from 'store/memo-row/memo-row.selectors';
import { MemoService } from 'utils/memo.service';
import { WorkspaceCard } from './components/WorkspaceCard/WorkspaceCard';
import { WorkspaceControls } from './components/WorkspaceControls/WorkspaceControls';
import { WorkspaceFiles } from './components/WorkspaceFiles/WorkspaceFiles';
import { WorkspacePagination } from './components/WorkspacePagination/WorkspacePagination';

export function WorkspaceFeature() {
  const dispatch = useAppDispatch();
  const memoFiles = useAppSelector(selectMemoFiles);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const activeMemoFileId = useAppSelector(selectActiveMemoFileId);
  const isTranslationByDefault = useAppSelector(selectIsTranslationByDefault);
  const selectedFreshMemoRows = useAppSelector(selectAllFreshInSelection);
  const allMemoRows = useAppSelector(selectMemoRows);
  const rowsLeftCount = useAppSelector(selectMemoRowsLeftCount);
  const user = useAppSelector(selectUser);
  const isDemoUser = useAppSelector(selectIsDemoUser);
  const [memoRow, setMemoRow] = useState<MemoRow>(null);
  const [isAnswerDisplayed, setIsAnswerDisplayed] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchMemoFiles(currentUserId));
  }, [dispatch, currentUserId]);

  useEffect(() => {
    if (selectedFreshMemoRows && selectedFreshMemoRows.length) {
      setMemoRow(MemoService.getRandomMemoRow(selectedFreshMemoRows));
    }
  }, [selectedFreshMemoRows]);

  const changeAnswerDisplayed = (value: boolean): void => {
    setIsAnswerDisplayed(value);
  };

  const changeTranslationByDefault = (value: boolean): void => {
    dispatch(updateUser({ ...user, isTranslationByDefault: value }));
  };

  return (
    <div>
      <WorkspaceFiles
        activeMemoFileId={activeMemoFileId}
        memoFiles={memoFiles}
        currentUserId={currentUserId}
        isDemoUser={isDemoUser}
      />
      <hr />
      <WorkspacePagination
        rowsTotalCount={allMemoRows?.length}
        currentMemoRowId={!!memoRow ? memoRow.id + 1 : 0}
        rowsLeftCount={rowsLeftCount}
        memoRows={allMemoRows}
      />
      <hr />
      <WorkspaceCard
        memoRow={memoRow}
        isAnswerDisplayed={isAnswerDisplayed}
        isTranslationByDefault={isTranslationByDefault}
      />
      <WorkspaceControls
        memoRow={memoRow}
        rowsLeftCount={rowsLeftCount}
        changeAnswerDisplayed={changeAnswerDisplayed}
        changeTranslationByDefault={changeTranslationByDefault}
        isTranslationByDefault={isTranslationByDefault}
      />
    </div>
  );
}
