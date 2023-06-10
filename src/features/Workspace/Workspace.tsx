import { MemoRow } from 'models';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  selectActiveMemoFileId,
  selectCurrentUserId,
} from 'store/auth/auth.selectors';
import { fetchMemoFiles } from 'store/memo-file/memo-file.middleware';
import { selectMemoFiles } from 'store/memo-file/memo-file.selectors';
import {
  selectAllFreshInSelection,
  selectMemoRows,
  selectMemoRowsLeftCount,
} from 'store/memo-row/memo-row.selectors';
import { MemoService } from 'utils/memo.service';
import './Workspace.scss';
import { WorkspaceCard } from './components/WorkspaceCard/WorkspaceCard';
import { WorkspaceControls } from './components/WorkspaceControls/WorkspaceControls';
import { WorkspaceFiles } from './components/WorkspaceFiles/WorkspaceFiles';
import { WorkspacePagination } from './components/WorkspacePagination/WorkspacePagination';

export function WorkspaceFeature() {
  const dispatch = useAppDispatch();

  const memoFiles = useAppSelector(selectMemoFiles);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const activeMemoFileId = useAppSelector(selectActiveMemoFileId);
  const selectedFreshMemoRows = useAppSelector(selectAllFreshInSelection);
  const allMemoRows = useAppSelector(selectMemoRows);
  const rowsLeftCount = useAppSelector(selectMemoRowsLeftCount);
  const [memoRow, setMemoRow] = useState<MemoRow>(null);
  const [isAnswerDisplayed, setIsAnswerDisplayed] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchMemoFiles(currentUserId));
  }, []);

  useEffect(() => {
    if (selectedFreshMemoRows && selectedFreshMemoRows.length) {
      setMemoRow(MemoService.getRandomMemoRow(selectedFreshMemoRows));
    }
  }, [selectedFreshMemoRows]);

  const changeIsAnswerDisplayed = (value: boolean): void => {
    setIsAnswerDisplayed(value);
  };

  return (
    <div>
      <b>{activeMemoFileId}</b>
      <br />
      <b>{!!allMemoRows && allMemoRows.length}</b>
      <br />
      <WorkspaceFiles memoFiles={memoFiles} currentUserId={currentUserId} />
      <WorkspacePagination
        rowsTotalCount={allMemoRows?.length}
        currentMemoRowId={!!memoRow ? memoRow.id + 1 : 0}
        rowsLeftCount={rowsLeftCount}
      />

      <WorkspaceCard
        memoRow={memoRow}
        isTranslationByDefault={false}
        isAnswerDisplayed={isAnswerDisplayed}
      />

      <WorkspaceControls
        memoRow={memoRow}
        isTranslationByDefault={false}
        rowsLeftCount={rowsLeftCount}
        changeIsAnswerDisplayed={changeIsAnswerDisplayed}
      />
    </div>
  );
}
