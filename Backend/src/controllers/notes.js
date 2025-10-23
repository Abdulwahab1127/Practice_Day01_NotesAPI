import Note from '../models/notes.js';
import User from '../models/users.js';




const getNotes = async (req, res) => {
    try {
    // Populate user so frontend gets owner's name/email
    const notes = await Note.find()
    .populate({ path: 'user', select: 'name email' })
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

    // ✅ Push the note ID to the user's notes array (two-way relationship)
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { notes: newNote._id } }
    );

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
        
        // Find and update the note, return the updated document
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {
                title: req.body.title,
                content: req.body.content,
                updatedAt: new Date()
            },
            { new: true } // Return the updated document
        ).populate({ path: 'user', select: 'name email' });
        
        if(!updatedNote){
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            data: updatedNote // Return the updated note with populated user
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
        
        // Find the note first to get the user ID
        const note = await Note.findById(noteId);
        
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        
        // Delete the note
        await Note.deleteOne({ _id: noteId });
        console.log(`Deleted note with ID: ${noteId}`);
        
        // ✅ Remove the note ID from the user's notes array (two-way relationship)
        await User.findByIdAndUpdate(
            note.user,
            { $pull: { notes: noteId } }
        );
        
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