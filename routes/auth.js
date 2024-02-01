import express from 'express';
import { signup, login, refreshToken, update_password } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/auth.js';
const authrouter = express.Router();

authrouter.post('/signup', signup);
authrouter.post('/login', login);
authrouter.post('/refresh-token', refreshToken);
authrouter.post('/update_password', authenticateToken, update_password);

export default authrouter;
