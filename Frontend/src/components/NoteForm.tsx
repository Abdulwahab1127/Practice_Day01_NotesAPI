import React, { useState } from 'react';

const NoteForm: React.FC<{ onAddNote: (title: string, content: string) => void }> = ({ onAddNote }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && content) {
            onAddNote(title, content);
            setTitle('');
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-title"
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-content"
                required
            />
            <button type="submit" className="submit-button">Add Note</button>
        </form>
    );
};

export default NoteForm;