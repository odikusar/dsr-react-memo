import { MemoFile } from 'models';
import './WorkspaceCard.scss';

export function WorkspaceCard(props: { memoFiles: MemoFile[] }) {
  const { memoFiles } = props;

  return <div>WorkspaceCard: {memoFiles.length}</div>;
}
