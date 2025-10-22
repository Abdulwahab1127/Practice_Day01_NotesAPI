import express from 'express';
import { signupValidator } from '../validators/signupValidator.js';
import UsersController from '../controllers/users.js';

const router = express.Router();

// User Signup Route 
router.post('/signup', signupValidator, UsersController.signup);

// User Login Route
router.post('/login', UsersController.login);

export default router;