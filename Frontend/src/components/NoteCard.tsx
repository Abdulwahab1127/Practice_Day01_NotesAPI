import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  currentUserId: string;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, currentUserId, onEdit, onDelete }) => {
  const isOwner = note.user && note.user._id === currentUserId;
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 break-words flex-1">
          {note.title}
        </h3>
        {isOwner && (
          <div className="flex space-x-2 ml-2">
            <button
              onClick={() => onEdit(note)}
              className="text-indigo-600 hover:text-indigo-800 text-sm"
              title="Edit note"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note._id)}
              className="text-red-600 hover:text-red-800 text-sm"
              title="Delete note"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      
      <p className="text-gray-600 mb-4 whitespace-pre-wrap break-words">
        {note.content}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {note.user ? By  : 'Unknown user'}
        </span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default NoteCard;
