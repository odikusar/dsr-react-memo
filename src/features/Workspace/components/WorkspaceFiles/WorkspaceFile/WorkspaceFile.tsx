import { MemoFile } from 'models';
import './WorkspaceFile.scss';

export function WorkspaceFile(props: {
  memoFile: MemoFile;
  selectMemoFile(memoFile: MemoFile): void;
}) {
  const { memoFile, selectMemoFile } = props;

  return (
    <div onClick={() => selectMemoFile(memoFile)}>{memoFile.initialName}</div>
  );
}
