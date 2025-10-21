import React, { useState } from 'react';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index, updatedNote) => {
    const newNotes = notes.map((note, i) => (i === index ? updatedNote : note));
    setNotes(newNotes);
  };

  return (
    <div className="app">
      <h1>Notes App</h1>
      <NoteForm addNote={addNote} />
      <NotesList notes={notes} deleteNote={deleteNote} editNote={editNote} />
    </div>
  );
};

export default App;