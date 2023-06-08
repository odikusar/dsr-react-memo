import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { selectCurrentUserId } from 'store/auth/auth.selectors';
import { selectMemoFiles } from 'store/memo-file/memo-file.selectors';
import './Workspace.scss';
// import { WorkspaceCard } from './components/WorkspaceCard/WorkspaceCard';
// import { WorkspaceControls } from './components/WorkspaceControls/WorkspaceControls';
import { fetchMemoFiles } from 'store/memo-file/memo-file.middleware';
import { selectMemoRows } from 'store/memo-row/memo-row.selectors';
import { WorkspaceFiles } from './components/WorkspaceFiles/WorkspaceFiles';
// import { WorkspacePagination } from './components/WorkspacePagination/WorkspacePagination';

export function WorkspaceFeature() {
  const dispatch = useAppDispatch();
  const memoFiles = useAppSelector(selectMemoFiles);
  const currentUserId = useAppSelector(selectCurrentUserId);
  const memoRows = useAppSelector(selectMemoRows);

  useEffect(() => {
    dispatch(fetchMemoFiles(currentUserId));
  }, []);

  return (
    <div>
      <WorkspaceFiles memoFiles={memoFiles} currentUserId={currentUserId} />
      {!!memoRows && memoRows.length}
      {/* <WorkspacePagination memoFiles={memoFiles} /> */}
      {/* <WorkspaceCard memoFiles={memoFiles} /> */}
      {/* <WorkspaceControls memoFiles={memoFiles} /> */}
    </div>
  );
}
