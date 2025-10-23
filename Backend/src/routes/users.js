import express from 'express';
import { signupValidator } from '../validators/signupValidator.js';
import { protect } from '../middleware/authMiddleware.js';
import UsersController from '../controllers/users.js';

const router = express.Router();

// User Signup Route 
router.post('/signup', signupValidator, UsersController.signup);

// User Login Route
router.post('/login', UsersController.login);
// Get current user
router.get('/me', protect, UsersController.me);

export default router;