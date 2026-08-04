import { collection, doc, getDocs, setDoc, updateDoc, increment, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, getStorageInstance, auth, handleFirestoreError, OperationType } from "./firebase";
import { Episode, EPISODES_DATA } from "../data/podcastEpisodes";

const COLLECTION_NAME = "podcasts";

export async function uploadPodcastFile(file: File, type: 'audio' | 'image'): Promise<string> {
  const storage = getStorageInstance();
  if (!storage) {
    throw new Error('Storage service is unavailable.');
  }

  const folder = type === 'audio' ? 'podcasts/audio' : 'podcasts/images';
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  
  const snapshot = await uploadBytes(fileRef, file);
  return await getDownloadURL(snapshot.ref);
}

async function isUserAdmin(): Promise<boolean> {
  const user = auth.currentUser;
  if (!user) return false;
  
  // Direct check for primary admin email
  if (user.email === "tenuredai@gmail.com") return true;

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    return userDoc.exists() && userDoc.data()?.role === 'admin';
  } catch (e) {
    return false;
  }
}

export async function fetchPodcasts(): Promise<Episode[]> {
  const podcastsRef = collection(db, COLLECTION_NAME);
  try {
    const querySnapshot = await getDocs(podcastsRef);
    if (querySnapshot.empty) {
      console.log("Podcasts collection is empty. Checking authorization for seeding...");
      const isAdmin = await isUserAdmin();
      if (isAdmin) {
        console.log("User is admin. Seeding data...");
        await seedPodcasts();
        const seededSnapshot = await getDocs(podcastsRef);
        return seededSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Episode));
      } else {
        console.warn("User is not authorized to seed podcasts. Returning static data.");
        return EPISODES_DATA;
      }
    }
    
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Episode));
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    // If it's a permission error, we should ideally handle it via the specialized tool
    // but we still want the app to function with fallback data.
    if (error instanceof Error && error.message.includes("permission")) {
       try {
         handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
       } catch (e) {
         // Silently fail after logging error info to console
       }
    }
    return EPISODES_DATA;
  }
}

export async function seedPodcasts() {
  const podcastsRef = collection(db, COLLECTION_NAME);
  for (const ep of EPISODES_DATA) {
    const docRef = doc(podcastsRef, ep.id);
    await setDoc(docRef, { ...ep, likes: 0, shares: 0 }, { merge: true });
  }
}

export async function likePodcast(podcastId: string) {
  const docRef = doc(db, COLLECTION_NAME, podcastId);
  try {
    await updateDoc(docRef, {
      likes: increment(1)
    });
  } catch (error) {
    console.error("Error liking podcast:", error);
  }
}

export async function sharePodcast(podcastId: string) {
  const docRef = doc(db, COLLECTION_NAME, podcastId);
  try {
    await updateDoc(docRef, {
      shares: increment(1)
    });
  } catch (error) {
    console.error("Error sharing podcast:", error);
  }
}

export async function createPodcast(episodeData: Omit<Episode, "id" | "likes" | "shares">) {
  const podcastsRef = collection(db, COLLECTION_NAME);
  const newId = `ep-${Date.now()}`;
  const docRef = doc(podcastsRef, newId);
  const newEpisode: Episode = {
    ...episodeData,
    id: newId,
    likes: 0,
    shares: 0,
  };
  try {
    await setDoc(docRef, newEpisode);
    return newId;
  } catch (error) {
    console.error("Error creating podcast:", error);
    throw error;
  }
}

