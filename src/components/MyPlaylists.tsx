import React, { useState, useEffect } from 'react';
import { Plus, List, FolderPlus, Trash2, Mic } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Playlist, PlaylistItem, createPlaylist, getPlaylists, getPlaylistItems, removePodcastFromPlaylist } from '../lib/playlistService';

export default function MyPlaylists() {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

  useEffect(() => {
    if (user) {
      loadPlaylists();
    }
  }, [user]);

  const loadPlaylists = async () => {
    if (user) {
      const data = await getPlaylists(user.uid);
      setPlaylists(data);
    }
  };

  const loadItems = async (playlistId: string) => {
    if (user) {
      const items = await getPlaylistItems(user.uid, playlistId);
      setPlaylistItems(items);
    }
  };

  const handleCreatePlaylist = async () => {
    if (user && newPlaylistName) {
      await createPlaylist(user.uid, newPlaylistName);
      setNewPlaylistName("");
      loadPlaylists();
    }
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 mb-8">
      <h3 className="text-lg font-headline font-black text-on-surface mb-6 flex items-center gap-2">
        <List className="w-5 h-5 text-primary" /> My Playlists
      </h3>
      
      {/* Create new playlist */}
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New playlist name..."
          className="flex-grow bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2 text-sm"
        />
        <button onClick={handleCreatePlaylist} className="bg-primary text-on-primary px-4 py-2 rounded-xl flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create
        </button>
      </div>

      {/* Playlist List */}
      <div className="grid grid-cols-2 gap-4">
        {playlists.map(p => (
           <button 
             key={p.id}
             onClick={() => {
                setSelectedPlaylistId(p.id);
                loadItems(p.id);
             }}
             className={`p-4 rounded-xl border ${selectedPlaylistId === p.id ? 'border-primary' : 'border-outline-variant/20'}`}
           >
             <p className="font-bold">{p.name}</p>
           </button>
        ))}
      </div>
      
      {selectedPlaylistId && (
        <div className="mt-6 border-t pt-4">
            <h4 className="font-bold mb-2">Items:</h4>
            {playlistItems.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-surface-container-low p-2 rounded-lg mb-2">
                    <span className="text-sm">{item.title}</span>
                    <button onClick={async () => {
                        await removePodcastFromPlaylist(user!.uid, selectedPlaylistId, item.id);
                        loadItems(selectedPlaylistId);
                    }} className="text-error"><Trash2 className="w-4 h-4" /></button>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
