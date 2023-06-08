import { MemoFile } from 'models';
import './WorkspacePagination.scss';

export function WorkspacePagination(props: { memoFiles: MemoFile[] }) {
  const { memoFiles } = props;

  return <div>WorkspacePagination: {memoFiles.length}</div>;
}
