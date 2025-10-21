import { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, updateNote, deleteNote } from './api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await fetchNotes();
    setNotes(data || []);
  } catch (error) {
    console.error('Error loading notes:', error);
    setError('Failed to load notes. Make sure your backend is running on http://localhost:3080');
    setNotes([]);
  } finally {
    setLoading(false);
  }
};

  const handleCreateNote = async (noteData) => {
    try {
      const newNote = await createNote(noteData);
      setNotes([newNote, ...notes]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note. Please try again.');
    }
  };

  const handleUpdateNote = async (id, noteData) => {
  try {
    await updateNote(id, noteData);
    // Refetch notes after updating
    await loadNotes(); // Ensure this function fetches the latest notes
    setEditingNote(null);
    setIsFormOpen(false);
  } catch (error) {
    console.error('Error updating note:', error);
    alert('Failed to update note. Please try again.');
  }
};

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter(note => note._id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
      }
    }
  };

 const handleEditClick = (note) => {
  setEditingNote(note);
  setIsFormOpen(true);
};  

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">📝 My Notes</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
            >
              + New Note
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <NotesList
            notes={notes}
            onEdit={handleEditClick}
            onDelete={handleDeleteNote}
          />
        )}
      </main>

      {isFormOpen && (
        <NoteForm
          note={editingNote}
          onSubmit={editingNote ? (noteData) => handleUpdateNote(editingNote._id, noteData) : handleCreateNote}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;