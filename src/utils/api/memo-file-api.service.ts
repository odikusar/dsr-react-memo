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

  // static async create(formValues) {
  //   const response = await addDoc(
  //     collection(FirebaseService.db, 'notes'),
  //     formValues
  //   );
  //   return {
  //     id: response.id,
  //     ...formValues,
  //   };
  // }

  static async fetchAll(userId: string): Promise<MemoFile[]> {
    const snapshot = await getDocs(
      query(
        collection(FirebaseService.db, this.collectionName).withConverter(
          genericConverter<MemoFile>()
        ),
        where('userId', '==', userId)
      )
    );
    // query(
    //   collection(FirebaseApp.db, "notes"),
    //   orderBy("created_at", "asc")
    // );
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

  // static async deleteById(noteId) {
  //   deleteDoc(doc(FirebaseApp.db, 'notes', noteId));
  // }
  // static async updateById(id, values) {
  //   const query = doc(FirebaseApp.db, 'notes', id);
  //   await updateDoc(query, values);
  //   return {
  //     id,
  //     ...values,
  //   };
  // }

  // static async signIn(email: string, password: string): Promise<User> {
  //   const response = await signInWithEmailAndPassword(
  //     FirebaseService.auth,
  //     email,
  //     password
  //   );

  //   return response.user;
  // }

  // static async signOut(): Promise<void> {
  //   return signOut(FirebaseService.auth);
  // }

  // static async loadUser(
  //   userId: string
  // ): Promise<DocumentSnapshot<UserProfile>> {
  //   const docRef = doc(FirebaseService.db, 'users', userId).withConverter(
  //     this.userConverter
  //   );
  //   return getDoc(docRef);
  // }
}
