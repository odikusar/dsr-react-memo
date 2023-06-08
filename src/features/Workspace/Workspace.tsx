import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchMemoFiles } from 'store/memo-file/memo-file.middleware';
import { selectMemoFile } from 'store/memo-file/memo-file.slice';
import './Workspace.scss';
import { WorkspaceCard } from './components/WorkspaceCard/WorkspaceCard';
import { WorkspaceControls } from './components/WorkspaceControls/WorkspaceControls';
import { WorkspaceFiles } from './components/WorkspaceFiles/WorkspaceFiles';
import { WorkspacePagination } from './components/WorkspacePagination/WorkspacePagination';

export function WorkspaceFeature() {
  const dispatch = useAppDispatch();
  const { memoFiles } = useAppSelector(selectMemoFile);

  useEffect(() => {
    dispatch(fetchMemoFiles());
  }, []);

  return (
    <div>
      <WorkspaceFiles memoFiles={memoFiles} />
      <WorkspacePagination memoFiles={memoFiles} />
      <WorkspaceCard memoFiles={memoFiles} />
      <WorkspaceControls memoFiles={memoFiles} />
    </div>
  );
}
