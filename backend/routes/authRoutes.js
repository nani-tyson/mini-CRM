import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; 
import { validate } from '../validators/validationMiddleware.js';
import { registerSchema, loginSchema } from '../validators/authValidator.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(registerSchema), registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', validate(loginSchema), loginUser);

export default router;
