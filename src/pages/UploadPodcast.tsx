import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Mic, Image as ImageIcon, CheckCircle, ChevronRight, AlertCircle, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadPodcastFile, createPodcast } from '../lib/podcastService';
import { useAuth } from '../context/AuthContext';

export default function UploadPodcast() {
  const { user, setRedirectPath } = useAuth();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Uncategorized',
    tags: '',
    summary: '',
    extendedDescription: '',
    episodeNumber: '',
    duration: '',
  });

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'image') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'audio') {
        setAudioFile(file);
        
        // Automatically calculate duration
        const objectUrl = URL.createObjectURL(file);
        const audio = new Audio(objectUrl);
        audio.onloadedmetadata = () => {
          const totalSeconds = Math.floor(audio.duration);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          setFormData(prev => ({ 
            ...prev, 
            duration: seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m` 
          }));
          URL.revokeObjectURL(objectUrl);
        };
      } else {
        setImageFile(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please sign in to upload a podcast.");
      return;
    }
    
    if (!formData.title || !audioFile) {
      setError("Please provide at least a title and an audio file.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Upload files
      const sourceUrl = await uploadPodcastFile(audioFile, 'audio');
      let imageUrl = undefined;
      if (imageFile) {
        imageUrl = await uploadPodcastFile(imageFile, 'image');
      }

      // Create record
      const tagsArray = formData.tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      await createPodcast({
        title: formData.title,
        category: formData.category, // Kept for backward compatibility
        tags: tagsArray,
        summary: formData.summary,
        extendedDescription: formData.extendedDescription,
        episodeNumber: parseInt(formData.episodeNumber) || 1,
        duration: formData.duration || 'Unknown',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        sourceUrl,
        imageUrl
      });

      setSuccess(true);
      setTimeout(() => navigate('/podcasts'), 2000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
        <div className="bg-surface-container border border-outline-variant/20 rounded-3xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-error mx-auto mb-4" />
          <h2 className="text-xl font-headline font-bold text-on-surface mb-2">Authentication Required</h2>
          <p className="text-sm text-on-surface-variant font-body leading-relaxed mb-6">
            You must be signed in to upload a podcast to the Tenured network.
          </p>
          <button 
            onClick={() => {
              setRedirectPath(window.location.pathname);
              navigate('/login');
            }}
            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold uppercase tracking-wider text-xs transition-colors hover:bg-primary/90 w-full"
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-[100px] pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-8 font-mono uppercase tracking-widest">
          <button onClick={() => navigate('/podcasts')} className="hover:text-primary transition-colors">Podcasts</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary font-bold">Upload Episode</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 mb-8 border-b border-outline-variant/10 pb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-black tracking-tight mb-2">Publish Episode</h1>
              <p className="text-sm font-mono text-on-surface-variant uppercase tracking-widest">Distribute audio to the network</p>
            </div>
          </div>

          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 rounded-full border-4 border-green-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Upload Successful</h2>
              <p className="text-on-surface-variant mb-6">Your new episode is now live on the network.</p>
              <p className="text-xs font-mono uppercase text-primary tracking-widest animate-pulse">Redirecting...</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {error && (
                <div className="bg-error/10 text-error border border-error/20 p-4 rounded-xl flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">Episode Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                    placeholder="E.g., The Future of AI Underwriting"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">Category Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                    placeholder="E.g., Tech, Design, Strategy (comma separated)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">Episode Number</label>
                  <input
                    type="number"
                    name="episodeNumber"
                    value={formData.episodeNumber}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                    placeholder="E.g., 42"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                    placeholder="E.g., 45m"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">Short Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                  placeholder="A brief overview of the episode..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">Extended Description</label>
                <textarea
                  name="extendedDescription"
                  value={formData.extendedDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                  placeholder="Detailed show notes and discussion points..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-outline-variant/10">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2"><Mic className="w-4 h-4 text-primary" /> Audio File *</label>
                  <div className="relative border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 hover:bg-surface-container/50 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept="audio/*" 
                      onChange={(e) => handleFileChange(e, 'audio')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center pointer-events-none">
                      <PlayCircle className="w-8 h-8 mx-auto mb-2 text-on-surface-variant group-hover:text-primary transition-colors" />
                      {audioFile ? (
                        <p className="text-sm font-bold text-primary truncate px-4">{audioFile.name}</p>
                      ) : (
                        <p className="text-sm text-on-surface-variant">Click or drag MP3/WAV</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-on-surface flex items-center gap-2"><ImageIcon className="w-4 h-4 text-amber-500" /> Episode Artwork (Optional)</label>
                  <div className="relative border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 hover:bg-surface-container/50 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, 'image')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center pointer-events-none">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2 text-on-surface-variant group-hover:text-amber-500 transition-colors" />
                      {imageFile ? (
                        <p className="text-sm font-bold text-amber-500 truncate px-4">{imageFile.name}</p>
                      ) : (
                        <p className="text-sm text-on-surface-variant">Click or drag Image</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-mono text-sm font-bold tracking-widest uppercase transition-all hover:bg-primary/90 disabled:opacity-50 flex items-center gap-3"
                >
                  {isSubmitting ? 'Uploading to Server...' : 'Publish Episode'}
                  {!isSubmitting && <Upload className="w-4 h-4" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
