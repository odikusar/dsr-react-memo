import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { MemoFile } from 'models';
import { FirebaseService } from './firebase.service';

export class FileService {
  private static readonly basePath: string = '/csv';
  private static readonly RANDOM_FILENAME_PREFIX_LENGTH: number = 10;

  static upload(
    file: File,
    memoFile: MemoFile = null
  ): Promise<Partial<MemoFile>> {
    return new Promise((resolve, reject) => {
      const fileName = this.getRandomFileName(file.name);
      const filePath = this.getFilePath(fileName);
      const storage = getStorage(FirebaseService.firebaseApp);
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          reject(error);
        },
        () => {
          if (!!memoFile) {
            this.delete(memoFile);
          }

          return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({
              name: fileName,
              initialName: file.name,
              url: downloadURL,
            });
          });
        }
      );
    });
    // return uploadTask.snapshotChanges().pipe(
    //   finalize(() =>
    //     this.storage
    //       .ref(filePath)
    //       .getDownloadURL()
    //       .pipe(take(1))
    //       .subscribe((downloadURL: string) => {
    //         if (!!memoFile) {
    //           this.memoFileFacade.update({
    //             ...memoFile,
    //             url: downloadURL,
    //             name: fileName,
    //             initialName: file.name,
    //           });

    //           this.erase(memoFile.name).pipe(take(1)).subscribe();
    //         } else {
    //           this.memoFileFacade.create({
    //             url: downloadURL,
    //             name: fileName,
    //             initialName: file.name,
    //             userId: this.userFacade.userId,
    //           });
    //         }
    //       })
    //   )
    // );
  }

  // upload(file: File, memoFile: MemoFile = null) {
  //   /// type
  //   const fileName = this.getRandomFileName(file.name);
  //   const filePath = this.getFilePath(fileName);
  //   const uploadTask = this.storage.upload(filePath, file);

  //   return uploadTask.snapshotChanges().pipe(
  //     finalize(() =>
  //       this.storage
  //         .ref(filePath)
  //         .getDownloadURL()
  //         .pipe(take(1))
  //         .subscribe((downloadURL: string) => {
  //           if (!!memoFile) {
  //             this.memoFileFacade.update({
  //               ...memoFile,
  //               url: downloadURL,
  //               name: fileName,
  //               initialName: file.name,
  //             });

  //             this.erase(memoFile.name).pipe(take(1)).subscribe();
  //           } else {
  //             this.memoFileFacade.create({
  //               url: downloadURL,
  //               name: fileName,
  //               initialName: file.name,
  //               userId: this.userFacade.userId,
  //             });
  //           }
  //         })
  //     )
  //   );
  // }

  static delete(memoFile: MemoFile): Promise<void> {
    const storage = getStorage(FirebaseService.firebaseApp);
    const filePath = this.getFilePath(memoFile.name);
    const storageRef = ref(storage, filePath);
    return deleteObject(storageRef);
  }

  private static getFilePath(fileName: string): string {
    return `${this.basePath}/${fileName}`;
  }

  private static getRandomFileName(fileName: string): string {
    const startSlice = 2;
    const randomString = Math.random()
      .toString(36)
      .slice(startSlice, this.RANDOM_FILENAME_PREFIX_LENGTH + startSlice);

    return `${randomString}_${fileName}`;
  }
}
