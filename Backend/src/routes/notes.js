import express from 'express';
// import Note from '../models/notes.js';
import { noteValidator } from '../validators/noteValidator.js';
import notesController from '../controllers/notes.js';

const router = express.Router();

router.get('/getnotes', notesController.getNotes);

router.post('/createnote', noteValidator, notesController.createNote);

router.put('/updatenote/:id', noteValidator, notesController.updateNote);

router.delete('/deletenote/:id', notesController.deleteNote);

export default router;