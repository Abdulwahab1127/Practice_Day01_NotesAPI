import Note from '../models/notes.js';




const getNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        .sort({ createdAt: 1 }); // Sort by createdAt ascending
        
        res.status(200).json({
            success: true,
            message: 'Notes fetched successfully',
            data: notes
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notes',
            error: error.message
        });
    }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({
      title,
      content,
      createdAt: new Date(),
      user: req.user._id, // ✅ important
    });

    await newNote.save();

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote,
    });
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateNote = async (req, res) => {
    try{
        const noteId = req.params.id;
        console.log(`Updating note with ID: ${noteId}`);
        
        const UpdateNotes = {
            title : req.body.title,
            content : req.body.content
        };        
        await Note.updateOne({ _id: noteId }, UpdateNotes);
        if(!UpdateNotes){
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Note updated successfully'
        });
    } 
    catch (error) { 
        res.status(500).json({
            success: false,
            message: 'Failed to update note',
            error: error.message
        });
    }
};

const deleteNote = async (req, res) => {

    try{
        const noteId = req.params.id;
        await Note.deleteOne({ _id: noteId });
        console.log(`Deleted note with ID: ${noteId}`);
        
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });
    } 
    catch (error) { 
        res.status(500).json({
            success: false,
            message: 'Failed to delete note',
            error: error.message
        });
    }


};



export default {
    getNotes,
    createNote,
    updateNote,
    deleteNote
};