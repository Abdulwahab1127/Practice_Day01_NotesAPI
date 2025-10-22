import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotes, createNote, updateNote, deleteNote } from '../api/notes';
import { Note } from '../types';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';

const Home: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { user } = useAuth();

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes();
      if (response.success && response.data) {
        setNotes(response.data);
      }
    } catch (err) {
      setError('Failed to load notes');
      console.error('Fetch notes error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (title: string, content: string) => {
    try {
      const response = await createNote({ title, content });
      if (response.success && response.data) {
        setNotes([response.data, ...notes]);
        setShowForm(false);
      }
    } catch (err) {
      setError('Failed to create note');
      console.error('Create note error:', err);
    }
  };

  const handleUpdateNote = async (title: string, content: string) => {
    if (!editingNote) return;

    try {
      const response = await updateNote(editingNote._id, { title, content });
      if (response.success && response.data) {
        setNotes(notes.map(note => 
          note._id === editingNote._id ? response.data! : note
        ));
        setEditingNote(null);
        setShowForm(false);
      }
    } catch (err) {
      setError('Failed to update note');
      console.error('Update note error:', err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await deleteNote(id);
      if (response.success) {
        setNotes(notes.filter(note => note._id !== id));
      }
    } catch (err) {
      setError('Failed to delete note');
      console.error('Delete note error:', err);
    }
  };

  const handleEditClick = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + New Note
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                currentUserId={user?._id || ''}
                onEdit={handleEditClick}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* Note Form Modal */}
      {showForm && (
        <NoteForm
          note={editingNote}
          onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Home;
