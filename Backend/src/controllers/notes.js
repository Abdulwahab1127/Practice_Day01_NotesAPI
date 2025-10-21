import Note from '../models/notes.js';
import express from 'express';



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

const createNote = async (req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        
    const newNote = new Note({
        title,
        content,
        createdAt: new Date()
    });

    console.log(newNote); // Log the new note to verify its structure
    
    await newNote.save();

        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: { title, content, createdAt: new Date() }
        });
    
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            success: false,
            message: 'Failed to create note',
            error: error.message
            
        });
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