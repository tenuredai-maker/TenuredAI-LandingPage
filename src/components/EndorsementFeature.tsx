import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  UserPlus, 
  Send, 
  X, 
  Check, 
  MessageSquare, 
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  db, 
  auth 
} from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp, 
  updateDoc, 
  doc,
  orderBy,
  limit
} from 'firebase/firestore';
import { cn } from '../lib/utils';

interface EndorsementRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  recipientEmail: string;
  status: 'pending' | 'completed' | 'declined';
  message?: string;
  createdAt: any;
}

interface Endorsement {
  id: string;
  authorId: string;
  authorName: string;
  recipientId: string;
  skills: string[];
  comment: string;
  createdAt: any;
}

export default function EndorsementFeature() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [receivedRequests, setReceivedRequests] = useState<EndorsementRequest[]>([]);
  const [myEndorsements, setMyEndorsements] = useState<Endorsement[]>([]);
  const [activeTab, setActiveTab] = useState<'received' | 'requests'>('received');

  useEffect(() => {
    if (!auth.currentUser) return;

    // Listen for endorsements received by the user
    const endorsementsQuery = query(
      collection(db, 'endorsements'),
      where('recipientId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const unsubscribeEndorsements = onSnapshot(endorsementsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Endorsement));
      setMyEndorsements(data);
    });

    // Listen for endorsement requests sent TO the user's email
    const requestsQuery = query(
      collection(db, 'endorsement_requests'),
      where('recipientEmail', '==', auth.currentUser.email),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EndorsementRequest));
      setReceivedRequests(data);
    });

    return () => {
      unsubscribeEndorsements();
      unsubscribeRequests();
    };
  }, []);

  const handleRequestEndorsement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'endorsement_requests'), {
        requesterId: auth.currentUser.uid,
        requesterName: auth.currentUser.displayName || auth.currentUser.email?.split('@')[0],
        recipientEmail: recipientEmail.trim().toLowerCase(),
        status: 'pending',
        message: message.trim(),
        createdAt: serverTimestamp()
      });
      
      setIsRequestModalOpen(false);
      setRecipientEmail('');
      setMessage('');
      
      // Dispatch notification
      window.dispatchEvent(new CustomEvent('tenured-notification', {
        detail: {
          title: 'Request Sent',
          message: `Endorsement request sent to ${recipientEmail}`,
          type: 'success'
        }
      }));
    } catch (err: any) {
      console.error('Error requesting endorsement:', err);
      setError(err.message || 'Failed to send request. Ensure you are verified.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleActionRequest = async (requestId: string, status: 'completed' | 'declined') => {
    const requestRef = doc(db, 'endorsement_requests', requestId);
    try {
      await updateDoc(requestRef, { status });
      
      window.dispatchEvent(new CustomEvent('tenured-notification', {
        detail: {
          title: status === 'completed' ? 'Endorsement Shared' : 'Request Declined',
          message: status === 'completed' ? 'Your peer verification has been recorded.' : 'The request has been removed.',
          type: status === 'completed' ? 'success' : 'info'
        }
      }));
    } catch (err) {
      console.error('Error updating request:', err);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-headline font-black text-on-surface tracking-tight">Peer Verifications</h3>
            <p className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-widest">Endorsement Network</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsRequestModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Request Peer Review
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-outline-variant/10 pb-4">
        <button 
          onClick={() => setActiveTab('received')}
          className={cn(
            "text-xs font-mono font-bold uppercase tracking-widest pb-2 transition-all relative",
            activeTab === 'received' ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Verified Endorsements ({myEndorsements.length})
          {activeTab === 'received' && (
            <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={cn(
            "text-xs font-mono font-bold uppercase tracking-widest pb-2 transition-all relative flex items-center gap-2",
            activeTab === 'requests' ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
          )}
        >
          Pending Requests
          {receivedRequests.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary text-[10px] flex items-center justify-center animate-pulse">
              {receivedRequests.length}
            </span>
          )}
          {activeTab === 'requests' && (
            <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      </div>

      <div className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeTab === 'received' ? (
            <motion.div 
              key="received-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {myEndorsements.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8 text-on-surface-variant/30" />
                  </div>
                  <p className="text-sm font-medium text-on-surface-variant">No peer verifications recorded yet.</p>
                  <p className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest mt-1">Request endorsements to build your trust score.</p>
                </div>
              ) : (
                myEndorsements.map((endorsement) => (
                  <div key={endorsement.id} className="p-5 rounded-[2rem] bg-surface-container-low border border-outline-variant/10 flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                      <span className="text-sm font-black text-primary">{endorsement.authorName[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-on-surface">{endorsement.authorName}</h4>
                        <span className="text-[10px] font-mono text-on-surface-variant/60">
                          {endorsement.createdAt?.toDate().toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {endorsement.skills.map((skill, idx) => (
                          <span key={idx} className="text-[9px] font-mono font-bold uppercase bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded-full tracking-tighter">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed italic">
                        "{endorsement.comment}"
                      </p>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="requests-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {receivedRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-on-surface-variant/30" />
                  </div>
                  <p className="text-sm font-medium text-on-surface-variant">Your inbox is clear.</p>
                  <p className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest mt-1">Colleague requests will appear here.</p>
                </div>
              ) : (
                receivedRequests.map((request) => (
                  <div key={request.id} className="p-5 rounded-[2rem] bg-surface-container-high border border-outline-variant/10 flex flex-col gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                        <UserPlus className="w-5 h-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-on-surface">
                          {request.requesterName} <span className="font-normal text-on-surface-variant">requested an endorsement</span>
                        </h4>
                        <p className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest mb-2">
                          Received {request.createdAt?.toDate().toLocaleDateString()}
                        </p>
                        {request.message && (
                          <div className="bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/5 mb-3">
                            <p className="text-[11px] text-on-surface-variant italic leading-relaxed">
                              "{request.message}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleActionRequest(request.id, 'declined')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-highest transition-all"
                      >
                        <X className="w-3 h-3" />
                        Ignore
                      </button>
                      <button 
                        onClick={() => handleActionRequest(request.id, 'completed')}
                        className="flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
                      >
                        <Check className="w-3 h-3" />
                        Verify Peer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {isRequestModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRequestModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-surface-container-lowest w-full max-w-lg rounded-[3rem] border border-outline-variant/30 shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Send className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-headline font-black text-on-surface">Request Verification</h3>
                      <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest">Connect with Colleagues</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsRequestModalOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-all"
                  >
                    <X className="w-5 h-5 text-on-surface-variant" />
                  </button>
                </div>

                <form onSubmit={handleRequestEndorsement} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant mb-2 px-1">
                      Colleague's Professional Email
                    </label>
                    <input
                      required
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="colleague@organization.com"
                      className="w-full bg-surface-container-high border border-outline-variant/30 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-on-surface-variant mb-2 px-1">
                      Personal Note (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="Tell them why you're requesting this endorsement..."
                      className="w-full bg-surface-container-high border border-outline-variant/30 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/30 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-error/10 border border-error/20">
                      <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                      <p className="text-[10px] text-error font-medium leading-relaxed">{error}</p>
                    </div>
                  )}

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-primary text-on-primary py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-3 mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              <div className="bg-surface-container-high p-6 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">
                  Endorsements from <span className="font-bold text-on-surface">Verified Identity</span> holders provide 3x the trust weight. Use professional emails associated with recognized organizations.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
