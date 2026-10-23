import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Re-export common Firestore and Auth utilities for convenience
export { doc, setDoc, collection, getDocs, query, orderBy, limit, onAuthStateChanged };

// Initialize Auth & Firestore with specific database ID
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

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
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path,
  };
  console.warn('Firestore Operation Notice:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on initialization
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore is currently running offline or local cache mode.');
    }
    return false;
  }
}

// Google Sign-In via Popup
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Save/update user profile in Firestore
    try {
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        displayName: user.displayName || 'EthioTech Student',
        photoURL: user.photoURL || '',
        createdAt: new Date().toISOString(),
      }, { merge: true });
    } catch (saveErr) {
      console.warn('User profile sync notice:', saveErr);
    }
    
    return user;
  } catch (err: any) {
    console.error('Google Sign-in failed:', err);
    throw err;
  }
}

// Sign-Out
export async function signOutUser(): Promise<void> {
  await signOut(auth);
}

// Community Introduction type
export interface CommunityIntro {
  id: string;
  userId?: string;
  name: string;
  skills: string;
  interests: string;
  contribution: string;
  learningGoals: string;
  createdAt: string;
}

// Save Community Introduction to Firestore
export async function saveCommunityIntroduction(intro: Omit<CommunityIntro, 'id' | 'createdAt'>): Promise<CommunityIntro> {
  const id = `intro-${Date.now()}`;
  const record: CommunityIntro = {
    ...intro,
    id,
    userId: auth.currentUser?.uid || 'community-member',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'introductions', id), record);
    return record;
  } catch (err) {
    console.warn('Firestore introduction save error, fallback to local:', err);
    return record;
  }
}

// Fetch Community Introductions from Firestore
export async function fetchCommunityIntroductions(): Promise<CommunityIntro[]> {
  try {
    const q = query(collection(db, 'introductions'), orderBy('createdAt', 'desc'), limit(20));
    const snap = await getDocs(q);
    const intros: CommunityIntro[] = [];
    snap.forEach((d) => intros.push(d.data() as CommunityIntro));
    return intros;
  } catch (err) {
    console.warn('Could not fetch introductions from Firestore (using default seed):', err);
    return [
      {
        id: 'intro-seed-1',
        name: 'Amen Daod',
        skills: 'Systems Architecture, Distributed Algorithms, Hardware',
        interests: 'Autonomous Robotics, Open-Source Infrastructure, Ethiopian Tech',
        contribution: 'Guiding student fellows and architecting community engineering roadmaps.',
        learningGoals: 'Advancing multi-robot swarm communication in the Rift Valley.',
        createdAt: '2026-03-01T08:00:00Z',
      },
      {
        id: 'intro-seed-2',
        name: 'Selamawit Tadesse',
        skills: 'Python, PyTorch, React, Computer Vision',
        interests: 'AgriTech Vision, Teff disease diagnosis, Deep Learning',
        contribution: 'Contributing field dataset annotations and edge quantization tests.',
        learningGoals: 'Optimizing INT8 quantized ONNX models for mobile browsers.',
        createdAt: '2026-03-10T12:00:00Z',
      },
    ];
  }
}
