import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { UserProfile } from 'models';
import { FirebaseService } from 'utils/index';

export class AuthApiService {
  static typedConverter = {
    toFirestore(user: UserProfile): DocumentData {
      return user;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): UserProfile {
      const data = snapshot.data(options)!;
      return data as UserProfile;
    },
  };

  static async signIn(email: string, password: string): Promise<User> {
    const response = await signInWithEmailAndPassword(
      FirebaseService.auth,
      email,
      password
    );

    return response.user;
  }

  static async signOut(): Promise<void> {
    return signOut(FirebaseService.auth);
  }

  static async fetchUser(
    userId: string
  ): Promise<DocumentSnapshot<UserProfile>> {
    const docRef = doc(FirebaseService.db, 'users', userId).withConverter(
      this.typedConverter
    );

    return getDoc(docRef);
  }

  static async updateUser(
    userId: string,
    changes: Partial<UserProfile>
  ): Promise<void> {
    const docRef = doc(FirebaseService.db, 'users', userId);

    return updateDoc(docRef, changes);
  }
}
