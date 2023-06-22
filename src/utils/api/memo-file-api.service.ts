import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { MemoFile } from 'models';
import { FirebaseService } from 'utils/firebase.service';

const genericConverter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return {
      ...data,
      id: snapshot?.id,
    } as MemoFile;
  },
});

export class MemoFileApiService {
  static readonly collectionName: string = 'memoFiles';

  static async fetchAll(userId: string): Promise<MemoFile[]> {
    const snapshot = await getDocs(
      query(
        collection(FirebaseService.db, this.collectionName).withConverter(
          genericConverter<MemoFile>()
        ),
        where('userId', '==', userId)
      )
    );

    let items: MemoFile[] = [];

    snapshot.forEach((item) => {
      items.push(item.data());
    });

    return items;
  }

  static async create(memoFile: Partial<MemoFile>): Promise<MemoFile> {
    const response = await addDoc(
      collection(FirebaseService.db, this.collectionName),
      memoFile
    );

    return {
      id: response.id,
      ...memoFile,
    } as MemoFile;
  }

  static async delete(memoFileId: string): Promise<void> {
    return deleteDoc(doc(FirebaseService.db, this.collectionName, memoFileId));
  }

  static async update(memoFile: MemoFile): Promise<MemoFile> {
    const query = doc(FirebaseService.db, this.collectionName, memoFile.id);
    await updateDoc(query, { ...memoFile });

    return memoFile;
  }
}
