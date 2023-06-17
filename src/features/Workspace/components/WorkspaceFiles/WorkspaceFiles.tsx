import PostAddIcon from '@mui/icons-material/PostAdd';
import { MemoFile } from 'models';
import { useRef } from 'react';
import { useAppDispatch } from 'store';
import { createMemoFile } from 'store/memo-file/memo-file.middleware';
import { setActiveMemoFile } from 'store/memo-file/memo-file.slice';
import { FileService } from 'utils/file.service';
import { WorkspaceFile } from './WorkspaceFile/WorkspaceFile';
import './WorkspaceFiles.scss';

export function WorkspaceFiles({
  memoFiles,
  currentUserId,
  activeMemoFileId,
}: {
  memoFiles: MemoFile[];
  currentUserId: string;
  activeMemoFileId: string;
}) {
  const hiddenFileInput = useRef(null);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadMemoFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
    memoFile: MemoFile = null
  ) => {
    if (!!event.target.files) {
      const file = event.target.files.item(0);

      if (!!file) {
        const response = await FileService.upload(file);
        dispatch(
          createMemoFile({
            userId: currentUserId,
            ...response,
          } as MemoFile)
        );
      }
    }
  };
  const selectMemoFile = (memoFile: MemoFile) => {
    dispatch(setActiveMemoFile(memoFile));
  };

  return (
    <div>
      <PostAddIcon onClick={handleClick} />
      <input
        className="dsr-hide"
        type="file"
        ref={hiddenFileInput}
        onChange={uploadMemoFile}
      />
      <br />

      {!!memoFiles &&
        memoFiles.map((memoFile) => (
          <WorkspaceFile
            isActive={activeMemoFileId === memoFile.id}
            key={memoFile.id}
            memoFile={memoFile}
            selectMemoFile={selectMemoFile}
          />
        ))}
    </div>
  );
}
