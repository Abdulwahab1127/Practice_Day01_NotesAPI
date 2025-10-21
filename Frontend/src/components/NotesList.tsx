import React from 'react';
import NoteCard from './NoteCard';
import { Note } from '../types';

interface NotesListProps {
  notes: Note[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onEdit, onDelete }) => {
  console.log('Notes:', notes);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.length === 0 ? (
        <p>No notes available.</p> // Display a message if there are no notes
      ) : (
        notes.map(note => (
          <NoteCard
            key={note._id} // Ensure you're using the correct identifier
            title={note.title}
            content={note.content}
            date={note.createdAt} // Ensure this matches your note structure
            onEdit={() => onEdit(note._id)} // Ensure you're passing the correct ID
            onDelete={() => onDelete(note._id)} // Ensure you're passing the correct ID
          />
        ))
      )}
    </div>
  );
};

export default NotesList;