import PostAddIcon from '@mui/icons-material/PostAdd';
import classNames from 'classnames';
import { MemoFile } from 'models';
import { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'store';
import {
  createMemoFile,
  deleteMemoFile,
  updateMemoFile,
} from 'store/memo-file/memo-file.middleware';
import { setActiveMemoFile } from 'store/memo-file/memo-file.slice';
import { FileService } from 'utils/file.service';
import './WorkspaceFiles.scss';
import { WorkspaceFile } from './components/WorkspaceFile/WorkspaceFile';

export function WorkspaceFiles({
  memoFiles,
  currentUserId,
  activeMemoFileId,
  isDemoUser,
}: {
  memoFiles: MemoFile[];
  currentUserId: string;
  activeMemoFileId: string;
  isDemoUser: boolean;
}) {
  const hiddenFileInput = useRef(null);
  const dispatch = useAppDispatch();

  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadMemoFile = async (
    event: ChangeEvent<HTMLInputElement>,
    memoFile: MemoFile = null
  ) => {
    if (isDemoUser) return showDisallowMessage();

    if (!!event.target.files) {
      const file = event.target.files.item(0);

      if (!!file) {
        const response = await FileService.upload(file, memoFile);
        if (!!memoFile) {
          dispatch(
            updateMemoFile({
              ...memoFile,
              ...response,
            })
          );
        } else {
          dispatch(
            createMemoFile({
              userId: currentUserId,
              ...response,
            } as MemoFile)
          );
        }
      }
    }
  };
  const chooseMemoFile = (memoFile: MemoFile): void => {
    dispatch(setActiveMemoFile(memoFile));
  };

  const removeMemoFile = (memoFile: MemoFile): void => {
    if (isDemoUser) return showDisallowMessage();

    if (window.confirm('Do you really want to delete this file?')) {
      dispatch(deleteMemoFile(memoFile));
      FileService.delete(memoFile);
    }
  };
  const showDisallowMessage = (): void => {
    toast.warn('This action is not allowed for demo user');
  };

  return (
    <div className="dsr-files">
      <div className="dsr-files-add dsr-file-wrap dsr-hide-for-small">
        <input
          className="dsr-hide"
          type="file"
          accept=".csv"
          ref={hiddenFileInput}
          onChange={uploadMemoFile}
        />
        <PostAddIcon
          sx={{ fontSize: 82 }}
          className="dsr-files-add__icon dsr-link-btn"
          onClick={handleFileClick}
        />
      </div>

      {!!memoFiles &&
        memoFiles.map((memoFile) => (
          <div
            key={memoFile.id}
            className={classNames('dsr-file-wrap', {
              'dsr-file-wrap_active': activeMemoFileId === memoFile.id,
            })}
          >
            <WorkspaceFile
              isActive={activeMemoFileId === memoFile.id}
              memoFile={memoFile}
              chooseMemoFile={chooseMemoFile}
              deleteMemoFile={removeMemoFile}
              uploadMemoFile={uploadMemoFile}
            />
          </div>
        ))}
    </div>
  );
}
