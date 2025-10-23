import React, { useEffect, useState } from 'react';
import { getNotes } from '../api/notes';
import { Note } from '../types';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { useAuth } from '../context/AuthContext';

const OtherNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchOtherNotes();
  }, []);

  const fetchOtherNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      
      if (res.success && res.data) {
        // Filter to show ONLY notes created by OTHER users (not current user)
        const others = res.data.filter(n => {
          const noteUserId = typeof n.user === 'string' ? n.user : n.user?._id;
          return noteUserId !== user?._id;
        });
        
        setNotes(others);
      }
    } catch (err) {
      console.error('Failed to fetch other notes', err);
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Feed</h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No notes from other users yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} currentUserId={user?._id || ''} onEdit={() => {}} onDelete={() => {}} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherNotes;
