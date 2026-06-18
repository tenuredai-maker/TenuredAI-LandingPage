import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  updateProfile
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, onSnapshot, serverTimestamp, getDocFromServer, updateDoc, increment, orderBy, limit } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export let analytics: ReturnType<typeof getAnalytics> | null = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(console.error);

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

let storageInstance: ReturnType<typeof getStorage> | null = null;
export const getStorageInstance = () => {
  if (!storageInstance) {
    try {
      storageInstance = getStorage(app);
    } catch (error) {
      console.error("Firebase Storage initialization failed:", error);
    }
  }
  return storageInstance;
};

export const googleProvider = new GoogleAuthProvider();

// Error Handling Types
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User Record Syncing
export const syncUserToFirestore = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  const initialData = {
    uid: user.uid,
    displayName: user.displayName || user.email?.split('@')[0] || 'Unknown User',
    email: user.email,
    photoURL: user.photoURL,
    role: 'user', // Default role
    tenuredPoints: 0,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp() 
  };

  if (!userSnap.exists()) {
    await setDoc(userRef, initialData);
  } else {
    // Basic sync for existing users
    await updateDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || userSnap.data().displayName,
      email: user.email,
      photoURL: user.photoURL || userSnap.data().photoURL,
      updatedAt: serverTimestamp()
    });
  }
};

export const grantTenuredPoints = async (points: number, reason: string) => {
  if (!auth.currentUser) return;
  
  const userRef = doc(db, 'users', auth.currentUser.uid);
  try {
    await updateDoc(userRef, {
      tenuredPoints: increment(points),
      updatedAt: serverTimestamp()
    });
    console.log(`Granted ${points} Tenured Points for: ${reason}`);
  } catch (error) {
    console.error('Error granting points:', error);
  }
};

// Auth Helpers
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await syncUserToFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, pass: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await syncUserToFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, pass: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    await syncUserToFirestore(result.user);
    return result.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export const setAuthPersistence = async (rememberMe: boolean) => {
  try {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  } catch (error) {
    console.error('Error setting auth persistence:', error);
    throw error;
  }
};

export const uploadAvatar = async (file: File) => {
  if (!auth.currentUser) throw new Error('User not authenticated');

  const storage = getStorageInstance();
  if (!storage) {
    throw new Error('Identity Storage Service is currently unavailable. Please verify connection protocols.');
  }

  const storageRef = ref(storage, `avatars/${auth.currentUser.uid}/${Date.now()}_${file.name}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await updateProfile(auth.currentUser, { photoURL: downloadURL });

    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {
      photoURL: downloadURL,
      updatedAt: serverTimestamp()
    });

    return downloadURL;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
};

export const logout = () => signOut(auth);