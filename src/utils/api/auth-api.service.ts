import { User, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
} from 'firebase/firestore';
import { UserProfile } from 'models';
import { FirebaseService } from 'utils/index';

export class AuthApiService {
  static userConverter = {
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

  static async loadUser(
    userId: string
  ): Promise<DocumentSnapshot<UserProfile>> {
    const docRef = doc(FirebaseService.db, 'users', userId).withConverter(
      this.userConverter
    );
    return getDoc(docRef);
  }
}
