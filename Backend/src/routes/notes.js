import express from 'express';
import { noteValidator } from '../validators/noteValidator.js';
import notesController from '../controllers/notes.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getnotes', notesController.getNotes);

router.post('/createnote', protect, noteValidator, notesController.createNote);

router.put('/updatenote/:id', protect, noteValidator, notesController.updateNote);

router.delete('/deletenote/:id', protect, notesController.deleteNote);

export default router;