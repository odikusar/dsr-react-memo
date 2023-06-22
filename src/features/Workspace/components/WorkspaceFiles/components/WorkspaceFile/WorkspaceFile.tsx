import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import classNames from 'classnames';
import { MemoFile } from 'models';
import { ChangeEvent, useRef } from 'react';
import { getFileName } from 'utils';
import './WorkspaceFile.scss';

export function WorkspaceFile({
  memoFile,
  isActive,
  chooseMemoFile,
  deleteMemoFile,
  uploadMemoFile,
}: {
  memoFile: MemoFile;
  isActive: boolean;
  chooseMemoFile(memoFile: MemoFile): void;
  deleteMemoFile(memoFile: MemoFile): void;
  uploadMemoFile(
    event: ChangeEvent<HTMLInputElement>,
    memoFile: MemoFile
  ): void;
}) {
  const hiddenFileInput = useRef(null);

  const handleFileClick = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <div className="dsr-file" data-testid="workspaceFileWrapper">
        <div
          className={classNames('dsr-link-btn', 'dsr-file__body', {
            'dsr-file__body_active': isActive,
          })}
          onClick={() => chooseMemoFile(memoFile)}
        >
          <DescriptionOutlinedIcon
            sx={{ fontSize: 76 }}
          ></DescriptionOutlinedIcon>
        </div>
        <div className="dsr-file__actions">
          <input
            className="dsr-hide"
            type="file"
            accept=".csv"
            ref={hiddenFileInput}
            onChange={(event) => uploadMemoFile(event, memoFile)}
          />

          <DriveFileRenameOutlineOutlinedIcon
            onClick={handleFileClick}
            className="dsr-file__action dsr-link-btn"
          ></DriveFileRenameOutlineOutlinedIcon>
          <DeleteForeverOutlinedIcon
            onClick={() => deleteMemoFile(memoFile)}
            className="dsr-file__action dsr-link-btn"
          ></DeleteForeverOutlinedIcon>
        </div>
      </div>
      <div className="dsr-file__name">{getFileName(memoFile.initialName)}</div>
    </>
  );
}
