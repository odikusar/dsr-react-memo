import { MemoFile } from 'models';
import './WorkspaceFile.scss';

export function WorkspaceFile({
  memoFile,
  selectMemoFile,
  isActive,
}: {
  memoFile: MemoFile;
  selectMemoFile(memoFile: MemoFile): void;
  isActive: boolean;
}) {
  return (
    <div onClick={() => selectMemoFile(memoFile)}>
      {memoFile.initialName} {isActive && <span> - selected</span>}
    </div>
  );
}
