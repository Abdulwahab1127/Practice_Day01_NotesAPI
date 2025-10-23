import mongoose from "mongoose";

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: 
    { 
        type: String, 
        required: true 
    },
    
    content: { 
        type: String, 
        required: true 
    },
    createdAt: {    
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // Reference to the user who created the note
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const NoteModel = mongoose.model("Note", noteSchema);

export default NoteModel;


