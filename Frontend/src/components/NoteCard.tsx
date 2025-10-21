import React from 'react';

interface NoteCardProps {
  title: string;
  content: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, date, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{content}</p>
      <p className="text-gray-500 text-sm">{date}</p>
      <div className="flex justify-between mt-4">
        <button onClick={onEdit} className="text-blue-500 hover:underline">Edit</button>
        <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;