export interface Note {
  _id: string; // Ensure this matches your MongoDB ID field
  title: string;
  content: string;
  createdAt: Date; // Ensure this matches your date field
}

export interface NoteFormProps {
  onAddNote: (note: Note) => void;
}