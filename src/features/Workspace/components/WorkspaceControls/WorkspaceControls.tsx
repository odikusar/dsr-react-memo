import { MemoFile } from 'models';
import './WorkspaceControls.scss';

export function WorkspaceControls(props: { memoFiles: MemoFile[] }) {
  const { memoFiles } = props;

  return <div>WorkspaceControls: {memoFiles.length}</div>;
}
