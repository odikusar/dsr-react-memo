import { firebaseConfig } from 'constants/index';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

export class FirebaseService {
  static firebaseApp: FirebaseApp;
  static auth: Auth;
  static db: Firestore;

  static init(): void {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore(this.firebaseApp);
  }
}
