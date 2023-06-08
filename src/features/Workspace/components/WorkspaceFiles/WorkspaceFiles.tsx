import PostAddIcon from '@mui/icons-material/PostAdd';
import { MemoFile } from 'models';
import { useRef } from 'react';
import { FileService } from 'utils/file.service';
import './WorkspaceFiles.scss';

export function WorkspaceFiles(props: { memoFiles: MemoFile[] }) {
  const { memoFiles } = props;

  const hiddenFileInput: any = useRef(null); /// any

  const handleClick = () => {
    // if (hiddenFileInput && hiddenFileInput.current) {
    hiddenFileInput.current.click();
    // }
  };
  const uploadMemoFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    memoFile: MemoFile = null
  ) => {
    if (!!event.target.files) {
      const file = event.target.files.item(0);

      if (!!file) {
        // this.fileService.upload(file, memoFile).subscribe(() => this.loader.complete());
        FileService.upload(file);
        console.log(file);
      }
    }
  };

  return (
    <div>
      WorkspaceFiles: {memoFiles.length}
      <PostAddIcon onClick={handleClick} />
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={uploadMemoFile}
        style={{ display: 'none' }}
      />
    </div>
  );
}
