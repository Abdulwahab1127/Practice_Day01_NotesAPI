function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date'
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const noteId = note._id || note.id

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {note.title || 'Untitled'}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {note.content || 'No content'}
        </p>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {formatDate(note.createdAt || note.date)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(note)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(noteId)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteCard