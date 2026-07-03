import React, { useState } from 'react';
import { Twitter, BookOpen, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface VerificationItem {
  id: string;
  title: string;
  type: 'Twitter' | 'Udemy';
  status: 'pending' | 'verified';
}

export default function Verification() {
  const [tweetUrl, setTweetUrl] = useState('');
  const [udemyCourse, setUdemyCourse] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [items] = useState<VerificationItem[]>([
      { id: 'v1', title: 'Tweet about AI', type: 'Twitter', status: 'verified' },
      { id: 'v2', title: 'Advanced React Course', type: 'Udemy', status: 'pending' },
  ]);

  const handleVerify = () => {
    setStatus('verifying');
    // Simulate verification
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Verify Achievement</h1>
      <div className="bg-surface-container-highest p-6 rounded-xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Shared Tweet URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tweetUrl}
              onChange={(e) => setTweetUrl(e.target.value)}
              className="flex-grow p-3 rounded-lg bg-surface border border-outline"
              placeholder="https://twitter.com/..."
            />
            <button className="p-3 bg-primary text-on-primary rounded-lg">
              <Twitter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Udemy Course Signup
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={udemyCourse}
              onChange={(e) => setUdemyCourse(e.target.value)}
              className="flex-grow p-3 rounded-lg bg-surface border border-outline"
              placeholder="Course ID/Name"
            />
            <button className="p-3 bg-primary text-on-primary rounded-lg">
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button
          onClick={handleVerify}
          disabled={status !== 'idle'}
          className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-bold"
        >
          {status === 'verifying' ? 'Verifying...' : 'Submit for Verification'}
        </button>
        {status === 'success' && (
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle className="w-5 h-5" />
            <p>Verification submitted. Points will be allocated shortly.</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Verifications</h2>
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item.id} id={item.id} className="bg-surface-container-highest p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {item.type === 'Twitter' ? <Twitter className="w-6 h-6 text-blue-400" /> : <BookOpen className="w-6 h-6 text-purple-400" />}
                    <div>
                        <p className="font-medium text-on-surface">{item.title}</p>
                        <p className="text-xs text-on-surface-variant font-mono uppercase tracking-widest">{item.type}</p>
                    </div>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono ${item.status === 'verified' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-500'}`}>
                    {item.status === 'verified' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    {item.status === 'verified' ? 'Verified' : 'Awaiting Verification'}
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
