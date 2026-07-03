import { collection, doc, addDoc, getDocs, deleteDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export interface Playlist {
  id: string;
  uid: string;
  name: string;
  createdAt: any;
}

export interface PlaylistItem {
  id: string;
  playlistId: string;
  podcastId: string;
  title: string;
  addedAt: any;
}

export async function createPlaylist(uid: string, name: string): Promise<string> {
  const playlistsRef = collection(db, "users", uid, "playlists");
  const docRef = await addDoc(playlistsRef, {
    uid,
    name,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function getPlaylists(uid: string): Promise<Playlist[]> {
  const playlistsRef = collection(db, "users", uid, "playlists");
  const q = query(playlistsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Playlist));
}

export async function addPodcastToPlaylist(uid: string, playlistId: string, podcast: { id: string, title: string }) {
  const itemsRef = collection(db, "users", uid, "playlists", playlistId, "items");
  return await addDoc(itemsRef, {
    playlistId,
    podcastId: podcast.id,
    title: podcast.title,
    addedAt: serverTimestamp()
  });
}

export async function getPlaylistItems(uid: string, playlistId: string): Promise<PlaylistItem[]> {
  const itemsRef = collection(db, "users", uid, "playlists", playlistId, "items");
  const snapshot = await getDocs(itemsRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PlaylistItem));
}

export async function removePodcastFromPlaylist(uid: string, playlistId: string, itemId: string) {
  const itemRef = doc(db, "users", uid, "playlists", playlistId, "items", itemId);
  return await deleteDoc(itemRef);
}
