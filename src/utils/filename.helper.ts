import { FILENAME_LENGTH } from 'constants/index';

export function getFileName(initialFileName: string): string {
  if (!initialFileName) return '';

  return removeExtension(initialFileName).slice(0, FILENAME_LENGTH);
}

function removeExtension(fileName: string): string {
  return fileName.substring(0, fileName.lastIndexOf('.'));
}
