import React from 'react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  currentUserId: string;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, currentUserId, onEdit, onDelete }) => {
  // note.user may be a populated object, a string id, or an ObjectId-like value.
  let noteUserId: string | undefined;
  let noteUserName: string | undefined;

  if (!note.user) {
    noteUserId = undefined;
  } else if (typeof note.user === 'string') {
    noteUserId = note.user;
  } else if (typeof note.user === 'object') {
    // If populated object with _id and name
    const asAny = note.user as any;
    if (asAny._id) noteUserId = String(asAny._id);
    else noteUserId = String(asAny);

    if (asAny.name) noteUserName = asAny.name;
  } else {
    noteUserId = String(note.user as any);
  }

  const isOwner = !!noteUserId && noteUserId === currentUserId;
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
          {noteUserName ? `By ${noteUserName}` : noteUserId ? `By ${noteUserId}` : 'Unknown user'}
        </span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default NoteCard;
